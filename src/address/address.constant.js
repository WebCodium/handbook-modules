/**
 * @memberof address
 * @name Configs
 * @ngdoc constant
 * @description
 * Configs for address module
 * @property {Object} fields Object for creating new address
 * @property {Object} autocomplete Object for define type name `long_name` and `short_name` for google autocomplete types.
 * [about types](https://developers.google.com/maps/documentation/geocoding/intro#Types)
 * ,
 * [about long_name, short_name](https://developers.google.com/maps/documentation/javascript/reference#GeocoderAddressComponent)
 * @property {Object} urls Object for get, set and delete addresses
 * @property {String} urls.get Url for getting addresses
 * @property {String} urls.set Url for saving address
 * @property {String} urls.delete Url for deleting address
 * @property {String} deleteMethod Delete method for delete address, by default `delete`
 * @property {Object} types Object of types for each component
 * [supported types](https://developers.google.com/places/supported_types#table3)
 * @property {Object} mapOptions Options for map
 * [map options](https://developers.google.com/maps/documentation/javascript/reference#MapOptions)
 * @property {Object} mapOptions.default Default options (types - string, float, array, object) for google map
 * @property {Object} mapOptions.onLoad Default options for values which require loaded google library
 * @property {Object} mapOptions.zoom Value of zoom for each type
 * @property {Array} priorityLatLng Array of priority google autocomplete types
 * @property {Object} optionsXeditable Options and theme for xeditable plugin
 * @property {string} optionsXeditable.theme Theme for xeditable
 * @property {Object} optionsXeditable.options Options for xeditable
 */
angular
    .module('app.address')
    .constant('configs', {
        fields: {
            title: null,
            state: null,
            city: null,
            zipcode: null,
            address: null,
            latLng: null
        },
        autocomplete: {
            route: 'long_name',
            locality: 'long_name',
            postal_code: 'short_name',
            sublocality_level_1: 'long_name',
            country: 'long_name'
        },
        urls: {
            get: '/server/address',
            set: '/server/address',
            delete: '/server/address/'
        },
        deleteMethod: 'delete',
        types: {
            country: '(regions)',
            locality: '(cities)',
            route: 'address'
        },
        mapOptions: {
            default: {
                zoom: 13,
                scrollwheel: false
            },
            onLoad: {
                mapTypeId: 'ROADMAP',
                //default lat and lng - lviv
                lat: 49.8500,
                lng: 24.0167
            },
            zoom: {
                country: 5,
                locality: 8,
                sublocality_level_1: 13,
                route: 15,
                street_address: 15
            }
        },
        priorityLatLng: ['route', 'sublocality_level_1', 'locality', 'country'],
        optionsXeditable: {
            theme: 'bs3',
            options: {
                inputClass: 'input-sm'
            }
        }
    });