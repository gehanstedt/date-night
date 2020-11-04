let yelpKey = "2EHX3GUveumPzLs4NgLS2rXMePD42LPUEYIV3LvgGktQ5gHhvFJmFOjVRnQiBSMcll5howvZEJP3jiO1JHeyLcRF3pp5AN8tofIKyKqanmpbae77U9Dj0iofQ8OYX3Yx";

cityName="Atlanta,Ga"

function getEvent (cityObject) {
    var categ;
    var queryURL;
    var cityst;

    getResponseEvent (cityObject);
}


//Function to populate all the forecast data 
function getResponseEvent(cityObject){
    var htmlSection = "#events";
    var rowElement;
    var divColumnElement;
    var divIconBlockElement;
    var aElement;
    var imgElement;
    var h5Element;
    var pElement;

    const currentNow = parseInt(Date.now() / 1000);

    cityst = `${cityObject.city}%2c${cityObject.state}`;

    queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=${cityst}&start_date=${currentNow}`

    $.ajax({
        url: queryURL,
        headers: {
        'Authorization':'Bearer 2EHX3GUveumPzLs4NgLS2rXMePD42LPUEYIV3LvgGktQ5gHhvFJmFOjVRnQiBSMcll5howvZEJP3jiO1JHeyLcRF3pp5AN8tofIKyKqanmpbae77U9Dj0iofQ8OYX3Yx',
        },
    method: 'GET',
    dataType: 'json',

    }).then(function(response) {
        // Empty out the Events section
        $(htmlSection).empty ();

        if (response.events.length > 0) {
            // Build div row for the 3 events
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

                //Parse the Start Date from the response object
                let eventStartDate = "";
                let eventStartTime1 = "";
                if (eventStartTime) {
                    [eventStartDate, timeStart] = eventStartTime.split('T');
                    [eventStartTime1, utcOffsetStart] = timeStart.split('-');
                }

                //Parse the Start Date from the response object
                let eventEndDate = "";
                let eventEndTime1 = "";
                if (eventEndTime) {
                    let [eventEndDate, timeEnd] = eventEndTime.split('T');
                    let [eventEndTime1, utcOffsetEnd] = timeEnd.split('-');
                }

                //Build the columns with the Name, image, site_url, price/cost, description for the html
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

                pElement = $("<p>");
                pElement.attr ("class", "light eventBullets");
                pElement.text (`Start Date: ${eventStartDate}`);
                divIconBlockElement.append (pElement);

                pElement = $("<p>");
                pElement.attr ("class", "light eventBullets");
                pElement.text (`${eventDescription}`);
                divIconBlockElement.append (pElement);
            }
        } else {
            // Build div row for error
            rowElement = $("<div>");
            rowElement.attr ("class", "row");
            $(htmlSection).append (rowElement);
            divColumnElement = $("<div>");
            // Greg H mod - changing from col s12 m4 to col s12 m12
            divColumnElement.attr ("class", "col s12 m12");
            rowElement.append (divColumnElement);

            divIconBlockElement = $("<div>");
            divIconBlockElement.attr ("class", "icon-block");
            divColumnElement.append (divIconBlockElement);

            h5Element = $("<h5>");
            h5Element.attr ("class", "center");
            divIconBlockElement.append (h5Element);
            h5Element.append (`No Events found for ${cityObject.city}`);
            
        }
    });
} 
