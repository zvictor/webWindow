var JsonResource = Resource.extend({
	init: function(value){
		this._super();
		try{
			this._content = JSON.parse(value); // TODO: adicionar eval pra quem nao tem nativamente.
		}catch(e) {
			this._content = value;
		}
		this._loaded = true;
	},

	newInstance: function(){
		return this.content();
	}
});