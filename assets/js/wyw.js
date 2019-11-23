function initMap() {
    map = new google.maps.Map(document.getElementById('mapInfo'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 10
    });
}

function getWeather() {
    var latitite = lat;
    var longitude = lng;

    var queryURL =
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/207373873e6e108e2eb572bb7cd0645d/" + latitite + "," + longitude + "/";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Create a new table row element

        console.log(response);
        var time = response.currently.time;
        var icon = response.currently.icon;

        var img = $("<img>");
        img.attr("src", "https://darksky.net/images/weather-icons/" + icon + ".png");
        $(".test").append(img);
        console.log(time);
        var empStartPretty = moment.unix(time).format("MM/DD/YYYY hh:mm:ss");
        console.log(empStartPretty);

    });

}
var city = $("#").val().trim();

var queryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyB5dx1l-uXDBY9Yg8GpMePGvo_QV_VoF1c"

var lat = 0;
var lng = 0;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    console.log(response.results[0].geometry.location);
    lat = response.results[0].geometry.location.lat;
    lng = response.results[0].geometry.location.lng;
    console.log(lat);
}).then(function () {

    getWeather();

}).then(function () {

    var map;
    initMap();
});