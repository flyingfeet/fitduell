angular.module('challenger')

.controller('LocationCtrl', function ($scope, $cordovaGeolocation) {


  $cordovaGeolocation.getCurrentPosition().then(function (position) {
    var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: currentPosition,
      zoom: 15,
      offsetWidth: 0
    });

    var myPosition = new google.maps.Marker({
      map: $scope.map,
      position: currentPosition
    });

    $scope.getPlaces(position.coords.latitude,position.coords.longitude);

  }, function(err) {
      // error
    });



  $scope.getPlaces = function(lat,long){

    var request = {
      location: {
        lat: lat,
        lng: long
      },
      radius: 5000,
      types: ['gym']
    };
    $scope.infoWindow = new google.maps.InfoWindow();
    $scope.service = new google.maps.places.PlacesService($scope.map);

    $scope.service.nearbySearch(request, callback);
  }

  var callback = function (results, status) {

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  var createMarker = function (place) {
    var image = 'img/gym.png';

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: place.geometry.location,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
     $scope.service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      var infoContent = "<h4>"+result.name+"</h4>"+result.vicinity;


      $scope.infoWindow.setContent(infoContent);
      $scope.infoWindow.open($scope.map, marker);
    });
   });
  }



});
