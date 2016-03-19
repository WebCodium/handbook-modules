/**
 * @memberof skill
 * @name skill-default
 * @ngdoc directive
 * @param  {service} $timeout     Angular window.setTimeout wrapper
 * @restrict EA
 * @description
 * Displays skill's rating
 */

angular
    .module('app.skill')
    .directive('skill', skill);

skill.$inject = [];
function skill() {
    var directive = {
        link: link,
        restrict: 'EA',
        scope: {},
        templateUrl: 'skill_default.template.html'
    };
    return directive;

    function link(scope, element, attrs, ctrl) {

    }
}