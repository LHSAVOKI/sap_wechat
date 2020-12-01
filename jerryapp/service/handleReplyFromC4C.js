/*
Sample data: 
content={"original_id":"1003","sma_id":"59161","service_req_no":"1034190",
"author_name":"Jerry Wang","author_email":"","sma_create_datetime":"2017-12-28T02:27:14Z",
"private_ind":"FALSE","text":"detail text here"}           

Step 1: get social media message detail based on message ID from payload sent from C4C system
Step 2: The social media user profile ID is stored as a field of message detail fetched from Step 1.
Get user profile detail data based on its ID.
Step 3: The ID of Wechat user who has initially sent the text to C4C system is contained in social media 
user profile detail data. With this ID available now we can call module postMessageToUser to send 
the text maintained in C4C system to user's Wechat app.
*/

var config = require("../../config.js");
var request = require('request');
var postWCMessage = require("./postMessageToUser.js");
var getSocialMediaActivity = require("./getSocialMediaActivity.js");
var getSocialMediaUserProfile = require("./getSocialMediaUserProfile.js");

const prefixLength = "content=".length;

function handleReplyFromC4C(payload){
	var json = unescape(payload.substr(prefixLength, payload.length - prefixLength));
	var oPayload = JSON.parse(json);
	getSocialMediaActivity(oPayload.original_id).then(function(profileID){
		getSocialMediaUserProfile(profileID).then(function(wechatID){
			postWCMessage(wechatID, oPayload.text); 
		});
	});
}

module.exports = handleReplyFromC4C;

