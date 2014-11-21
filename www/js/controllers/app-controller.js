angular.module('challenger')

.controller('AppCtrl', function($scope, AuthService) {
  $scope.login = function() {
    AuthService.login();
  };

  $scope.logout = function() {
    AuthService.logout();
    $scope.login();
  };

  $scope.isLoggedIn = function () {
    return AuthService.isLoggedIn();
  };

  if(!$scope.isLoggedIn()) {
    $scope.login();
  }
});
