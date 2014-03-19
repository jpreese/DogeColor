// Timer class
(function() {


// constructor
var _ = window.Timer = function() { 
	this.ms = 0;
	this.sec = 0;
	this.timer = 0;
};

_.prototype = {

	start: function() {

		// setInterval will execute display on the global scope by default
		var me = this;
		var callDisplay = function() {
			me.display();
		}

		this.timer = setInterval(callDisplay, 100);
	},

	stop: function() {
		clearInterval(this.timer);
		this.timer = 0;
	},

	display: function() {
		if(this.ms >= 9) {
			this.ms = 0;
			this.sec += 1;
		}
		else {
			this.ms += 1;
			timerDisplay.innerHTML = [this.sec, this.ms].join('.');
		}
	},

	reset: function() {
		this.stop();
		this.ms = 0;
		this.sec = 0;
	}

};

})();