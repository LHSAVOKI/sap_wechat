// #!/usr/bin/env node
const io = require('socket.io-client');
var socket = io.connect('http://localhost:8880');

socket.on('messages_jerry', function (data) {
    console.log("data sent from Server:" + JSON.stringify(data,2,2));
    socket.emit('messages', { my: 'data sent from Client' });
  });

socket.on('connect', function (socket2) {
    console.log('Connection with Server established!');
        socket.emit('messages', 'Client has established connection with Server');
});