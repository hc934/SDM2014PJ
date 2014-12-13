angular.module('profile', ['lang'])
  

.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    $scope.session = sessionStorage.getItem('id');
    data = {
      id: $scope.session
    }
    $scope.user;
    $http.post('/api/profile', data).
    success(function(data, status, headers, config) {
      $scope.user = data;
      // console.log(data);
    }).
    error(function(data, status, headers, config) {
      // console.log(data);
    });
  }])

.controller('ProfileEditController', ['$scope', '$http', function($scope, $http){
    $scope.session = sessionStorage.getItem('id');
    data = {
      'id': $scope.session
    }
    $scope.user;

    $http.post('/api/profile', data).
    success(function(data, status, headers, config) {
      $scope.user = data;
    }).
    error(function(data, status, headers, config) {
      // console.log(data);
    });
    $scope.update_profile = function() {
      if ($http.put('/api/profile', $scope.user)) {
        alert("更新成功")
        window.location.href = '/profile';
      }
    };
  }]);
