
// Create array of strings of topics for the buttons
var holidays = ["Thanksgiving", "Christmas", "Halloween", "Kwanza", "Hanukkah"];


// Take array and use it in for loop to create buttons
function renderButtons(){
    $("#holiday-buttons").empty();

    for (var i = 0; i < holidays.length; i++) {
        var a = $("<button>");
        a.addClass("holiday");
        a.attr("data-name", holidays[i]);
        a.text(holidays[i]);
        $("#holiday-buttons").append(a);
    }
}

// Add new holiday when the add button is clicked
$("#add-holiday").on("click", function(event) {
    event.preventDefault();

    var newHoliday = $("#holiday-input").val().trim();
    holidays.push(newHoliday);

    renderButtons();
});

// Pull the gifs from GIPHY and then display GIFs in still format
function displayGIFs() {
    var holiday = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
        + holiday + "&limit=10&api_key=7XETEAaD6yrkkC4YTuZ6ARb2SOuIP51G";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.data);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            
            var a = $("<div class='holiday'>");\
            var rating = results[i].rating;
            var pausedImg = results[i].images.fixed_height_still.url;
            var playImg = results[i].images.fixed_height.url;
            var image = $("<img>");

            
            image.attr("src", pausedImg);
            image.addClass("holiday-giphy");
            image.attr("alt", holiday + "image");
            image.attr("data-state", "still");
        	image.attr("data-still", pausedImg);
        	image.attr("data-animate", playImg);
            
            $('body').append(a);
            $(a).append("<p> Rated: " + rating.toUpperCase() + "</p>");
            $("#holidays-view").prepend(a);
            $("#holidays-view").prepend(image);

        }
        
    });

}
// stop/start the gifs on click
function stopStartGifs(){
    var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

renderButtons();
$(document).on("click", ".holiday", displayGIFs);
$(document).on("click", ".holiday-giphy", stopStartGifs);









