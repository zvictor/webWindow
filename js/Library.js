var Library = Class.extend({
	init: function(){
		this.requirements = {};
		this.general = {};
	},

	addCategorie: function(name){
		if(this[name] && typeof this[name] !== "object")
			throw "[ERROR.webWindow] Library.addCategorie: "+name+" already exists";
		this[name] = {}
	}
});

Library = (function(){
	return new Library();
}());