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
        //TODO Profil auf Server anlegen/checken --> vervollständigen lassen oder Timeline
        //Profil enthält Nickname, Vor-/Nachname, evtl. Geburtstag, E-Mail
        //Gibt's den User?
        //JA? --> localstorage --> state.go home
        //Nein? --> state.go register --> Daten ausfüllen --> Server speichern --> localstorage --> state.go home
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
