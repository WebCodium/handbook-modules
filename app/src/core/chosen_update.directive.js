/**
 * @memberof _core
 * @name chosen-update
 * @ngdoc directive
 * @restrict A
 * @description
 * Redraw chosen (select) when changing model
 * @param {service} $timeout Angular window.setTimeout wrapper
 */

angular
    .module('app.core')
    .directive('chosenUpdate', ['$timeout', function ($timeout) {
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