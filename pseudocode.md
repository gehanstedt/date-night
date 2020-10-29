
user gets to the site

Header has a company logo and navbar
 navbar has shortcuts to weather, restauraunts, events, activities.

render a landing page with a 
 text entry box
 search button 
 run the forecast() and yelp-function() with Atlanta, GA and todays date
 
 
when user clicks search {
  make sure the text is not empty
  do an weather api call
  check the return value 
  If its error then warn user invalid city state
  If its good then render 7 day forecast into tiles on the page.
	tiles will have functionality to call yelp-function with that date.
  Call the yelp-function with todays date.  
}
 
yelp-function(inputs: date, city){
  api call for restauraunts
	if no events were retuned then say no events found
	if they were then render 3 results to the restauraunt div
  api call for activities
	if no events were retuned then say no events found
	if they were then render 3 results to the activities div
  api call for events
    if no events were retuned then say no events found
	if they were then render 3 results to the events div
}

Footer: Ninja coding logo 
Made with love by the ninjas.


Optional Features:
If the user has previous search, then it will automatically perform that search.
Categories checkboxes.
Autocomplete city or zipcode.
Get default location from browser.
Date Night Slot Machine.
favorite Cities to search.
Save Favorite events and have favorites page.
Create share link.
show the rating and cost estimate.
