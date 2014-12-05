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
      },
      findSports: function () {
        var deferred = $q.defer();

        Restangular.all('sports').getList().then(function (sports) {
          deferred.resolve(sports);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },
      createChallenge: function (challenge) {
        var deferred = $q.defer();

        Restangular.one('challenges').customPOST(challenge).then(function (challenge) {
          deferred.resolve(challenge);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  });
