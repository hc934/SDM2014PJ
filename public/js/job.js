angular.module('job', ['lang'])

.controller('JobController', ['$scope','$http',function($scope,$http){
    $scope.jobs = [
        {
            corporation: "Google",
            job_type: "Programmer"
        },
        {
            corporation: "Yahoo",
            job_type: "UI/UX Designer"
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
}]);
