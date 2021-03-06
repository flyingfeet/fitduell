angular.module('challenger')

  .controller('UserCtrl', function ($scope, $state, UserService) {
    $scope.searchUsers = function (searchQuery) {
      if (!searchQuery) {
        searchQuery = '';
      }
      var promise = UserService.findUsersByNickname(searchQuery);
      promise.then(function (users) {
        $scope.users = users;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.searchUsers($scope.searchQuery);
  })

  .controller('ProfileCtrl', function ($scope, $state, $cordovaToast, store, UserService) {
    $scope.checkFriendship = function () {
      var myId = store.get('fd_profile').id;
      var promise = UserService.checkFriendship(myId, $scope.profile.id);
      promise.then(function (friendship) {
        $scope.friendship = friendship;
        if (friendship && friendship.status === 'WAITING') {
          $scope.waiting = true;
        }
        $scope.loaded = true;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.newFriend = function (friendId) {
      var userId = store.get('fd_profile').id;

      var promise = UserService.createFriendship(userId, friendId);
      promise.then(function (friendship) {
        $scope.waiting = true;
        if (friendship) {
          $cordovaToast.showShortBottom("Freundschaftsanfrage gesendet");
          $scope.friendship = friendship;
        }
      }, function (err) {
        console.log(err);
      });
    }

    $scope.newChallenge = function () {
      $state.go('app.newChallenge');
    };

    $scope.checkFriendship();
  })

  .controller('FriendsCtrl', function ($scope, $state, $cordovaToast, store, UserService) {
    $scope.findMyFriends = function () {
      var userId = store.get('fd_profile').id;

      var promise = UserService.findMyFriends(userId);
      promise.then(function (friends) {
        $scope.friends = friends;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.acceptFriendship = function (friendshipId) {
      var userId = store.get('fd_profile').id;

      var promise = UserService.acceptFriendship(userId, friendshipId);
      promise.then(function (friends) {
        $scope.friends = friends;
        $cordovaToast.showShortBottom("Freundschaft aktzeptiert.");
      }, function (err) {
        console.log(err);
      });
    };

    $scope.declineFriendship = function (friendshipId) {
      var userId = store.get('fd_profile').id;

      var promise = UserService.deleteFriendship(userId, friendshipId);
      promise.then(function (friends) {
        $scope.friends = friends;
        $cordovaToast.showShortBottom("Freundschaft abgelehnt.");
      }, function (err) {
        console.log(err);
      });
    };

    $scope.findMyFriends();
  })

  .filter('FriendlistStatusFilter', function () {
    return function (list, status) {
      var result = [];

      angular.forEach(list, function (friendlist) {
        if (friendlist.status === status) {
          result.push(friendlist);
        }
      })

      return result;
    };
  })

  .filter('SearchResultFilter', function (store) {
    return function (list) {
      var result = [];

      angular.forEach(list, function (user) {
        if (user.nickname !== store.get('fd_profile').nickname) {
          result.push(user);
        }
      });

      return result;
    };
  });
