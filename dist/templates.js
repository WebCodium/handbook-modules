angular.module("app.panels.template", []).run(["$templateCache", function($templateCache) {$templateCache.put("panel_default.template.html","<div class=\"panel panel-default\"><div class=\"panel-heading\" ng-transclude=\"header\"></div><div class=\"panel-body\" ng-transclude=\"body\"></div></div>");}]);
angular.module("app.skills.template", []).run(["$templateCache", function($templateCache) {$templateCache.put("skill_default.template.html","<div class=\"loopify-link-create\"><div>asdf</div></div>");}]);