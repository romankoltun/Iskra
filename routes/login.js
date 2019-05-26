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

//app.get('/', (request, response) => response.render('login'));

/*app.post('/views/auth', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var permission_id;
  if (username && password) {
    console.log('POST Request :: /views/auth');
    connection.query('SELECT * FROM events.user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        request.session.loggedin = true;
        request.session.username = username;
        request.session.permission_id = results[0].permission_id;
        response.redirect('/');
      } else {
        response.send('Неправильний логін або пароль!');
      }
      response.end();
    });
  } else {
    response.send('Будь-ласка, введіть пароль і логін!');
    response.end();
  }
});*/

module.exports = app;
app.get('/views/home', function(request, response) {
	if (request.session.loggedin) {
		res.sendFile(__dirname + 'profile.html');
	} else {
		response.send('Ввійдіть, щоб побачити цю сторінку!');
	}
	response.end();
});
