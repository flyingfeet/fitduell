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
        },
        data: {
          requiresLogin: true
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
        abstract: true,
        views: {
          'menuContent': {
            templateUrl: "templates/myChallenges.html",
            controller: "ChallengesCtrl"
          }
        },
        data: {
          requiresLogin: true
        }
      })
      .state('app.myChallenges.list', {
        url: "/list",
        templateUrl: "templates/myChallenges.list.html"
      })
      .state('app.myChallenges.details', {
        url: "/{id}",
        templateUrl: "templates/myChallenges.details.html"
      })
      .state('app.newChallenge', {
        url: "/newChallenge",
        views: {
          'menuContent': {
            templateUrl: "templates/newChallenge.html",
            controller: "ChallengeCreator"
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
      .state('app.profile', {
        url: "/profile",
        views: {
          'menuContent': {
            templateUrl: "templates/profile.html",
            controller: "ProfileCtrl"
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
        },
        data: {
          requiresLogin: true
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
  })
;
