var app = require('express')();
var http = require('http');
var wechat = require('./SendWechatMessage');
var weibo = require('./sendWeiboModule');
var config = require('./mcConfig.js');

var server = http.createServer(app);
var port = 3000;
console.log("http server listens on port: " + port);

server.listen(port);

app.get('/', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  var response = "Hello World";
  res.send(response);
});

// req.query.name
// GET /wechat?textFromKyma=0926xxx572
app.get('/wechat', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  var textFromKyma = req.query.textFromKyma;
  wechat(config.sendToUser, textFromKyma, function(data){
     var response = "response from Wechat server:" + data.errmsg;
     res.send(response);
  }); 
});

// GET /weibo?textFromKyma=0926xxx572
app.get('/weibo', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var textFromKyma = req.query.textFromKyma;
    weibo(textFromKyma, function(data){
       var response = "response from weibo:" + data;
       res.send(response);
    }); 
});