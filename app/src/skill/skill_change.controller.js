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
SkillChangeController.$inject = ['$scope', 'SkillService', 'constantSkill', '$q', '$log'];
function SkillChangeController($scope, SkillService, configs, $q, $log) {
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

    function skillsReady(items) {
        vm.skills = [];
        angular.forEach(items, function (item) {
            this.push(item);
        }, vm.skills);
        vm.skillSelected = null;
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
        saveUserSkill(skill)
            .then(function (data) {
                vm.userSkills[index] = data;
                vm.skillSelected = null;
            });
    }

    function removeUserSkill(index) {
        var skill = vm.userSkills[index];
        SkillService
            .deleteUserSkill(skill._id)
            .then(function () {
                vm.userSkills.splice(index, 1);
                $log.info('removed');
            }, function () {
                $log.error(err);
            });
    }

    function checkDisabled(item) {
        return vm.userSkillsTitle.indexOf(item.title) !== -1;
    }

    function saveUserSkill(skill) {
        var deferred = $q.defer();
        SkillService
            .setUserSkill(skill)
            .then(function () {
                deferred.resolve.apply(deferred, arguments);
            }, function () {
                $log.error(err);
            });
        return deferred.promise;
    }

    function stopSlider(event, ui) {
        var parent = angular.element(ui.handle).parent();
        var index = parent.data('index');
        var scope = parent.scope();
        scope.$apply(function () {
            scope.leftSkill = '';
            scope.rightSkill = '';
        });
        saveUserSkill(vm.userSkills[index])
            .then(function (data) {
                vm.userSkills[index] = data;
            });
    }

    function slide(event, ui) {
        var scope = angular.element(ui.handle).parent().scope();
        scope.$apply(function () {
            scope.leftSkill = configs.textLevels[ui.value - 1];
            scope.rightSkill = configs.textLevels[ui.value];
        });
    }
}