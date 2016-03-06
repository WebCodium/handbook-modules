angular
    .module('app.address')
    .service('AddressLoader', AddressLoader);

AddressLoader.$inject = ['$http', 'configs'];
function AddressLoader($http, configs) {
    this.getAddress = getAddress;
    this.setAddress = setAddress;
    this.deleteAddress = deleteAddress;

    ////////////////

    function getAddress(onReady, onError) {
        var addressURL = configs.url.get;

        onError = onError || function () {
                alert('Failure loading addresses');
            };

        $http
            .get(addressURL)
            .success(onReady)
            .error(onError);
    }

    function setAddress(data, onReady, onError) {
        var addressURL = configs.url.set;

        onError = onError || function () {
                alert('Failure saving address');
            };

        $http
            .post(addressURL, data)
            .success(onReady)
            .error(onError);
    }

    function deleteAddress(id, onReady, onError) {
        var addressURL = configs.url.delete + id;

        onError = onError || function () {
                alert('Failure delete address');
            };

        $http
            [configs.deleteMethod](addressURL)
            .success(onReady)
            .error(onError);
    }
}