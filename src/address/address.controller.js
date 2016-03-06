angular
    .module('app.address')
    .controller('AddressController', AddressController);

AddressController.$inject = ['$scope', 'editableOptions', 'editableThemes', 'configs', '$q', 'AddressLoader', '$http'];
function AddressController($scope, editableOptions, editableThemes, configs, $q, AddressLoader, $http) {
    var vm = this;
    vm.title = 'Controller';
    activate();

    ////////////////

    function activate() {
        editableOptions.theme = 'bs3';

        AddressLoader.getAddress(addressReady);

        function addressReady(items) {
            vm.addresses = items;
        }

        vm.addAddress = function () {
            vm.addresses.push(angular.extend({isNew: true}, configs.fields));
        }
        // cancel all changes
        vm.cancel = function () {
            for (var i = vm.addresses.length; i--;) {
                var address = vm.addresses[i];
                // undelete
                //if (address.isDeleted) {
                //    delete address.isDeleted;
                //}
                // remove new
                if (address.isNew) {
                    vm.addresses.splice(i, 1);
                }
            }
        };
        // save edits
        vm.saveAddress = function (index) {
            var address = vm.addresses[index];
            // actually delete user
            if (address.isDeleted) {
                vm.addresses.splice(index, 1);
            }
            // mark as not new
            if (address.isNew) {
                address.isNew = false;
            }
            // send on server
            AddressLoader.setAddress(address, function (data) {
                vm.addresses[index] = data;
            });
        }
        // delete
        vm.removeAddress = function (index) {
            var address = vm.addresses[index];
            AddressLoader.deleteAddress(address._id, function () {
                vm.addresses.splice(index, 1);
                console.log('removed');
            });
        }
    }
}