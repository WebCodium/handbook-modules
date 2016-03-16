/**
 * @memberof address
 * @name googleplace
 * @ngdoc directive
 * @param configs {constants} Configs for module
 * @param AddressService {service} Get Set and Delete addresses
 * @param $timeout {service} Angular window.setTimeout wrapper
 * @restrict A
 * @description
 * Include google autocomplete for input
 * @attr {string} googleplace -
 * @attr {float} [lat] - Latitude for google map
 * @attr {float} [lng] - Longitude for google map
 * @example
 * <input type="text" googlepace="'address'" lat="latValue" lng="lngValue"/>
 */

angular
    .module('app.address')
    .directive('googleplace', address);

address.$inject = ['AddressService', 'configs', '$timeout'];
function address(AddressService, configs, $timeout) {
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
            types: AddressService.getGoogleType(scope.googleplace)
        };
        //create instance
        scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

        //detect form
        var parent = element.parent();
        while (!parent.is('form')) {
            parent = parent.parent();
        }

        //for prevent form submit on enter (xeditable)
        var btnSubmit = parent.find('[type="submit"], .js-button-submit').addClass('js-button-submit');
        element
            .keyup(function (e) {
                if (e.keyCode === 13) {
                    btnSubmit.attr('type', 'submit');
                    if (element.val() === '') {
                        btnSubmit.click();
                    }
                } else {
                    btnSubmit.attr('type', 'button');
                }
            })
            .blur(function () {
                $timeout(function () {
                    btnSubmit.attr('type', 'submit');
                });
            })
            .focus(function () {
                btnSubmit.attr('type', 'button');
            });

        //add listener on change input value
        google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
            var place = scope.gPlace.getPlace();
            var name = place.formatted_address || '';
            //apply lat and lng
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
            //get short name for cetain type
            if (scope.googleplace !== 'route') {
                angular.forEach(place.address_components, function (component) {
                    var addressType = component.types[0];
                    var cond = angular.isArray(scope.googleplace) ? scope.googleplace.indexOf(addressType) !== -1 : addressType === scope.googleplace;
                    if (cond) {
                        name = component[configs.autocomplete[addressType]];
                    }
                });
            }

            model.$setViewValue(name);
            //set value forcibily for xeditable
            element[0].value = name;
        });
    }
}