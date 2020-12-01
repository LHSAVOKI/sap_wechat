var app = require('express')();
var fs    = require('fs');
var https = require('https');

var httpOptions =  {
  pfx: fs.readFileSync('keys/1.pfx'),
  passphrase: '1'
};

var server = https.createServer(httpOptions, app);
var io = require('socket.io')(server);

console.log("https server listens on port 8080...");

server.listen(8080);

function print_env(){
  console.log(process.env);
}

app.get('/', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  var response = "Hello World";
  res.send(response);
});

app.get('/env', function (req, res) {

  print_env();
  // res.sendFile(__dirname + '/index.html');
  var response = JSON.stringify(process.env);
  res.send(response);
});

app.get('/redis', function (req, res) {

  var redisClient = require("./redisClient");
  
  function callback(response){
  	// var response = "ok";//JSON.stringify(process.env);
  	res.send(response);
  }
  redisClient.test(callback);
});

io.on('connection', function (socket) {
  console.log("connect comming from client: " + socket.id);
  socket.emit('messages_jerry', { hello: 'world greeting from Server!' });
  socket.on('messages', function (data) {
    console.log("data received from Client:" + JSON.stringify(data,2,2));
  });
});