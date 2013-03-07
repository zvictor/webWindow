// Model Class. Must extend another class;
var Loading = {
	init: function(){
		if(this._super)
			this._super.apply(this, arguments);
		this._loaded = this._failed = false;
		this.listener = this.listener || {};
	},

	loaded: function(){
		return this._loaded;
	},

	failed: function(){
		return this._failed;
	},

	addEventListener: function(type, fn, bubble){
		if((type === "load" && this.loaded()) || (type === "error" && this.failed()))
			fn.apply(this, [new Event(type)]);
		if(this._super)
			return this._super(type, fn, bubble);
		return Listener.addEventListener.apply(this, [type, fn, bubble]);
	},

	dispatchEvent: function(event){
		this._loaded = event.type === "load" || this._loaded;
		this._failed = event.type === "error" || this._failed;
		if(this._super)
			return this._super(event);
		return Listener.dispatchEvent.apply(this, [event]);
	}
};