angular.module( "app")
.controller("main1",function($scope,$http,$location,$rootScope){
$scope.error 
$scope.sugmit=function(){
    $http({
        method:'post',
        url:'/',
        data:JSON.stringify({
            password:$scope.groupPassword
        }),
    headers: {'Content-Type': "application/json; charset = utf-8"}
    }).then( (data)=>{
        $location.path('/welcome'); 
}).catch(function(error){
    $scope.error = "try again"
        console.log(error)
    })
}
  })