angular.module('challenger')

  .controller('AppCtrl', function ($scope, $state, AuthService) {
    $scope.login = function () {
      AuthService.login();
    };

    $scope.logout = function () {
      AuthService.logout();
      $scope.login();
    };

    $scope.isLoggedIn = function () {
      return AuthService.isLoggedIn();
    };

    $scope.searchUserByNickname = function (searchQuery) {
      $scope.searchQuery = searchQuery;
      $state.go('app.searchUsers');
    };

    $scope.showProfile = function (user) {
      $scope.profile = user;
      $state.go('app.profile');
    };

    if (!$scope.isLoggedIn()) {
      $scope.login();
    }
  });
