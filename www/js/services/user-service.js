angular.module('challenger')

.service('UserService', function($q, Restangular) {
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
    updateProfile: function (profile) {
      var deferred = $q.defer();

      console.log(profile);

      Restangular.all('users').customPOST(profile).then(function (profile) {
        deferred.resolve(profile);
      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }
  };
});
