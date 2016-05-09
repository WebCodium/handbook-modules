/**
 * @memberof skill
 * @name SkillChangeController
 * @ngdoc controller
 * @description
 * Controller for manage user skill
 */
angular
    .module('app.address')
    .controller('SkillChangeController', SkillChangeController);

/**
 * @namespace
 * @ignore
 */
SkillChangeController.$inject = ['$scope', 'SkillService', 'constantSkill', '$q', '$log', '$filter'];
function SkillChangeController($scope, SkillService, configs, $q, $log, $filter) {
    /**
     * @namespace
     * @ignore
     */
    var vm = this;

    vm.userSkillsTitle = [];
    vm.radioFilterSkills = null;
    vm.addUserSkill = addUserSkill;
    vm.removeUserSkill = removeUserSkill;
    vm.checkDisabled = checkDisabled;

    SkillService
        .getSkills()
        .then(skillsReady, function () {
            $log.error(err);
        })
        .then(SkillService.getUserSkills)
        .then(skillsUserReady, function () {
            $log.error(err);
        });

    vm.slider = {
        options: {
            stop: stopSlider,
            slide: slide
        }
    };

    $scope.$watch('vm.userSkills', function (value) {
        vm.userSkillsTitle.length = 0;
        angular.forEach(value, function (item) {
            this.push(item.title);
        }, vm.userSkillsTitle);
    }, true);

    /**
     * Callback on getting all skills
     * @param items {Array} Array of skill
     */
    function skillsReady(response) {
        vm.skills = [];
        angular.forEach(response.data, function (item) {
            this.push(item);
        }, vm.skills);
        vm.skillSelected = null;
    }

    /**
     * Callback on getting user's skills
     * @param items {Array} Array of user skills
     */
    function skillsUserReady(response) {
        vm.userSkills = [];
        angular.forEach(response.data, function (item) {
            this.push(item);
        }, vm.userSkills);
    }

    /**
     * Add user skill
     * @param {String} skillSelected - Name of skill
     */
    function addUserSkill(skillSelected) {
        vm.isNotSelected = false;
        if (!skillSelected) {
            vm.isNotSelected = true;
            return false;
        }
        //additional check on exists the adding skill in list user's skills
        if (vm.userSkillsTitle.indexOf(skillSelected) !== -1) {
            vm.isDuplicate = true;
            return false;
        }
        var index = vm.userSkills.length;
        var skill = {
            title: skillSelected,
            level: 0
        };
        saveUserSkill(skill)
            .then(function (response) {
                vm.userSkills[index] = response.data;
                vm.skillSelected = null;
            });
    }

    /**
     * Remove user skill
     * @param {integer} index - Id of skill (at front)
     * @returns {promise} Angular promise
     */
    function removeUserSkill(index) {
        var deferred = $q.defer();
        var skill = vm.userSkills[index];
        SkillService
            .deleteUserSkill(skill._id)
            .then(function () {
                vm.userSkills.splice(index, 1);
                deferred.resolve(index);
            }, function () {
                $log.error(err);
                deferred.reject(err);
            });
        return deferred.promise;
    }

    /**
     * Check on disabled
     * @param item {Object} Object of skill
     */
    function checkDisabled(item) {
        return vm.userSkillsTitle.indexOf(item.title) !== -1;
    }

    /**
     * @param {Object} skill - Object user skill
     * @returns {promise} Angular promise
     */
    function saveUserSkill(skill) {
        return SkillService.setUserSkill(skill);
    }

    /**
     * Callback on stopping slider
     * @param {Event} event - [See more](http://api.jqueryui.com/slider/#event-slide)
     * @param {Object} ui - [See more](http://api.jqueryui.com/slider/#event-slide)
     */
    function stopSlider(event, ui) {
        var parent = angular.element(ui.handle).parent();
        var scope = parent.scope();
        var index = scope.$parent.$index;
        var filteredSkills = $filter('orderBy')(vm.userSkills, vm.radioFilterSkills);
        scope.$apply(function () {
            scope.leftSkill = '';
            scope.rightSkill = '';
        });
        saveUserSkill(filteredSkills[index])
            .then(function (response) {
                filteredSkills[index] = response.data;
            });
    }

    /**
     * Callback on every mouse move during slide
     * @param {Event} event - [See more](http://api.jqueryui.com/slider/#event-slide)
     * @param {Object} ui - [See more](http://api.jqueryui.com/slider/#event-slide)
     */
    function slide(event, ui) {
        var scope = angular.element(ui.handle).parent().scope();
        scope.$apply(function () {
            scope.leftSkill = configs.textLevels[ui.value - 1];
            scope.rightSkill = configs.textLevels[ui.value];
        });
    }
}