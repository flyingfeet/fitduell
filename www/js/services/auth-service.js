angular.module('challenger')

.service('AuthService', function(auth, store, $state, UserService) {
  return {
    login: function () {
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        if(!profile.email_verified) {
          $state.go('app.checkMails');
        }
        else {
          store.set('token', token);
          store.set('profile', profile);
          store.set('refreshToken', refreshToken);
          var promise = UserService.findUserById(profile.user_id);
          promise.then(function (user) {
            if(user) {
              store.set('fd_profile', user);
              $state.go('app.home');
            }
            else {
              $state.go('app.myprofile');
            }
          }, function (err) {
            console.log(err);
          });
        }
      }, function(err) {
        console.log(err);
      });
    },
    logout: function () {
      auth.signout();
      store.remove('fd_profile');
      store.remove('profile');
      store.remove('token');
      $state.go('app.home');
    },
    isLoggedIn: function () {
      return store.get('token') && store.get('profile') && store.get('fd_profile');
    }
  };
});
