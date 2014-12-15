angular.module('forum',['lang'])

.controller('ForumController', ['$scope', '$http', function($scope, $http) {
  $scope.localCookies = sessionStorage.getItem('id');
  $scope.articles;
  $http.get('/api/articles').
    success(function(data, status, headers, config) {   
      $scope.articles = data;
    }).
    error(function(data, status, headers, config) {   
      console.log(data);   
    });  
}])


.controller('PostController',['$scope','$http',function($scope,$http){
  $scope.localCookies = sessionStorage.getItem('id');
  $scope.post = {};
  $scope.post.title;
  $scope.post.content;
  $scope.submitArticle = function() {
    var data = {
      title: $scope.post.title,
      content: $scope.post.content,
      id: $scope.localCookies
    }
    $http.post('/api/article', data).
      success(function(data, status, headers, config) {   
        alert('新增成功！');
        window.location.href = "/forum";
      }).
      error(function(data, status, headers, config) {   
        console.log(data);
      }); 
  };
}])

.controller('ArticleController',['$scope', '$http', function($scope, $http){
  $scope.localCookies = sessionStorage.getItem('id');
  $scope.article;
  $scope.comment;
  $scope.submitComment = function(){
    var data = {
      content: $scope.comment,
      id: $scope.localCookies
    }
    $http.post('/api/'+article_id+'/comment',data).
      success(function(data, status, headers, config) {   
        alert('新增成功！');
        window.location.href = window.location.href;
      }).
      error(function(data, status, headers, config) {   
        console.log(data);
      }); 
  };

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
