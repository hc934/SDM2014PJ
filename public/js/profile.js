app = angular.module('profile', ['lang'])
  

app.controller('ProfileController', ['$scope', '$http', function($scope, $http){
    $scope.user;
    $http.get('/api/profile').
    success(function(data, status, headers, config) {
      $scope.user = data[0];
      // console.log(data);
    }).
    error(function(data, status, headers, config) {
      // console.log(data);
    });
  }]);

app.controller('ProfileEditController', ['$scope', '$http', function($scope, $http){
    $scope.user;
    $http.get('/api/profile').
    success(function(data, status, headers, config) {
      $scope.user = data[0];
      // console.log(data);
    }).
    error(function(data, status, headers, config) {
      // console.log(data);
    });
    $scope.update_profile = function() {
      if ($http.put('/api/profile', $scope.user)) {
        alert("更新成功")
      }
    };
  }]);
  

function tempData(){
  var temp = {};
  temp.id = "id";
  temp.name = "Bill Gates";
  temp.address = "台北市大安區羅斯福路四段3號";
  temp.email = "r03725000@ntu.edu.tw";
  temp.phone_mobile = "0910000111";
  temp.phone_work = "0910000000";
  temp.phone_home = "rrrrrrrrrr";
  temp.education = [];
  var i = 0;
  temp.education[i] = {};
  temp.education[i].id = "000";
  temp.education[i].degree = "碩士";
  temp.education[i].stuid = "r03725000";
  temp.education[i].institute = "NTU";
  temp.education[i].dept = "Management";
  temp.education[i].startdate = "2014";
  temp.education[i].enddate = "2015";
  i++;
  temp.education[i] = {};
  temp.education[i].id = "000";
  temp.education[i].degree = "學士";
  temp.education[i].stuid = "b00725000";
  temp.education[i].institute = "NTU";
  temp.education[i].dept = "Management";
  temp.education[i].startdate = "2010";
  temp.education[i].enddate = "2014";

  temp.experience = [];
  var i = 0;
  temp.experience[i] = {};
  temp.experience[i].id = "000";
  temp.experience[i].org = "Yahoo";
  temp.experience[i].dept = "R&D";
  temp.experience[i].position = "Software Engineer";
  temp.experience[i].startdate = "2012"
  temp.experience[i].enddate = "now";
  temp.experience[i].description = "Work for 24 hrs";

  return temp;
}
