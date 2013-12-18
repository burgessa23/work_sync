'use strict';

/* Directives */


var myDirectives = angular.module('myApp.directives', []);

myDirectives.directive('appVersion', ['versionService',
	function(version) {
		return function(scope, elm, attrs) {
			elm.text(version.value);
		};
	}
]);

myDirectives.directive('appMData', [
	function() {
		return {
			restrict: 'CE',
			template: 'Data stuff content: <h1>{{foo.bat}} {{foo.baz}} {{crux}}</h1>'
		};
	}
]);

myDirectives.directive('showVenues', [
	function() {
		return {
			restrict: 'E',
			templateUrl: 'tpl/venue.html',
			scope: {
				foo: '='
			},
			link: function(scope, element, attrs) {

			}
		};
	}
]);

myDirectives.directive('showResults', [
	function() {
		return {
			restrict: 'E',
			templateUrl: 'tpl/results.html'
		};
	}
]);