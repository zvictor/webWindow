
// https://developer.mozilla.org/en/Code_snippets/Canvas

var methods = ['arc','arcTo','beginPath','bezierCurveTo','clearRect','clip',
	'closePath','createImageData','createLinearGradient','createRadialGradient',
	'createPattern','drawFocusRing','drawImage','fill','fillRect','fillText',
	'getImageData','isPointInPath','lineTo','measureText','moveTo','putImageData',
	'quadraticCurveTo','rect','restore','rotate','save','scale','setTransform',
	'stroke','strokeRect','strokeText','transform','translate']; // drawFocusRing not currently supported

var props = ['canvas','fillStyle','font','globalAlpha','globalCompositeOperation',
	'lineCap','lineJoin','lineWidth','miterLimit','shadowOffsetX','shadowOffsetY',
	'shadowBlur','shadowColor','strokeStyle','textAlign','textBaseline'];

var methodsMap, propsMap;
methodsMap = propsMap = {};
for (var i = 0; i < methods.length; i++) {
	var m = methods[i];
	methodsMap[m] = (function (m) {
		return function () {
			this.context[m].apply(this.context, arguments);
			return this;
		};
	}(m));
}

for (var i = 0; i < props.length; i++) {
	var p = props[i];
	propsMap[p] = (function (p) {
		return function (value) {
			if (typeof value === 'undefined') {
				return this.context[p];
			}
			this.context[p] = value;
			return this;
		};
	}(p));
}

var Sketch = Class.extend(propsMap);
Sketch = Sketch.extend(methodsMap);

Sketch = Sketch.implement(Listener).extend({
	init: function(canvasElement){
		canvasElement = canvasElement || document.createElement("canvas");
		this.context = canvasElement.getContext("2d");
		this._position = new Position(0, 0);
		this._outdated = true;
	},

	toDataURL: function () {
		return this.context.canvas.toDataURL();
	},

	dimensions: function(value, b){
		if(value === undefined)
			return new Dimensions(this.context.canvas.width, this.context.canvas.height);
		this.context.canvas.width = value.width || value;
		this.context.canvas.height = value.height || b;
		this.update();
		return this;
	},

	width: function(value){
		if(value === undefined)
			return this.context.canvas.width;
		this.context.canvas.width = value;
		this.update();
	},

	height: function(value){
		if(value === undefined)
			return this.context.canvas.height;
		this.context.canvas.height = value;
		this.update();
	},

	clean: function(){
		//this.width(this.width()); //clearRect?
		this.clearRect(0, 0, this.width(), this.height());
		//this.height(this.height());
	},

	center: function(){
		return new Position(this.width()/2, this.height()/2);
	},

	setPosition: function(){
		if(arguments[0] instanceof Position)
			this._position = arguments[0];
		else
			this._position = new Position(arguments[0], arguments[1]);
		this.update();
		return this;
	},

	getPosition: function(origin){
		if(origin)
			return this._position.referenced(new Position(-this.width()/2, -this.height()/2)).referenced(origin);
		return this._position;
	},

	require: function(items){
		if(!this.requirements)
			this.requirements= Array();
		this.requirements = this.requirements.concat(items);
	},

	getProgress: function(){
		var requires = this.requirements || [];
		var loaded = 0;
		for(var i=0; i<requires.length; i++)
			if(!requires[i].loaded || requires[i].loaded() ||  requires[i].failed())
				loaded++;
		return loaded/requires.length;
	},

	update: function(){
		this._outdated = true;
	},

	paint: function(func){
		if(func){
			this._paint = func;
			this.update();
			return this;
		}else if(this._paint)
			return this._paint(); // .apply?
	},

	draw: function(){
		if(!this._outdated)
			return;
		this.clean();
		this.paint();
		this._outdated = false;
		return this;
	}
});
