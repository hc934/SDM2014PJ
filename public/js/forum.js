angular.module('forum',['lang'])

.controller('ForumController', ['$scope', '$http', function($scope, $http) {
  $scope.localCookies = sessionStorage.getItem('id');
  $scope.articles;
  $scope.src = "http://topwalls.net/wp-content/uploads/2012/07/Grass-In-The-Wind-.jpg";
  $http.get('/api/articles')
    .success(function(data, status, headers, config) {   
      $scope.articles = data;
    })
    .error(function(data, status, headers, config) {   
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

.controller('EditController',['$scope' , '$http' , function($scope, $http ){
  $scope.localCookies = sessionStorage.getItem('id');
  $scope.article;

  $scope.EditArticle=function(){
    var data={
      id:$scope.localCookies,
      title:$scope.title,
      content:$scope.content
    }
    $http.post('/api/'+article_id+'/edit',data).
      success(function(data, status, headers, config) {   
        alert('修改成功！');
        window.location.href = window.location.href;
      }).
      error(function(data, status, headers, config) {   
        console.log(data);
      }); 
  };
  $scope.init=function(){
    var temp_array = location.href.split('/');
    var article_id = temp_array[temp_array.length-1];
    $http.get('/api/article/'+article_id).
      success(function(data, status, headers, config) {
         console.log(data); 
        $scope.article = data;
      }).error(function(data, status, headers, config) {   
        console.log('error');     
      });  
    };
}])

.controller('ArticleController',['$scope', '$http', function($scope, $http){
  $scope.localCookies = sessionStorage.getItem('id');
  $scope.article;
  $scope.comment;
  $scope.like = function(){
    var data={
      id: $scope.localCookies
    }
    $http.post('/api/'+article_id+'/like',data).
      sucess(function(data, status, headers, config) {
        alert('按讚成功');
        window.location.href = window.location.href;
      }).
      error(function(data,status,headers,config){
        console.log(data);
        console.log("按讚失敗");
      });
  };
  $scope.edit = function(){

  }
  $scope.delete = function(){
    var data ={
      id: $scope.localCookies,
      article_id:$scope.article_id
    }
    $http.delete('/api/article',data).
      success(function(data,status, headers,config){
        alert("刪除成功");
        window.location.href = "/forum";
      }).
      error(function(data,status,headers,config){
        console.log(data);
        console.log("刪除失敗");
      })
  }
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

  $scope.init = function(){
    var temp_array = location.href.split('/');
    article_id = temp_array[temp_array.length-1];
    $http.get('/api/article/'+article_id).
      success(function(data, status, headers, config) {
        // console.log(data); 
        $scope.article = data;
      }).error(function(data, status, headers, config) {   
        console.log('error');     
      });  
  };
}]);

