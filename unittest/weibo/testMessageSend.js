var tool = require("./SendWeiboModule.js");
var config = require("./mcConfig.js");

tool("这是Jerry发送的一条测试微博", function(code){
    console.log("response from Weibo: " + code);
});