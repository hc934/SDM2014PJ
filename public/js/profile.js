angular.module('profile', ['lang'])
  

.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    $scope.edit = {
      info : false,
      exp : false,
      edu : false
    }
    $scope.session = sessionStorage.getItem('id');
    data = {
      id: $scope.session
    }
    $scope.user;
    $scope.edit_user;

    $scope.init = function() {
      var temp_array = location.href.split('/');
      var profile_id = temp_array[temp_array.length-1];
      
      $http.post('/api/profile/'+profile_id).
        success(function(data, status, headers, config) {
          $scope.user = data;
          $scope.edit_user = jQuery.extend({}, $scope.user); // copy of user 
        }).error(function(data, status, headers, config) {   
          console.log('error');     
        });  
     };

     $scope.insert = function() {
      
     }

     $scope.update = function(block) {
      switch(block) {
        case 'info':
          $scope.user.name = $scope.edit_user.name;
          $scope.user.email = $scope.edit_user.email;
          $scope.user.mobile_phone = $scope.edit_user.mobile_phone;
        break;
        case 'exp':
          $scope.experience = jQuery.extend({}, $scope.experience);
        break;
        case 'edu':
          $scope.education = jQuery.extend({}, $scope.education);
        break;
      }

      if ($http.put('/api/profile', $scope.user)) {
        switch(block) {
          case 'info':
            $scope.edit.info = false;
          break;
          case 'exp':
            $scope.edit.exp = false;
          break;
          case 'edu':
            $scope.edit.edu = false;
          break;
        }
      }
    };

    $scope.clear = function() {
      $scope.edit_user = jQuery.extend({}, $scope.user); // copy of user 
    };
}])

