angular.module('challenger')

  .controller('MyProfileCtrl', function ($scope, $state, store, UserService) {
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

    //Show profile picture sometimes

    $scope.saveProfile = function (profile) {
      var promise = UserService.updateProfile(profile);
      promise.then(function (profile) {
        if (store.get('fd_profile')) {
          store.set('fd_profile', profile);
        }
        else {
          store.set('fd_profile', profile);
          $state.go('app.timeline');
        }
      }, function (err) {
        console.log(err);
      });
    };
  });
