
// var latitude = 35.994034;
// var longitude = -78.897634;

function initMap() {

   
    var queryURL = 'https://www.hikingproject.com/data/get-trails?lat='+ 
    latitude + '&lon='+ 
    longitude + '&maxResults=200&key=200310958-80eadbd0eda211e9f1bec2cca75b17cb';

    
 $.ajax({
     url:queryURL,
     method: "GET"
    }).then(function(response) {
     console.log(response);

     var trails = response.trails;

     console.log(trails);
     console.log(latitude);
     console.log(longitude);

      var myLatLng = {lat: 35.994034, lng: -78.897621};
      var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatLng
        });
        for (var i = 0; i < trails.length; i++) {
            new google.maps.Marker({
                position: { lat: response.trails[i].latitude, lng: response.trails[i].longitude},
                map: map,
                title: response.trails[i].name,
            });
        }
    }); 
}