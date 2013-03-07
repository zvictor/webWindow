var ImagesAnimation = Sketch.extend({
	init: function(images, options){
		this._super();
		for(var i in images){
			if (typeof images[i] === 'string' || images[i] instanceof Image)
				images[i] = new Resource(images[i]);
			if(!images[i] instanceof Resource)
				throw "Incompatible type";
		}
		this.frames = images;
		this._indice = 0;
		this.pointTo = this.frames[this._indice];
		var that = this;
		this.pointTo.addEventListener("load", function(){
			that.width(this.width);
			that.height(this.height);
		}, false);
		this.running = null;

		options = options || {};
		this._runForever = options.runForever;
		this.action = options.action || {};
		if(options.speed)
			this.run(speed);
	},

	loaded: function(){
		for(var i=0;i<this.frames.length;i++)
			if(!this.frames[i].loaded())
				return false;
		return true;
	},

	failed: function(){
		for(var i=0;i<this.frames.length;i++)
			if(!this.frames[i].failed())
				return true;
		return false;
	},

	paint: function(){
		if(this.pointTo && this.pointTo.loaded())
			this.drawSketch(this.pointTo.content());
	},

	change: function(action){
		this._indice = action;
		this.pointTo = this.frames[this._indice];
	},

	run: function(miliseconds){
		clearTimeout(this.running);
		this.pointTo = this.frames[this._indice++];
		this._indice = this._indice%this.frames.length;
		var that = this;
		if(this._indice != 0 || this._runForever)
			this.running = setTimeout(function(){
				that.run(miliseconds)
			}, miliseconds);
		else
			this.running = null;
		return this;
	},

	paused: function(){
		return this.running === null;
	}
});