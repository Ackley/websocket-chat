var express = require('express');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());

app.post('/post_message', function(req, res){
    var name = "";
    var message = "";
    
    if(req.body.name)
	name = req.body.name;
    if(req.body.message)
	message = req.body.message;

    //key:value, key:value
    db.rpush('chat-log', JSON.stringify({name: name, message: message}));
    console.log(name + " " + message);
    res.send(JSON.stringify({result: "success"}));
});

app.get('/get_all_message', function(req, res){
    console.log("aaa");
    db.lrange("chat-log", 0, 100, function(err, logs){
	var tmp = [];
	logs.forEach(function(log){
	    tmp.push(log);
	});
	console.log(JSON.stringify(tmp));
	res.send(JSON.stringify(tmp));
    });
});

app.listen(3000);
console.log("PORT:3000");