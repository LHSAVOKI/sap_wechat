var config = require("../../config.js");
var request = require('request');

function bindProfileWithCustomer(fromUsername, profileUUID, customerID) {
	var options = { 
					method: 'POST',
                  	url: config.mainUserProfileEndPoint,
                  	headers: {
                     'cache-control': 'no-cache',
                     'content-type': 'text/xml',
                     authorization: 'Basic ' + new Buffer(config.credential_qxl).toString('base64') 
                  },
                  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:glob="http://sap.com/xi/SAPGlobal20/Global"><soapenv:Header/><soapenv:Body><glob:SocialMediaUserProfileBundleMaintainRequest_sync>'
                        +'<SocialMediaUserProfile>'
                        +'<UUID>' + profileUUID+'</UUID>'
                        +'<UserInformation >'
                        +'<SocialMediaUserAccountID>' + fromUsername + '</SocialMediaUserAccountID>'
                        +'</UserInformation>'
                        +'<CustomerInternalID>' + customerID + '</CustomerInternalID>'
                        +'</SocialMediaUserProfile>'
                        +'</glob:SocialMediaUserProfileBundleMaintainRequest_sync></soapenv:Body></soapenv:Envelope>'
                };
     return new Promise(function(resolve,reject){
     	request(options, function (error, response, body) {
        	var soapreg = /.*<ID>(.*)<\/ID>.*<UUID>(.*)<\/UUID>.*/;
	     	var soapresult = soapreg.exec(body);
	     	if(( soapresult.length === 3) && (soapresult[2] === profileUUID)){
	     		resolve("OK");
	     	}
        });
     });
}

module.exports = bindProfileWithCustomer;