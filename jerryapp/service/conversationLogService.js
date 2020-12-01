var getXMLNodeValue = require("../tool/xmlparse.js");
var formattedValue = require("../tool/formatValue.js");
var redisClient = require("./redisClient.js");
var config = require("../../config.js");

Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

function logConversation(wholeContent, question, answer){
	var fromUserId = formattedValue(getXMLNodeValue('FromUserName', wholeContent));
	var toUserId = formattedValue(getXMLNodeValue('ToUserName', wholeContent));
	var fromUserName = config.userMap[fromUserId] || fromUserId;
	var toUserName = config.userMap[toUserId] || toUserId;
	var datetime = "Send Time: " + new Date().today() + "  " + new Date().timeNow();
	redisClient.insert(toUserId, objectToString(fromUserName, toUserName, datetime, question, answer));
};

function objectToString(fromUserName, toUserName, datetime, question, answer){
	var record = {
		"from": fromUserName,
		"to": toUserName,
		"sendTime": datetime,
		"question": question,
		"answer": answer
	};

	return JSON.stringify(record); 
}

function getList(sToUserOpenId){
	return redisClient.getList(sToUserOpenId);
}

function deleteLog(sToUserOpenId){
	return redisClient.clearList(sToUserOpenId);
}

var oService = {
	log: logConversation,
	getLog: getList,
	deleteLog: deleteLog
}

module.exports = oService;