// Javascript code to find restraurants and activies for the city.
//Initialize variables
function getActivity (cityObject, category) {
    var categ;
    var myurl;
    var cityst;

    switch (category) {
        case "restaurant":
            categ = "restaurant";
            htmlSection = "#restaurants";
            businessText = "Restaurants";
            break;

        case "relaxingActivities":
            categ = "galleries,wineries,festivals,planetarium,aquariums,cabaret";
            htmlSection = "#relaxingActivities";
            businessText = "Relaxing Activities";
            break;

        case "adventureActivities":
            categ = "escapegames,danceclubs,rockclimbing,axethrowing,hot_air_balloons,horsebackriding,hanggliding";
            htmlSection = "#adventureActivities";
            businessText = "Adventure Activities";
            break;
    }

    cityst = `${cityObject.city}%2c${cityObject.state}`;
    cityText = cityObject.city;

    myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${cityst}&categories=${categ}`;

    getCateg (myurl, htmlSection, businessText);
}

// get items in the requested category 
function getCateg(myurl, htmlSection, businessText){
    var rowElement;
    var divColumnElement;
    var divIconBlockElement;
    var aElement;
    var imgElement;
    var h5Element;
    var pElement;


$.ajax({
        url: myurl,
        headers: {
        'Authorization':'Bearer 3XzwL4fFle7tgIsU8oDOdoSiA_1E9VmWvzZ3NmAabPPGYPNWlUO7ukooR9uzuXwp6ieeSbHm6aeeQ3iUhKr8gL-7_7VgkKGgw4cT81gBiKQQ0-uq9YTe1m9ls4KXX3Yx',
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
        // Empty out the section based on the id
        myDebug (`HTML section: ${htmlSection}`);
        $(htmlSection).empty ();

        // Grab the results from the API JSON return
        myDebug(data)
        var totalresults = data.total;

        // If our results are greater than 0, continue
        if (totalresults > 0){
            // Build div row
            rowElement = $("<div>");
            rowElement.attr ("class", "row");
            $(htmlSection).append (rowElement);

            // currently i < 3 this returns 3 objects change it if you want more or less
            for(var i=0; i < 3; i++){

                //generate random number from 1 - number of businesses
                var x = Math.floor((Math.random() * data.businesses.length-1) + 1);
                item = data.businesses[x];
                var name = item.name;
                var address = item.location.address1;
                var city = item.location.city;
                var state = item.location.state;
                var zipcode = item.location.zip_code;
                var imageURL = item.image_url;
                if (typeof item.price !== 'undefined'){
                    var price = item.price;
                } else {
                    var price = "Unknown";
                };
                var rating = item.rating;
                var review_count = item.review_count;
                var url = item.url;
                myDebug(name)
                myDebug(address, city, state, zipcode)
                myDebug(price)
                myDebug(rating)
                myDebug(review_count)
                myDebug(imageURL)
                myDebug(url)

                divColumnElement = $("<div>");
                divColumnElement.attr ("class", "col s12 m4");
                rowElement.append (divColumnElement);

                divIconBlockElement = $("<div>");
                divIconBlockElement.attr ("class", "icon-block");
                divColumnElement.append (divIconBlockElement);

                imgElement = $("<img>");
                imgElement.attr ("src", imageURL);
                imgElement.attr ("class", "restaurantImage")
                divIconBlockElement.append (imgElement);

                h5Element = $("<h5>");
                h5Element.attr ("class", "center");
                divIconBlockElement.append (h5Element);

                aElement = $("<a>");
                aElement.attr ("href", url);
                aElement.attr ("target", "_newPage");
                aElement.text (name);
                h5Element.append (aElement);

                pElement = $("<p>");
                pElement.attr ("class", "light restaurantBullets");
                pElement.text (`${address} ${city}, ${state} ${zipcode}`);
                divIconBlockElement.append (pElement);

                pElement = $("<p>");
                pElement.attr ("class", "light restaurantBullets");
                pElement.text (`Price: ${price}`);
                divIconBlockElement.append (pElement);

                pElement = $("<p>");
                pElement.attr ("class", "light restaurantBullets");
                pElement.text (`Rating: ${rating}`);
                divIconBlockElement.append (pElement);

                pElement = $("<p>");
                pElement.attr ("class", "light restaurantBullets");
                pElement.text (`No. Reviews: ${review_count}`);
                divIconBlockElement.append (pElement);
            }; 

        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found

                // Build div row for error
                rowElement = $("<div>");
                rowElement.attr ("class", "row");
                $(htmlSection).append (rowElement);
                divColumnElement = $("<div>");

                divColumnElement.attr ("class", "col s12 m12");
                rowElement.append (divColumnElement);
    
                divIconBlockElement = $("<div>");
                divIconBlockElement.attr ("class", "icon-block");
                divColumnElement.append (divIconBlockElement);
    
                h5Element = $("<h5>");
                h5Element.attr ("class", "center");
                divIconBlockElement.append (h5Element);
                h5Element.append (`No ${businessText} found for ${cityText}`);
            }
        }
    });
};

