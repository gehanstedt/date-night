const debugOn = false;
var citylist =$("#city-list");
// var cities = [];

// Greg H change
// Shortening days
var weekday = new Array(7);
weekday[0] = "Sun";
weekday[1] = "Mon";
weekday[2] = "Tue";
weekday[3] = "Wed";
weekday[4] = "Thu";
weekday[5] = "Fri";
weekday[6] = "Sat";

//Rich M pull city from localstorage
if (localStorage.getItem("city") === null) {
    city = "Atlanta, GA";
  } else {
    city = localStorage.getItem("city");
  }
 var b = document.querySelector("#enter-city")
  b.setAttribute("value", city);
  
function myDebug (message) {
    if (debugOn === true) {
        console.log (message);
    }
}

$(document).ready(function() {

    // Greg H change
    // Default to having system load the default city
    beginSearch ();

    function parseAddress(address) {
        var returned = {};
        // city = address.Trim.Split(","c)(0);
        const [city, state] = address.split(',')
        // var returned = address.Split(',');
    returned.city = city
    returned.state = state 
    return returned 
    }

    function beginSearch () {
        var city = $("#enter-city").val().trim();
        // console.log(city)
        // Start over if no city entered
        if (city === "") {
            return;
        }
        //Rich M add save city to localstorage
        localStorage.setItem("city", city);
        address = parseAddress(city);
        showLoading ();
        getResponseWeather(address.city);
        getActivity(address, "restaurant");
        getActivity(address, "relaxingActivities");
        getActivity(address, "adventureActivities");
        getEvent(address);
    }

    // When enter key pressed
    $("#enter-city").keypress(function(event) { 
        if (event.keyCode === 13) { 
            // $("#search-button").click(); 
            beginSearch ();
            
        } 
    }); 

    //When search button clicked
    $("#search-button").on("click", function(event){
        event.preventDefault();
        beginSearch ();
    });

    function showLoading () {
        var counter;
        var rowElement;
        var divColumnElement;
        var divIconBlockElement;
        var h5Element;

        var pageSections = ["#restaurants",
                            "#relaxingActivities",
                            "#adventureActivities",
                            "#events"];

        for (counter = 0; counter < pageSections.length; counter ++) {
            // For each section, we will empty and put "Loading..." in for each
            $(pageSections[counter]).empty ();

            // Build div row for Loading...
            rowElement = $("<div>");
            rowElement.attr ("class", "row");
            $(pageSections[counter]).append (rowElement);
            divColumnElement = $("<div>");

            divColumnElement.attr ("class", "col s12 m12");
            rowElement.append (divColumnElement);

            divIconBlockElement = $("<div>");
            divIconBlockElement.attr ("class", "icon-block");
            divColumnElement.append (divIconBlockElement);

            h5Element = $("<h5>");
            h5Element.attr ("class", "center");
            divIconBlockElement.append (h5Element);
            h5Element.append (`Loading...`);
        }
    }
});
