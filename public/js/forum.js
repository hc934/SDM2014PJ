app = angular.module('forum',[]);

app.controller('ForumController', ['$scope', '$http', function($scope, $http) {
  $scope.articles;
  $http.get('/api/articles').
    success(function(data, status, headers, config) {   
      $scope.articles = data;
    }).
    error(function(data, status, headers, config) {   
      console.log(data);   
    });  
}]);


app.controller('PostController',['$scope','$http',function($scope,$http){
  $scope.submitArticle = function(){
    // load and submit
    location.href = '/forum';
  };
}]);

app.controller('ArticleController',['$scope', '$http', function($scope, $http){
  $scope.article;
  var temp_array = location.href.split('/');
  var article_id = temp_array[temp_array.length-1];
  console.log(article_id);
  $http.get('/api/article/'+article_id).
    success(function(data, status, headers, config) {
      console.log(data);   
      $scope.article = data;
    }).error(function(data, status, headers, config) {   
      console.log('error');     
    });  
}]);