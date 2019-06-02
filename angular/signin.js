    
angular.module( "app")
.controller("signin",function($scope,$http,$location,$rootScope){
	 
	
  $scope.signin=function(){
		$http({
			method:'post',
			url:'/signin',
			data:JSON.stringify({
				userName:$scope.userName,
				password:$scope.password
			}),
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then( (data)=>{
			console.log(data.data)
			$rootScope.user = data.data
			$location.path('/profile'); 
    }).catch(function(error){
			console.log(error)
		})
}

})