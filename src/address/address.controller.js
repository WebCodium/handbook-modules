angular
    .module('app.address')
    .controller('AddressController', AddressController);

AddressController.$inject = ['$scope', 'editableOptions', 'editableThemes', 'configs', 'AddressLoader', '$http', '$timeout'];
function AddressController($scope, editableOptions, editableThemes, configs, AddressLoader, $http, $timeout) {
    var vm = this;
    activate();

    ////////////////

    function activate() {
        editableOptions.theme = 'bs3';
        editableThemes.bs3.inputClass = 'input-sm';

        AddressLoader.getAddress(addressReady);

        function addressReady(items) {
            vm.addresses = items;
            vm.mapOptions = {
                zoom: 14,
                center: new google.maps.LatLng(33.790807, -117.835734),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };
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
            var address = vm.addresses[index];
            // mark as not new
            if (address.isNew) {
                address.isNew = false;
            }
            // send on server
            AddressLoader.setAddress(address, function (data) {
                vm.addresses[index] = data;
            });
        };
        // delete
        vm.removeAddress = function (index) {
            var address = vm.addresses[index];
            console.log(address._id);
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
        vm.getLocation = function (form) {
            console.log(form.$data);
        };
    }
}