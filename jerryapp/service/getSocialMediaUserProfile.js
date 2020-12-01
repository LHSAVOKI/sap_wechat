var request = require('request');
var config = require("../../config.js");

function getSocialMediaProfile(profileID) {

  console.log("Jerry trace begin ***********************************");
  console.log("url: " + config.socialMediaProfileGetEndPoint);
  console.log("config.credential_qxl: " + config.credential_qxl);

  var ogetSocialMediaProfileOptions = {
        url: config.socialMediaProfileGetEndPoint,
        method: "POST",
        headers: {
            "content-type": "text/xml",
            'Authorization': 'Basic ' + new Buffer(config.credential_qxl).toString('base64')
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaUserProfileRequest_sync>'
                      +'<SocialMediaUserProfileSelectionByElements>'
                      +'<SelectionBySocialMediaUserProfileID>'
                      +'<InclusionExclusionCode>I</InclusionExclusionCode>'
                      +'<IntervalBoundaryTypeCode>1</IntervalBoundaryTypeCode>'
                      +'<LowerBoundarySocialMediaUserProfileID >' + profileID + '</LowerBoundarySocialMediaUserProfileID>'
                      +'</SelectionBySocialMediaUserProfileID>'
                      +'</SocialMediaUserProfileSelectionByElements>'
                      +'</glob:SocialMediaUserProfileRequest_sync></soapenv:Body></soapenv:Envelope>'
              };

  console.log("body: " + ogetSocialMediaProfileOptions.body);
  console.log("Jerry trace end ***********************************");

  return new Promise(function(resolve,reject){
      request(ogetSocialMediaProfileOptions,function(error,response,body){

        console.log("Jerry web service response: " + body);
        var soapreg = /.*<SocialMediaUserAccountID>(.*)<\/SocialMediaUserAccountID>.*/;
	      var soapresult = soapreg.exec(body);
	      if( soapresult.length === 2){
	   		  resolve(soapresult[1]);
	      }
      });
    }); 
}

module.exports = getSocialMediaProfile;