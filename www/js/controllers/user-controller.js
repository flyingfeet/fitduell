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

  .controller('ProfileCtrl', function ($scope) {
  });
