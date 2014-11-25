app = angular.module('login', ['lang']);

app.controller('LoginController', ['$scope', '$http', function($scope,$http){
		$scope.user;
    $scope.localCookies;
    // check the inputs are valid
    $scope.check = function(valid){
      if (valid) {
        $scope.login();
      }
    }
		$scope.login = function(){
			// check login information
      console.log($scope.user);
      $http.post('/api/login', $scope.user).
      success(function(data, status, headers, config) {
        $scope.localCookies = $scope.user; // FAKE COOKIE
        if(data.status){
          window.location.href = "/forum";
        }
      }).
      error(function(data, status, headers, config) {
         console.log(data);
      });
		};

	}]);
