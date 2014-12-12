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
        if (sport.id === $scope.challenge.sport.id) {
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

  .controller('ChallengeDetailsCtrl', function ($scope, $state, $cordovaCamera, $cordovaToast, store, ChallengesService) {
    $scope.profile = store.get('fd_profile');
    var id = $state.params.id;

    $scope.createComment = function (comment) {
      comment.user = $scope.profile;
      console.log(comment);
    };

    //var cameraOptions = {
    //  quality: 100,
    //  destinationType: Camera.DestinationType.DATA_URL,
    //  sourceType: Camera.PictureSourceType.CAMERA,
    //  allowEdit: true,
    //  encodingType: Camera.EncodingType.JPEG,
    //  targetWidth: 300,
    //  targetHeight: 300,
    //  popoverOptions: CameraPopoverOptions,
    //  saveToPhotoAlbum: false
    //};
    //
    //$scope.getPicture = function () {
    //  $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
    //    var promise = ChallengesService.uploadProofImage(id, imageData);
    //    promise.then(function (challenge) {
    //      $scope.selectedChallenge = challenge;
    //      for (var i = 0; i < $scope.timelineChallenges.length; i++) {
    //        if ($scope.timelineChallenges[i].id === $scope.selectedChallenge.id) {
    //          $scope.timelineChallenges[i] = challenge;
    //        }
    //      }
    //
    //      $cordovaToast.showShortBottom("Bild erfolgreich hochgeladen.");
    //    })
    //  }, function (err) {
    //    $cordovaToast.showLongBottom(err);
    //  });
    //};

    $scope.updateStatus = function (status, winner) {
      var promise = ChallengesService.updateStatus(id, status, winner);
      promise.then(function (challenge) {
        $scope.selectedChallenge = challenge;
        for (var i = 0; i < $scope.timelineChallenges.length; i++) {
          if ($scope.timelineChallenges[i].id === $scope.selectedChallenge.id) {
            $scope.timelineChallenges[i] = challenge;
          }
        }
      }, function (err) {
        console.log(err);
      });
    };
  })

  .controller('ChallengesCtrl', function ($scope, $state, $cordovaToast, store, ChallengesService, STATUS) {
    $scope.status = STATUS;

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

    $scope.likeChallenge = function (id, index) {
      var promise = ChallengesService.likeChallenge(id);
      promise.then(function (challenge) {
        $scope.challenges[index] = challenge;
        $cordovaToast.showShortBottom("Challenge liked.");
      }, function (err) {
        $cordovaToast.showLongBottom(err);
      });
    };

    $scope.findMyChallenges();
  });
