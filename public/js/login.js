app = angular.module('login', ['lang']);

app.controller('LoginController', ['$scope', function($scope){
		$scope.user;
    // check the inputs are valid
    $scope.check = function(valid){
      if (valid) {
        $scope.login();
      }
    }
		$scope.login = function(){
			// check login information
      console.log($scope.user);
		};

	}]);
