angular.module('challenger')

.controller('TimelineCtrl', function ($scope, $state, store, ChallengesService) {
  $scope.findMyAndMyFriendsChallenges = function () {
    var userId = store.get('fd_profile').id;

    var promise = ChallengesService.findMyAndMyFriendsChallenges(userId);
    promise.then(function (challenges) {
      $scope.timelineChallenges = challenges;
      console.log($scope.timelineChallenges);
    }, function (err) {
      console.log(err);
    });
  };


  $scope.findMyAndMyFriendsChallenges();

});
