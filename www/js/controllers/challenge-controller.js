angular.module('challenger')

  .controller('ChallengeCreator', function ($scope) {
    console.log($scope.profile);
  })

  .controller('ChallengesCtrl', function ($scope, $state, store, ChallengesService) {
    $scope.findMyChallenges = function () {
      var userId = store.get('fd_profile').id;

      var promise = ChallengesService.findMyChallenges(userId);
      promise.then(function (challenges) {
        $scope.challenges = challenges;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.showDetails = function (challenge) {
      $scope.selectedChallenge = challenge;
      $state.go('app.myChallenges.details', {id: challenge.id});
    };

    $scope.findMyChallenges();
  });
