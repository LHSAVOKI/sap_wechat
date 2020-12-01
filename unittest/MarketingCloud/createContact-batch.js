var config = require("./mcConfig");
var request = require('request');

var url = config.tokenURL;

var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,     
        headers: {
            'Authorization': 'Basic ' + new Buffer(config.user + ":" + config.password).toString('base64'),
            "content-type": "application/json",
            "x-csrf-token" :"fetch"
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step1: get csrf token via url: " + url );

      requestC(getTokenOptions,function(error,response,body){
       var csrfToken = response.headers['x-csrf-token'];
       if(!csrfToken){
          reject({message:"token fetch error: " + error});
          return;
       }
       console.log("Step1: csrf token got: " + csrfToken);
       resolve(csrfToken);
      }); 
     });
}

function createContact(token){
	return new Promise(function(resolve, reject){
    // 这一长串字符串都是从Chrome开发者工具里粘贴的
		var sPostData = "--batch_10e2-8baf-4066" + "\n" + 
    "Content-Type: multipart/mixed; boundary=changeset_dc24-4893-b363" + "\n" + 
    "\n" + 
    "--changeset_dc24-4893-b363" + "\n" + 
    "Content-Type: application/http" + "\n" + 
    "Content-Transfer-Encoding: binary" + "\n" + 
    "\n" + 
    "POST InteractionContacts?sap-client=100 HTTP/1.1" + "\n" + 
    "Cache-Control: max-age=360" + "\n" + 
    "Content-Type: application/json" + "\n" + 
    "sap-contextid-accept: header" + "\n" + 
    "Accept: application/json" + "\n" + 
    "Accept-Language: en" + "\n" + 
    "DataServiceVersion: 2.0" + "\n" + 
    "MaxDataServiceVersion: 2.0" + "\n" + 
    "\n" + 
    "{\"IsConsumer\":true,\"Filter\":{\"MarketingArea\":\"CXXGLOBAL\"},\"FirstName\":\"SAP Seya\",\"LastName\":\"SAP Wang\",\"Country\":\"CN\",\"EMailAddress\":\"seya@sap.com\",\"YY1_WECHATID_MPS\":\"i042416\",\"YY1_FACEID_MPS\":\"d042416\"}"
    + "\n" 
    + "--changeset_dc24-4893-b363--" + "\n" + 
    "\n" + 
    "--batch_10e2-8baf-4066--";

		var requestC = request.defaults({jar: true});
        var createOptions = {
              url: config.createContactURL,
              method: "POST",
              json:false,
              headers: {
                  "Accept": "multipart/mixed",
                  "content-type": "multipart/mixed;boundary=batch_10e2-8baf-4066",
                  'x-csrf-token': token
              },
              body:sPostData
        };
        requestC(createOptions,function(error,response,data){
            if(error){
                reject(error.message);
            }else {
               var oCreatedContact = data;
               console.log("created contact: " + oCreatedContact);
               resolve(data);
            }
        });
	});
}

getToken().then(createContact).catch((error) =>{
  console.log("error: " + error.message);
});
