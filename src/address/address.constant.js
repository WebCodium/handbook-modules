angular
    .module('app.address')
    .constant('configs', {
        fields: {
            title: null,
            state: null,
            city: null,
            zipcode: null,
            address: null
        },
        autocomplete: {
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            postal_code: 'short_name',
            country: 'long_name'
        },
        url: {
            get: '/server/address',
            set: '/server/address',
            delete: '/server/address/'
        },
        deleteMethod: 'delete'
    });