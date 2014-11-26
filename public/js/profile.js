app = angular.module('profile', ['lang'])
  

app.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    $scope.session = sessionStorage.getItem('id');
    data = {
      id: $scope.session
    }
    $scope.user;
    $http.post('/api/profile',data).
    success(function(data, status, headers, config) {
      $scope.user = data[0];
      // console.log(data);
    }).
    error(function(data, status, headers, config) {
      // console.log(data);
    });
  }]);

app.controller('ProfileEditController', ['$scope', '$http', function($scope, $http){
    $scope.session = sessionStorage.getItem('id');
    data = {
      'id': $scope.session
    }
    $scope.user;
    if($scope.user.experience == null){
      $scope.user.experience = [];
    }
    if($scope.user.education == null){
      $scope.user.education = [];
    }
    $http.post('/api/profile',data).
    success(function(data, status, headers, config) {
      $scope.user = data[0];
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
