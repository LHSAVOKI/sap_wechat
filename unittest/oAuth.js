var config = require("../config.js");
var request = require('request');

function printObject(oData){
  console.log("Jerry type: " + typeof oData);
  for( var a in oData){
    console.log("key: " + a);
    console.log("value: " + oData[a]);
    if( typeof oData[a] === "object"){
      printObject(oData[a]);
    }
  }
}

function getAccessToken() {
  var code = "021ox6wv1UIax90AuJuv1V18wv1ox6wP";

  var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + 
  config.testAccountAppid + "&secret=" + config.testAccountSecret + "&code=" + code + "&grant_type=authorization_code";
  console.log("url sent: " + url);

  var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(getTokenOptions,function(error,response,body){
       debugger;
       console.log("get response");
       if(error){
          console.log("in reject: " + error);
          reject({message: error});
          return;
       }
      resolve(body.access_token);
      }); // end of requestC
     });
} 

function getUserinfo(access_token){
    console.log("access token: " + access_token);
    var userinfourl = "https://api.weixin.qq.com/sns/userinfo?access_token="
    + access_token + "&openid=" + config.testAccount;

  console.log("url sent: " + userinfourl);

  var userOptions = {
        url: userinfourl,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      requestC(userOptions,function(error,response,body){
       if(error){
          console.log("in reject: " + error);
          reject({message: error});
          return;
       }
        printObject(body); // nickname
      }); // end of requestC
     });
}

getAccessToken().then(function(access_token) {
  getUserinfo(access_token);
});
