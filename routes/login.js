var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10tinogu',
    database: 'events'
});

var app = express.Router();

app.use(express.static(__dirname + "/"));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

module.exports = app;
app.get('/views/home', function(request, response) {
	if (request.session.loggedin) {
		res.sendFile(__dirname + 'profile.html');
	} else {
		response.send('Ввійдіть, щоб побачити цю сторінку!');
	}
	response.end();
});
