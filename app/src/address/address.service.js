/**
 * @memberof address
 * @name AddressService
 * @ngdoc service
 * @description
 * Service for address module
 * @param $http {service} Angular service
 * @param constantAddress {constants} Configs for module
 */
angular
    .module('app.address')
    .service('AddressService', AddressService);

/**
 * @namespace
 * @ignore
 */
AddressService.$inject = ['$http', 'constantAddress', '$q'];
function AddressService($http, configs, $q) {
    this.getAddresses = getAddresses;
    this.setAddress = setAddress;
    this.deleteAddress = deleteAddress;
    this.getGoogleType = getGoogleType;

    ////////////////

    /**
     * Save address
     * @param {Object} data - post options
     */
    function setAddress(data) {
        var deferred = $q.defer();
        var addressURL = configs.urls.set;

        $http
            .post(addressURL, data)
            .success(function () {
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * Get all addresses
     */
    function getAddresses() {
        var deferred = $q.defer();
        var addressURL = configs.urls.get;

        $http
            .get(addressURL)
            .success(function () {
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * @param {integer} id - id of address
     */
    function deleteAddress(id) {
        var deferred = $q.defer();
        var addressDeleteURL = configs.urls.delete + id;

        $http
            [configs.deleteMethod](addressDeleteURL)
            .success(function () {
                deferred.resolve.apply(deferred, arguments);
            })
            .error(function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    /**
     * @param {string} type - google place type
     */
    function getGoogleType(type) {
        return [configs.types[type] || 'address'];
    }
}