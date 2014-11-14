angular.module('challenger')

.service('AuthService', function(auth, store, $state) {
  return {
    login: function () {
      auth.signin({
        authParams: {
          scope: 'openid offline_access',
          device: 'Mobile device'
        }
      }, function(profile, token, accessToken, state, refreshToken) {
        store.set('profile', profile);
        store.set('token', token);
        store.set('refreshToken', refreshToken);
        $state.go('app.home');
      }, function(err) {
        console.log(err);
      });
    },
    logout: function () {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $state.go('app.home');
    },
    isLoggedIn: function () {
      return store.get('token') && store.get('profile');
    }
  };
});
