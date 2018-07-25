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
        var time = response.currently.time; //this give 
        //console.log("TIME: ", moment.unix(time))//this give the current date.
        //console.log("DAY: ", 
        
        displayWeather(summary,temperature,cNSD);

        for (var i=0; i<3; i++){ //loop for 3 days of upcoming weather summary and temp.
            var dSum = response.daily.data[i+1].summary;//daily summary.
            var dTempH = response.daily.data[i+1].apparentTemperatureHigh;///daily High Temperature.
            var dTempL = response.daily.data[i+1].apparentTemperatureLow;//daily Low Temperature.
            var dTime = response.daily.data[i+1].time;
            var cTime = timeConverter(dTime);
            var wTime = $("#date"+i);
            var sum = $("#summary"+i);
            var temH = $("#tempHi"+i);
            var temL = $("#tempLo"+i);
            wTime.text(cTime);
            sum.text(dSum);
            temH.text(dTempH);
            temL.text(dTempL);    
        };
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
    
    title.text("Local Weather");

    summary.text(sum);
    temp.text(cTemp+" Farenheit");
    near.text("Storm is " +cnsd+" miles away.");
};

APIcall();


// K * 9/5 - 459.67; to convert kelving to fahrenheit.
//https://api.darksky.net/forecast/6d0904d150c48c780a450173fe05427a/[latitude],[longitude]
//current weather currently.temperature... currently.summary

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var cTime = date + ' ' + month;
    console.log(cTime);
    return cTime;
  };

  