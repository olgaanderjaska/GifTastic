


var topics = ["Dog", "Cat", "Rabbit", "Eagle", "Squirrel", "Humster"];
// calling the renderButtons function to display our gifs
function renderButtons() {

// deleting the video buttons prior to adding new gif buttons
$("#addButton").empty();


// looping through the array and creting buttons 
for (var i=0; i < topics.length; i++) {
//console.log(topics[i]);
// Then dynamicaly generating buttons for each gif in the array.
var button =$("<button>");
// adding a class, data-attribute, and button's text
button.addClass("topic");
button.attr("data-animal", topics[i]+"-button");
button.text(topics[i]);

// adding a button to HTML
$("#addButton").append(button);

}
}
renderButtons();
 // this function handles events where one botton is clicked
$("#addGif").on("click", function(){
	event.preventDefault();
// this line will grab a text from the input box	
var userInput = $("#gif-input").val().trim();
console.log($("gif-input"));
topics.push(userInput);
$(".topics-button").empty();
renderButtons();
return false;
});
//we are adding gif URL
$(document).on("click", "button", function() {
	var animal = $(this).attr("data-animal");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        
//performing an AJAX GET request to our queryURL
$.ajax({ 
	url: queryURL, 
	method: "GET"
})
.done(function(response) {
console.log(queryURL);
console.log(response);

var results = response.data;

//performing a for loop 
for (var i = 0; i < results.length; i++) {
	var animalDiv = $("<div class='item'>");
	var raiting = results[i].rating;
	var p = $("<p>").text("Rating: " + raiting);

	var animalImg = $("<img>");
        animalImg.attr("src", results[i].images.fixed_height_still.url);
        animalImg.attr("data-still", results[i].images.fixed_height_still.url);
        animalImg.attr("data-animate", results[i].images.fixed_height.url);
        animalImg.attr("data-state", results[i].images.fixed_height_still.url);

    
    animalDiv.append(p);
    animalDiv.append(animalImg);
 $("#gifs-appear-here").prepend(animalDiv);

}
$(".item").children("img").on("click", function() {


                    var state = $(this).attr("data-state");
                     console.log(this);
                    if (state == "still") {
                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }

});
});
});


