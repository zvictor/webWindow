var ImageDraw = Sketch.extend({
	init: function(resource){
		this._super();
		if(typeof resource === "string"){
			var newImage = new Image();
			newImage.src = resource;
			resource = newImage;
		}
		if(!resource instanceof Image)
			throw Error("Incompatible type");

		var that = this;
		resource.addEventListener("load", function(event){
			that.width(this.width);
			that.height(this.height);
			that._loaded = true;
			that.dispatchEvent(event);
		}, true);
		resource.addEventListener("error", function(event){
			that._failed = true;
			that.dispatchEvent(event);
			throw Error("Image loading failed");
		}, true);

		this._resource = resource;
	},

	paint: function(){
		if(this._resource && this.loaded())
			this.drawImage(this._resource, 0, 0);
	}

}).implement(Loading);