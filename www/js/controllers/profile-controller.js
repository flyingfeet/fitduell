angular.module('challenger')

  .controller('MyProfileCtrl', function ($scope, $state, $cordovaToast, store, UserService) {
    var profile = {};
    if (store.get('fd_profile')) {
      profile = store.get('fd_profile');
    }
    else {
      profile = store.get('profile');
    }

    $scope.profile = {};

    if (profile.user_id) {
      $scope.profile.id = profile.user_id;
    }
    else {
      $scope.profile.id = profile.id;
    }
    if (profile.picture) {
      $scope.profile.avatar = profile.picture;
    }
    else {
      $scope.profile.avatar = profile.avatar;
    }
    if (profile.nickname) {
      $scope.profile.nickname = profile.nickname;
    }
    if (profile.given_name) {
      $scope.profile.firstname = profile.given_name;
    }
    else {
      $scope.profile.firstname = profile.firstname;
    }
    if (profile.family_name) {
      $scope.profile.lastname = profile.family_name;
    }
    else {
      $scope.profile.lastname = profile.lastname;
    }
    if (profile.email) {
      $scope.profile.email = profile.email;
    }
    if (profile.birthdate) {
      var birthdate = new Date(profile.birthdate);
      var d = birthdate.getDate();
      var m = birthdate.getMonth() + 1;
      var y = birthdate.getFullYear();
      $scope.profile.birthdate = y + "-" + (m < 10 ? "0" + m : m) + "-" + d;
    }
    if(profile.rang) {
      var promise = UserService.findUserById(profile.id);
      promise.then(function (user) {
        $scope.rang = user.rang;
        $scope.points = user.points;
      }, function (err) {
        console.log(err);
      });
    }
    console.log(profile);

    var today = new Date();
    var year = today.getFullYear() - 10;
    $scope.min = new Date(year, today.getMonth(), today.getDate());

    $scope.saveProfile = function (profile) {
      var promise = UserService.updateProfile(profile);
      promise.then(function (profile) {
        if (store.get('fd_profile')) {
          store.set('fd_profile', profile);
          $cordovaToast.showShortBottom("Profil aktualisiert");
        }
        else {
          store.set('fd_profile', profile);
          $cordovaToast.showShortBottom("Profil erstellt");
          $state.go('app.timeline.list');
        }
      }, function (err) {
        $cordovaToast.showLongBottom(err);
      });
    };
  });
