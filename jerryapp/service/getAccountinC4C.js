var config = require("../../config.js");
var sendMessage = require("./postMessageToUser.js");
var request = require('request');

function notifyWechatUser(uuid,res){
  console.log("begin to read uuid: " + uuid);
  _getAccount(uuid).then(function(wechatID){
    res.status(200).end();
    sendMessage(wechatID, "Dear user, A kind reminder: your C4C account is changed in the system.");
  });
}

function _getAccount(uuid) {
  var AccountBOguid = uuid;
  var detailODataUrl = config.indivudualCustomerNewurl;
  var parentID = 'ParentObjectID eq \'' + AccountBOguid + '\'';
  detailODataUrl = detailODataUrl + encodeURI(parentID);
  var getOptions = {
        url: detailODataUrl,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential).toString('base64')
        }
  };
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("request with url: " + detailODataUrl);
      requestC(getOptions,function(error,response,body){
              var wechatID = body.d.results[0].WechatID;
              console.log("wechat id: " + wechatID);
              resolve(wechatID);
      }); // end of requestC
     });
}

module.exports = notifyWechatUser;