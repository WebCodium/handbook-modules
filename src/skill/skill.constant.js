/**
 * @memberof address
 * @name Configs
 * @ngdoc constant
 * @description
 * Configs for skill module
 */
angular
    .module('app.skill')
    .constant('constantSkill', {
        urls: {
            get: '/server/skill',
            set: '/server/skill',
            delete: '/server/skill/',
            setUser: '/server/user/skill',
            getUser: '/server/user/skill',
            deleteUser: '/server/user/skill/'
        },
        deleteMethod: 'delete',
        levels: 5,
        height: 26,
        colorLevels: ['#dadada', '#cbcbcb', '#b8b8b8', '#a4a4a4', '#979797'],
        textLevels: ['Very Low', 'Low', 'Medium', 'High', 'Very high']
    });