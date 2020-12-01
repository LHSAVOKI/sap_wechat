var request = require('request');
var jsSHA = require('jssha');
var tokenValidationTool = require("../tool/tokenValidation.js");
var echoService = require("../service/echo.js");
var tuningService = require("../service/tuning.js");
var createAccount = require("../service/createAccountInC4C.js");
var getXMLNodeValue = require("../tool/xmlparse.js");
var formattedValue = require("../tool/formatValue.js");
var replyMessage = require("../tool/replyMessage.js");
var config = require("../../config.js");
var notifyWechatUser = require("../service/getAccountinC4C.js");
var handlReplyFromC4C = require("../service/handleReplyFromC4C.js");
var authorizeAndRedirect = require("./AuthorizationAndDirect.js");
var printObject = require("../tool/printObject.js");


if( config.useRedis ){ 
  var conversationLogService = require("../service/conversationLogService.js");
}
module.exports = function (app) {

  app.all('*', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By",' 3.2.1');
      res.header("Content-Type", "application/json;charset=utf-8");
      next();
    });


  app.route('/qxl').get(function(req, res){
    var request = require('request');
    var url = config.individualCustomerurl + '?$top=1';
    var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential_odata).toString('base64'),
            "x-csrf-token" :"fetch"
        }
    };

  function getToken() {
    return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step1: get csrf token via url: " + url );

      requestC(getTokenOptions,function(error,response,body){
       var csrfToken = response.headers['x-csrf-token'];
       if(!csrfToken){
          reject({message:"token fetch error"});
          return;
       }
       console.log("Step1: csrf token got: " + csrfToken);
       resolve(csrfToken);
      }); 
     });
   }
  
   getToken();
   res.send("hello QXL");
  });

  app.route('/').get(function(req,res){
    if( req.query && req.query.echostr) {
      tokenValidationTool(req, res);
    }
    else{
      if( config.useRedis) {
        var client = require('redis').createClient(process.env.REDIS_URL);
      }
      res.send("Hello World in index.js");
    }
  });

  app.route("/tokenCallback").get(function(req,res){
    if( req.query && req.query.code) {
      authorizeAndRedirect(req.query.code, res);
    }
    else{
      res.send("no code");
    }
  });

  app.route('/c4c').post(function(req,res){
    var _da;
    console.log("new event from C4C--------------------------")
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        var payload = JSON.parse(_da);
        var AccountBOguid = payload.businessObjectId;
        notifyWechatUser(AccountBOguid, res);
    });
  });

  app.route('/fromc4c').post(function(req,res){
    var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        console.log("payload from C4C: " + _da);
        handlReplyFromC4C(_da);
        res.status(200);
        res.send({"success:":"ok"});
    });
  });

  app.route('/').post(function(req,res){
    var _da;
    req.on("data",function(data){
        _da = data.toString("utf-8");
    });

    req.on("end",function(){
        console.log("new http post: " + _da);
        var msgType = formattedValue(getXMLNodeValue('MsgType',_da));
        if( msgType === "text"){
           var question = formattedValue(getXMLNodeValue('Content',_da));
           tuningService(_da, question, res);
        }
        else if( msgType === "voice"){
           var voice = formattedValue(getXMLNodeValue('Recognition',_da));
           tuningService(_da, voice, res);
        }
        else if( msgType === "event"){
          var event = formattedValue(getXMLNodeValue('Event',_da));
          var eventKey = formattedValue(getXMLNodeValue('EventKey',_da));
          console.log("event: " + event + " event key: " + eventKey);
          var fromUserName = formattedValue(getXMLNodeValue('FromUserName',_da));
          var toUserId = formattedValue(getXMLNodeValue('ToUserName',_da));
          if( event === "subscribe"){
            var replyxml = replyMessage(_da, "Welcome to Jerry's subscription account, 输入中文文字或者中文语音可以和机器人聊天");
            // createAccount(fromUserName);
            res.send(replyxml);
          }
          else if( eventKey === "dataQuery"){
            /*
            &lt;   <
            &gt;   >
            &quot; :
            &amp; &
            */
            // <a href="http://www.baidu.com">百度</a>
            var redirect = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx73b49bfe02fd3a17&amp;redirect_uri=https://wechatjerry.herokuapp.com/tokenCallback&amp;response_type=code&amp;scope=snsapi_userinfo&amp;state=1#wechat_redirect";
            var reply = "&lt;a href=&quot;" + 
            encodeURI(redirect) + "&quot;&gt;" + "OAuth2 test to read User info in 3rd application" + "&lt;" + "/a" + "&gt;";
            console.log("************* Redirect content to send: " + reply);
            var eventtext = replyMessage(_da, reply);
            res.send(eventtext);
          }

          else if( eventKey === "review"){
            conversationLogService.getLog(toUserId).then(
              function(logString){
                var replyString = replyMessage(_da, logString);
                res.send(replyString);
              }).catch(function(reason){
                var emptyString = replyMessage(_da, reason);
                res.send(emptyString);
              });
          }
          else if( eventKey === "delete"){
            conversationLogService.deleteLog(toUserId).then(
              function(reply){
                var deleteReply = replyMessage(_da, "Conversation log deleted successfully");
                res.send(deleteReply);
              });
          }
        }
    });
  });

  app.route("/token").get(function(req, res){
    var oprions = {
          url:"https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+"ncc75g3kkO5yQvRQJTgqXINn3bNv8J6-TBym_3ANwazN4Ahzp952dpUpyPt8xjRlz-fTMbtPAVL1CJDzhzJvwxcxSLNDWPub6gsnWH-0Dc5HerR-0W5TBwyonxNM_ih9CZIcAHAWTC",
          method: "POST",
          json:true,
          headers: {
          "content-type": "application/json"},
          body:{
                 "button":[
                     {
                       "name":"账户管理",
                       "sub_button":[{
                            "type": "click",
                            "name": "创建账户",
                            "key": "dataCreate"
                       },{
                            "type": "view",
                            "name": "查询账户",
                             "url":"http://www.baidu.com/"
                       }]
                     },
                     {
                       "name":"试驾",
                       "sub_button":[{
                            "type": "click",
                            "name": "预约试驾",
                            "key": "tryDrive"
                       },{
                            "type": "click",
                            "name": "查询试驾",
                             "key": "queryDrive"
                       }]
                     }
                 ]
            }
        };
    request(oprions,function(error,response,data){
      console.log("response: " + response);
      console.log("error: " + error);
      console.log("data: " + data);
    });
  }); 
};
