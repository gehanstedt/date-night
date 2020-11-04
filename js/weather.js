var weatherKey = "10bed3fd22a7204ac32c558e968d28f2";


//Function to populate all the forecast data 
function getResponseWeather(cityName){

        //Section to get forecast
        city=address.city;
        state=address.state;
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}%2c${state}%2c&appid=${weatherKey}`;

    myDebug ("here");
    $.ajax({
    url: queryURL,
    method: "GET",
    error:  function(xhr){

        var cityDate = cityName + " - City not found";
        
        $("#enter-city").val (cityDate);

    },
    }).then(function(response) {
 
        //Get longitude and latitude for query
        var CoordLon = response.coord.lon;
        var CoordLat = response.coord.lat;
        var queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherKey}&lat=${CoordLat}&lon=${CoordLon}`;

            $.ajax({
            url: queryURL2,
            method: "GET",
            error:  function(xhr){
                citydate = $("<h3>").text(cityName + " City not found");
            },
        }).then(function(respForecast) { 
            $(".forecast-results").empty ();

            //Display the weather forecast for the next 7 days
            for(var i=0, j=0; j<=6; i=i+1){
                var read_date = respForecast.daily[i].dt;
                if(respForecast.daily[i].dt != respForecast.daily[i+1].dt){
                    var forecastDiv = $("<div>");
                    var forecastCardDiv = $("<div>");
                    forecastCardDiv.attr ("class", "card");
                    var forecastCardImageDiv = $("<div>");
                    forecastCardImageDiv.attr ("class", "card-image");
                    var forecastCardContentDiv = $("<div>");
                    forecastCardContentDiv.attr ("class", "card-content");

                    forecastDiv.attr("class","col s12 m3")
                    var d = new Date(0);
                    d.setUTCSeconds(read_date);
                    var date = d;
                    var month = date.getMonth()+1;
                    var day = date.getDate();  
                    var dayOfWeek = date.getDay();               

                    var outday = `${weekday[dayOfWeek]} ${(month<10 ? '0' : '') + month}/${(day<10 ? '0' : '') + day}`;

                    var forecasth4 = $("<h6>").text(outday);
                    // add image to forecast block
                    var imgtag = $("<img>");
                    var skyconditions = respForecast.daily[i].weather[0].main;

                    //Determine which image icon will be used
                    if(skyconditions==="Clouds"){
                        imgtag.attr("src", "./img/cloudy.png")
                    } else if(skyconditions==="Clear"){
                        imgtag.attr("src", "./img/clear-day.png")
                    }else if(skyconditions==="Rain"){
                        imgtag.attr("src", "./img/rain.png")
                    }else if(skyconditions==="Snow"){
                        imgtag.attr("src", "./img/snow.png")
                    }

                    //Convert Kelvin to Faranheit and display - Display other information
                    var ptempK = respForecast.daily[i].temp.day;
                    var convtemp = parseInt((ptempK)* 9/5 - 459);
                    var tempP = $("<p>").text("High: "+ convtemp + " °F");
                    var ptempeveK = respForecast.daily[i].temp.eve;
                    var convtemp = parseInt((ptempeveK)* 9/5 - 459);
                    var tempeveP = $("<p>").text("Evening: "+ convtemp + " °F");
                    var humidityP = $("<p>").text("Humidity: "+ respForecast.daily[i].humidity + " %");
                    
                    //Display collected information through forecastDiv
                    forecastDiv.append (forecastCardDiv);
                    forecastCardDiv.append (forecastCardImageDiv);
                    forecastCardDiv.append (forecastCardContentDiv);
                    forecastCardImageDiv.append (imgtag);
                    forecastCardContentDiv.append(forecasth4);
                    forecastCardContentDiv.append(tempP);
                    forecastCardContentDiv.append(tempeveP);
                    forecastCardContentDiv.append(humidityP);

                    myDebug ("Below appends");

                    $(".forecast-results").append(forecastDiv);
                    j++;
                }
            }
        })
        })
    };      
