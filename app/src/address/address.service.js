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
        return $http.post(configs.urls.set, data);
    }

    /**
     * Get all addresses
     */
    function getAddresses() {
        return $http.get(configs.urls.get);
    }

    /**
     * @param {integer} id - id of address
     */
    function deleteAddress(id) {
        return $http[configs.deleteMethod](configs.urls.delete + id);
    }

    /**
     * @param {string} type - google place type
     */
    function getGoogleType(type) {
        return [configs.types[type] || 'address'];
    }
}