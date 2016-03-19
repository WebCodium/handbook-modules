var mongoose = require('../app/mongoose');

// define model =================
var schema = new mongoose.Schema({
    title: 'string',
    level: 'number'
});

exports.UserSkill = mongoose.model('UserSkill', schema);