app = angular.module('login', []);

app.controller('LoginController', ['$scope', function($scope){
		$scope.user;
    
		$scope.login = function(){
			// check login information
      console.log($scope.user);
		};

	}]);

app.controller('NavController',['$scope', '$http', function($scope, $http){
  var href = window.location.href;
  $scope.changeToEnglish = function() {
    if ($http.post('/api/setLocale/English')) {
      window.location.href = href;
    }
  };

  $scope.changeToChinese = function() {
    if ($http.post('/api/setLocale/Chinese')) {
      window.location.href = href;
    }
  };
}]);