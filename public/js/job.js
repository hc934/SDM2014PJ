angular.module('job', ['lang'])

.controller('JobController', ['$scope','$http',function($scope,$http){
    $scope.jobs = [
        {
            corporation: "Google",
            job_type: "Programmer"
        },
        {
            corporation: "Yahoo!",
            job_type: "UI/UX Designer"
        },
         {
            corporation: "ROC army",
            job_type: "Commander"
        }
    ];
}])

.controller('ShowJobController', ['$scope','$http',function($scope,$http){
    $scope.job = {
        corporation: "Google",
        job_type: "Programmer",
        location: "Taipei 101",
        work_type: "Full-time",
        payment: "$100/hour",
        chracters: "Handsome, Billionaire",
        work_experience: "3 years work experience",
        education: "University",
        major_in: "Information Management",
        language_requirement: "Japanese/Chinese",
        other_requirement: "Handsome, Billionaire and Handsome, Billionaire"
    };
}])

.controller('NewJobController', ['$scope','$http',function($scope,$http){


    $scope.sendMessage = function(message) {
        var data = {
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

        console.log(data);

            
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

}]);
