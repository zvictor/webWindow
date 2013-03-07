var ImagesAnimationResource = Resource.extend({
	init: function(values){
		this._super();
		if(!values instanceof Array)
			return
		this._content = [];
		for(var i=0; i<values.length;i++)
			this._content.push(new Resource(values[i]));
	},

	newInstance: function(){
		return new ImagesAnimation(this);
	}
});