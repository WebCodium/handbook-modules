/**
 * @memberof address
 * @name AddressController
 * @ngdoc controller
 * @description
 * Controller for address module
 * @param editableOptions {service} Edits default option for angular-xeditable module
 * @param editableThemes {service} Edits styles for xeditable
 * @param constantAddress {constants} Configs for module
 * @param AddressService {service} Get Set and Delete addresses
 * @param $timeout {service} Angular window.setTimeout wrapper
 */
angular
    .module('app.address')
    .controller('AddressController', AddressController);

/**
 * @namespace
 * @ignore
 */
AddressController.$inject = ['editableOptions', 'editableThemes', 'constantAddress', 'AddressService', '$timeout', '$window', '$log'];
function AddressController(editableOptions, editableThemes, configs, AddressService, $timeout, $window, $log) {
    /**
     * @namespace
     * @ignore
     */
    var vm = this;
    /**
     * @namespace
     * @ignore
     */
    vm.google = $window.google;
    /**
     * @namespace
     * @ignore
     */
    var priorityLatLng = configs.priorityLatLng;
    /**
     * @namespace
     * @ignore
     */
    var markers = [];

    //set theme xeditable
    editableOptions.theme = configs.optionsXeditable.theme;
    //extend default options xeditable
    angular.extend(editableThemes[configs.optionsXeditable.theme], configs.optionsXeditable.options);

    //get addresses
    AddressService
        .getAddresses()
        .then(addressesReady, function (err) {
            $log.error(err);
        });

    //set options for map
    if (vm.google) {
        var position = new vm.google.maps.LatLng(configs.mapOptions.onLoad.lat, configs.mapOptions.onLoad.lng);
        vm.mapOptions = angular.extend(
            configs.mapOptions.default, {
                mapTypeId: vm.google.maps.MapTypeId[configs.mapOptions.onLoad.mapTypeId],
                center: position
            });
        // used timeout to wait maps to be ready before add a markers
        $timeout(function () {
            addMarker(vm.addressMap, position);
        });
    }

    vm.addAddress = addAddress;
    vm.cancel = cancel;
    vm.saveAddress = saveAddress;
    vm.removeAddress = removeAddress;
    vm.formShowWhenNew = formShowWhenNew;
    vm.viewLocation = viewLocation;

    /**
     * Add Marker
     * @namespace
     * @ignore
     */
    function addMarker(map, position) {
        if (!vm.google)
            return false;
        var marker = new vm.google.maps.Marker({
            map: map,
            position: position
        });
        markers.push(marker);
    }

    /**
     * Remove all marker
     * @namespace
     * @ignore
     */
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    /**
     * Set center
     * @namespace
     * @ignore
     */
    function setCenter(map, lat, lng) {
        map.setCenter({lat: lat, lng: lng});
    }


    /**
     * callback when addresses are loaded
     * @namespace
     * @ignore
     */
    function addressesReady(reponse) {
        var items = reponse.data;
        vm.addresses = [];
        angular.forEach(items, function (item) {
            item.latLng = angular.fromJson(item.latLng);
            this.push(item);
        }, vm.addresses);
    }

    /**
     * add new empty address
     * For creating new address
     * ```
     *  {
     *      title: null,
     *      state: null,
     *      city: null,
     *      zipcode: null,
     *      address: null,
     *      latLng: null
     *   }
     * ```
     * @param {Object} [fields] Object with keys and default values
     */
    function addAddress(fields) {
        vm.addresses.push(angular.extend({isNew: true}, fields || configs.fields));
    }

    /**
     * Cancel all changes
     * @param {integer} [index] - index of address (`$index` in ng-repeat)
     */
    function cancel(index) {
        var address = vm.addresses[index];
        // remove new
        if (address.isNew) {
            vm.addresses.splice(index, 1);
        }
    }

    /**
     * save edits
     * @param {integer} [index] - index of address (`$index` in ng-repeat)
     */
    function saveAddress(index) {
        var address = vm.addresses[index];
        var latLng = {};

        if (address.latLng) {
            var keep = true;

            // compose main lat and lng
            angular.forEach(priorityLatLng, function (item) {
                if (keep && address.latLng.lat[item] && address.latLng.lng[item]) {
                    this.lat = address.latLng.lat[item];
                    this.lng = address.latLng.lng[item];
                    this.type = item;
                    keep = false;
                }
            }, latLng);

            angular.extend(address, {
                latLng: JSON.stringify({
                    lat: address.latLng.lat,
                    lng: address.latLng.lng,
                    main: latLng
                })
            });
        }

        // mark as not new
        if (address.isNew) {
            address.isNew = false;
        }
        // send on server
        AddressService
            .setAddress(address)
            .then(function (response) {
                data = response.data;
                data.latLng = angular.fromJson(data.latLng);
                vm.addresses[index] = data;
            }, function (err) {
                alert(err);
            });
    }

    /**
     * delete address by index
     * @param {integer} [index] - index of address (`$index` in ng-repeat)
     */
    function removeAddress(index) {
        var address = vm.addresses[index];
        AddressService
            .deleteAddress(address._id)
            .then(function () {
                vm.addresses.splice(index, 1);
                $log.info('removed');
            }, function (err) {
                $log.error(err);
            });
    }

    /**
     * show input on start create address
     * @param {Object} form xeditable form
     * @param {integer} [index] - index of address (`$index` in ng-repeat)
     */
    function formShowWhenNew(form, index) {
        if (vm.addresses[index].isNew) {
            form.$show();
        }
    }

    /**
     * show address on map
     * @param lat {float} Latitude for google map
     * @param lng {float} Longitude for google map
     */
    function viewLocation(posType) {
        if (posType.lat !== undefined && posType.lng !== undefined) {
            setMapOnAll(null);
            addMarker(this.addressMap, new vm.google.maps.LatLng(posType.lat, posType.lng));
            this.addressMap.setZoom(configs.mapOptions.zoom[posType.type] || 13);
            setCenter(this.addressMap, posType.lat, posType.lng);
        }
    }
}