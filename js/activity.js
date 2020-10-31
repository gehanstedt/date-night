//create categ which will hold different categories to search on yelp
//var categ = "restaurant"
// var categ = "galleries,wineries,festivals,planetarium,aquariums,cabaret";
// var categ = "escapegames,danceclubs,rockclimbing,axethrowing,hot_air_balloons,horsebackriding,hanggliding";

var categ = [];
var categ[0] = "restaurant"
// var categ = "galleries,wineries,festivals,planetarium,aquariums,cabaret";
// var categ = "escapegames,danceclubs,rockclimbing,axethrowing,hot_air_balloons,horsebackriding,hanggliding";

cityst = "daytona beach,fl"
//  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=Atlanta,categories=restaurant";
//  var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?location=30041";
// var myurl = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=atlanta&categories=galleries,wineries";
var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${cityst}&categories=${categ[0]}`;
console.log(myurl)

// get items in the requested category 
function getCateg(myurl){
$.ajax({
        url: myurl,
        headers: {
        'Authorization':'Bearer 3XzwL4fFle7tgIsU8oDOdoSiA_1E9VmWvzZ3NmAabPPGYPNWlUO7ukooR9uzuXwp6ieeSbHm6aeeQ3iUhKr8gL-7_7VgkKGgw4cT81gBiKQQ0-uq9YTe1m9ls4KXX3Yx',
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
        // Grab the results from the API JSON return
        console.log(data)
        var totalresults = data.total;
        // If our results are greater than 0, continue
        if (totalresults > 0){
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
                var pic = item.image_url;
                var price = item.price;
                var rating = item.rating;
                var review_count = item.review_count;
                var url = item.url;
                console.log(name)
                console.log(address, city, state, zipcode)
                console.log(price)
                console.log(rating)
                console.log(review_count)
                console.log(pic)
                console.log(url)

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
getCateg(myurl);
