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
 * @property {String} deleteMethod Delete method for delete address, by default `delete`
 * @property {Object} types Object of types for each component
 * [supported types](https://developers.google.com/places/supported_types#table3)
 * @property {Object} options for map
 * [map options](https://developers.google.com/maps/documentation/javascript/reference#MapOptions)
 * @property {Array} priority of google autocomplete types
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
                mapOptionTypeId: 'ROADMAP',
                //lviv
                lat: 49.8500,
                lng: 24.0167
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