/**
 * @memberof skills
 * @name skill-default
 * @ngdoc directive
 * @param  {service} $timeout     Angular window.setTimeout wrapper
 * @restrict EA
 * @description
 * Displays skill's rating
 */

angular
    .module('app.skills')
    .directive('skills', skills);

skills.$inject = [];
function skills() {
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