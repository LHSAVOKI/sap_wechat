var tool = require("./readIssueByUrl");
var config = require("./mcConfig");
var fs = require("fs");

var num = process.argv.slice(2);

if( num.length != 1){
	console.log("USAGE: node <js> 23(Page number)");
	return;
}

tool.getSubSequentPage(num).then(display);

function display(oResult){
	var content = writeFirstPage(oResult.bodyPayload);
	fs.writeFileSync(config.result_File + num + ".html", content);	
	console.log("done");
}

function writeFirstPage(oResult){
	var line = "";
	for( var i = 0; i < oResult.length; i++){
		line = line + getFormattedHTML(oResult[i]) + "\n\n";
	}
	return line;
}

// format: <a href="https://www.baidu.com">url sss</a>
function getFormattedHTML(oLineItem){
	var result = "<p><a href=\"" + oLineItem.html_url + "\">" +
	  oLineItem.number + ". " + oLineItem.title + "</a></p>";
	return result;
}