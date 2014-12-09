angular.module('challenger')

  .controller('ChallengeCreator', function ($scope, $cordovaToast, store, ChallengesService) {
    console.log($scope.profile);

    $scope.challenge = {};
    $scope.challenge.requestedUser = $scope.profile;
    $scope.challenge.requestingUser = store.get('fd_profile');
    $scope.challenge.likes = 0;
    $scope.challenge.comments = [];

    var loadSports = function () {
      var sportsPromise = ChallengesService.findSports();
      sportsPromise.then(function (sports) {
        $scope.sports = sports;
        $scope.challenge.sport = $scope.sports[0];
        $scope.exercises = $scope.sports[0].exercises;
        $scope.challenge.exercise = $scope.exercises[0];
      }, function (err) {
        console.log(err);
      });
    };

    $scope.changeExercises = function () {
      _.find($scope.sports, function (sport) {
        if(sport.id === $scope.challenge.sport.id) {
          $scope.exercises = sport.exercises;
          $scope.challenge.exercise = $scope.exercises[0];
        }
      });
    };

    $scope.createChallenge = function () {
      var promise = ChallengesService.createChallenge($scope.challenge);
      promise.then(function (challenge) {
        $cordovaToast.showShortBottom("Herausforderung gesendet.");
      }, function (err) {
        console.log(err);
      });
    }

    loadSports();
  })

  .controller('ChallengeDetailsCtrl', function ($scope, store) {
    $scope.profile = store.get('fd_profile');
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
