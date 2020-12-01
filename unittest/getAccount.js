var config = require("../config.js");
var request = require('request');
var sendMessage = require("../jerryapp/service/postMessageToUser.js");

var getTokenOptions = {
        url: "https://my500203.c4c.saphybriscloud.cn/sap/c4c/odata/cust/v1/zindividualcustomer/CustomerCommonCollection?$filter=ParentObjectID%20eq%20%2700163E20C9511EE7B8975BD4AB3F60C0%27",
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json",
            'Authorization': 'Basic ' + new Buffer(config.credential).toString('base64')
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       debugger;

       printObject(body.d.results[0]);

       var wechatID = body.d.results[0].WechatID;
       console.log("wechat id: " + wechatID);
       sendMessage(wechatID, "Hello from Jerry");
       resolve("ok");
      }); // end of requestC
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

debugger;
getToken().then(function(token) {
	console.log("token received: " + token);
});

console.log("done");

