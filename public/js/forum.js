app = angular.module('forum',[]);

app.controller('ArticleController',['$scope','$http',function($scope,$http){
	$scope.articles = [];
	$http({
        method: 'GET',   
        url: '/json/article.json'
    }).success(function(data, status, headers, config) {   
        $scope.articles = data;
        
    }).error(function(data, status, headers, config) {   
           
    });  
}]);

