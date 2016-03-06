var Address = require('../models/address').Address;
var extend = require('extend');

exports.get = function (req, res) {
    // use mongoose to get all todos in the database
    Address.find(function (err, addresses) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(addresses); // return all todos in JSON format
    });
};
exports.post = function (req, res) {
    Address.findById(req.body._id, function (err, address) {
        if (address) {
            extend(address, req.body);
        }
        else {
            address = new Address(req.body);
        }

        address.save(function (err, address) {
            if (err)
                res.send(err);
            else
                res.json(address);
        });
    });
};
exports.delete = function (req, res) {
    Address.remove({
        _id: req.params.address_id
    }, function (err, todo) {
        if (err)
            res.send(err);
        else
            res.sendStatus(200);
    });
};
