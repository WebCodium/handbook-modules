/**
 * @memberof panels
 * @name panel-default
 * @ngdoc directive
 * @param  {transclude} panel-header   Multi-slot transclusion
 * @param  {transclude} panel-body   Multi-slot transclusion
 * @restrict E
 * @description
 * Displays default panel
 */

angular
    .module('app.panel')
    .directive('panel', panel);

panel.$inject = [];
function panel() {
    var directive = {
        link: link,
        restrict: 'E',
        transclude: {
            'header': '?panelHeader',
            'body': '?panelBody'
        },
        replace: true,
        templateUrl: 'panel.template.html'
    };
    return directive;
    /**
     * Initialize panel and events
     * @memberof panel-default
     * @param {service} scope the scope of this element
     * @param {service} element element that this direcive is assigned to
     * @param {service} attrs attribute of this element
     * @param {MapController} ctrl map controller
     */
    function link(scope, element, attrs) {

    }
}