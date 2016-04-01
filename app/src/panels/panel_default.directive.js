/**
 * @memberof panels
 * @name panel-default
 * @ngdoc directive
 * @restrict E
 * @description
 * Displays default panel
 * @attr {Transclude} panelHeader Multi-slot transclusion
 * [See angular documentation](https://docs.angularjs.org/api/ng/directive/ngTransclude#multi-slot-transclusion)
 * @attr {Transclude} panelBody Multi-slot transclusion
 * [See angular documentation](https://docs.angularjs.org/api/ng/directive/ngTransclude#multi-slot-transclusion)
 * @example
 * <panel>
 *  <panel-header>
 *      Content of header
 *  </panel-header>
 *  <panel-body>
 *      Content of body
 *  </panel-body>
 * </panel>
 */
angular
    .module('app.panels')
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
        templateUrl: 'panel_default.template.html'
    };
    return directive;
    function link(scope, element, attrs) {

    }
}