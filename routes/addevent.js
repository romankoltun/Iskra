var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
    database: 'events'
    port: '3306'
});
