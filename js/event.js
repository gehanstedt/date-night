let yelpKey = "2EHX3GUveumPzLs4NgLS2rXMePD42LPUEYIV3LvgGktQ5gHhvFJmFOjVRnQiBSMcll5howvZEJP3jiO1JHeyLcRF3pp5AN8tofIKyKqanmpbae77U9Dj0iofQ8OYX3Yx";

cityName="Atlanta,Ga"

function getEvent (cityObject) {
    var categ;
    var myurl;
    var cityst;

    getResponseEvent (cityObject);
}


//Function to populate all the forecast data 
function getResponseEvent(cityObject){
    const htmlSection = "#events";
    var rowElement;
    var divColumnElement;
    var divIconBlockElement;
    var aElement;
    var imgElement;
    var h5Element;
    var pElement;
        //Section to get forecast
/*         city=address.city;
        state=address.state; */
/*        let city = "Atlanta";
        let state = "Ga";
        */
/*         let city = "Milwaukee";
        let state = "Wi"; */
        const currentNow = parseInt(Date.now() / 1000);
        myDebug(currentNow);
        console.log (`State -->${cityObject.state}<--`);

        let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=${cityObject.city}%2c${cityObject.state.trim()}&start_date=${currentNow}`
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
        citydate = $("<h3>").text(cityObject.city + "City not found for Events");
        alert("Error");
    },
    }).then(function(response) {
        // Empty out the Events section
        $(htmlSection).empty ();

        if (response.events.length > 0) {
            // Build div row
            rowElement = $("<div>");
            rowElement.attr ("class", "row");
            $(htmlSection).append (rowElement);

            for (i = 0; i < response.events.length; i++) {
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
                    [eventStartDate, timeStart] = eventStartTime.split('T');
                    [eventStartTime1, utcOffsetStart] = timeStart.split('-');
                    console.log(`Start Date: ${eventStartDate}`);
                    console.log(`Start Time: ${eventStartTime1}`);
                }

                console.log(`Start Date: ${eventStartDate}`);


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

                divColumnElement = $("<div>");
                divColumnElement.attr ("class", "col s12 m4");
                rowElement.append (divColumnElement);

                divIconBlockElement = $("<div>");
                divIconBlockElement.attr ("class", "icon-block");
                divColumnElement.append (divIconBlockElement);

                imgElement = $("<img>");
                imgElement.attr ("src", eventImageURL);
                imgElement.attr ("class", "eventImage")
                divIconBlockElement.append (imgElement);

                h5Element = $("<h5>");
                h5Element.attr ("class", "center");
                divIconBlockElement.append (h5Element);

                aElement = $("<a>");
                aElement.attr ("href", eventSiteURL);
                aElement.attr ("target", "_newPage");
                aElement.text (eventName);
                h5Element.append (aElement);

                pElement = $("<p>");
                pElement.attr ("class", "light eventBullets");
                pElement.text (`${eventAddress1} ${eventCity}, ${eventState} ${eventZip}`);
                divIconBlockElement.append (pElement);



                if (eventCost === null) {
                    eventCost = "(unavailable)";
                }
                pElement = $("<p>");
                pElement.attr ("class", "light eventBullets");
                pElement.text (`Price: ${eventCost}`);
                divIconBlockElement.append (pElement);

                console.log (`GH event start date -->${eventStartDate}<--`);

                pElement = $("<p>");
                pElement.attr ("class", "light eventBullets");
                pElement.text (`Start Date: ${eventStartDate}`);
                divIconBlockElement.append (pElement);

                pElement = $("<p>");
                pElement.attr ("class", "light eventBullets");
                pElement.text (`${eventDescription}`);
                divIconBlockElement.append (pElement);
            }
        }
        console.log(response);
    });
} 
