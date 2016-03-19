/**
 * @memberof skill
 * @name skill-change
 * @ngdoc directive
 * @restrict EA
 * @description
 * Change skill's rating
 */

angular
    .module('app.skill')
    .directive('skillChange', skillChange)
    .directive('chosen', ['$timeout', function ($timeout) {
        var link = function (scope, element, attrs) {
            var list = attrs.chosen;

            scope.$watch(list, function () {
                element.trigger('chosen:updated');
            });

            scope.$watch(attrs.ngModel, function () {
                $timeout(function () {
                    element.trigger('chosen:updated');
                }, 0);
            });
        };

        return {
            restrict: 'A',
            link: link
        };
    }]);

skillChange.$inject = ['constantSkill'];
function skillChange(configs) {
    var directive = {
        link: link,
        restrict: 'EA',
        scope: {
            level: '=',
            index: '=',
            sliderOptions: '=?',
            height: '=?',
            textLevels: '=?'
        },
        templateUrl: 'skill_change.template.html'
    };
    return directive;

    function link(scope) {
        scope.levels = new Array(configs.levels);
        scope.height = scope.height || configs.height;
        scope.textLevels = scope.textLevels || configs.textLevels;
        scope.colors = configs.colorLevels;
        scope.max = scope.levels.length;
        scope.step = 1;
        scope.level = (scope.level || 0) * scope.step;
        scope.leftSkill = '';
        scope.rightSkill = '';

        scope.getColor = function ($index) {
            return scope.level < 2 ?
                scope.colors[$index] :
                (scope.level - $index > 0 ?
                        scope.colors[scope.level - 1] :
                        scope.colors[$index]
                );
        };
    }
}