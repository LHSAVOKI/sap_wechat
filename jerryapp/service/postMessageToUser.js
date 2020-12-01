var config = require("../../config.js");
var request = require("request");

function sendWCMeaasge(toUser,sMessage){
    var options = {
            url:"https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" +
            config.accessToken, 
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
      });
  }

module.exports = sendWCMeaasge;
