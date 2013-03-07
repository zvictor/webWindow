var ImageResource = Resource.extend({
	init: function(value){
		this._super();
		if(value instanceof Image)
			this._content = value;
		if(typeof value === "string"){
			this._content = new Image();
			this._content.src = value;
		}
		var that = this;
		this._content.addEventListener("load", function(event){
			that.dispatchEvent(event);
			that._loaded = true;
		}, true);
		this._content.addEventListener("error", function(event){
			that.dispatchEvent(event);
			that._failed = true;
			console.log({
				Error: arguments,
				instance: that
			});
		}, true);
	},

	newInstance: function(){
		return new ImageDraw(this);
	}
});