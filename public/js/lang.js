var langApp = angular.module('lang',[]);

langApp.controller('LanguageController',['$scope', '$http', function($scope, $http){
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