var Window = Container.extend({
	init: function(options){
		options = options || {};
		this._super();
		this.originalDimensions = new Dimensions(options.width || 300, options.height || 150);
		this.dimensions(this.originalDimensions);
		this.scaleable = (options.scaleable)?options.scaleable:false;
	},

	scale: function(dimensions){
		this.dimensions(dimensions);
		if(!this.scaleable)
			return;
		var ratio = this.ratio(dimensions);
		this.context.scale(ratio, ratio);
		/*this.size.destWidth = destWidth;
		this.size.destHeight = destHeight;*/
	},
	
	ratio: function(dimensions){
		var ratioW = dimensions.width/this.originalDimensions.width;
		var ratioH = dimensions.height/this.originalDimensions.height;
		return (ratioW < ratioH)? ratioW : ratioH;
	},

	getPosition: function(reference){ // TODO: Window.getPosition tests
		if(reference){
			var center = this.center();
			if(this.scaleable){
				var ratio = this.ratio(this.dimensions());
				center.x *= ratio;
				center.y *= ratio;
			}
			return this._position.referenced(new Position(-center.x, -center.y)).referenced(reference);
		}
		return this._position;
	},

	center: function(){
		if(this.scaleable)
			return new Position(this.originalDimensions.width/2, this.originalDimensions.height/2);
		return new Position(this.width()/2, this.height()/2);
	},

	loading: function(){
		this.clean();
		this.drawSketch(new TextDraw("loading...  "+ parseInt(this.getProgress()*100)+"%"));
		return this;
	},

	draw: function(){
		/*if(this.scaleable)
			this.context.scale(this.size.destWidth/this.size.originalWidth, this.size.destHeight/this.size.originalHeight);*/
		if(this.getProgress()<1)
			return this.loading();
		else
			return this._super();
	}
});