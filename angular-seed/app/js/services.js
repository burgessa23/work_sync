'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
var serviceModule = angular.module('myApp.services', ['ngResource']);
// get search results
serviceModule.factory('jsonSolrService', function($http) {
	return {
		get: function(qString) {
			return $http.jsonp('http://www.att.com/searchservice/Mobile/lucid?wt=json&rows=10&start=0&q=' + qString + '&fq=-data_source_name:"GVP%20Video%20Feed"&fq=showInSearch:%22true%22&fq=-stockDescription:%22N%22&fq=-navigationTree:%22Marked%20For%20Delete%22&echoParams=all&fl=*,elevated:[elevated]&facet=true&json.wrf=JSON_CALLBACK').then(function(result) {
				return result.data.response.docs;
			});
		}
	};
});
// get typeahead suggestions
serviceModule.factory('autoSuggestService', function($http) {
	return {
		get: function(autoQString) {
			return $http.jsonp('http://www.att.com/searchservice/GlobalSearch_AutoSuggest/select?q=userQuery:%22' + autoQString + '%22&indent=true&fl=userQuery&wt=json&fq=data_source_name:%22Popular%20Search%20Terms%22&sort=lookupCount%20desc&rows=5&json.wrf=JSON_CALLBACK').then(function(result) {
				return result.data.response.docs;
			});
		}
	};
});
