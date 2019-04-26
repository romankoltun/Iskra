var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');


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

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', function (req, res) {
    console.log('Who you are?');
        res.sendFile(__dirname + '/index.html');
});

app.get('/getAllEvents', function (req, res) {
  console.log("GET Request :: /getAllEvents");
    var data = {
        "error": 1,
        "events": ""
    };

        connection.query('SELECT * FROM event', function(err, rows, fields) {

console.log(fields);
                data["error"] = 0;
                data["events"] = rows;
                res.json(data);

        });

});

var server = app.listen(8081, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("dummy app listening at: " + host + ":" + port);
})
