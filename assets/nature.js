var hikingContainer = document.getElementById('hiking-info');

var btn = document.getElementById('btn');

btn.addEventListener('click', function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET' , ' url:https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200318881-809c3921fefd8ff6787a6926acbd003e'); 
    ourRequest.onload = function() {
      var coolData = JSON.parse(ourRequest.responseText);
      renderHTML(coolData);
    };
    ourRequest.send();
});

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++) {
        htmlString += "<p>" + data[i].name + "" + "";
    }
    hikingContainer.insertAdjacentElement('beforeend' , 'testing 123');
}


