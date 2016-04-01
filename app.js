var express = require('express');
var app = express();
var http = require('http');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var config = require('./config');

app.set('view engine', 'jade');

app.use("/public", express.static(__dirname + "/public"));
app.use("/app", express.static(__dirname + "/app"));

app.use(methodOverride());

app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

require('./routes')(app);

var port = process.env.PORT ? process.env.PORT : config.get('port');
app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});