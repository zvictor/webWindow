var Container = Sketch.extend(Loading).extend({
	init: function(canvasElement){
		this._super(canvasElement);
		this.itens = [];
	},

	add: function(elements, require, index){
		var that = this;
		elements = (elements instanceof Array)?elements: [elements];
		if(require !== false)
			for(var i=0; i<elements.length; i++){
				this.require(elements[i]);
				if(elements[i] instanceof Loader)
					elements[i].autoUpdate(this.requirements);
			}
		for(var i=0; i<elements.length; i++){
			this.itens.splice(index || this.itens.length, 0, elements[i]);// adds (position, numToBeRemoved, element) to array
			if(elements[i] instanceof Loader)
				elements[i].autoUpdate(this.itens);
			if(elements[i].addEventListener)
				elements[i].addEventListener("load", function(){
					if(that.loaded())
						that.dispatchEvent(new Event("load"));
					that.update();
				});
		}
		return this;
	},

	loaded: function(){
		for(var i=0; i<this.itens.length; i++)
			if(!this.itens[i].loaded())
				return false;
		return true;
	},

	failed: function(){
		for(var i=0; i<this.itens.length; i++)
			if(this.itens[i].failed())
				return true;
		return false;
	},

	remove: function(index){
		var removed = this.itens.splice(index, 1);
		for(var i=0; i<this.requirements.length; i++)
			if(removed === this.requirements[i])
				delete this.requirements[i];
		return this;
	},
	
	drawSketch: function(){
		var args = Array();
		for(var i=0; i<arguments.length; i++)
			args.push(arguments[i]);
		var ctx = args[0];
		var position = ctx.getPosition(this.center());
		ctx.draw();

		args[0] = ctx.context.canvas;
		args[1] = parseInt(position.x);
		args[2] = parseInt(position.y);
		return this.drawImage.apply(this, args);
	},

	draw: function(){
		if(!this._outdated)
			return;
		this.clean();
		this.paint();
		for(var i=0; i<this.itens.length; i++)
			this.drawSketch(this.itens[i]);
		this._outdated = false;
		return this;
	}

	
});