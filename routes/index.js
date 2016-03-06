module.exports = function (app) {
    //index router
    app.get('/', require('./frontpage').get);

    //address's routers
    app.get('/server/address', require('./address').get);
    app.post('/server/address', require('./address').post);
    // delete an address
    app.delete('/server/address/:address_id', require('./address').delete);
};