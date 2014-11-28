app = angular.module('login', ['lang']);

app.controller('LoginController', ['$scope', '$http', function($scope,$http){
    $scope.user;
    $scope.localCookies;
    $scope.showMsg = false;
    $scope.message = 'test';
    // check the inputs are valid
    $scope.check = function(valid) {
      if (valid) {
        $scope.login();
      }
    }
    $scope.login = function() {
      // check login information
      console.log($scope.user);
      $http.post('/api/login', $scope.user).
        success(function(data, status, headers, config) {
          console.log(data);
          if(data.status){
            sessionStorage.setItem('id',$scope.user.id); // SAVE USERINFO VIA COOKIE
            window.location.href = "/forum";
          } else {
            $scope.showMsg = true;
            $scope.message = '帳號或密碼錯誤'
            $scope.user.id = null;
            $scope.user.password = null;
          }
        }).
        error(function(data, status, headers, config) {
          $scope.showMsg = true;
          $scope.message = 'OH NO，有問題！'
          $scope.user.id = null;
          $scope.user.password = null;
          // window.location.href = "/";
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);

        });
    };

  }]);
