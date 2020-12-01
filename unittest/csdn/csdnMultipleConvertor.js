var readIssue = require("./readIssueMod");
var config = require("./mcConfig");
var github2csdn = require("./github2csdnConvertor");

// [1,"*", 3]
var total = config.task[2] - config.task[0] + 1;
console.log("total issues to replicate: " + total);

for( var j = config.task[0]; j <= config.task[2]; j++){
	// Jerry: change repository name here!!!!!!!!!!!
	readIssue(j,config.km).then(github2csdn).catch((error)=>{console.log("error: " + error)});
}
