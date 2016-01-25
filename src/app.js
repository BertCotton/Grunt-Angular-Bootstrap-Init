var app = angular.module("newApp", ['ui.bootstrap', 'ngAnimate', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: 'index.html',
			controller: 'indexCtrl'
		})
		.otherwise({
			redirectto: '/'
		});
		
}]);

