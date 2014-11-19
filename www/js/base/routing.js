angular.module('challenger')

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent' :{
        templateUrl: "templates/login.html"
      }
    }
  })
  .state('app.search', {
    url: "/search",
    views: {
      'menuContent' :{
        templateUrl: "templates/search.html"
      }
    }
  })
  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent' :{
        templateUrl: "templates/browse.html"
      }
    },
    data: {
      requiresLogin: true
    }
  })
  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent' :{
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl"
      }
    }
  })
  .state('app.home', {
    url: "/playlists",
    views: {
      'menuContent' :{
        templateUrl: "templates/playlists.html",
        controller: 'PlaylistsCtrl'
      }
    }
  })
  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent' :{
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
