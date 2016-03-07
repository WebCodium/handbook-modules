var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var config = require('./config');

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'))

app.use("/docs", express.static(__dirname + "/docs"));
app.use("/public", express.static(__dirname + "/public"));
app.use("/dist", express.static(__dirname + "/dist"));
app.use("/bower_components", express.static(__dirname + "/bower_components"));
app.use("/vendor", express.static(__dirname + "/vendor"));

app.use(methodOverride());

app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

require('./routes')(app);

var port = process.env.PORT ? process.env.PORT : config.get('port');
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});