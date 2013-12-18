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

myAppControllers.controller('MyCtrl5', ['$scope', 'jsonSolrService',
	function($scope, jsonSolrService) {
		$scope.searchBang = function(qString) {
			console.log('qString = ' + qString);
			jsonSolrService.get(qString).then(function(data) {
				$scope.docs = data;
				console.log($scope.docs);
				//$scope.$apply();
			});
		};
	}
]);