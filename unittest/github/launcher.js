var tool = require("./readIssueByUrl");
var config = require("./mcConfig");
var fs = require("fs");

tool.getFirstPageIssue().then(display);

var content = "";

function display(oResult){
	content = writeFirstPage(oResult.bodyPayload);
	fs.writeFileSync(config.result_File + "1.html", content);	
	handleSubSequent(oResult.lastPageNumber);
}

function handleSubSequent(lastPage){
	for( var i = 2; i <= lastPage; i++){
		tool.getSubSequentPage(i).then(assembleSubPage);
	}
}

function assembleSubPage(oSub){
	// reuse
	var sub = writeFirstPage(oSub.bodyPayload);
	fs.writeFileSync(config.result_File + oSub.currentIndex + ".html", sub );
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