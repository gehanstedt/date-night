

$(".forecast-results").empty();
//console.log(tempvariable);
//$(".forecast-results").append(`<p>Temperature: ${tempvariable}</p>`)

var weathercard = $("<div>");
weathercard.addClass("col s12 m3");
weathercard.html(`
    <div class="card">
    <div class="card-image">
        <img class="responsive-img" src="img/rain.png">
    </div>
    <div class="card-content">
        <span class="card-title">Friday</span>          
        <p>Conditions:</p>
        <p>Temperature:</p>
        <p>Humidity:</p>
    </div>
    </div>
    </div>
`);
$(".forecast-results").append(weathercard);
var weathercard2 = $("<div>");
weathercard2.addClass("col s12 m3");
weathercard2.html(`
    <div class="card">
    <div class="card-image">
        <img class="responsive-img" src="img/sleet.png">    
    </div>
    <div class="card-content">
        <span class="card-title">Saturday</span>   
        <p>Conditions:</p>
        <p>Temperature:</p>
        <p>Humidity:</p>
    </div>
    </div>
    </div>
`);
$(".forecast-results").append(weathercard2);

var weathercard3 = $("<div>");
weathercard3.addClass("col s12 m3");
weathercard3.html(`
    <div class="card">
        <div class="card-image">
    <img class="responsive-img" src="img/partly-cloudy-day.png">
    </div>
    <div class="card-content">
        <span class="card-title">Sunday</span>   
        <p>Conditions:</p>
        <p>Temperature:</p>
        <p>Humidity:</p>
    </div>
    </div>
    </div>
`);
$(".forecast-results").append(weathercard3);