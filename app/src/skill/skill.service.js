/**
 * @memberof skill
 * @name SkillService
 * @ngdoc service
 * @description
 * Service for skill module
 * @param $http {service} Angular service
 * @param constantSkill {constants} Configs for module
 * @param $q {service} Angular service
 */
angular
    .module('app.skill')
    .service('SkillService', SkillService);

/**
 * @namespace
 * @ignore
 */
SkillService.$inject = ['$http', 'constantSkill', '$q'];
function SkillService($http, configs, $q) {
    this.getSkills = getSkills;
    this.setSkill = setSkill;
    this.deleteSkill = deleteSkill;
    this.setUserSkill = setUserSkill;
    this.getUserSkills = getUserSkills;
    this.deleteUserSkill = deleteUserSkill;

    ////////////////

    /**
     * Save skill
     * @param {Object} data - Skill object
     * @returns {promise} Angular promise
     */
    function setSkill(data) {
        var deferred = $q.defer();
        var addressURL = configs.urls.set;

        $http
            .post(addressURL, data)
            .success(function(){
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function(){
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Get all skills
     * @returns {promise} Angular promise
     */
    function getSkills() {
        var deferred = $q.defer();
        var addressURL = configs.urls.get;

        $http
            .get(addressURL)
            .success(function(){
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function(){
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Delete skill by id
     * @param {integer} id - id of address
     * @returns {promise} Angular promise
     */
    function deleteSkill(id) {
        var deferred = $q.defer();
        var skillDeleteURL = configs.urls.delete + id;

        $http
            [configs.deleteMethod](skillDeleteURL)
            .success(function(){
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function(){
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Get all user skills
     * @returns {promise} Angular promise
     */

    function getUserSkills() {
        var deferred = $q.defer();
        var addressURL = configs.urls.getUser;

        $http
            .get(addressURL)
            .success(function(){
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function(){
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Save user skill
     * @param {Object} data - object of user skill
     * @return {promise} Angular promise
     */
    function setUserSkill(data) {
        var deferred = $q.defer();
        var addressURL = configs.urls.setUser;

        $http
            .post(addressURL, data)
            .success(function(){
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function(){
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Delete user skill by id
     * @param {integer} id - id of address
     * @returns {promise} Angular promise
     */
    function deleteUserSkill(id) {
        var deferred = $q.defer();
        var skillDeleteURL = configs.urls.deleteUser + id;

        $http
            [configs.deleteMethod](skillDeleteURL)
            .success(function(){
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function(){
                deferred.reject(err);
            });

        return deferred.promise;
    }
}