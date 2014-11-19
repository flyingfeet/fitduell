angular.module('challenger', ['ionic', 'auth0', 'angular-storage', 'angular-jwt', 'restangular'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  }
  if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function ($window, Restangular) {
  var location = $window.location.hostname;
    var path = "";
    if(location == "localhost") {
      path = "http://localhost:8080/as/api";
    }
    else {
      path = "http://as-fitduell.rhcloud.com/api";
    }

    Restangular.setBaseUrl(path);
});
