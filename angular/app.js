angular.module('app', [ 'ui.bootstrap', 'ngRoute' ]).config(function($routeProvider) {
	$routeProvider
		.when('/', {
                 templateUrl: './main.html',
                 controller: 'main1'
		})
		.when('/welcome', {
            templateUrl: './welcome.html',
		})
		.when('/signup', {
			templateUrl: './signup.html',
			controller: 'signup'
		})
		.when('/chate', {
			templateUrl: './chate.html',
			controller: 'chate'
		})
		.when('/signin', {
			templateUrl: './signin.html',
			controller: 'signin'
		})
		.when('/profile', {
			templateUrl: './profile.html',
			controller: 'profile'
		})
		.when('/readmore', {
			templateUrl: './readmore.html'
		});
});
