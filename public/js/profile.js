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

    // get session from server;
    $scope._user = window._user;
    $scope.init = function() {
      console.log($scope._user)

      var temp_array = location.href.split('/');
      var profile_id = temp_array[temp_array.length-1];
      
      // if no session, go to url profile_id
      if($scope._user!="null"){
        profile_id = $scope._user;
      }

      $http.post('/api/profile/'+profile_id).
        success(function(data, status, headers, config) {
          console.log(data);
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
          $scope.user.phone_mobile = $scope.edit_user.phone_mobile;
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

