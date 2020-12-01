var getSocialProfile = require('../jerryapp/service/getSocialMediaUserProfile.js');
var sendMessage = require("../jerryapp/service/postMessageToUser.js");

getSocialProfile("6066").then(function(accountID){
	console.log("id:" + accountID );
	// sendMessage(accountID, "Hello: " + accountID);

	});

