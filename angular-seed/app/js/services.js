'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var serviceModule = angular.module('myApp.services', ['ngResource']);
serviceModule.service('versionService', function() {
	this.value = "1.2.4";
});

serviceModule.factory('dataService', [
	function() {
		var foo = {};
		foo.baz = 3;
		foo.bat = 'test message 2';
		return foo;
	}
]);

serviceModule.factory('jsonService', ['$resource',
	function($resource) {
		return $resource('phones/:phoneId.json', {}, {
			query: {
				method: 'GET',
				params: {
					phoneId: 'phones'
				},
				isArray: true
			}
		});
	}
]);

serviceModule.factory('jsonpService', function($http) {
	return {
		get: function() {
			var self = this;
			return $http.jsonp('http://www.achehorn.com/FAW/api.php/venues?callback=JSON_CALLBACK').then(function(result) {
				console.log(result.data.venues);
				return result.data.venues;
			});
		}
	};
});

serviceModule.factory('jsonSolrService', function($http) {
	return {
		get: function(qString) {
			return $http.jsonp('http://tst20.stage.att.com/searchservice/Mobile/lucid?wt=json&rows=5&start=0&q=' + qString + '&fq=taxoFeatures:%224G%20HSPA%2B%22+OR+taxoOperatingSystem:%22Android%22&fq=showInSearch:%22true%22&fq=-stockDescription:%22N%22&fq=-navigationTree:%22Marked%20For%20Delete%22&echoParams=all&fl=*,elevated:[elevated]&facet=true&json.wrf=JSON_CALLBACK').then(function(result) {
				console.log(result.data.response);
				return result.data.response.docs;
			});
		}
	};
});

serviceModule.config(function($httpProvider) {
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}).factory('venueService', ['$resource',
	function($resource) {
		return $resource('http://www.andrewburgess.info/api/venues.json', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);