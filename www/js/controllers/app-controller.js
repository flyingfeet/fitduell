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
    }

    if (!$scope.isLoggedIn()) {
      $scope.login();
    }
  });
