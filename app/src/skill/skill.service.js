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
        return $http.post(configs.urls.set, data);
    }

    /**
     * Get all skills
     * @returns {promise} Angular promise
     */
    function getSkills() {
        return $http.get(configs.urls.get);
    }

    /**
     * Delete skill by id
     * @param {integer} id - id of address
     * @returns {promise} Angular promise
     */
    function deleteSkill(id) {
        return $http[configs.deleteMethod](configs.urls.delete + id);
    }

    /**
     * Get all user skills
     * @returns {promise} Angular promise
     */

    function getUserSkills() {
        return $http.get(configs.urls.getUser);
    }

    /**
     * Save user skill
     * @param {Object} data - object of user skill
     * @return {promise} Angular promise
     */
    function setUserSkill(data) {
        return $http.post(configs.urls.setUser, data);
    }

    /**
     * Delete user skill by id
     * @param {integer} id - id of address
     * @returns {promise} Angular promise
     */
    function deleteUserSkill(id) {
        return $http[configs.deleteMethod](configs.urls.deleteUser + id);
    }
}