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
        scope: {}
    };
    return directive;

    /**
     * Initialize skills and events
     * @memberof skill-default
     * @param {service} scope the scope of this element
     * @param {service} element element that this direcive is assigned to
     * @param {service} attrs attribute of this element
     * @param {MapController} ctrl map controller
     */
    function link(scope, element, attrs, ctrl) {

    }
}