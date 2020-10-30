var citylist =$("#city-list");
// var cities = [];
var key = "10bed3fd22a7204ac32c558e968d28f2";

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

//Format for day
function FormatDay(date){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var outday = (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day + '/' +
        date.getFullYear() ;
    return outday;
}

// function parseAddress(address) {
    // Make sure the address is a string.
    // if (typeof address !== "string") throw "Address is not a string.";
    // Trim the address.
    //  address = address.trim();
    // Make an object to contain the data.
    // var returned = {};
    // Find the comma.
    // var comma = address.indexOf(',');
    // Pull out the city.
    // returned.city = address.slice(0, comma);
    // Get everything after the city.
    // var after = address.substring(comma + 2); // The string after the comma, +2 so that we skip the comma and the space.
    // Find the space.
    // var space = after.lastIndexOf(' ');
    // Pull out the state.
    // returned.state = after.slice(0, space);
    // Pull out the zip code.
  //  returned.zip = after.substring(space + 1);
    // Return the data.
    // return returned;
// }

function parseAddress(address) {
    var returned = {};
    // city = address.Trim.Split(","c)(0);
    const [city, state] = address.split(',')
    // var returned = address.Split(',');
   returned.city = city
   returned.state = state 
   return returned 
}

$("#enter-city").keypress(function(event) { 
    if (event.keyCode === 13) { 
        $("#city-add").click(); 
    } 
}); 


  //When search button clicked
  $("#city-add").on("click", function(event){
      event.preventDefault();

//need to split city and state
    // Get the ciy
    var city = "atlanta";
    var state = "ga"
    var city = $("#enter-city").val().trim();
    // Start over if no city entered
    if (city === "") {
        return;
    }
    address = parseAddress(city);
    //getResponseWeather(city)
    getResponseWeather(address.city);
    // getResponseWeather(address);
  });

  //Function to populate all the forecast data 
  
  function getResponseWeather(cityName){

    //Clear content of weather-today
    // $("#weather-today").empty();
        //Section to get forecast
        city=address.city;
        state=address.state;
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}%2c${state}%2c&appid=${key}`;
        // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
           //Clear content of weather-today
    // $("#weather-today").empty();
    $.ajax({
      url: queryURL,
      method: "GET",
      error:  function(xhr){
        // alert("An error occured: " + xhr.status + " " + xhr.statusText)
        citydate = $("<h3>").text(cityName + " City not found");
      $("#weather-today").append(citydate);
    },
    }).then(function(response) {
        console.log(response)
        var CoordLon = response.coord.lon;
        var CoordLat = response.coord.lat;
     //   var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
         var queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?appid=${key}&lat=${CoordLat}&lon=${CoordLon}`;
//   console.log(queryURL2)
             $.ajax({
             url: queryURL2,
             method: "GET"
         }).then(function(respForecast) { 
             console.log(respForecast)
             $("#boxes").empty();
             for(var i=0, j=0; j<=6; i=i+1){
                 var read_date = respForecast.daily[i].dt;
                 if(respForecast.daily[i].dt != respForecast.daily[i+1].dt){
                    var forecastDiv = $("<div>");
                    forecastDiv.attr("class","col-3 m-2 bg-primary")
                    var d = new Date(0);
                    d.setUTCSeconds(read_date);
                    var date = d;
                    var month = date.getMonth()+1;
                    var day = date.getDate();  
                    var dayOfWeek = date.getDay();
                    console.log(weekday[dayOfWeek])               
                    var outday = (month<10 ? '0' : '') + month + '/' +
                    (day<10 ? '0' : '') + day + '/' +
                    date.getFullYear() + ' ' + weekday[dayOfWeek];
                    var forecasth4 = $("<h6>").text(outday);
                    // add image to forecast block
                    var imgtag = $("<img>");
                    var skyconditions = respForecast.daily[i].weather[0].main;
                    if(skyconditions==="Clouds"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if(skyconditions==="Clear"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    }else if(skyconditions==="Rain"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }

                    var ptempK = respForecast.daily[i].temp.day;
                    var convtemp = parseInt((ptempK)* 9/5 - 459);
                    var tempP = $("<p>").text("High temperature: "+ convtemp + " °F");
                    var ptempeveK = respForecast.daily[i].temp.eve;
                    var convtemp = parseInt((ptempeveK)* 9/5 - 459);
                    var tempeveP = $("<p>").text("Evening temperature: "+ convtemp + " °F");
                    var humidityP = $("<p>").text("Humidity: "+ respForecast.daily[i].humidity + " %");
                    forecastDiv.append(forecasth4);
                    forecastDiv.append(imgtag);
                    forecastDiv.append(tempP);
                    forecastDiv.append(tempeveP);
                    forecastDiv.append(humidityP);
                    $("#boxes").append(forecastDiv);
                    j++;
                 }
             }
         })
        })
    };      
