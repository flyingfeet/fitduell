angular.module('challenger')

  .controller('TimelineCtrl', function ($rootScope, $scope, $state, $cordovaToast, store, ChallengesService, STATUS) {
    $scope.status = STATUS;
    $scope.loggedInUser = store.get('fd_profile');

    $scope.findMyAndMyFriendsChallenges = function () {
      var userId = store.get('fd_profile').id;

      var promise = ChallengesService.findMyAndMyFriendsChallenges(userId);
      promise.then(function (challenges) {
        $scope.timelineChallenges = challenges;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.getItemHeight = function(item, index) {
      //Make evenly indexed items be 10px taller, for the sake of example
      return (index % 2) === 0 ? 50 : 60;
    };

    $scope.showDetails = function (challenge) {
      $rootScope.selectedChallenge = challenge;
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
