angular.module('job', ['lang'])

.controller('JobController', ['$scope','$http',function($scope,$http){
    $scope.jobs = [
        {
            user_name: "test1",
            title: "test1"
        },
        {
            user_name: "test2",
            title: "test2"
        }
    ];
}]);
