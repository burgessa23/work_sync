'use strict';

/* Directives */


var myDirectives = angular.module('myApp.directives', []);
// directive for determining and compiling the correct template based on data_source_name of the current search result item
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