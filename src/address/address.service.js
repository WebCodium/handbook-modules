/**
 * @memberof address
 * @name AddressLoader
 * @ngdoc service
 * @description
 * Service for address module
 * @param $http {service} Edits default option for angular-xeditable module
 * @param configs {constants} Default options for module
 */
angular
    .module('app.address')
    .service('AddressLoader', AddressLoader);

/**
 * @namespace
 * @ignore
 */
AddressLoader.$inject = ['$http', 'configs'];
function AddressLoader($http, configs) {
    this.getAddress = getAddress;
    this.setAddress = setAddress;
    this.deleteAddress = deleteAddress;
    this.getGoogleType = getGoogleType;

    ////////////////

    /**
     * @param {Object} data - post options
     * @param {function} onReady - callback on success
     * @param {function} [onError] - callback on error
     */
    // save address
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

    // cancel all changes
    /**
     * @param {function} onReady - callback on success
     * @param {function} [onError] - callback on error
     */
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

    /**
     * @param {integer} id - id of address
     * @param {function} onReady - callback on success
     * @param {function} [onError] - callback on error
     */
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

    /**
     * @param {string} type - google place type
     */
    function getGoogleType(type) {
        return [configs.types[type] || 'address'];
    }
}