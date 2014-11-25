app = angular.module('forum',[]);

app.controller('ForumController',['$scope','$http',function($scope,$http){
	$scope.articles = [];
	$http({
        method: 'GET',   
        url: '/json/article.json'
    }).success(function(data, status, headers, config) {   
        $scope.articles = data;
        
    }).error(function(data, status, headers, config) {   
           
    });  
}]);


app.controller('PostController',['$scope','$http',function($scope,$http){
	$scope.submitArticle = function(){
		// load and submit
		location.href = '/forum';
	};
}]);

app.controller('ArticleController',['$scope','$http',function($scope,$http){
	$scope.article;
	$http({
        method: 'GET',   
        url: '/json/single_article.json'
    }).success(function(data, status, headers, config) {   
        $scope.article = data;
    }).error(function(data, status, headers, config) {   
           
    });  
}]);