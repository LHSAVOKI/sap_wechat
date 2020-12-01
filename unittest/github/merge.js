var tool = require("./readIssueByUrl");
var config = require("./mcConfig");
var fs = require("fs");

var num = process.argv.slice(2);

if( num.length != 1){
	console.log("USAGE: node <js> 97(last page index)");
	return;
}

var content = "";
for( var i = 1; i <= num; i++){
	var fileName = config.result_File + i + ".html";
	content = content + "\n\n" + fs.readFileSync(fileName,'utf-8');
}

fs.writeFileSync(config.result_File + "_final.html", content);

console.log("done");

