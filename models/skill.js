var mongoose = require('../app/mongoose');

// define model =================
var schema = new mongoose.Schema({
    title: 'string'
});

exports.Skill = mongoose.model('Skill', schema);