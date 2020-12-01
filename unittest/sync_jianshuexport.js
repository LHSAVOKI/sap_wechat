var request = require("sync-request");
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
var textEncoding = require('text-encoding'); 
var textDecoder = textEncoding.TextDecoder;

const PREFIX = "https://www.jianshu.com";
const PAGE = "https://www.jianshu.com/u/99b8712e8850?order_by=shared_at&page=";

// Jerry： you can manually change the MAX from 100 to lower number 
// to achieve that only latest posted jianshu articles are downloaded
const MAX = 1;

var mArticleResult = new Map();
var lastPageReached = false;
var pageNumber;
/* a given article: https://www.jianshu.com/p/963cd23fb092
  value got from API: /p/5c1d0319dc42
*/

try {
    // use limited for loop to ease testing
    for (var i = 0; i < MAX; i++) {
        if( lastPageReached)
          break;
        pageNumber = i + 1;
        var url = PAGE + pageNumber;
        console.log("current page: " + url);
        var response = request('GET', url);
        var html = new textDecoder("utf-8").decode(response.body);
        handleResponseHTML(html);
    }
} 
catch (e) {

}

var articleIndex = 0;
var resultHTML = "<html>";

const fs = require('fs');

/*
<HTML>
<p>
<a href="https://www.baidu.com">eee</a>
</p>

<p><a>22</a></p>
<p><a>33</a></p>
</HTML>
*/

var index = mArticleResult.size;
for (var [key, value] of mArticleResult) {
    var article = "<p><a href=\"" + key + "\">" + 
    index-- + ". " + value + "</a></p>" + "\n";
    resultHTML = resultHTML + article;
    console.log("Article[" + articleIndex++ + "]: " + value + " = " + key);
}

resultHTML = resultHTML + "</html>";

var pwd = process.cwd() + "/jianshu.html";

fs.appendFileSync(pwd, resultHTML);

console.log("done");



function handleResponseHTML(html) {
    var document = new JSDOM(html).window.document;
    var content = document.getElementsByTagName("li");

    for (var i = 0; i < content.length; i++) {
        var li = content[i];
        var children = li.childNodes;
        for (var j = 0; j < children.length; j++) {
            var eachChild = children[j];
            if (eachChild.nodeName == "DIV") {
                var grandChild = eachChild.childNodes;
                for (var k = 0; k < grandChild.length; k++) {
                    var grand = grandChild[k];
                    if (grand.nodeName == "A") {
                        var fragment = grand.getAttribute("href");
                        if (fragment.indexOf("/p") < 0)
                            continue;
                        // console.log("title: " + grand.text);
                        var wholeURL = PREFIX + fragment;
                        // console.log("url: " + wholeURL);
                        if (mArticleResult.has(wholeURL)) {
                            lastPageReached = true;
                            console.log("article size: " + mArticleResult.size);
                            return;
                        }
                        mArticleResult.set(wholeURL, grand.text);
                    }
                }
            }
        }
    }
}