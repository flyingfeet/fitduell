angular.module('challenger')

  .controller('LocationCtrl', function ($scope) {


 var mapDiv = document.getElementById("map_canvas");

  // Initialize the map plugin
  var map = plugin.google.maps.Map.getMap(mapDiv);

  //map.on(plugin.google.maps.event.MAP_READY, onMapInit);

  // $scope.onMapInit = function (map) {
  // };

    $scope.findMyAndMyFriendsChallenges();
  });
