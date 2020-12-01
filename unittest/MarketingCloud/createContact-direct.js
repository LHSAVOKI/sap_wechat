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
    var oPostData = {"IsConsumer":true,
                      "Filter":{"MarketingArea":"CXXGLOBAL"},
                      "__metadata":{"type":"CUAN_CONTACT_SRV.InteractionContact"},
                      "FirstName":"S3AP Jerry","LastName":"SAP Wang","Country":"CN",
                      "EMailAddress":"seya@sap.com","YY1_WECHATID_MPS":"i042416",
                      "YY1_FACEID_MPS":"d042416"
                    };
    var requestC = request.defaults({jar: true});
        var createOptions = {
              url: config.createContactDirect,
              method: "POST",
              json:true,
              headers: {
                  "content-type": "application/json",
                  'x-csrf-token': token
              },
              body:oPostData
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
