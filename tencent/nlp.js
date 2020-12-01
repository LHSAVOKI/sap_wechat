var md5 = require('md5');

var app_id = "2107823355";
var time_stamp = Date.now() / 1000;
var nonce_str = Date.now();
var text = "腾讯AI人工智能开放平台";
var app_key = "LHGNH0usjUTRRRSA";

var input = "app_id=" + app_id + "&nonce_str=" + nonce_str + "&text=" + encodeURI(text)  
  + "&time_stamp=" + time_stamp + "&app_key=" + app_key;

var upper = md5(input).toUpperCase();
console.log(upper);

input = input + "&sign=" + upper;

var request = require('request');

var oOptions = {
	url: "https://api.ai.qq.com/fcgi-bin/nlp/nlp_wordseg",
    method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: input
};

console.log("request sent: " + oOptions.body);

var action = new Promise(function(resolve,reject){
      request(oOptions,function(error,response,body){
       console.log("response: " + body);
     }); // end of request 
   });


