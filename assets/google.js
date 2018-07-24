




// function initMap() {
//     // The location of Uluru
//     var uluru = {lat: -25.344, lng: 131.036};
//     // The map, centered at Uluru
//     var map = new google.maps.Map(
//         document.getElementById('map'), {zoom: 4, center: uluru});
//     // The marker, positioned at Uluru
//     var marker = new google.maps.Marker({position: uluru, map: map});
//   }


    //declaring lat and long variable for future manipulation
//generates google map and finds current location
function initAutocomplete() {

    var latitude = 35.994034;
    var longitude = -78.898621;

        // var mapData = {
        //     location: 
        // }
    //*****************Geolocation on load****************** */
    var map, infoWindow;
    // function initMap() {
      map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: latitude, long: longitude},

//generates google map and finds current location
function initAutocomplete() {
    var map, infoWindow;
    // function initMap() {
      map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 35.994034, lng: -78.898621},

        zoom: 10
      });
      infoWindow = new google.maps.InfoWindow;


    //   function initMap(){
    //   //adding markers on map
    //   var location = {lat: latitude, long: longitude},
    //   var marker = new google.maps.Marker({position: location, map: map});
    //     }
    //     initMap();


      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Current Location');
          infoWindow.open(map);
          map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    // }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    //******************Search Box*********************/

    //search function for google maps
    // $("#searchButton").on("click",
    // var map = new google.maps.Map(document.getElementById('googleMap'), {
    //         center: {lat: 28.38, lng: 81.56},
    //         zoom: 13,
    //         mapTypeId: 'roadmap'
        // });
        console.log(google);
        // Create the search box and link it to the UI element.
        var input = document.getElementById('mapSearch');
        var searchBox = new google.maps.places.SearchBox(input);
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });
        
        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });


        //*****************placing multiple markers on a map******************** */
      function initialize() {
        // var center = new google.maps.LatLng(latitude, longitude);

        // var center = pos;
    
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: center,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var markers = [];
        for (var i = 0; i < 100; i++) {
          var location = mapData.location[i];
          var latLng = new google.maps.LatLng(location.latitude,
              location.longitude);
          var marker = new google.maps.Marker({
            position: latLng
          });
          markers.push(marker);
        }
        var markerCluster = new MarkerClusterer(map, markers);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    }
    //   function initMap() {
    //     var location = {lat: latitude, long: longitude};
    //     // The map, centered at Uluru
    //     var map = new google.maps.Map(
    //         document.getElementById('googleMap'), {zoom: 4, center: location});
    //     // The marker, positioned at Uluru
    //     var marker = new google.maps.Marker({position: location, map: map});
    //     }
    //     initMap();
    // );
    // initMap(35, -78);

