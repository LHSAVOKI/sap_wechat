var request = require('request');

var url = "https://api.github.com/repos/i042416/KnowlegeRepository/issues/2214";



var getIssueOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36"
        }
};

function getIssue() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step1: get issue via url: " + url );

      requestC(getIssueOptions,function(error,response,body){
        if(error){
          console.log("error occurred: " + error);
          reject(error);
        }
        console.log("title:" + body.title);
        console.log("body: " + body.body);
        for( var i = 0; i < body.labels.length; i++){
          console.log("label: " + body.labels[i].name);
        }
      }); 
     });
}

getIssue();


