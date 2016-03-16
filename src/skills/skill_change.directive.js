/**
 * @memberof skills
 * @name skill-change
 * @ngdoc directive
 * @restrict EA
 * @description
 * Change skill's rating
 */

angular
    .module('app.skills')
    .directive('skill-change', skillChange);

skillChange.$inject = [];
function skillChange() {
    var directive = {
        link: link,
        restrict: 'EA',
        scope: {},
        templateUrl: 'skill_change.template.html'
    };
    return directive;

    function link(scope, element, attrs, ctrl) {

    }
}