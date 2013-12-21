'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', []);

myAppControllers.controller('MyCtrl1', ['$scope',
	function($scope) {
		$scope.foo = {
			bat: "test message 1",
			baz: "99"
		};
		$scope.crux = "this is ctrl1, it gets its data from the controller";

	}
]);

myAppControllers.controller('MyCtrl2', ['$scope', 'dataService',
	function($scope, foo) {
		$scope.crux = 'this is ctrl2, it gets its data from a service';
		$scope.foo = foo;
	}
]);

myAppControllers.controller('MyCtrl3', ['$scope', 'jsonpService',
	function($scope, jsonpService) {
		jsonpService.get().then(function(data) {
			$scope.venues = data;
		});
	}
]);

myAppControllers.controller('MyCtrl4', ['$scope', 'venueService',
	function($scope, venueService) {
		$scope.venues = venueService.query();
	}
]);

myAppControllers.controller('SearchController', ['$scope', 'jsonSolrService', 'autoSuggestService',
	function($scope, jsonSolrService, autoSuggestService) {
		$scope.getSuggestions = function(qString) {
			autoSuggestService.get($scope.qString).then(function(data) {
				$scope.suggestions = data;
			});
		};
		$scope.getPrevious = function() {
			// convert the pipe delimited string into a json object
			var _prevSearches = localStorage.getItem("prevSearches").split('|');
			var _prevSearchesFormatted = [],
				rv;
			for (var i = 0; i < _prevSearches.length; ++i) {
				rv = {};
				rv['userQuery'] = _prevSearches[i];
				_prevSearchesFormatted.push(rv);
			}
			// set to the expected $scope parameter
			$scope.suggestions = _prevSearchesFormatted;
		};
		$scope.searchBang = function(qString) {
			// store the search string
			var previousSearchRack = localStorage.getItem('prevSearches'),
				previousSearchValues,
				m_rack,
				searchTerm;
			// empty the suggestions scope
			$scope.suggestions = '';
			$scope.qString = qString;
			searchTerm = qString;
			if (previousSearchRack !== null) {
				previousSearchRack = previousSearchRack.toLowerCase();
				if (previousSearchRack.indexOf(searchTerm.toLowerCase()) === -1) {
					previousSearchValues = localStorage.getItem("prevSearches").split('|');
					previousSearchValues.unshift(searchTerm);
					if (previousSearchValues.length > 5) {
						previousSearchValues.pop();
					}
					m_rack = previousSearchValues.join('|');
					localStorage.setItem("prevSearches", m_rack);
				}
			} else {
				localStorage.setItem("prevSearches", searchTerm);
			}
			// query for results
			jsonSolrService.get(qString).then(function(data) {
				$scope.docs = data;
			});
		};
		$scope.flushSuggestions = function () {
			$scope.suggestions = '';
		};
	}
]);