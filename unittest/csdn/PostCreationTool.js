var readIssue = require("./readIssueMod");
var createPost = require("./createPostMod");
var config = require("./mcConfig");

var num = process.argv.slice(2);

if( num.length != 1){
	console.log("USAGE: node <js> 123(issue number)");
	return;
}

readIssue(num[0], config.km ).then(createPost).catch((error)=>{console.log("error: " + error)});