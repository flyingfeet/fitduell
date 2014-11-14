angular.module('challenger')

.controller('AppCtrl', function($scope, AuthService) {
  $scope.login = function() {
    AuthService.login();
  };

  $scope.logout = function() {
    AuthService.logout();
  };

  $scope.isLoggedIn = function () {
    return AuthService.isLoggedIn();
  };
});
