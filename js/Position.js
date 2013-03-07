var Position = Class.extend({
	init: function(x, y){
		this.x = parseInt(x);
		this.y = parseInt(y);
	},

	referenced: function(origin){
		return new Position(this.x+origin.x, this.y+origin.y, 1);
	}

});