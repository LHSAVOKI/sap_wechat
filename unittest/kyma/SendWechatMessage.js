var config = require("./mcConfig.js");
var request = require("request");

function sendWCMeaasge(toUser,sMessage, callback){
    var options = {
            url:"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" +
            config.access_token, 
            method: "POST",
            json:true,
            headers: {
            	"content-type": "application/json"},
            body:{
              "touser":toUser,
              "msgtype":"text",
              "text": {
                   "content":sMessage
              }
            }
          };
      request(options,function(error,response,data){
          callback(data);
      });
  }

module.exports = sendWCMeaasge;
