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
        $("#city-add").click(); 
    } 
}); 

  //When search button clicked
  $("#city-add").on("click", function(event){
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
    $.ajax({
      url: queryURL,
      method: "GET",
      error:  function(xhr){
        // alert("An error occured: " + xhr.status + " " + xhr.statusText)
        citydate = $("<h3>").text(cityName + " City not found");
      $("#weather-today").append(citydate);
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
              $("#weather-today").append(citydate);
            },
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
