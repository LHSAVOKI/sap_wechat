var config = require("./mcConfig");
var request = require('request');

var url = config.tokenURL;
process.env.NODE_DEBUG = true;

console.log("user: " + config.user + " password: " + config.password); 
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
       for( var i in response.headers){
         console.log("header name: " + i + " value: " + response.headers[i]);
       }
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

function updateContact(token){
	return new Promise(function(resolve, reject){


		var sPostData = "--batch_1f7d-bd35-caed" + "\n" + 
  "Content-Type: multipart/mixed; boundary=changeset_8f9e-9a44-9f9e" + "\n" + 
  "\n" + 
  "--changeset_8f9e-9a44-9f9e" + "\n" + 
  "Content-Type: application/http" + "\n" + 
  "Content-Transfer-Encoding: binary" + "\n" + 
  "\n" + 
  "MERGE Consumers('02000A2120711ED9A0DDD7C5E482B88C')?sap-client=100 HTTP/1.1" + "\n" + 
  "Cache-Control: max-age=360" + "\n" + 
  "sap-contextid-accept: header" + "\n" + 
  "Accept: application/json" + "\n" + 
  "Accept-Language: en" + "\n" + 
  "DataServiceVersion: 2.0" + "\n" + 
  "MaxDataServiceVersion: 2.0" + "\n" + 
  "x-csrf-token: fQ2Pwfmf0K_LVYoKV9QYUw==" + "\n" + 
  "Content-Type: application/json" + "\n" + 
  //"Content-Length: 215" + "\n" + 
  "\n" + 
  "{\"YY1_FACEID_MPS\":\"Jerry测试5\"}" + "\n" + 
  "--changeset_8f9e-9a44-9f9e--" + "\n" + 
  "\n" + 
  "--batch_1f7d-bd35-caed--";

		var requestC = request.defaults({jar: true});
    var createOptions = {
              url: config.updateContactURL,
              method: "POST",
              json:false,
              headers: {
                  "content-type": "multipart/mixed;boundary=batch_1f7d-bd35-caed",
                  'x-csrf-token': token
              },
              body:sPostData
        };
        requestC(createOptions,function(error,response,data){
            if(error){
                reject(error.message);
            }else {
               debugger;
               console.log("Contact updated successfully");
               resolve(data);
            }
        });
	});
}

getToken().then(updateContact).catch((error) =>{
  console.log("error: " + error.message);
});
