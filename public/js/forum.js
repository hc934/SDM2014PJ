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
  $scope.post = {};
  $scope.post.title;
  $scope.post.content;
  $scope.submitArticle = function() {
    var data = {
      title: $scope.post.title,
      content: $scope.post.content
    }
    $http.post('/api/article', data).
      success(function(data, status, headers, config) {   
        alert('新增成功！');
      }).
      error(function(data, status, headers, config) {   
        console.log(data);
      }); 
  };
}]);

app.controller('ArticleController',['$scope', '$http', function($scope, $http){
  $scope.article;
  var temp_array = location.href.split('/');
  var article_id = temp_array[temp_array.length-1];
  $http.get('/api/article/'+article_id).
    success(function(data, status, headers, config) {
      // console.log(data); 
      $scope.article = data;
    }).error(function(data, status, headers, config) {   
      console.log('error');     
    });  
}]);