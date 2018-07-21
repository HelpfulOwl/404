var lat = 35.834444;
var lon = -78.840821;


function APIcall(){
    var APIkey = "6d0904d150c48c780a450173fe05427a";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/6d0904d150c48c780a450173fe05427a/"+lat+","+lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        console.log(response);
        var summary = response.currently.summary; //summary is sunny, mostly cloudy, etc.
        var temp = response.currently.temperature;//in farenheit.
        var nsd = response.currently.nearestStormDistance; //distance is in kilometers. Need to convert.
        var cNSD = nsd*0.62;
        console.log("This is the summary: "+summary);
        console.log("This is the temperature: "+temp);
        console.log("This is the distance of the nearest storm: "+nsd);
        console.log("This is the converted NSD: "+cNSD);
    });
};

//function displayWeather ()


APIcall();
console.log("Your source is sauce!");

// K * 9/5 - 459.67; to convert kelving to fahrenheit.
//https://api.darksky.net/forecast/6d0904d150c48c780a450173fe05427a/[latitude],[longitude]
//current weather currently.temperature... currently.summary