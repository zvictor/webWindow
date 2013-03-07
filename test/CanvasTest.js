module("Canvas", {
	setup: function(){
		if(theElement == undefined){
			theElement = document.createElement('canvas');
			var div = document.createElement('div');
			div.style.width = div.style.height = "45px";
			div.appendChild(theElement);
			document.body.appendChild(div);
		}
		canvas = new Canvas(theElement, {showFps: true});
	}
});

var canvas, theElement;

asyncTest("run", function(){
	var oldRun = canvas.run;
	canvas.run = function(){
		var oldFps = this.fps;
		oldRun.apply(this, []);
		visual(this, "fps:"+oldFps);
	}
	canvas.run();
	setTimeout(start, 500);
	setTimeout(function(){clearTimeout(canvas.running);}, 5000);
});
