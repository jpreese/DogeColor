// Main class
(function() {

// constructor / namespace
var _ = window.Main = function() { };

_.play = function ()
{

	playButton.style.visibility = "hidden";
	guessBox.focus();

	// generate a random color for the user to guess
	var generatedColor = Color.random();

	rndGuess.style.background = generatedColor;
	
	// start the clock!
	var t = new Timer();
	t.start();

	// setup event listener for the guess box
	guessBox.oninput = function()
	{
		yourGuess.style.background = this.value;

		// get a color object of the current inputted guess
		var guess = Color.fromString(this.value);

		if(guess)
		{
			// a successful guess was entered, check how close they are
			var prox = generatedColor.proximity(guess);
			proximity.innerHTML = "Proximity: " + (prox > .9? Math.round(prox * 10000)/100 : Math.round(prox * 1000)/10) + "%"

			// 90 percent is pretty acceptable...
			if(prox > .90) {
				alert("win!");
			}
		}
	}
}

})();
