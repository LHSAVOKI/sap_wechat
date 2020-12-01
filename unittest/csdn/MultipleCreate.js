var readIssue = require("./readIssueMod");
var createPost = require("./createPostMod");
var config = require("./mcConfig");

if( config.task.indexOf("*") < 0){
	console.log("total issues to replicate: " + config.task.length);

	for( var i = 0; i < config.task.length; i++){
		// Jerry: change repository name here!!!!!!!!!!!
		readIssue(config.task[i], config.km).then(createPost).catch((error)=>{console.log("error: " + error)});
	}
}
else{
	// [1,"*", 3]
	var total = config.task[2] - config.task[0] + 1;
	console.log("total issues to replicate: " + total);
	for( var j = config.task[0]; j <= config.task[2]; j++){
		// Jerry: change repository name here!!!!!!!!!!!
		readIssue(j,config.km).then(createPost).catch((error)=>{console.log("error: " + error)});
	}
}
