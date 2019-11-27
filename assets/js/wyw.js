var city = "";
var cityList = [];

var firebaseConfig = {
    apiKey: "AIzaSyA_HKdaGvOZxcYv5ODVcDwxqaxWSRETSeA",
    authDomain: "wyw-test-5a215.firebaseapp.com",
    databaseURL: "https://wyw-test-5a215.firebaseio.com",
    projectId: "wyw-test-5a215",
    storageBucket: "wyw-test-5a215.appspot.com",
    messagingSenderId: "116809492534",
    appId: "1:116809492534:web:cc275ff07dca9f4e829097"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref().update({
    city: city,
    cityList: cityList
});

function createButtons() {

    database.ref().on("value", function (snapshot) {
        cityList = snapshot.val().cityList;
        console.log(cityList);
        $("#buttonRow").empty();
        for (var i = 0; i < cityList.length; i++) {
            var cityButton = $("<button>");
            cityButton.attr("id", "city-name");
            cityButton.addClass("btn btn-primary");
            cityButton.attr("data-name", cityList[i]);
            cityButton.text(cityList[i]);
            $("#buttonRow").append(cityButton);
        }
    })
}

function initMap() {
    map = new google.maps.Map(document.getElementById('mapInfo'), {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 15
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
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
        var temp = Math.round(response.currently.temperature);

        $(".test").empty();

        var empStartPretty = moment.unix(time).format("LT");
        console.log(empStartPretty);
        var localTIme = $("<p>");
        localTIme.text("Local Time: " + empStartPretty);
        var tempT = $("<p>");
        tempT.text("Temperature: " + temp + "°");

        var img = $("<img>");
        img.attr("src", "https://darksky.net/images/weather-icons/" + icon + ".png");
        $(".test").append(img);
        $(".test").append(localTIme);
        $(".test").append(tempT);

        var extended = $("<table>");
        $(".test").append(extended);

        var head = $("<thead>");
        var headRow = $("<tr>");
        var headTime = $("<th>Hour</th>");
        var headTemp = $("<th>Temperature</th>");
        var headIcon = $("<th>");
        headRow.append(headTime, headTemp, headIcon);
        head.append(headRow);
        extended.append(head);

        var tbody = $("<tbody>");
        extended.append(tbody);


        for (var i = 1; i < 6; i++) {
            var newHR = $("<tr>");

            var HRTime = $("<td>").text(moment.unix(response.hourly.data[i].time).format("LT"));
            var HRTemp = $("<td>").text(Math.round(response.hourly.data[i].temperature) + "°");
            var HRIcon = $("<img>");
            var icon = response.hourly.data[i].icon;
            HRIcon.attr("src", "https://darksky.net/images/weather-icons/" + icon + ".png");
            HRIcon.attr("width", "50px");
            HRIcon.attr("height", "50px");



            newHR.append(HRTime, HRTemp, HRIcon);
            tbody.append(newHR);

        }



        console.log(time);
        v

    });

}

var lat = 0;
var lng = 0;

$(document).on("click", "#city-name", buttonWeather);


function buttonWeather() {

    city = $(this).attr("data-name");

    $("#traffic").text("Today's Traffic Conditions in " + city);
    $("#weather").text("Weather Forecast in " + city);

    var queryURL =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyB5dx1l-uXDBY9Yg8GpMePGvo_QV_VoF1c"

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

};

$("#addCity").on("click", function (event) {
    city = $("#cityText").val().trim();
    cityList.push(city);

    database.ref().update({
        city: city,
        cityList: cityList
    });

    $("#traffic").text("Today's Traffic Conditions in " + city);
    $("#weather").text("Weather Forecast in " + city);

    $("#cityText").val("");
    createButtons();

    var queryURL =
        "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key=AIzaSyB5dx1l-uXDBY9Yg8GpMePGvo_QV_VoF1c"


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

});