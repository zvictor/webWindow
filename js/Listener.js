// Like a interface. Must be "implemented""
var Listener = {
	init: function(){
		this.listener = {};
	},

	addEventListener: function(type, fn, bubble){
		if(!this.listener[type])
			 this.listener[type] = [];
		 this.listener[type].push([fn, !!bubble]);
		 return this;
	},

	dispatchEvent: function(event){
		var listeners = this.listener[event.type] || [];
		for(var i=0; i<listeners.length; i++)
			if(listeners[i][1]){ // if bubble
				listeners.splice(i, 1)[0][0].apply(this, [event]);} // remove listener and execute
		for(i=0; i<listeners.length; i++) // non-bubble listeners
			listeners[i][0].apply(this, [event]);
	},

	removeEventListener: function(type, fn, bubble){
		//why bubble?
		for(var i=0;i<this.listen[type].length; i++)
			if(this.listen[type][i][0] == fn)
				delete this.listen[type][i];
	}

};