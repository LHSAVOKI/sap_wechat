var config = require("../../config.js");
var request = require('request');

function printObject(oData){
  console.log("Jerry type: " + typeof oData);
  for( var a in oData){
    console.log("key: " + a);
    console.log("value: " + oData[a]);
    if( typeof oData[a] === "object"){
      printObject(oData[a]);
    }
  }
}

function getAccessToken(code) {

  var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + 
  config.testAccountAppid + "&secret=" + config.testAccountSecret + "&code=" + code + "&grant_type=authorization_code";
  console.log("url sent: " + url);

  var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       console.log("get response from access token request");
       if(error){
          console.log("access token retrieve failed: " + error);
          reject({message: error});
          return;
       }
      resolve(body);
      }); // end of requestC
     });
} 

function getUserinfo(tokenResponse, res){
    console.log("access token: " + tokenResponse.access_token);
    var userinfourl = "https://api.weixin.qq.com/sns/userinfo?access_token="
    + tokenResponse.access_token + "&openid=" + tokenResponse.openid;

  console.log("url sent for user info read: " + userinfourl);

  var userOptions = {
        url: userinfourl,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(userOptions,function(error,response,body){
       if(error){
          console.log("user info read error: " + error);
          reject({message: error});
          return;
       }
        console.log("nickname retrieved: " + body.nickname);
        var url = "https://wechatjerry.herokuapp.com/ui5?nickname=" + body.nickname;
        res.redirect(url);
      }); // end of requestC
     });
}

module.exports = function(code, res){
	getAccessToken(code).then(function(tokenResponse) {
  		getUserinfo(tokenResponse, res);
	});
};
