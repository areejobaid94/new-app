angular.module('app')
.controller("profile",function($scope,$http,$location,$rootScope){
 console.log("profile") ;
 $scope.massege
 $scope.user1 = $rootScope.user
 $scope.update =function(){
    $http({
        method:'put',
        url:'/profile',
        data:JSON.stringify({
            id : $scope.user1.id,
            userName:$scope.userName,
            password:$scope.password,
            phoneNumber:$scope.phoneNumber,
            fullName:$scope.fullName
        }),
    headers: {'Content-Type': "application/json; charset = utf-8"}
    }).then( (data)=>{
        console.log(data)
        $scope.user = data.data
        $scope.massege = "update succesfuly"  
}).catch(function(error){
        console.log(error)
    })
}
$scope.goTo =function(){

    $rootScope.user = {
        userName:$scope.userName || $scope.user1.userName,
        phoneNumber:$scope.phoneNumber || $scope.user1.phoneNumber,
        fullName:$scope.fullName || $scope.user1.fullName,
        id : $scope.user1.id
    }

    $location.path('/chate'); 
    // $http({
    //     method: 'get',
    //     url: '/profile',
    //     data : JSON.stringify({
    //         userName : $scope.user.userName
    //     }),
    //     headers: { 'Content-Type': 'application/json' }
    // })
    //     .then((data) => {
    // $rootScope.user = $scope.user
    // $location.path('/chate'); 
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

}

  })
