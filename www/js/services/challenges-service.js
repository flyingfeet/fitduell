angular.module('challenger')

  .service('ChallengesService', function ($q, Restangular) {
    return {
      findMyChallenges: function (userId) {
        var deferred = $q.defer();

        Restangular.all('challenges').one('user', userId).getList().then(function (challenges) {
          deferred.resolve(challenges);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },
      findMyAndMyFriendsChallenges: function (userId) {
        var deferred = $q.defer();

        Restangular.all('challenges').one('user', userId).getList('timeline').then(function (challenges) {
          deferred.resolve(challenges);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  })
;
