var Level = Class.extend({
	init: function(name, objects){
		this.name = name;
		this.objects = [];
		var that = this;
		for(var item=0;item<objects.length;item++)
			this.objects.push( objects[item][0].addEventListener("load", (function(that, index, position){
				return function(){
					that.objects[index] = this.newInstance().setPosition(position);
				}
			}(this, new Position(objects[item][1][0], item, objects[item][1][1], 30))), true) );
			//this.objects.push( load.objects[item][0].newInstance().setPosition(load.objects[item][1][0], load.objects[item][1][1], 30) );
		Library.addCategorie("level");
		Library.level[this.name] = this.objects;
	}
});