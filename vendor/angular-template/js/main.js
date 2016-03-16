angular.module('app', [])
    .controller('navController', function ($scope, $window) {
        $scope.currentUrl = $window.location.pathname.substr(1, $window.location.pathname.length);
        $scope.npi = {};
    });