var request = require('request');
var config = require("./mcConfig");

function getFirstPage() {

  var url = config.first_page;

  var getIssueOptions = {
        url: url,
        method: "GET",
        headers: {
        	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
            "Authorization": "Bearer " + config.access_token
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step1: get first page issue detail via url: " + url );

      requestC(getIssueOptions,function(error,response,body){
        if(error){
          console.log("error occurred: " + error);
          reject(error);
        }
        var lastPageNumber = getLastPageNumber(response.headers.link);
        var bodyPayload = JSON.parse(body);
        var oResult = {
           lastPageNumber: lastPageNumber,
           bodyPayload: bodyPayload
        };
        resolve(oResult);
      }); 
     });
}



function getSubSequentPage(pageIndex){
  var url = config.nextUrl + pageIndex;

  var getSubOptions = {
        url: url,
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36",
            "Authorization": "Bearer " + config.access_token
        }
  };

  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("Step2: get sub sequent issue detail via url: " + url );

      requestC(getSubOptions,function(error,response,body){
        if(error){
          console.log("error occurred: " + error);
          reject(error);
        }
        var bodyPayload = JSON.parse(body);
        var oResult = {
           currentIndex: pageIndex,
           bodyPayload: bodyPayload
        };
        resolve(oResult);
      }); 
     });
}

function getLastPageNumber(link){
	var linkmatch = /<(.*)>.*<(.*)>.*/;
	var result = linkmatch.exec(link);
	var urlForNextPage = result[1];
	var urlForLastPage = result[2];

	console.log("last page url: " + urlForLastPage);

// https://api.github.com/repositories/80901824/issues?page=98
  var lastMatch = /.*=(.+)/;

  var lastPage = lastMatch.exec(urlForLastPage);
  var lastPageNumber = lastPage[1];
  return lastPageNumber;
}

module.exports = {
	getFirstPageIssue: getFirstPage,
  getSubSequentPage: getSubSequentPage
};