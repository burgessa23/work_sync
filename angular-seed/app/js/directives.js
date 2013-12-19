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

myDirectives.directive('showResultsHello', [
	function() {
		return {
			restrict: 'EA',
			templateUrl: 'tpl/resultsHello.html',
			scope: {
				resultMatrix: '=resultMatrix'
			}
		};
	}
]);

myDirectives.directive('contentItem', ['$compile', '$http', '$templateCache',
	function($compile, $http, $templateCache) {

		var getTemplate = function(contentType) {
			var templateLoader,
				baseUrl = 'tpl/',
				templateMap = {
					'Catalog Feed': 'catalogItem.html',
					'Ecare Feed': 'genericItem.html',
					forums: 'genericItem.html',
					'U-verse': 'genericItem.html',
					myATT: 'myattItem.html'
				};

			var templateUrl = baseUrl + templateMap[contentType];
			templateLoader = $http.get(templateUrl, {
				cache: $templateCache
			});

			return templateLoader;

		};

		var linker = function(scope, element, attrs) {

			var loader = getTemplate(scope.content.data_source_name);

			var promise = loader.success(function(html) {
				element.html(html);
			}).then(function(response) {
				element.replaceWith($compile(element.html())(scope));
			});
		};

		return {
			restrict: 'E',
			scope: {
				content: '='
			},
			link: linker
		};
	}
]);