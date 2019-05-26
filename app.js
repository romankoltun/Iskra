var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
var session = require('express-session');
var multer  = require('multer');


app.use(bodyParser.urlencoded({ extended: true }));
//STATIC FILES
app.use(express.static(__dirname + "/"));
app.use(bodyParser.json());


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10tinogu',
    database: 'events'
});

var pool = mysql.createPool({
    connectionLimit: 25,
    host: 'localhost',
    user: 'root',
    password: '10tinogu',
    database: 'events',
    port: '3000'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', function (request, response) {

    console.log('Who you are?');
    if (request.session.permission_id) {
        if (request.session.permission_id == 1) {
            console.log('admin');
            response.sendFile(__dirname + '/views/adminmap.html');
        }
        else if (request.session.permission_id == 3) {
            console.log('user');
            response.sendFile(__dirname + '/views/map.html');
        }
    }
    else {
        console.log('guest');
        response.sendFile(__dirname + '/views/guestmap.html');
    }
});
//app.get('/profile', (req, res) => res.render('profile'));

app.post('/views/auth', function(request, response) {
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
});

app.get('/views/logOut', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

app.post('/views/register', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var email = req.body.email;
    var data = {
        "error": 1,
        "products": ""
    };
    console.log('POST Request :: /views/auth');
    if (!!password && !!username && !! email) {
        connection.query("INSERT INTO events.user SET password = ?, username=?, email=?", [password, username, email], function(err, rows, fields) {

          req.session.loggedin = true;
          req.session.username = username;
          req.session.permission_id = 3;
          console.log("Added: " + [password, username]);
          res.redirect('http://localhost:3000');
        });
    };
});

app.get('/views/profile', function(req, res) {
    var data = {
        "error": 1,
        "user": ""
    };
    connection.query('SELECT * FROM events.user WHERE username = ?', [req.session.username], function(err, rows, fields) {
        data['user'] = rows;
        res.json(data);
        console.log(req.session.username + " " + rows);
    });
});

app.get('/views/permission',function(req,res){
    var perm = req.session.permission_id;
    console.log( req.session.permission_id);
    res.json(perm);
});


app.get('/views/getAllUsers', function (req, res) {
  console.log("GET Request :: /getAllUsers");
    var data = {
        "error": 1,
        "events": ""
    };

        connection.query('SELECT username FROM user', function(err, rows, fields) {

console.log(fields);
                data["error"] = 0;
                data["events"] = rows;
                res.json(data);

        });

});

var server = app.listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("dummy app listening at: " + host + ":" + port);
})
var storage = multer.diskStorage({
  destination: './public/images/avatars/',
  filename: function (req, file, cb) {
      cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  }
});
var upload = multer({
  storage: storage,
  limits: {fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file');

//app.post('/multer', upload.single('file'));
