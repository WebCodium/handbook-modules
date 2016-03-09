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
        }
    });