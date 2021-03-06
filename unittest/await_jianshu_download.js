var request = require('request');
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
const PREFIX = "https://www.jianshu.com";
const PAGE = "https://www.jianshu.com/u/99b8712e8850?order_by=shared_at&page=";
const MAX = 2;

var mArticleResult = new Map();
var pageNumber;
/* a given article: https://www.jianshu.com/p/963cd23fb092
  value got from API: /p/5c1d0319dc42
*/

var url = "";

// wrap a request execution in promise

function getArticles(pageOptions, pageNumber) {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});

      requestC(pageOptions,function(error,response,body){
        if( error){
          console.log("error: " + error);
          resolve(error);
        }
        var document = new JSDOM(body).window.document;
        var content = document.getElementsByTagName("li");

        for( var i =0; i < content.length; i++){
          var li = content[i];
          var children = li.childNodes;
          for( var j = 0; j < children.length; j++){
              var eachChild = children[j];
              if( eachChild.nodeName == "DIV"){
                var grandChild = eachChild.childNodes;
                for( var k = 0; k < grandChild.length; k++){
                  var grand = grandChild[k];
                  if( grand.nodeName == "A"){
                    var fragment = grand.getAttribute("href");
                    if( fragment.indexOf("/p") < 0)
                      continue;
                    console.log("title: " + grand.text);
                    var wholeURL = PREFIX + fragment;
                    console.log("url: " + wholeURL);
                    if( mArticleResult.has(grand.text)){
                      lastPageReached = true;
                      console.log("article size: " + mArticleResult.size);
                      resolve(pageNumber);
                    }
                    mArticleResult.set(grand.text, wholeURL);
                  }
                }
              }
          }
        }// end of outer loop
        resolve(pageNumber);
      }); 
     });
}

async function downloadArticle(pageNumber){
  var url = PAGE + pageNumber;
  console.log("current page: " + url);
  var pageOptions = {
        url: url,
        method: "GET",
        headers: {
            "Accept": "text/html"
        }
  };

  try{
    var downloadedPage = await getArticles(pageOptions, pageNumber);
    console.log('downloaded Page number: ' + downloadedPage);
  }
  catch(error){
    console.error(error);
  }
}


// main logic
downloadArticle(1);
