/**
 * @memberof skill
 * @name SkillCreateRemoveController
 * @ngdoc controller
 * @description
 * Controller for manage skill
 */
angular
    .module('app.skill')
    .controller('SkillCreateRemoveController', SkillCreateRemoveController);

/**
 * @namespace
 * @ignore
 */
SkillCreateRemoveController.$inject = ['SkillService', '$log', '$scope', '$q'];
function SkillCreateRemoveController(SkillService, $log, $scope, $q) {
    /**
     * @namespace
     * @ignore
     */
    var vm = this;

    SkillService
        .getSkills()
        .then(skillReady, function (err) {
            $log.error(err);
        });

    vm.createSkill = createSkill;
    vm.removeSkill = removeSkill;

    /**
     * get skills
     * @param {Array} items - Array of skill
     */
    function skillReady(response) {
        vm.skills = [];
        angular.forEach(response.data, function (item) {
            this.push(item);
        }, vm.skills);
        vm.skillsLength = vm.skills.length;
    }

    /**
     * Create skill
     * @param {String} nameSkill - Skill name
     * @returns {promise} Angular promise
     */
    function createSkill(nameSkill) {
        var deferred = $q.defer();
        vm.submitted = true;
        if (!nameSkill)
            return;
        for (var i in vm.skills) {
            skill = vm.skills[i];
            if (skill.title === nameSkill) {
                vm.isDuplicate = true;
                return false;
            }
        }
        var index = vm.skillsLength++;
        var skill = {title: nameSkill};
        // send on server
        SkillService
            .setSkill(skill)
            .then(function (response) {
                vm.skills[index] = response.data;
                vm.nameSkill = '';
                vm.isDisabled = false;
                vm.submitted = false;
                deferred.resolve(response);
            }, function (err) {
                $log.error(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    /**
     *
     * @param {Integer} index - Id of skill (at front)
     * @returns {promise} Angular promise
     */
    function removeSkill(index) {
        var deferred = $q.defer();
        var skill = vm.skills[index];
        SkillService
            .deleteSkill(skill._id)
            .then(function () {
                vm.skills.splice(index, 1);
                deferred.resolve(index);
            }, function (err) {
                $log.error(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    $scope.$watch('vm.nameSkill', function () {
        vm.isDuplicate = false;
        vm.submitted = false;
    });
}