var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '10tinogu',
    database: 'events'
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'a.ivanova.lviv@gmail.com',
        pass: '10tinogu'
    }
});

router.post('/notification', function(req, res) {
    console.log('POST Request :: /sendMail: ');
    pool.getConnection(function(err, connection) {
        connection.query("Select email FROM user", function(err, rows, fields) {
            for (k in rows) {
                var mailOptions = {
                    from: 'a.ivanova.lviv@gmail.com',
                    to: rows[k].email,
                    subject: req.body.subject,
                    text: req.body.text
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        });

    });
    res.json("Ви надіслали листи всім користувачам");
});

module.exports = router;
