/**
 * @memberof skill
 * @name skillChange
 * @ngdoc directive
 * @restrict EA
 * @description
 * Change skill's rating
 * @attr {Integer} level - Current level of skill
 * @attr {Object} slideOptions - Options for slider
 * @attr {Integer} height - Height for range of skill
 * @attr {Array} colorLevels - Array of colors for each level
 * @attr {Array} textLevels - Array of texts for each level
 */

angular
    .module('app.skill')
    .directive('skillChange', skillChange);

/**
 * @namespace
 * @ignore
 */
skillChange.$inject = ['constantSkill'];
function skillChange(configs) {
    /**
     * @namespace
     * @ignore
     */
    var directive = {
        link: link,
        restrict: 'EA',
        scope: {
            level: '=?',
            sliderOptions: '=?',
            height: '=?',
            textLevels: '=?',
            colorLevels: '=?'
        },
        templateUrl: 'skill_change.template.html'
    };
    return directive;

    /**
     * @memberof skillChange
     * @param {Object} scope - The scope of this element
     * @param {Array} scope.levels - Array of levels only with keys
     * @param {Integer} scope.max - Length of levels
     * @param {Integer} scope.step - Step for range slider
     */
    function link(scope) {
        scope.levels = new Array(configs.levels);
        scope.height = scope.height || configs.height;
        scope.textLevels = scope.textLevels || configs.textLevels;
        scope.colors = configs.colorLevels || configs.colorLevels;
        scope.max = scope.levels.length;
        scope.step = 1;
        scope.level = (scope.level || 0) * scope.step;
        scope.leftSkill = '';
        scope.rightSkill = '';

        /**
         * @memberof skillChange
         * @function
         * @name getColor
         * @param {Integer} $index - Index in ng-repeat directive
         * @returns {String} color for level
         */
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