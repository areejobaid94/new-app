angular.module('app').controller('signup', function($scope, $http, $location, $rootScope) {
	$scope.Regester = function() {
		console.log($scope.fullName)
		$http({
			method: 'post',
			url: '/signup',
			data: JSON.stringify({
				fullName: $scope.fullName,
				userName: $scope.userName,
				password: $scope.password,
				phoneNumber: $scope.phoneNumber
			}),
			headers: { 'Content-Type': 'application/json' }
		})
			.then((data) => {
				$location.path('/signin'); 
			})
			.catch((err) => {
				console.log(err);
			});
		// console.log($scope.email);
	}; // end fire function
});


