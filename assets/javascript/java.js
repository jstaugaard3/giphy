// Joseph R Staugaard III
// UPenn Class 201901Online2
//GifTastic Homework / Week 6 / Ajax

// Initial list of animals to display as options
var animal = ["Dog", "Cat", "Bear", "Squirrel", "Pets fails"];

// Button click, display the requested animal
function displayAnimalInfo() {
  // Clear page
  $(".ccard").remove();

  // Build query
  var animalToGet = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HeHkAiN21cAfgDt2c1HZzCPq0GE9yKyj&limit=10&offset=0&rating=G&lang=en&q=" + animalToGet;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Loop through the response and post the animals
    for (var i = 0; i < response.data.length; i++) {

      // Links and ratings from response
      var rating = response.data[i].rating;
      var imgURL = response.data[i].images.fixed_height.url;
      var imgURLStill = response.data[i].images.fixed_height_still.url;

      // Build card to hold the image
      var columnCard = $("<div class='col-sm-6 col-md-4 col-lg-2 m-0 border border-dark bg-light ccard'>");
      var animalCard = $("<div class='card m-1'>");
      var animalHeader = $("<div class='card-header m-0 p-0'>").html("Rated : " + rating);
      var animalCardBody = $("<div class='card-body m-0 p-0'>");

      var animalPic = $("<img class='card-img-top gif'>").attr({
        src: imgURLStill,
        "data-still": imgURLStill,
        "data-animate": imgURL,
        "data-state": "still"
      });

      columnCard.append(animalCard);
      columnCard.append(animalHeader);
      columnCard.append(animalCardBody);
      columnCard.append(animalPic);

      // Add card to page
      $("#animal-view").prepend(columnCard);

    } // end loop through array of animals


    // change the state of the gif - still or animate
    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });

}

function renderButtons() {
  // Deleting animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of animals
  for (var i = 0; i < animal.length; i++) {

    // Then dynamicaly generating buttons for each animal in the array
    var a = $("<button>");
    a.addClass("animal-btn m-1 btn btn-info");
    a.attr("data-name", animal[i]);
    a.text(animal[i]);
    $("#buttons-view").append(a);
  }
}

// This function handles events where an animal button is clicked
$("#add-animal").on("click", function (event) {
  event.preventDefault();
  var newAnimal = $("#animal-input").val().trim();
  animal.push(newAnimal);

  // Calling renderButtons which handles the processing of our animal array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

