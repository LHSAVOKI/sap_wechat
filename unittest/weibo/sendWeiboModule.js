var config = require("./mcConfig.js");
var request = require("request");

function sendWCMeaasge(content, callback){

    var postData = {
        location:"v6_content_home",
        text: content,
        style_type:"1",
        isReEdit:false,
        module:"stissue",
        pub_source:"main_",
        pub_type:"dialog",
        isPri:0,
        _t:0
    };

    var options = {
            url: "https://www.weibo.com/aj/mblog/add?ajwvr=6&__rnd=1564468131832",
            method: "POST",
            headers: {
                "cookie": config.cookie,
                "origin": "https://www.weibo.com",
                "referer": "https://www.weibo.com/abap/home?wvr=5",
                "content-type": "application/x-www-form-urlencoded"
            },
            form: postData
          };
      request(options,function(error,response,data){
          // console.log(data);
          if( !!data){
              var oResponse = JSON.parse(data);
              callback(oResponse.code);
          }
      });
  }

module.exports = sendWCMeaasge;
