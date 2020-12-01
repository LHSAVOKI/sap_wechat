
var parseString = require('xml2js').parseString;

text="<bookstore>"
text=text+"<book>";
text=text+"<title>Harry Potter</title>";
text=text+"<author>J K. Rowling</author>";
text=text+"<year>2005</year>";
text=text+"</book>";
text=text+"</bookstore>";

var a = require("./config");

console.log(a.dev.name);
console.log(a.prod.name);
// console.log(process.env);

/*
process.on('exit', (code) => {
  console.log(`即将退出，退出码：${code}`);
});
*/

const path = require('path');

console.log(path);

/*
process.on('uncaughtException', (err) => {
  console.log(`捕获到异常：${err}\n`);
});




parseString(text, function (err, result) {
    console.log(result);
    var obj = JSON.parse(result); // runtime exception
     console.log("id: " + obj.title);
});

*/


