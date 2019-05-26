var express = require('express');
var app = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10tinogu',
    database: 'events'
});

app.use(express.static(__dirname + "/"));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = app;
