app = angular.module('profile', [])
	

app.controller('ProfileController', ['$scope', function($scope){
		$scope.user;
		$scope.user = tempData();
	}]);

app.controller('ProfileEditController', ['$scope', function($scope){
		$scope.user;
		$scope.user = tempData();

		$scope.save = function(){
			// save user info.
			
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
