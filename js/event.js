let yelpKey = "2EHX3GUveumPzLs4NgLS2rXMePD42LPUEYIV3LvgGktQ5gHhvFJmFOjVRnQiBSMcll5howvZEJP3jiO1JHeyLcRF3pp5AN8tofIKyKqanmpbae77U9Dj0iofQ8OYX3Yx";

cityName="Atlanta,Ga"

//Function to populate all the forecast data 
function getResponseEvent(cityName){
        //Section to get forecast
/*         city=address.city;
        state=address.state; */
        let city = "Atlanta";
        let state = "Ga";
/*         let city = "Milwaukee";
        let state = "Wi"; */
        const currentNow = parseInt(Date.now() / 1000);
        console.log(currentNow);

        let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=${city}%2c%20${state}&start_date=${currentNow}`
/*         let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=${city}%2c%20${state}`; */
        // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}%2c${state}%2c&appid=${weatherKey}`;
        // var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}`;
        // let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=Atlanta,%20Ga";
        // let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?latitude=33.75&longitude=-84.39";

    // myDebug ("here");
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        headers: {
        'Authorization':'Bearer 2EHX3GUveumPzLs4NgLS2rXMePD42LPUEYIV3LvgGktQ5gHhvFJmFOjVRnQiBSMcll5howvZEJP3jiO1JHeyLcRF3pp5AN8tofIKyKqanmpbae77U9Dj0iofQ8OYX3Yx',
        },
    method: 'GET',
    dataType: 'json',
    error:  function(xhr){
        citydate = $("<h3>").text(cityName + "City not found for Events");
        alert("Error");
    },
    }).then(function(response) {
        for (i = 0; i < 3; i++) {
            eventName = response.events[i].name;
            eventDescription = response.events[i].description;
            eventSiteURL = response.events[i].event_site_url;
            eventCity = response.events[i].location.city;
            eventState = response.events[i].location.state;
            eventZip = response.events[i].location.zip_code;
            eventStartTime = response.events[i].time_start;
            eventEndTime = response.events[i].time_end;
            eventCategory = response.events[i].category;
            eventCost = response.events[i].cost;
            eventImageURL = response.events[i].image_url;
            eventAddress1 = response.events[i].location.address1;
            eventAddress2 = response.events[i].location.address2;
            eventAddress3 = response.events[i].location.address3;

            let eventStartDate = "";
            let eventStartTime1 = "";
            if (eventStartTime) {
                let [eventStartDate, timeStart] = eventStartTime.split('T');
                let [eventStartTime1, utcOffsetStart] = timeStart.split('-');
                console.log(`Start Date: ${eventStartDate}`);
                console.log(`Start Time: ${eventStartTime1}`);
            }

            let eventEndDate = "";
            let eventEndTime1 = "";
            if (eventEndTime) {
                let [eventEndDate, timeEnd] = eventEndTime.split('T');
                let [eventEndTime1, utcOffsetEnd] = timeEnd.split('-');
                console.log(`End Date: ${eventEndDate}`);
                console.log(`End Time: ${eventEndTime1}`);
            }
            

            console.log(`Name: ${eventName} `);
            console.log(`Description: ${eventDescription}`);
            console.log(`SiteURL: ${eventSiteURL}`);
            console.log(`ImageURL: ${eventImageURL}`);
            console.log(`Address1: ${eventAddress1} Address2: ${eventAddress2} Address3: ${eventAddress3}`);
            console.log(`City: ${eventCity} State: ${eventState} Zip: ${eventZip}`);
            console.log(`Start: ${eventStartTime} End: ${eventEndTime}`);
            console.log(`Category: ${eventCategory}`);
            console.log(`Cost: ${eventCost}`)
            console.log("-----------------------------------------------------")

        }

    console.log(response);

        });
    } 
    
    getResponseEvent(cityName);
