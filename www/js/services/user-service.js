angular.module('challenger')

  .service('UserService', function ($q, Restangular) {
    return {
      findUserById: function (id) {
        var deferred = $q.defer();

        Restangular.one('users', id).get().then(function (user) {
          deferred.resolve(user);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },
      findUsersByNickname: function (likeNickname) {
        var deferred = $q.defer();

        Restangular.one('users').getList("findLikeNickname", {likeNickname: likeNickname}).then(function (users) {
          deferred.resolve(users);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },
      updateProfile: function (profile) {
        var deferred = $q.defer();

        Restangular.all('users').customPOST(profile).then(function (profile) {
          deferred.resolve(profile);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      },
      findMyFriends: function (userId) {
        var deferred = $q.defer();

        Restangular.all('users').one(userId, 'friends').getList().then(function (friends) {
          deferred.resolve(friends);
        }, function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  });
