'use strict';

angular
    .module('app', [
        'ngRoute'
    ])
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/index/view.html'
        })
        .otherwise({
            templateUrl: 'pages/index/view.html'
        });
    $locationProvider.html5Mode(true);
}
