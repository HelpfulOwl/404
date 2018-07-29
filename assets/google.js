
    //*****************Geolocation on load****************** */
    var trailArray = [];
    

//generates google map and finds current location
function initAutocomplete() {
    var map, infoWindow;
    // function initMap() {
      map = new google.maps.Map(document.getElementById('googleMap'), {
        center: {lat: 35.994034, lng: -78.898621},

        zoom: 10
      });
      infoWindow = new google.maps.InfoWindow;


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

    
        
        //console.log(google);
        
        // Create the search box and link it to the UI element.
        var input = document.getElementById('mapSearch');
        var searchBox = new google.maps.places.SearchBox(input);
        
        
      
        
        
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());

            var wLat =map.center.lat();
            var wLong = map.center.lng();
    
            APIcall(wLat, wLong);


             //*****************placing multiple markers on a map******************** */
            var googleLat = map.center.lat();
            var googleLong = map.center.lng();
            //console.log("eventlistener Lat" + googleLat);
            //console.log("eventlistener long" + googleLong);          
            var queryURL = 'https://www.hikingproject.com/data/get-trails?lat='+ 
            googleLat + '&lon='+ 
            googleLong + '&maxResults=77&key=200310958-80eadbd0eda211e9f1bec2cca75b17cb';
        
            
         $.ajax({
             url:queryURL,
             method: "GET"
            }).then(function(response) {
             //console.log(response);
        
             var trails = response.trails;
        
             //console.log(trails);
            
                for (let i = 0; i < trails.length; i++) {
                    var trailMarker = new google.maps.Marker({
                        position: { lat: response.trails[i].latitude, lng: response.trails[i].longitude},
                        map: map,
                        title: "" + response.trails[i].name + '\n' + 'Rating: ' + response.trails[i].stars,
                        
                      });
                      trailMarker.addListener('click', function() {
                        //console.log(i);
                        $('#trailPhoto').attr("src", response.trails[i].imgMedium);
                        $('#trailInfo').text("Trail name: " + response.trails[i].name + '\n' + 
                        "Trail length: " + response.trails[i].length + '\n' +
                        "Summary: " + response.trails[i].summary + '\n' + 
                        "Rating: " + response.trails[i].stars + "/5"+ '\n' +
                        "Location: " + response.trails[i].location);

                        
                        
                      $("#saveButton").on("click", function (){ //placed ID and name into Object and then into array, then to local storage.
                        var trailObj = {};
                        var trailID = response.trails[i].id;
                        var trailName = response.trails[i].name;
                        trailObj.trail = trailID;
                        trailObj.name = trailName;
                        trailArray.push(trailObj);
                        localStorage.setItem("trail",JSON.stringify(trailArray));
                        $("#saveButton").off("click");
                        

                      
                      //     var listing = $("#saved-body");
                      //     //listing.append(`<li data-id=${listItems[i].trail}>${listItems[i].name}</li>`);
                      //     //`<li>${name}</li>`//use this syntax directly above.
                      //     $("li").on("click",function(){
                      //       var test = $(this).attr("data-id");
                            
                      //     });
                      // };
                        //saves multiple times. unclear as to why. 
                        // the first save works well, the 2nd will savve the 1st and the second...so on.
                      });//closes saveButton click handler.
                     
                      });
                     
                   }
                   
                       
                      
                        
                      
            }); 
           
            //***********************space for hiking information******************** */

        });
        if(!!localStorage.getItem("trail") ){
          var listItems =JSON.parse( localStorage.getItem("trail"));
         
          console.log(listItems);                               
          }

        
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
          console.log("THIS: "+bounds);
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
}


