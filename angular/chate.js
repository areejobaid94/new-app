angular.module( "app")
.controller("chate",function($scope,$http,$location,$rootScope){
    $scope.user = $rootScope.user
    $scope.infos
    $scope.chatBox = true
    $scope.chate=function(){
        $scope.chatBox = true
		$http({
			method:'post',
			url:'/chate',
			data:JSON.stringify({
                userName:$scope.user.userName,
				massege:$scope.massege
			}),
		headers: {'Content-Type': "application/json; charset = utf-8"}
		}).then( (data)=>{
            console.log(data.data.chate)
            $scope.infos = data.data.chate
            $scope.massege = ""
    }).catch(function(error){
			console.log(error)
		})
}

$scope.delete = function(chateId){
    $http({
        method:'delete',
        url:'/chate',
        data:JSON.stringify({
            id:chateId
        }),
    headers: {'Content-Type': "application/json; charset = utf-8"}
    }).then( (data)=>{
}).catch(function(error){
        console.log(error)
    })
}

$scope.remove = function(){


}


  })