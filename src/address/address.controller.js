angular
    .module('app.address')
    .controller('AddressController', AddressController);

AddressController.$inject = ['$scope', 'editableOptions', 'editableThemes', 'configs', 'AddressLoader', '$timeout'];
function AddressController($scope, editableOptions, editableThemes, configs, AddressLoader, $timeout) {
    var vm = this;
    activate();

    ////////////////

    function activate() {
        var position = new google.maps.LatLng(configs.mapOptions.onLoad.lat, configs.mapOptions.onLoad.lng);
        var priorityLatLng = ['route', 'locality', 'country'];
        var markers = [];

        editableOptions.theme = 'bs3';
        editableThemes.bs3.inputClass = 'input-sm';

        AddressLoader.getAddress(addressReady);

        vm.mapOptions = angular.extend(
            configs.mapOptions.default, {
                mapTypeId: google.maps.MapTypeId[configs.mapOptions.onLoad.mapOptionTypeId],
                center: position
            });

        // used timeout to wait maps to be ready before add a markers
        $timeout(function () {
            addMarker(vm.addressMap, position);
        });

        function addMarker(map, position) {
            var marker = new google.maps.Marker({
                map: map,
                position: position
            });
            markers.push(marker);
            return marker;
        }

        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        function setCenter(map, lat, lng) {
            map.setCenter({lat: lat, lng: lng});
        }

        function addressReady(items) {
            vm.addresses = [];
            angular.forEach(items, function (item) {
                item.latLng = angular.fromJson(item.latLng);
                this.push(item);
            }, vm.addresses);
        }

        vm.addAddress = function () {
            vm.addresses.push(angular.extend({isNew: true}, configs.fields));
        };
        // cancel all changes
        vm.cancel = function () {
            for (var i = vm.addresses.length; i--;) {
                var address = vm.addresses[i];
                // remove new
                if (address.isNew) {
                    vm.addresses.splice(i, 1);
                }
            }
        };
        // save edits
        vm.saveAddress = function (index) {
            var latLng = {};
            var keep = true;
            var address = vm.addresses[index];

            angular.forEach(priorityLatLng, function (item) {
                if (keep && address.latLng.lat[item] && address.latLng.lng[item]) {
                    this.lat = address.latLng.lat[item];
                    this.lng = address.latLng.lng[item];
                    keep = false;
                }
            }, latLng);

            // mark as not new
            if (address.isNew) {
                address.isNew = false;
            }
            angular.extend(address, {latLng: JSON.stringify({lat: address.latLng.lat, lng: address.latLng.lng, main: latLng})});
            // send on server
            AddressLoader.setAddress(address, function (data) {
                data.latLng = angular.fromJson(data.latLng);
                vm.addresses[index] = data;
                console.log(data);
            });
        };
        // delete
        vm.removeAddress = function (index) {
            var address = vm.addresses[index];
            AddressLoader.deleteAddress(address._id, function () {
                vm.addresses.splice(index, 1);
                console.log('removed');
            });
        };
        vm.checkOnNew = function (form, index) {
            if (vm.addresses[index].isNew) {
                form.$show();
            }
        };
        vm.viewLocation = function (lat, lng) {
            setMapOnAll(null);
            addMarker(this.addressMap, new google.maps.LatLng(lat, lng));
            setCenter(this.addressMap, lat, lng);
        };
    }
}