angular.module('challenger')

.config(function (authProvider, $httpProvider, jwtInterceptorProvider) {
  authProvider.init({
    domain: 'fitduell.auth0.com',
    clientID: 'AzEnM7689zg67SEbj2C0d96vKGhOPaqg',
    loginState: 'app.login'
  });

  jwtInterceptorProvider.tokenGetter = function (store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    // If no token return null
    if (!idToken || !refreshToken) {
      return null;
    }
    // If token is expired, get a new one
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');
})

.run(function (auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
})

.run(function ($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          // Either show Login page or use the refresh token to get a new idToken
          $location.path('/');
        }
      }
    }
  });
});
