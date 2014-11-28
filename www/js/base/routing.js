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
          'menuContent': {
            templateUrl: "templates/login.html"
          }
        }
      })
      .state('app.searchUsers', {
        url: "/searchUsers",
        views: {
          'menuContent': {
            templateUrl: "templates/searchUsers.html",
            controller: "UserCtrl"
          }
        }
      })
      .state('app.checkMails', {
        url: "/checkMails",
        views: {
          'menuContent': {
            templateUrl: "templates/checkMails.html"
          }
        }
      })
      .state('app.myChallenges', {
        url: "/myChallenges",
        views: {
          'menuContent': {
            templateUrl: "templates/myChallenges.html"
          }
        },
        data: {
          requiresLogin: true
        }
      })
      .state('app.friends', {
        url: "/friends",
        views: {
          'menuContent': {
            templateUrl: "templates/friends.html"
          }
        },
        data: {
          requiresLogin: true
        }
      })
      .state('app.location', {
        url: "/location",
        views: {
          'menuContent': {
            templateUrl: "templates/location.html"
          }
        },
        data: {
          requiresLogin: true
        }
      })
      .state('app.myprofile', {
        url: "/myprofile",
        views: {
          'menuContent': {
            templateUrl: "templates/myprofile.html",
            controller: "MyProfileCtrl"
          }
        }
      })
      .state('app.home', {
        url: "/timeline",
        views: {
          'menuContent': {
            templateUrl: "templates/timeline.html",
            controller: 'TimelineCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/timeline');
  });
