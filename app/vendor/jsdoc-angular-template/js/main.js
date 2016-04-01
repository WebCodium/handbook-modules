angular.module('app', [])
    .controller('navController', function ($scope, $window) {
        $scope.currentUrl = $window.location.pathname.substr($window.location.pathname.lastIndexOf('/') + 1, $window.location.pathname.length);
        $scope.npi = {};
        $scope.condParent = {};
    });