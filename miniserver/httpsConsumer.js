var request = require('request');

var url = "https://localhost:8080/env";

// url = "https://www.baidu.com";

var scp = "https://jerry-demo-server.cfapps.eu10.hana.ondemand.com/env";

url = scp;
var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({
        strictSSL: false, // allow us to use our self-signed cert for testing
        rejectUnauthorized: false
      });
      console.log("HTTPS consumption test: " + url );

      requestC(getTokenOptions,function(error,response,body){
       console.log("response: " + response);
       console.log("error: " + error);
      }); 
     });
}



getToken();