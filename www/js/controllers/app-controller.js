angular.module('challenger')

  .controller('AppCtrl', function ($scope, $state, $cordovaToast, AuthService, AUTH_EVENTS) {
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

    $scope.goToMyProfile = function () {
      $state.go('app.myprofile');
    };

    $scope.showChallengeDetails = function (challenge) {
      $scope.selectedChallenge = challenge;
      $state.go('app.challengeDetails', {id: challenge.id});
    };

    if (!$scope.isLoggedIn()) {
      $scope.login();
    }

    $scope.$on(AUTH_EVENTS.noServer, function (event, response) {
      console.log("Server not reachable");
      $cordovaToast.showLongBottom("Der Server ist zur Zeit nicht erreichbar. Versuche es zu einem späteren Zeitpunkt erneut.");
    });
  });
