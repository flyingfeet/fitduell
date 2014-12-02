angular.module('challenger')

  .controller('UserCtrl', function ($scope, $state, UserService) {
    $scope.searchUsers = function (searchQuery) {
      var promise = UserService.findUsersByNickname(searchQuery);
      promise.then(function (users) {
        $scope.users = users;
      }, function (err) {
        console.log(err);
      });
    };

    if ($scope.searchQuery) {
      $scope.searchUsers($scope.searchQuery);
    }
  })

  .controller('ProfileCtrl', function ($scope, $state) {
    $scope.newChallenge = function () {
      $state.go('app.newChallenge');
    };
  })

  .controller('FriendsCtrl', function ($scope, $state, store, UserService) {
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
        console.log("Freundschaft aktzeptiert");
        $scope.friends = friends;
      }, function (err) {
        console.log(err);
      });
    };

    $scope.declineFriendship = function (id) {
      console.log(id);
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
