//create categ which will hold different categories to search on yelp
//var categ = "restaurant"
// var categ = "galleries,wineries,festivals,planetarium,aquariums,cabaret";
// var categ = "escapegames,danceclubs,rockclimbing,axethrowing,hot_air_balloons,horsebackriding,hanggliding";

//cityst = "atlanta,ga"
//  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Atlanta,categories=restaurant";
//  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=30041";
// var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=atlanta&categories=galleries,wineries";
//var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${cityst}&categories=${categ}`;
//console.log(myurl)

function getActivity (cityObject, category) {
    var categ;
    var myurl;
    var cityst;

    switch (category) {
        case "restaurant":
            categ = "restaurant";
            htmlSection = "#restaurants";
            break;

        case "relaxingActivities":
            categ = "galleries,wineries,festivals,planetarium,aquariums,cabaret";
            htmlSection = "#relaxingActivities";
            break;

        case "adventureActivities":
            categ = "escapegames,danceclubs,rockclimbing,axethrowing,hot_air_balloons,horsebackriding,hanggliding";
            htmlSection = "#adventureActivities";
            break;
    }

    cityst = `${cityObject.city}%2c${cityObject.state}`;

    myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${cityst}&categories=${categ}`;

    getCateg (myurl, htmlSection);
}

// get items in the requested category 
function getCateg(myurl, htmlSection){
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
        // Empty out the 
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
                //generate random number to choose 1 to 20
                var x = Math.floor((Math.random() * 19) + 1);
                item = data.businesses[x];
                var name = item.name;
                var address = item.location.address1;
                var city = item.location.city;
                var state = item.location.state;
                var zipcode = item.location.zip_code;
                var imageURL = item.image_url;
                var price = item.price;
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
                pElement.text (`No.Reviews: ${review_count}`);
                divIconBlockElement.append (pElement);

                // Append our result into our page
                // $('#results').append('<div id="' + id + '" style="margin-top:50px;margin-bottom:50px;"><img src="' + image + '" style="width:200px;height:150px;"><br>We found <b>' + name + '</b> (' + alias + ')<br>Business ID: ' + id + '<br> Located at: ' + address + ' ' + city + ', ' + state + ' ' + zipcode + '<br>The phone number for this business is: ' + phone + '<br>This business has a rating of ' + rating + ' with ' + reviewcount + ' reviews.</div>');
            }; 
            // });
        } else {
            // If our results are 0; no businesses were returned by the JSON therefor we display on the page no results were found
             $('#results').append('<h5>We discovered no results!</h5>');
            }
        }
    });
};

