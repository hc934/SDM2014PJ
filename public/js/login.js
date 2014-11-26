app = angular.module('login', ['lang']);

app.controller('LoginController', ['$scope', '$http', function($scope,$http){
    $scope.user;
    $scope.localCookies;
    // check the inputs are valid
    $scope.check = function(valid) {
      if (valid) {
        $scope.login();
      }
    }
    $scope.login = function() {
      // check login information
      
      $http.post('/api/login', $scope.user).
        success(function(data, status, headers, config) {
          if(data.status){
            sessionStorage.setItem('id',$scope.user.id); // SAVE USERINFO VIA COOKIE
            window.location.href = "/forum";
          } else {
            window.location.href = "/";
          }
        }).
        error(function(data, status, headers, config) {
           console.log(data);
        });
    };

  }]);
