var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var redis = require('redis');

var sub = redis.createClient();

server.listen(8888);

io.sockets.on('connection', function (socket) {
    sub.subscribe('receive-message');
    sub.on('message', function(channel, message){
	console.log(channel + " " + message);
	socket.emit('reload', message);
    });
});
