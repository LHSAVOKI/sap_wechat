var config = require("../config.js");
var request = require('request');

// 'Authorization': 'Basic ' + new Buffer("Crmops:Ondemand1").toString('base64')

var getTokenOptions = {
        url: "https://jerrydemowc4e460ce.int.sap.hana.ondemand.com/connectivity/api/survey",
        method: "POST",
        headers: {
            'answer': '3,2'
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.time("Remote");
      requestC(getTokenOptions,function(error,response,body){
        console.log("response body: " + body);
       resolve(response);
      }); 
     });
}

getToken().then(function(response) {
	   // printObject(response);
});

