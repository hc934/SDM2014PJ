angular.module('job', ['lang'])

.controller('JobController', ['$scope','$http',function($scope,$http){
    $scope.localCookies = sessionStorage.getItem('id');
    $scope.jobs;
    //console.log('before get');   
    $http.get('/api/job/list').
        success(function(data, status, headers, config) { 
        console.log(data);   
        $scope.jobs = data;
        }).
        error(function(data, status, headers, config) {   
        console.log(data);   
        }); 
}])

.controller('ShowJobController', ['$scope','$http',function($scope,$http){
    $scope.localCookies = sessionStorage.getItem('id');
    $scope.job;

    var temp_array = location.href.split('/');
    var job_id = temp_array[temp_array.length-1];
    $http.get('/api/job/info/'+job_id).
    success(function(data, status, headers, config) {
        //alert(data);
        //console.log(data); 
        $scope.job = data[0];
    }).error(function(data, status, headers, config) {   
        console.log('error');     
    });  

}])

.controller('NewJobController', ['$scope','$http',function($scope,$http){
    $scope.localCookies = sessionStorage.getItem('id');

    console.log(sessionStorage.getItem('id'));

    $scope.sendMessage = function(message) {
        var data = {
            stuid: $scope.localCookies,
            corporation: ($scope.job_model.corporation == undefined)?"":$scope.job_model.corporation,
            job_type: ($scope.job_model.job_type == undefined)?"":$scope.job_model.job_type,
            location: ($scope.job_model.location == undefined)?"":$scope.job_model.location,
            work_type: ($scope.job_model.work_type == undefined)?"":$scope.job_model.work_type,
            payment: ($scope.job_model.payment == undefined)?"":$scope.job_model.payment,
            chracters: ($scope.job_model.chracters == undefined)?"":$scope.job_model.chracters,
            work_experience: ($scope.job_model.work_experience == undefined)?"":$scope.job_model.work_experience,
            education: ($scope.job_model.payment == undefined)?"":$scope.job_model.education,
            major_in: ($scope.job_model.payment == undefined)?"":$scope.job_model.major_in,
            language_requirement: ($scope.job_model.payment == undefined)?"":$scope.job_model.language_requirement,
            other_requirement: ($scope.job_model.payment == undefined)?"":$scope.job_model.other_requirement
        };

        //console.log(data);
        console.log("cookies: " + $scope.localCookies);

        $http.post('/api/job/new', data).
            success(function(data, status, headers, config) {   
            alert('新增成功！');
            window.location.href = "/job";
            }).
            error(function(data, status, headers, config) {   
            console.log(data);
            });     
    };
    // $scope.placeholder = function() {
    //     return function(input){
    //         if(!(input == undefined || input == null)){
    //           return input;
    //         } else {
    //           return "placeholder";
    //         }
    //     }
    // };
}])


.controller('SearchJobController', ['$scope','$http',function($scope,$http){
    console.log('before get');   
    $scope.localCookies = sessionStorage.getItem('id');
    $scope.jobs;

    var temp_array = location.href.split('/');
    var requirement = temp_array[temp_array.length-1];
    $http.get('/api/job/'+requirement).
        success(function(data, status, headers, config) { 
        console.log(data); ;  
        $scope.jobs = data;
        }).
        error(function(data, status, headers, config) {   
        console.log(data);   
        }); 
}])












;