var express = require('express');
var bodyParser = require('body-parser');
var connection = require('./database').db_connection;
var app = express();
var sql = require('mssql');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/signup.js', urlencodedParser, function(req, res) {

    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var email= req.body.email;
    var password= req.body.password;

    sql.connect(connection).then(function() {
        console.log('opening connection');
        new sql.Request().query("Insert into contributor values (first_name,last_name,email,password) values('"+first_name+"','"+last_name+"','"+email+"','"+password+"'").then(function(recordset) {
            console.dir("success");

        }).catch(function(error) {

        });
    });

})
