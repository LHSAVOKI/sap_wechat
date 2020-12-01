var request = require('request');
var config = require("../../config.js");

function createSocialMediaProfile(fromUserName, lastname, firstname) {

  var ocreateSocialMediaProfileOptions = {
        url: config.mainUserProfileEndPoint,
        method: "POST",
        headers: {
            "content-type": "text/xml",
            'Authorization': 'Basic ' + new Buffer(config.credential_qxl).toString('base64')
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaUserProfileBundleMaintainRequest_sync>'
                      +'<SocialMediaUserProfile>'
                      +'<SocialMediaUserCategoryCode>02</SocialMediaUserCategoryCode>'
                      +'<UserInformation >'
                      +'<SocialMediaUserAccountID>' + fromUserName + '</SocialMediaUserAccountID>'
                      +'<SocialMediaChannelCode>905</SocialMediaChannelCode>'
                      +'<FamilyName>' + lastname + '</FamilyName>'
                      +'<GivenName>' + firstname + '</GivenName>'
                      +'</UserInformation>'
                      +'</SocialMediaUserProfile>'
                      +'</glob:SocialMediaUserProfileBundleMaintainRequest_sync></soapenv:Body></soapenv:Envelope>'
              };
  return new Promise(function(resolve,reject){
    console.log("Step2: create social media profile");
      request(ocreateSocialMediaProfileOptions,function(error,response,body){
       var soapreg = /.*<ID>(.*)<\/ID>.*<UUID>(.*)<\/UUID>.*/;
       console.log("response from Social Media Profile creation: " + body);
	     var soapresult = soapreg.exec(body);
	     if( soapresult.length === 3){
          var createdProfile = {
            id: soapresult[1],
            uuid: soapresult[2]
        };
	   		resolve(createdProfile);
	    }
    }); 
  });
}

module.exports = createSocialMediaProfile;