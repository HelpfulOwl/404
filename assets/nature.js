$.ajax({
    url:https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200318881-809c3921fefd8ff6787a6926acbd003e,
    method: "GET"
}).then(function(response){

})


// $(document).ready(function () {
//     var textBoxes = $('input[type="text"]');
//     textBoxes.focus(function () {
//         var helpDiv = $(this).attr('id');
//         $.get('GetHelpText.aspx', { HelpTextKey: helpDiv }, function (response) {
//             $('#' + helpDiv + 'HelpDiv').html(response.Text);
//         }, 'json');
//     });
