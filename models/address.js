var mongoose = require('../db/mongoose');

// define model =================
var schema = new mongoose.Schema({
    title: 'string',
    state: 'string',
    city: 'string',
    zipcode: 'string',
    address: 'string',
    latLng: 'string'
});

exports.Address = mongoose.model('Address', schema);