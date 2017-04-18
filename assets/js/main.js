// Initial array of animals
var animals = [ "Cat", "Dog", "Squirrel", "Mouse", "Capybara", "Goat",
  "Parrot", "Girrafe", "Lion", "Bear" ];

// displayanimalInfo function renders to the HTML to display the images
function displayanimalInfo() {

  // empty div
	$( "#animalsView" )
		.empty();

	var animal = $( this )
		.attr( "data-name" );

  // allows the user to search for an animal on giphy
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal +
		"&api_key=dc6zaTOxFJmzC&limit=10";

  //retriees the appropriate images from the API
	$.ajax( {
			url: queryURL,
			method: "GET"
		} )
		.done( function( response ) {

			var results = response.data;

      //loop through the images (cont.)
			for ( var i = 0; i < results.length; i++ ) {

        // ... and do not pull R rated or pg-13 rated images
				if ( results[ i ].rating == "r" || results[ i ].rating == "pg-13" ) {

				} else {
					console.log( response )

          //gather the images" ratings
					var rating = results[ i ].rating;

          //displays the rating of the image on the page
					var p = $( "<p>" )
						.text( "Rating: " + rating );

					var animalImage = $( "<img>" );

					animalImage.attr( "src", results[ i ].images.fixed_height_still.url );
					animalImage.attr( "data-still", results[ i ].images.fixed_height_still.url );
					animalImage.attr( "data-animate", results[ i ].images.fixed_height.url );
					animalImage.attr( "data-state", "still" );
					animalImage.addClass( "animalImage" );

					$( "#animalsView" )
						.append( p );
					$( "#animalsView" )
						.append( animalImage );
				}

			}

      // when clicking on an animal"s image (cont.)
			$( ".animalImage" )
				.on( "click", function() {
					// event.preventDefault();

          // ...add a specific state for the image
					var state = $( this )
						.attr( "data-state" );
					console.log( state );

           // if the image is STILl, upon clicking, change it to ANIMATE and vice-versa
					if ( state == "still" ) {
						$( this )
							.attr( "src", $( this )
								.data( "animate" ) );
						$( this )
							.attr( "data-state", "animate" );
					}
            else {
						$( this )
							.attr( "src", $( this )
								.data( "still" ) );
						$( this )
							.attr( "data-state", "still" );
					}
				} );
		});
}

// Function to render the buttons
function renderButtons() {

  // Deletes the current images before adding new buttons
	$( "#buttonsView" )
		.empty();

	// Loops through the animals array
	for ( var i = 0; i < animals.length; i++ ) {

    //For each animal...
    // give it a button
		var a = $( "<button>" )
    // add the class "animal"
		a.addClass( "animal" );
    // add the class "btn btn-success"; makes it green to go with the theme
		a.addClass( "btn btn-success" );
    // add the class "btn btn-primary btn-sm"
		a.addClass( "btn btn-primary btn-sm" );
    // add a data attribute
		a.attr( "data-name", animals[ i ] );
    // display button text
		a.text( animals[ i ] );
		$( "#buttonsView" )
			.append( a );
	}
}

// If the submit button is clicked...
$( "#addAnimal" )
	.on( "click", function() {
		event.preventDefault();

		// Grab the text from the form...
		var animal = $( "#animal-input" )
			.val()
			.trim();

		// The animal from the textbox is then added to our array
		animals.push( animal );

		// the renderButtons function then adds the new animal to the list of buttons
		renderButtons();

	} )

// =========

// displays animalInfo
$( document )
	.on( "click", ".animal", displayanimalInfo );

// runs the renderButtons function
renderButtons();
