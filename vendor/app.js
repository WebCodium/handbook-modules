(function() {
'use strict';

/**
 *
 * Handbook Modules - Bootstrap + AngularJS
 *
 * Version: 1.0.0
 * Author: @yuraL_webcodium
 *
 */
angular
    .module('handbook', [
        'app.panels',
        'app.skills'
    ]);

})();
(function() {
'use strict';

angular.module('app.panels',
    ['app.panels.template']
);

})();
(function() {
'use strict';

angular.module('app.skills', [
    'app.skills.template'
]);

})();
(function() {
'use strict';

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

})();
(function() {
'use strict';

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

})();