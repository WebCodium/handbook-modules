/**
 * @memberof skill
 * @name constantSkill
 * @ngdoc constant
 * @description
 * Configs for skill module
 * @property {Object} urls Object for get, save and delete skills
 * @property {String} urls.get Url for getting skills
 * @property {String} urls.set Url for saving skill
 * @property {String} urls.delete Url for deleting skill
 * @property {String} deleteMethod Delete method for delete skill, by default `delete`
 * @property {String} levels Count of parts for skill
 * @property {String} height Height for range of skill
 * @property {Array} colorLevels Array of colors for each level
 * @property {Array} textLevels Array of texts for each level
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