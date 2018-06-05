$(document).ready(function(){


var topics = [
  "captain kirk",
  "spock",
  "dr. mccoy",
  "luke skywalker",
  "leia",
  "cylon",
  "ripley",
  "dr who",
  "terminator"
];

function create() {
        $('#buttonPlace').empty();

        for (var i = 0; i < topics.length; i++) {

            var buttonName = $("<button class='btn btn-primary btn-lg active'>");
            buttonName.attr("data-name", topics[i]);
            buttonName.text(topics[i]);

            $("#buttonPlace").append(buttonName);
        }
    }
    create();

    $("#buttonPlace").on("click", ".btn-primary", function() {

      $("#gifPlace").empty();

      var character = $(this).attr("data-name");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=GjpxauYzzwHIhcCV41e5ptBABkrFYdEX&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data
            console.log(results);

            for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); //div for the gifs to go inside
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var rating = $("<p>").text("Rated: " + results[i].rating);
            gifDiv.append(rating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifPlace").prepend(gifDiv);
          }

          });

    });






$("#findOne").on("click", function(event) {
$("#gifPlace").empty();
event.preventDefault();
var userInput = $("#add-input").val().trim();

	//if the text input is empty, a new button should NOT be created
	if (!userInput == " ") {
		topics.push(userInput);
		create();
		console.log(topics); //test
		userInput = $("#add-input").val(" ");
	}
});


$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});













});
