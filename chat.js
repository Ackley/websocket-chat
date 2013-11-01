var express = require('express');
var redis = require('redis');

var db = redis.createClient();
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
