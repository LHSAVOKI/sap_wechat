var config = require("../config.js");
var request = require('request');

var getTokenOptions = {
        url: config.individualCustomerurl,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential).toString('base64'),
            "x-csrf-token" :"fetch"
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       var csrfToken = response.headers['x-csrf-token'];
       if(!csrfToken){
          reject({message:"验证令牌错误"});
          return;
       }
       resolve(csrfToken);
      }); // end of requestC
     });
}

function createIndividualCustomer(token){
	return new Promise(function(resolve, reject){
		var oPostData = {
			"FirstName":"Jerryaaa",
 			"LastName":"Wang",
 		"RoleCode": "ZCRM01",
 		"CountryCode": "US",
 		"StatusCode": "2"
		};
		var requestC = request.defaults({jar: true});
        var createOptions = {
              url: config.individualCustomerurl,
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
               resolve(data);
            }
        });// end of requestC
	});
}

function printObject(oData){
	for( var a in oData){
		console.log("key: " + a);
		console.log("value: " + oData[a]);
		if( typeof oData[a] === "object"){
			printObject(oData[a]);
		}
	}
}
/*
getToken().then(function(token){
	console.log("token received: " + token);
});
*/
getToken().then(function(token) {
	console.log("token received: " + token);
	createIndividualCustomer(token).then(function(data){
		console.log("account created: " + data.d.results.CustomerID);
	});
});

