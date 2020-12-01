var github2csdn = require("./github2csdnConvertor");
var readIssue = require("./readIssueMod");
var config = require("./mcConfig");

var num = process.argv.slice(2);

if( num.length != 1){
	console.log("USAGE: node <js> 123(issue number)");
	return;
}

readIssue(num[0], config.km ).then(github2csdn).catch((error)=>{console.log("error: " + error)});