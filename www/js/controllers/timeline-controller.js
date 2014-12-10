angular.module('challenger')

  .controller('TimelineCtrl', function ($scope, $state, store, ChallengesService) {
    $scope.findMyAndMyFriendsChallenges = function () {
      var userId = store.get('fd_profile').id;

      var promise = ChallengesService.findMyAndMyFriendsChallenges(userId);
      promise.then(function (challenges) {
        $scope.timelineChallenges = challenges;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.showDetails = function (challenge) {
      $scope.selectedChallenge = challenge;
      $state.go('app.timeline.details', {id: challenge.id});
    };

    $scope.likeChallenge = function (id, index) {
      var promise = ChallengesService.likeChallenge(id);
      promise.then(function (challenge) {
        $scope.timelineChallenges[index] = challenge;
        $cordovaToast.showShortBottom("Challenge liked.");
      }, function (err) {
        $cordovaToast.showLongBottom(err);
      });
    };

    $scope.findMyAndMyFriendsChallenges();
  });
