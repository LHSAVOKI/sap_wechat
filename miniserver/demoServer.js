var app = require('express')();
// const bodyParser = require('body-parser');
// app.use(bodyParser);

var server = require('http').Server(app);
var io = require('socket.io')(server);
var defaultPort = 3001;

var port = process.env.PORT || defaultPort;
var i = 0;

console.log("Server is listening on port: " + defaultPort);
server.listen(port);

function print_env(){
  console.log(process.env);
}

app.get('/metrics', function (req, res) {
 
    var response = `HelloWorld{cpu="post"} ${i++}`;
    res.send(response);
});

app.get('/*', function (req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  console.log("remote: " + req.socket.remoteAddress + ":" + req.socket.remotePort);
  var response = "Hello World: " + port + " custom variable: " + process.env.my_env_var;
  res.send(response);
  // res.status(500).send('Something broke!');
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