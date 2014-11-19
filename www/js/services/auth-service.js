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
        store.set('token', token);
        store.set('profile', profile);
        store.set('refreshToken', refreshToken);
        //TODO Profil auf Server anlegen/checken --> vervollständigen lassen oder Timeline
        //Profil enthält Nickname, Vor-/Nachname, evtl. Geburtstag, E-Mail
        var promise = UserService.findUserById(profile.user_id);
        promise.then(function (user) {
          console.log(user);
          if(user) {
            store.set('fd_profile', user);
            $state.go('app.home');
          }
          else {
            $state.go('app.profile');
          }
        }, function (err) {
          console.log(err);
        });
        //Nein? --> state.go register --> Daten ausfüllen --> Server speichern --> localstorage --> state.go home
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
