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
    .module('app.address')
    .directive('googleplace', address);

address.$inject = ['AddressLoader'];
function address(AddressLoader) {
    var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link,
        scope: {
            googleplace: '='
        }
    };
    return directive;

    function link(scope, element, attrs, model) {
        var options = {
            types: AddressLoader.getGoogleType(scope.googleplace)
        };
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        var parent = element.parent();
        while (!parent.is('form')) {
            parent = parent.parent();
        }
        var btnSubmit;
        element
            .keyup(function (e) {
                btnSubmit = parent.find('[type="submit"], .js-button-submit').addClass('js-button-submit');
                if (e.keyCode === 13) {
                    btnSubmit.attr('type', 'submit');
                } else {
                    btnSubmit.attr('type', 'button');
                }
            });

        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
            var place = scope.gPlace.getPlace();
            var name = place.formatted_address;
            if (scope.googleplace !== 'route') {
                angular.forEach(place.address_components, function (component) {
                    var addressType = component.types[0];
                    if (addressType === scope.googleplace) {
                        name = component.long_name;
                    }
                });
            }
            model.$setViewValue(name);
            element[0].value = name;
        });
    }
}