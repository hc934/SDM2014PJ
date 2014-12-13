angular.module('profile', ['lang'])
  

.controller('ProfileController', ['$scope', '$http', function($scope, $http){

    $scope.session = sessionStorage.getItem('id');
    data = {
      id: $scope.session
    }
    $scope.user;
    $scope.edit_user;
    $scope.init = function() {
      $http.post('/api/profile', data).
            success(function(data, status, headers, config) {
              $scope.user = data;
              $scope.edit_user = jQuery.extend({}, $scope.user); // copy of user 
              // console.log(data);
            }).
            error(function(data, status, headers, config) {
              // console.log(data);
            });
     };
     $scope.update = function(block) {
      switch(block) {
        case 'contact':
          $scope.user.name = $scope.edit_user.name;
          $scope.user.email = $scope.edit_user.email;
          $scope.user.mobile_phone = $scope.edit_user.mobile_phone;
        break;
        case 'experience':
          $scope.experience = jQuery.extend({}, $scope.experience);
        break;
        case 'education':
          $scope.education = jQuery.extend({}, $scope.education);
        break;
      }

      if ($http.put('/api/profile', $scope.user)) {
        alert("更新成功")
        window.location.href = '/profile';
      }
    };

    $scope.clear = function() {
      $scope.edit_user = jQuery.extend({}, $scope.user); // copy of user 
    };
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
