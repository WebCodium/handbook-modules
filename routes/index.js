module.exports = function (app) {
    //index router
    app.get('/', require('./frontpage').get);

    //address's routers
    app.get('/server/address', require('./address').get);
    app.post('/server/address', require('./address').post);
    // delete an address
    app.delete('/server/address/:address_id', require('./address').delete);

    //skills's routers
    app.get('/server/skill', require('./skill').get);
    app.post('/server/skill', require('./skill').post);
    // delete an address
    app.delete('/server/skill/:skill_id', require('./skill').delete);

    //skills's routers for user
    app.get('/server/user/skill', require('./skill').getUserSkills);
    app.post('/server/user/skill', require('./skill').postUserSkill);
    // delete an address
    app.delete('/server/user/skill/:skill_id', require('./skill').deleteUserSkill);
};