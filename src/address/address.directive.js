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

address.$inject = ['AddressLoader', 'configs'];
function address(AddressLoader, configs) {
    var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link,
        scope: {
            googleplace: '=',
            lat: '=?',
            lng: '=?'
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
        var btnSubmit = parent.find('[type="submit"], .js-button-submit').addClass('js-button-submit');
        element
            .keyup(function (e) {
                if (e.keyCode === 13) {
                    btnSubmit.attr('type', 'submit');
                } else {
                    btnSubmit.attr('type', 'button');
                }
            })
            .blur(function () {
                btnSubmit.attr('type', 'submit');
            });
        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
            var place = scope.gPlace.getPlace();
            var name = place.formatted_address || '';
            scope.$apply(function () {
                if (place.geometry) {
                    scope.lat = place.geometry.location.lat();
                    scope.lng = place.geometry.location.lng();
                }
                else {
                    scope.lat = null;
                    scope.lng = null;
                }
            });
            if (scope.googleplace !== 'route') {
                angular.forEach(place.address_components, function (component) {
                    var addressType = component.types[0];
                    if (addressType === scope.googleplace) {
                        name = component[configs.autocomplete[addressType]];
                    }
                });
            }
            model.$setViewValue(name);
            element[0].value = name;
        });
    }
}