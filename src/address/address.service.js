angular
    .module('app.address')
    .service('AddressLoader', AddressLoader);

AddressLoader.$inject = ['$http', 'configs'];
function AddressLoader($http, configs) {
    this.getAddress = getAddress;
    this.setAddress = setAddress;
    this.deleteAddress = deleteAddress;
    this.getGoogleType = getGoogleType;

    ////////////////

    function getAddress(onReady, onError) {
        var addressURL = configs.urls.get;

        onError = onError || function () {
                alert('Failure loading addresses');
            };

        $http
            .get(addressURL)
            .success(onReady)
            .error(onError);
    }

    function setAddress(data, onReady, onError) {
        var addressURL = configs.urls.set;

        onError = onError || function () {
                alert('Failure saving address');
            };

        $http
            .post(addressURL, data)
            .success(onReady)
            .error(onError);
    }

    function deleteAddress(id, onReady, onError) {
        var addressURL = configs.urls.delete + id;

        onError = onError || function () {
                alert('Failure delete address');
            };

        $http
            [configs.deleteMethod](addressURL)
            .success(onReady)
            .error(onError);
    }

    function getGoogleType(type) {
        return [configs.types[type] || 'address'];
    }
}