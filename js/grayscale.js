/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $(".navbar-collapse").collapse('hide');
});

///////////////////////////////////////////////////////
///////           ORIGINAL CODE                 ///////
///////////////////////////////////////////////////////

//Global Varialbes
var globalLatitude = 0;
var globalLongitude = 0;
var allWeatherData = "pete";
var tempUnits = "F";

//Function to be called at the begining, to start the chain linked process
// #1 - Check if we can gather the location, 
//    if so....#2
function getLocation() {
    console.log("getLocation");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);//on to #2
    } else {
        document.getElementById("city").innerHTML = "Geolocation is not supported by this browser.";
        document.getElementById("state").innerHTML = "";
        document.getElementById("zip-code").innerHTML = "";
    }
}

// #2 - pull the coorinates
//    and then ....#3
function getCoordinates(position) {
    console.log("getCoordinates");
    console.log(position)
    //Store the coordinates in the global Variables
    globalLatitude = position.coords.latitude;
    globalLongitude = position.coords.longitude;

    //Pass the global var
    getWeatherData(globalLatitude, globalLongitude);//on to #3

    console.log("In getCoordinated()");


    }


// #3 - With those coordinates, get the weather data
//    and then...#4
var darkSkyKey = "441c0bd9cb9ae96d3ff415ec389a1f12";

function getWeatherData(lat,lon){
  console.log("getWeatherData");
    
  var testURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyKey + "/" + lat + "," + lon;
  //added the follow for to overcome security issues - "https://cors-anywhere.herokuapp.com/"+...rest of url
  

//Store the Data as an object {} in allWeatherData+ n
    $.getJSON(testURL, function(json) {
      //bring in the data with stringify
      var stringWeatherData = JSON.stringify(json);
            
      //convert new string into a usable javascript object
      //Pass parsed to display function
      displayParty(JSON.parse(stringWeatherData));
    });
}

// #4 - With those coordinates, get the location data
//    and then...#4
var wunderKey = "385139cc6ee320bb";
  

function getCity(){
  console.log("getCity");
    
  var locationTestURL = "https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/" + wunderKey + "/geolookup/q/autoip.json";
  //added the follow for to overcome security issues - "https://cors-anywhere.herokuapp.com/"+...rest of url
  

//Store the Data as an object {} in allWeatherData+ n
    $.getJSON(locationTestURL, function(pjson) {
      //bring in the data with stringify
      var locationData = JSON.stringify(pjson);
            
      //convert new string into a usable javascript object
      //Pass parsed to display function
      displayLocation(JSON.parse(locationData));
    });
    
}

function displayParty(data){
    console.log("dataParty");
    console.log(data);
    getCity();
    displayTemp(data);
    displayWeatherCondition(data);

}


function displayLocation(localWeatherData){
    console.log(localWeatherData);
    document.getElementById("city").innerHTML = localWeatherData.location.city;
    document.getElementById("state").innerHTML = localWeatherData.location.state;
}

function displayTemp(localWeatherData){
    document.getElementById("temperature").innerHTML = Math.floor(localWeatherData.currently.apparentTemperature);
    document.getElementById("temp-units").innerHTML = "F";
    document.getElementById("dew-point").innerHTML = Math.floor(localWeatherData.currently.dewPoint);
    document.getElementById("dew-point-units").innerHTML = "F"; 
}

function displayWeatherCondition(localWeatherData){
    document.getElementById("weather-condition").innerHTML = localWeatherData.currently.summary;
    displayIcon(localWeatherData.currently.icon);
}

/////Need a bank of images to display based on the following key words - icon optional
//clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night. 
///make a switch funciton - 

function displayIcon(currentCondition){
    console.log(currentCondition);
    var imgLocation = "";

        switch (currentCondition) {
        case "clear-day":
            imgLocation = "img/icons8-summer.png";
            break;
        
        case "clear-night":
            imgLocation = "img/icons8-bright_moon.png";
            break;
        
        case "rain":
            imgLocation = "img/icons8-rain.png";
            break;

        case "snow":
            imgLocation = "img/icons8-snow.png";
            break;
        
        case "sleet":
            imgLocation = "img/icons8-sleet.png";
            break;
        
        case "wind":
            imgLocation = "img/icons8-windy_weather.png";
            break;
        
        case "fog":
            imgLocation = "img/icons8-fog_day.png";
            break;
        
        case "cloudy":
            imgLocation = "img/icons8-clouds.png";
            break;
        
        case "partly-cloudy-day":
            imgLocation = "img/icons8-partly_cloudy_day.png";
            break;

        case "partly-cloudy-night":
            imgLocation = "img/icons8-partly_cloudy_night.png";
            break;     
        }
    document.getElementById("img-html").innerHTML = "<img src=\"" + imgLocation + "\" style=\"width:96px;height:96px;\">";
}


//Functions to convert celcius to farenhitte and the reverse
//Runs when you click the button
function convertTempUnits(){
    console.log(tempUnits);
    if (tempUnits == "F"){
        document.getElementById("temperature").innerHTML = tempFtoC(document.getElementById("temperature").innerHTML);
        document.getElementById("temp-units").innerHTML = "C"; //default set to farenhite - &#8457; or &#8451;
        document.getElementById("dew-point").innerHTML = tempFtoC(document.getElementById("dew-point").innerHTML);
        document.getElementById("dew-point-units").innerHTML = "C";
    }else{
        document.getElementById("temperature").innerHTML = tempCtoF(document.getElementById("temperature").innerHTML);
        document.getElementById("temp-units").innerHTML = "F"; //default set to farenhite - &#8457; or &#8451;<
        document.getElementById("dew-point").innerHTML = tempCtoF(document.getElementById("dew-point").innerHTML);
        document.getElementById("dew-point-units").innerHTML = "F";

    }
}

function tempCtoF(tempC){
  var tempF = tempC*1.8+ 32;
  tempUnits = "F";
  return Math.floor(tempF);
}

function tempFtoC(tempF){
  var tempC = (tempF-32)/1.8;
  tempUnits = "C";
  return Math.floor(tempC);
}


//var darkSkyKey= "441c0bd9cb9ae96d3ff415ec389a1f12";
//var openMapKey="3414076c0716d0a82912896c828874cb";
//var apixuWeatherKey="45a0c2a9806b42c1a78134702171905";


