var mongoose = require('../app/mongoose');

// define model =================
var schema = new mongoose.Schema({
    title: 'string',
    state: 'string',
    city: 'string',
    zipcode: 'string',
    address: 'string',
    lat: 'number',
    lng: 'number'
});

exports.Address = mongoose.model('Address', schema);