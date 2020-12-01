var request = require('request');
var config = require("../../config.js");
var postWCMessage = require("./postMessageToUser.js");

function createSocialMediaMessage(fromUserName, id, userProfileId, providerid, text) {
  var ocreateSocialMediaActivityOptions = {
        url: config.socialMediaMessageEndPoint,
        method: "POST",
        json:false,
        headers: {
            "content-type": "text/xml",
            'Authorization': 'Basic ' + new Buffer(config.credential_qxl).toString('base64')
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaActivityBundleMaintainRequestsync>'
                        +'<SocialMediaActivity>'
                        +'<SocialMediaMessageID>' + id +'</SocialMediaMessageID>'
                        +'<SocialMediaUserProfileID>'+ userProfileId +'</SocialMediaUserProfileID>'
                        +'<SocialMediaActivityProviderID>' + providerid + '</SocialMediaActivityProviderID>'
                        +'<InteractionContent ><Text>' + text + '</Text></InteractionContent>'
                        +'</SocialMediaActivity>'
                        +'</glob:SocialMediaActivityBundleMaintainRequestsync></soapenv:Body></soapenv:Envelope>'
};
  return new Promise(function(resolve,reject){
      request(ocreateSocialMediaActivityOptions,function(error,response,body){
        var soapreg = /.*<ID>(.*)<\/ID>.*/;
	      var soapresult = soapreg.exec(body);
	      if( soapresult.length === 2){
	   		   var message = "created Social Media Message ID: " + soapresult[1];
	   		   resolve(message);
           postWCMessage(fromUserName, message);
	      }
      }); 
     });
}

module.exports = createSocialMediaMessage;