var Resource = Loading.extend({
	init: function(){
		this._super();
	},

	content: function(){
		return this._content;
	},

	newInstance: function(){
		//@abstract
	}
});