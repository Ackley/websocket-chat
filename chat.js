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
    
});

app.listen(3000);
console.log("PORT:3000");