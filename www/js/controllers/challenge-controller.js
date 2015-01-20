angular.module('challenger')

  .controller('ChallengeCreator', function ($rootScope, $scope, $state, $cordovaToast, store, ChallengesService) {
    $scope.challenge = {};
    $scope.challenge.requestedUser = $scope.profile;
    $scope.challenge.requestingUser = store.get('fd_profile');
    $scope.challenge.likes = 0;
    $scope.challenge.comments = [];
    $scope.challengeValue = "";

    var today = new Date();
    var day = today.getDate() + 7;
    $scope.min = new Date(today.getFullYear(), today.getMonth(), day);
    $scope.challenge.createDate = today;

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

    $scope.$watch('challenge.sport', function (newValue) {
      if (newValue) {
        switch (newValue.name) {
          case 'Ausdauer':
            $scope.challengeValue = "km";
            break;
          case 'Kraftsport':
            $scope.challengeValue = "kg";
            break;
        }
      }
    });

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
        $rootScope.selectedChallenge = challenge;
        $cordovaToast.showShortBottom("Herausforderung gesendet.");
        $state.go('app.timeline.details', {id: challenge.id});
      }, function (err) {
        if (err.data.errorMessageCode === "error.overranking") {
          $cordovaToast.showLongBottom("Der Rangunterschied ist zu groß!");
        }
        else {
          $cordovaToast.showLongBottom(err);
        }
      });
    };

    loadSports();
  })

  .controller('ChallengeDetailsCtrl', function ($scope, $state, $cordovaCamera, $cordovaToast, $cordovaSocialSharing, store, ChallengesService, STATUS, $ionicModal) {
    $scope.profile = store.get('fd_profile');
    $scope.status = STATUS;
    var id = $state.params.id;

    $scope.createComment = function (comment) {
      if (comment === undefined || comment.message.length === 0) {
        $cordovaToast.showLongBottom("Ein Kommentar wird benötigt!");
        return;
      }
      comment.user = $scope.profile;
      var promise = ChallengesService.createComment($scope.selectedChallenge.id, comment);
      promise.then(function (challenge) {
        comment.message = "";
        $scope.selectedChallenge = challenge;
        if ($scope.timelineChallenges) {
          for (var i = 0; i < $scope.timelineChallenges.length; i++) {
            if ($scope.timelineChallenges[i].id === $scope.selectedChallenge.id) {
              $scope.timelineChallenges[i] = challenge;
            }
          }
        }
        if ($scope.challenges) {
          for (var i = 0; i < $scope.challenges.length; i++) {
            if ($scope.challenges[i].id === $scope.selectedChallenge.id) {
              $scope.challenges[i] = challenge;
            }
          }
        }
      }, function (err) {
        $cordovaToast.showLongBottom(err);
      });
    };

    var cameraOptions = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $scope.getPicture = function () {
      $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
        var promise = ChallengesService.uploadProofImage(id, imageData);
        promise.then(function (challenge) {
          $scope.selectedChallenge = challenge;
          for (var i = 0; i < $scope.timelineChallenges.length; i++) {
            if ($scope.timelineChallenges[i].id === $scope.selectedChallenge.id) {
              $scope.timelineChallenges[i] = challenge;
            }
          }

          $cordovaToast.showShortBottom("Bild erfolgreich hochgeladen.");
        })
      }, function (err) {
        $cordovaToast.showLongBottom(err);
      });
    };

    $scope.share = function (challenge) {
      console.log(challenge);
      $cordovaSocialSharing.share(challenge.requestingUser.nickname + ' fordert ' + challenge.requestedUser.nickname + ' heraus. Check das mal in der Challenger App!', 'Check die Challenge').then(function (result) {
        console.log(result);
      }, function (err) {
        console.log(err);
      })
    };

    $scope.updateStatus = function (status, winner) {
      var promise = ChallengesService.updateStatus(id, status, winner);
      promise.then(function (challenge) {
        $scope.selectedChallenge = challenge;
        if ($scope.timelineChallenges) {
          for (var i = 0; i < $scope.timelineChallenges.length; i++) {
            if ($scope.timelineChallenges[i].id === $scope.selectedChallenge.id) {
              $scope.timelineChallenges[i] = challenge;
            }
          }
        }
        if ($scope.challenges) {
          for (var i = 0; i < $scope.challenges.length; i++) {
            if ($scope.challenges[i].id === $scope.selectedChallenge.id) {
              $scope.challenges[i] = challenge;
            }
          }
        }
      }, function (err) {
        console.log(err);
      });
    };

    $ionicModal.fromTemplateUrl('contact-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal
    })

    $scope.openModal = function () {
      $scope.modal.show()
    }

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

  })

  .controller('ChallengesCtrl', function ($rootScope, $scope, $state, $cordovaToast, store, ChallengesService, STATUS) {
    $scope.status = STATUS;
    $scope.loaded = false;

    $scope.findMyChallenges = function () {
      var userId = store.get('fd_profile').id;

      var promise = ChallengesService.findMyChallenges(userId);
      promise.then(function (challenges) {
        $scope.challenges = challenges;
        $scope.loaded = true;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.showDetails = function (challenge) {
      $rootScope.selectedChallenge = challenge;
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

