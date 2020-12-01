var request = require('request');
var config = require("../../config.js");

function getSocialMediaMessage(messageID) {
  var ogetSocialMediaActivityOptions = {
        url: config.socialMediaMessageGetEndPoint,
        method: "POST",
        json:false,
        headers: {
            "content-type": "text/xml",
            'Authorization': 'Basic ' + new Buffer(config.credential_qxl).toString('base64')
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaActivityByElementsQuery_sync>'
                        +'<SocialMediaActivitySelectionByElements>'
                        +'<SelectionBySocialMediaMessageID>'
                        +'<InclusionExclusionCode>I</InclusionExclusionCode>'
                        +'<IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>'
                        +'<LowerBoundarySocialMediaMessageID >' + messageID +'</LowerBoundarySocialMediaMessageID>'
                        +'</SelectionBySocialMediaMessageID>'
                        +'</SocialMediaActivitySelectionByElements>'
                        +'</glob:SocialMediaActivityByElementsQuery_sync></soapenv:Body></soapenv:Envelope>'
};
  return new Promise(function(resolve,reject){
      request(ogetSocialMediaActivityOptions,function(error,response,body){
        var soapreg = /.*<SocialMediaUserProfileID>(.*)<\/SocialMediaUserProfileID>.*/;
	      var soapresult = soapreg.exec(body);
	      if( soapresult.length === 2){
	   		   console.log("Social Media User profile ID: " + soapresult[1]);
	   		   resolve(soapresult[1]);
	      }
      }); 
     });
}

module.exports = getSocialMediaMessage;