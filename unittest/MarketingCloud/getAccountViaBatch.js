var request = require('request');
var config = require("./mcConfig");

var url = config.getContactBatchURL;

var sBody = "--batch_c914-a60c-1877" + "\n" + 
"Content-Type: application/http" + "\n" + 
"Content-Transfer-Encoding: binary" + "\n" + 
"\n" + 
"GET InteractionContacts?sap-client=100&$skip=0&$top=2&$select=ImageURL%2cName%2cContactLevelName%2cCountryName%2cCity%2cEMailAddress%2cPhoneNumber%2cMobilePhoneNumber%2cCorporateAccountName%2cInteractionContactUUID%2cRelationship%2cType&$inlinecount=allpages HTTP/1.1" + 
"sap-cancel-on-close: true" + "\n" + 
"Cache-Control: max-age=360" + "\n" + 
"sap-contextid-accept: header" + "\n" + 
"Accept: application/json" + "\n" + 
"Accept-Language: en" + "\n" + 
"DataServiceVersion: 2.0" + "\n" + 
"MaxDataServiceVersion: 2.0" + "\n" + 
"\n" + "\n" + 
"--batch_c914-a60c-1877--";

var getContactOptions = {
        url: url,
        method: "POST",
        json:false,
        headers: {
            "content-type": "multipart/mixed;boundary=batch_c914-a60c-1877",
            'Authorization': 'Basic ' + new Buffer(config.user + ":" + config.password).toString('base64')
        },
        body: sBody
};

function getContact() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step1: get contact via url: " + url );

      requestC(getContactOptions,function(error,response,body){
        if( error){
          console.log("error occurred: " + error);
          reject(error);
        }
        console.log("response:" + body);
        var nStartIndex = body.indexOf("{");
        var nLastIndex = body.lastIndexOf("}");
        if( nStartIndex < 0 || nLastIndex < 0)
            return;
        var sPayload = body.substring(nStartIndex, ++nLastIndex);
        resolve(JSON.parse(sPayload));
      }); 
     });
}

function displayResult(oResult){
  // console.log(oResult);
  var size = oResult.d.results.length;

  for( var i = 0; i < size; i++){
    var item = oResult.d.results[i];
    console.log("city: " + item.City);
    console.log("ContactLevelName: " + item.ContactLevelName);
  }
}

getContact().then(displayResult);


