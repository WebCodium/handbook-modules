var mongoose = require('mongoose');
var config = require('../config');

var db = mongoose.connection;
db.on('open', function () {
    console.log('DB connected');
});

mongoose.connect(config.get('mongoose:uri'), config.get('mongoose:options'));

module.exports = mongoose;