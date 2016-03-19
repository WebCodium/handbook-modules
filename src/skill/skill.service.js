/**
 * @memberof skill
 * @name SkillService
 * @ngdoc service
 * @description
 * Service for skill module
 * @param $http {service} Angular service
 * @param constantSkill {constants} Configs for module
 */
angular
    .module('app.skill')
    .service('SkillService', SkillService);

/**
 * @namespace
 * @ignore
 */
SkillService.$inject = ['$http', 'constantSkill'];
function SkillService($http, configs) {
    this.getSkills = getSkills;
    this.setSkill = setSkill;
    this.deleteSkill = deleteSkill;
    this.setUserSkill = setUserSkill;
    this.getUserSkills = getUserSkills;
    this.deleteUserSkill = deleteUserSkill;

    ////////////////

    /**
     * @param {Object} data - post options
     * @param {function} onReady - callback on success
     * @param {function} [onError] - callback on error
     */
    // save address
    function setSkill(data, onReady, onError) {
        var addressURL = configs.urls.set;

        onError = onError || function () {
                alert('Failure saving skill');
            };

        $http
            .post(addressURL, data)
            .success(onReady)
            .error(onError);
    }

    // cancel all changes
    /**
     * @param {function} onReady - callback on success
     * @param {function} [onError] - callback on error
     */
    function getSkills(onReady, onError) {
        var addressURL = configs.urls.get;

        onError = onError || function () {
                alert('Failure loading skills');
            };

        $http
            .get(addressURL)
            .success(onReady)
            .error(onError);
    }

    /**
     * @param {integer} id - id of address
     * @param {function} onReady - callback on success
     * @param {function} [onError] - callback on error
     */
    function deleteSkill(id, onReady, onError) {
        var skillDeleteURL = configs.urls.delete + id;

        onError = onError || function () {
                alert('Failure delete skill');
            };

        $http
            [configs.deleteMethod](skillDeleteURL)
            .success(onReady)
            .error(onError);
    }

    function getUserSkills(onReady, onError) {
        var addressURL = configs.urls.getUser;

        onError = onError || function () {
                alert('Failure loading skills');
            };

        $http
            .get(addressURL)
            .success(onReady)
            .error(onError);
    }

    function setUserSkill(data, onReady, onError) {
        var addressURL = configs.urls.setUser;

        onError = onError || function () {
                alert('Failure saving skill for user');
            };

        $http
            .post(addressURL, data)
            .success(onReady)
            .error(onError);
    }

    function deleteUserSkill(id, onReady, onError) {
        var skillDeleteURL = configs.urls.deleteUser + id;

        onError = onError || function () {
                alert('Failure delete user skill');
            };

        $http
            [configs.deleteMethod](skillDeleteURL)
            .success(onReady)
            .error(onError);
    }
}