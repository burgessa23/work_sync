'use strict';

/* Filters */

angular.module('myApp.filters', []).
filter('interpolate', ['versionService',
	function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version.value);
		};
	}
]);