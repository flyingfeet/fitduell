angular.module('challenger')

.controller('LocationCtrl', function ($scope, $cordovaGeolocation) {

$cordovaGeolocation
    .getCurrentPosition()
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
          console.log(lat+" "+long);
          $scope.map = { center: { latitude: lat, longitude: long }, zoom: 16 };

          $scope.marker = {
      id: 0,
      coords: {
        latitude: lat,
        longitude: long
      },options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };



    }, function(err) {
      // error
    });






});
