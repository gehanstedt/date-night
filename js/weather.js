const debugOn = true;
var citylist =$("#city-list");
// var cities = [];
var key = "10bed3fd22a7204ac32c558e968d28f2";

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



$(document).ready(function() {

    // Greg H change
    // Default to having system load the default city
    $("#search-button").click();

    function myDebug (message) {
        if (debugOn === true) {
            console.log (message);
        }
    }

    function parseAddress(address) {
        var returned = {};
        // city = address.Trim.Split(","c)(0);
        const [city, state] = address.split(',')
        // var returned = address.Split(',');
    returned.city = city
    returned.state = state 
    return returned 
    }

    // When enter key pressed
    $("#enter-city").keypress(function(event) { 
        if (event.keyCode === 13) { 
            $("#search-button").click(); 
            
        } 
    }); 

    //When search button clicked
    $("#search-button").on("click", function(event){
        event.preventDefault();

        var city = $("#enter-city").val().trim();
        // Start over if no city entered
        if (city === "") {
            return;
        }
        address = parseAddress(city);
        getResponseWeather(address.city);
    });

    //Function to populate all the forecast data 
    function getResponseWeather(cityName){
            //Section to get forecast
            city=address.city;
            state=address.state;
            var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}%2c${state}%2c&appid=${key}`;
            // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

        myDebug ("here");
        $.ajax({
        url: queryURL,
        method: "GET",
        error:  function(xhr){
            // alert("An error occured: " + xhr.status + " " + xhr.statusText)
           // citydate = $("<h3>").text(cityName + " City not found");
           alert (`City ${citydate} not found.  Please check and re-enter`)
        // $("#weather-today").append(citydate);
        },
        }).then(function(response) {
            var CoordLon = response.coord.lon;
            var CoordLat = response.coord.lat;
        //   var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
            var queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?appid=${key}&lat=${CoordLat}&lon=${CoordLon}`;
                $.ajax({
                url: queryURL2,
                method: "GET",
                error:  function(xhr){
                    // alert("An error occured: " + xhr.status + " " + xhr.statusText)
                    citydate = $("<h3>").text(cityName + " City not found");
                //Greg H changes
                // Removing this append - this was for the Homework assignment
                // $("#weather-today").append(citydate);
                },
            }).then(function(respForecast) { 
                console.log(respForecast)
                // Greg H changes
                // Old clear out from Homework
                //  $("#boxes").empty();
                // Clear out below div forecast-results
                $(".forecast-results").empty ();

                for(var i=0, j=0; j<=6; i=i+1){
                    var read_date = respForecast.daily[i].dt;
                    if(respForecast.daily[i].dt != respForecast.daily[i+1].dt){
                        var forecastDiv = $("<div>");
                        // Greg H change
                        // Adding addition forecastCardDiv and forecastCardDivImage
                        var forecastCardDiv = $("<div>");
                        forecastCardDiv.attr ("class", "card");
                        var forecastCardImageDiv = $("<div>");
                        forecastCardImageDiv.attr ("class", "card-image");
                        var forecastCardContentDiv = $("<div>");
                        forecastCardContentDiv.attr ("class", "card-content");

                        // Greg H change
                        // Replacing homework class call with what front-end team needs
                        //forecastDiv.attr("class","col-3 m-2 bg-primary")
                        forecastDiv.attr("class","col s12 m3")
                        var d = new Date(0);
                        d.setUTCSeconds(read_date);
                        var date = d;
                        var month = date.getMonth()+1;
                        var day = date.getDate();  
                        var dayOfWeek = date.getDay();               

                        // Greg H changes
                        // var outday = (month<10 ? '0' : '') + month + '/' +
                        // (day<10 ? '0' : '') + day + '/' +
                        // date.getFullYear() + ' ' + weekday[dayOfWeek];

                        var outday = `${weekday[dayOfWeek]} ${(month<10 ? '0' : '') + month}/${(day<10 ? '0' : '') + day}`;

                        var forecasth4 = $("<h6>").text(outday);
                        // add image to forecast block
                        var imgtag = $("<img>");
                        var skyconditions = respForecast.daily[i].weather[0].main;

                        // GregH change
                        // Changing images to local images
                        if(skyconditions==="Clouds"){
                            imgtag.attr("src", "./img/cloudy.png")
                        } else if(skyconditions==="Clear"){
                            imgtag.attr("src", "./img/clear-day.png")
                        }else if(skyconditions==="Rain"){
                            imgtag.attr("src", "./img/rain.png")
                        }

                        var ptempK = respForecast.daily[i].temp.day;
                        var convtemp = parseInt((ptempK)* 9/5 - 459);
                        var tempP = $("<p>").text("High: "+ convtemp + " °F");
                        var ptempeveK = respForecast.daily[i].temp.eve;
                        var convtemp = parseInt((ptempeveK)* 9/5 - 459);
                        var tempeveP = $("<p>").text("Evening: "+ convtemp + " °F");
                        var humidityP = $("<p>").text("Humidity: "+ respForecast.daily[i].humidity + " %");

                        // Greg H change
                        // Modify appends for Date Night
                       
                        forecastDiv.append (forecastCardDiv);
                        forecastCardDiv.append (forecastCardImageDiv);
                        forecastCardDiv.append (forecastCardContentDiv);
                        forecastCardImageDiv.append (imgtag);
                        forecastCardContentDiv.append(forecasth4);
                        forecastCardContentDiv.append(tempP);
                        forecastCardContentDiv.append(tempeveP);
                        forecastCardContentDiv.append(humidityP);

                        myDebug ("Below appends");

                        // Greg H change
                        // Commenting out homework append
                        // $("#boxes").append(forecastDiv);
                        // Append main box to forecast-results
                        $(".forecast-results").append(forecastDiv);
                        j++;
                    }
                }
            })
            })
        };      
});