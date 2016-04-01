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
     * @param {Object} data - post options
     */
    // save address
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

    // cancel all changes
    /**
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
     * @param {integer} id - id of address
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
     * @param {Object} data - object of user skill
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
     * @param {integer} id - id of address
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