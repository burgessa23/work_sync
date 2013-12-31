'use strict';

/* Controllers */

var myAppControllers = angular.module('myApp.controllers', []);
myAppControllers.controller('SearchController', ['$scope', 'jsonSolrService', 'autoSuggestService',
	function($scope, jsonSolrService, autoSuggestService) {
		// get typeahead suggestions
		$scope.getSuggestions = function(qString) {
			autoSuggestService.get($scope.qString).then(function(data) {
				$scope.suggestions = data;
			});
		};
		// load last 5 searches from localStorage
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
		// user taps search icon or hits enter
		$scope.searchBang = function(qString) {
			// store the search string
			var previousSearchRack = localStorage.getItem('prevSearches'),
				previousSearchValues,
				m_rack,
				searchTerm;
			this.flushSuggestions();
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
			// query for results only when form is submitted or user hits search icon
			jsonSolrService.get(qString).then(function(data) {
				$scope.docs = data;
			});
		};
		// empty the suggestions scope
		$scope.flushSuggestions = function () {
			$scope.suggestions = '';
		};
	}
]);