var TextDraw = Sketch.extend({
	init: function(newContent, newFont){
		this._super();
		this.content(newContent);
		this.font(newFont);
		this.context.textBaseline = "middle";
	},

	content: function(newContent){
		if(newContent === undefined)
			return this._content;
		this._content = newContent;
		this.update();
	},

	font: function(newFont){
		if(newFont === undefined)
			return this._font;
		this._font = newFont;
		this.update();
	},

	update: function(){//debugger
		this._super();
		var that = this;
		function reset(){
			that.context.font = that._font || that.context.font;
			that.context.textBaseline = "middle";
		}
		reset();
		var width = this.context.measureText(this._content).width;
		var height = this.context.measureText('M').width*2; //this.height(this.context.measureText("m").width*10);
		this.context.canvas.width = width; // this.width(value) and this.height(value) can't be called because it will call update again.
		this.context.canvas.height = height; //this.height(this.context.measureText("m").width*10);
		reset();

	},

	paint: function(){
		this.fillText(this._content, 0, this.height()/2);
	}

});