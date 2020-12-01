var getSocialMessage = require('../jerryapp/service/getSocialMediaActivity.js');

getSocialMessage("1003", function(profileID){
	console.log("id: " + profileID);
});
