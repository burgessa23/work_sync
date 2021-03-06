'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'ngRoute',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
]).
config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/view2', {
			templateUrl: 'partials/partial2.html'
		});
		$routeProvider.otherwise({
			redirectTo: '/view2'
		});
	}
]);