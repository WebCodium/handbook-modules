/**
 * @memberof skill
 * @name skillChangeController
 * @ngdoc controller
 * @description
 * Controller for changing skill skill module
 */
angular
    .module('app.address')
    .controller('SkillChangeController', SkillChangeController);

/**
 * @namespace
 * @ignore
 */
SkillChangeController.$inject = ['$scope', 'SkillService'];
function SkillChangeController($scope, SkillService) {
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

    SkillService.getSkills(skillsReady);
    SkillService.getUserSkills(skillsUserReady);

    vm.slider = {
        options: {
            stop: stopSlider
        }
    };

    $scope.$watch('vm.userSkills', function (value) {
        vm.userSkillsTitle.length = 0;
        angular.forEach(value, function (item) {
            this.push(item.title);
        }, vm.userSkillsTitle);
    }, true);

    function skillsReady(items) {
        vm.skills = [];
        angular.forEach(items, function (item) {
            this.push(item);
        }, vm.skills);
    }

    function skillsUserReady(items) {
        vm.userSkills = [];
        angular.forEach(items, function (item) {
            this.push(item);
        }, vm.userSkills);
    }

    function addUserSkill() {
        vm.isNotSelected = false;
        if (!vm.skillSelected) {
            vm.isNotSelected = true;
            return false;
        }
        //additional check on exists the adding skill in list user's skills
        if (vm.userSkillsTitle.indexOf(vm.skillSelected) !== -1) {
            vm.isDuplicate = true;
            return false;
        }
        var index = vm.userSkills.length;
        var skill = {
            title: vm.skillSelected,
            level: 0
        };
        saveUserSkill(skill, function (data) {
            vm.userSkills[index] = data;
            vm.skillSelected = null;
        });
    }

    function removeUserSkill(index) {
        var skill = vm.userSkills[index];
        SkillService.deleteUserSkill(skill._id, function () {
            vm.userSkills.splice(index, 1);
            vm.skillSelected = vm.skillSelected ? null : {};
            console.log('removed');
        });
    }

    function checkDisabled(item) {
        return vm.userSkillsTitle.indexOf(item.title) !== -1;
    }

    function saveUserSkill(skill, cb) {
        SkillService.setUserSkill(skill, cb);
    }

    function stopSlider(event, ui) {
        var index = ui.handle.parentNode.getAttribute('data-index');
        saveUserSkill(vm.userSkills[index], function (data) {
            vm.userSkills[index] = data;
        });
    }
}