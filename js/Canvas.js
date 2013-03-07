var Canvas = Container.extend({
	init: function(canvasElement, options){
		this._super(canvasElement);
		options = options || {};
		this.maxSize	= options.maxSize !== undefined ?	options.maxSize : true;
		this.fullScreen = options.fullScreen !== undefined ?options.fullScreen : false;
		this.showFps	= options.showFps !== undefined ?	options.showFps : false;
		this.fps		= options.fps !== undefined ?		options.fps : 15;

		this.running = null;
		this.resize();
		var that = this;
		window.addEventListener("resize", function(e){
			that.resize(e)
		}, true);
	},

	add:function(newWindows, index, require){
		newWindows = (newWindows instanceof Array)?newWindows: [newWindows];
		for(var i=0; i<newWindows.length; i++)
			newWindows[i].scale(this.dimensions());
		this._super(newWindows, index, require);
		return this;
	},

	resize: function(event){
		if(this.fullScreen){
			this.dimensions(window.innerWidth, window.innerHeight);
			this.context.canvas.style.position = "fixed";
			//this.context.canvas.style.zIndex = 90;
			this.context.canvas.style.top =
			this.context.canvas.style.right =
			this.context.canvas.style.bottom =
			this.context.canvas.style.left = 0;
		}else if(this.maxSize){
			this.width(this.context.canvas.parentNode.clientWidth);
			this.height(this.context.canvas.parentNode.clientHeight);
		}
		for(var i=0; i<this.itens.length; i++)
			if(this.itens[i] instanceof Window)
				this.itens[i].scale(this.dimensions());
	},

	paint: function(){
		if(this.showFps)
			this.fillText("FPS: "+this.fps, this.width()-45, this.height()-10);
	},

	run: function(){
		clearTimeout(this.running);
		var waitTime = 0;
		var start = new Date();
		this.update();
		this.draw();
		var animationTime = new Date()-start;

		var frameTime = 1000/this.fps;

		if (animationTime*9.1 > frameTime){ //http://stackoverflow.com/questions/2940054/how-to-determine-the-best-framerate-setinterval-delay-to-use-in-a-javascript/3062116#3062116
			/*[the FPS cannot be reached] You can:
			1. Decrease the number of FPS to see if a lower framerate can be achieved
			2. Do nothing because you want to get all you can from the CPU*/
			this.fps = (this.fps == 1)?1:--this.fps;
		}else{
			/*[the FPS can be reached - you can decide to]
			1. wait(TIME_OF_DRAWING-animationTime) - to keep a constant framerate of FPS
			2. increase framerate if you want
			3. Do nothing because you want to get all you can from the CPU*/
			if(animationTime*9.1 < frameTime)
				this.fps++;
			waitTime = frameTime-animationTime;
		}
		var that = this;
		this.running = setTimeout(function(){
			that.run();
		}, frameTime+waitTime);
	}

});