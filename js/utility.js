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
        // Start over if no city entered
        if (city === "") {
            return;
        }
        address = parseAddress(city);
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
});
