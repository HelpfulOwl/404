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
        var temperature = response.currently.temperature;//in farenheit.
        var nsd = response.currently.nearestStormDistance; //distance is in kilometers. Need to convert.
        var cNSD = nsd*0.62;//converts kilometers to miles.
        
        displayWeather(summary,temperature,cNSD);
    });
};

function displayWeather (sum, temperature, nsd) {
    $(".card-header").text("WEATHER");
    var cnsd = nsd.toFixed(1);//changes the number of decimal places to 1.
    var cTemp = temperature.toFixed(1);
    var summary = $("#summary");
    var temp = $("#temp");
    var near = $("#nsd");
    var title = $(".card-title");
    console.log(cnsd);

    title.text("Local Weather");

    summary.text(sum);
    temp.text(cTemp+" Farenheit");
    near.text("Storm is " +cnsd+" miles away.");
   
    console.log("display weather function has been called.");
    console.log("this is the summary: "+sum);
    console.log("this is temperature: "+temperature);
    console.log("this is the nearest storm distance (miles): "+nsd);
};


APIcall();


// K * 9/5 - 459.67; to convert kelving to fahrenheit.
//https://api.darksky.net/forecast/6d0904d150c48c780a450173fe05427a/[latitude],[longitude]
//current weather currently.temperature... currently.summary