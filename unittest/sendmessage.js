var sendMessage = require("../jerryapp/service/postMessageToUser.js");
var config = require("../config.js");

sendMessage("o0KlM1i2_4-zHRmDk-IWGRlA1Cjc", "这条消息是用nodejs发送的！");
//sendMessage(config.testAccount, "Dear customer, thank you for contact C4C support center. We have received your message ID 59189 and currently working on it.");