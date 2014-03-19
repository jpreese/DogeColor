// Color class
(function() {

// constructor	
var _ = window.Color = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;

	this.rgb = [this.r, this.g, this.b];
};

// public methods
_.prototype = {

	// Euclidean distance between two colors
	distance: function(guessColor) {

		var dr = this.r - guessColor.r;
		var dg = this.g - guessColor.g;
		var db = this.b - guessColor.b;

		return Math.sqrt(dr*dr + dg*dg + db*db);
	},

	maxDistance: function() {
		var rgb = this.rgb;

		rgb = rgb.map(function(p) {
			return p < 127.5 ? 255: 0;
		});

		var max = new Color(rgb[0], rgb[1], rgb[2]);
		return this.distance(max);
	},

	proximity: function(guessColor) {
		var maxDistance = this.maxDistance();
		var distance = this.distance(guessColor);

		return 1 - distance / maxDistance;
	},

	toString: function() {
		return 'rgb(' + [this.r, this.g, this.b].join(',') + ')';
	}
};

// return a randomly generated color
_.random = function() {
	return new _(randomInt(), randomInt(), randomInt());
};

// return a color object based on an RGB/HSL color string
_.fromString = function(str) {

	var dummy = document.createElement("div");
	dummy.style.color = str;

	// validate that the color/syntax is legit
	if(!dummy.style.color) {
		return null;
	}
	
	// element must be attached to the DOM before styling can be pulled back
	document.body.appendChild(dummy);
	var computedStyle = getComputedStyle(dummy).color;
	document.body.removeChild(dummy);

	// validate a computed style was returned
	if(!computedStyle) {
		return null;
	}

	// grab the individual color components from the color style
	var rgb = computedStyle.match(/\((\d+), (\d+), (\d+)/);
	return new _(rgb[1], rgb[2], rgb[3]);

};

function randomInt() {
	// generate a random number between 0 and 255
	return Math.floor(Math.random() * 255);
}


})();