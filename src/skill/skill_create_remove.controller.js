/**
 * @memberof skill
 * @name SkillCreateRemoveController
 * @ngdoc controller
 * @description
 * Controller for changing skill skill module
 */
angular
    .module('app.skill')
    .controller('SkillCreateRemoveController', SkillCreateRemoveController);

/**
 * @namespace
 * @ignore
 */
SkillCreateRemoveController.$inject = ['SkillService'];
function SkillCreateRemoveController(SkillService) {
    /**
     * @namespace
     * @ignore
     */
    var vm = this;

    //get skills
    SkillService.getSkills(skillReady);

    vm.createSkill = createSkill;
    vm.removeSkill = removeSkill;

    function skillReady(items) {
        vm.skills = [];
        angular.forEach(items, function (item) {
            this.push(item);
        }, vm.skills);
        vm.skillsLength = vm.skills.length;
    }

    function createSkill() {
        vm.isDuplicate = false;
        if (!vm.nameSkill)
            return;
        for (var i in vm.skills) {
            skill = vm.skills[i];
            if (skill.title === vm.nameSkill) {
                vm.isDuplicate = true;
                return false;
            }
        }
        var index = vm.skillsLength++;
        var skill = {title: vm.nameSkill};
        // send on server
        SkillService.setSkill(skill, function (data) {
            vm.skills[index] = data;
            vm.nameSkill = '';
        });
    };
    function removeSkill(index) {
        var skill = vm.skills[index];
        SkillService.deleteSkill(skill._id, function () {
            vm.skills.splice(index, 1);
            console.log('removed');
        });
    }
}