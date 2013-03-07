module("Loader", {
	setup: function(){
		Loader.prefix = "resources";
		loaders = [
			new Loader("caixa0.gif"), //ImageResource
			new Loader("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC"), //ImageResource
			new Loader("json.json"), //JsonResource
			//new Loader(["abrir.png", "abrir2.png"]), // ImagesAnimation
			new Loader("404.404") //error
		]
	}
});

////vars
var loaders;
var error = function(){
	ok(false, "this event couldn't be happened!");
};

//test cases
asyncTest("Load", 3, function(){
	var loadMap = [
	function(){
		ok(this.generate() instanceof ImageDraw, "caixa0.gif: ImageDraw");
	},
	function(){
		ok(this.generate() instanceof ImageDraw, "image/png;base64: ImageDraw");
	},
	function(){
		ok(typeof this.generate() == "object", "json.json: object");
	},
	/*function(){
		ok(true, "imagesAnimation temp. deactivated");
		//ok(this.newInstance() instanceof ImagesAnimation, "retorna um ImagesAnimation");
	},*/
	error
	];

	for(var i=0;i<loaders.length; i++)
		loaders[i].addEventListener("load", (function(j){
			return loadMap[j];
		}(i)));
	setTimeout(start, 500);
});

asyncTest("404", 1, function(){
	var failMap = [
	error, error, error, /*error,*/ function(){
		ok(true, "succesfully failed on 404");
	}
	];

	for(var i=0;i<loaders.length; i++)
		loaders[i].addEventListener("error", (function(j){
			return failMap[j];
		}(i)));
	setTimeout(start, 500);
});

asyncTest("autoUpdate", 2, function(){
	var list =[loaders[0], loaders[1]];
	for(var i=0;i<2; i++){
		loaders[i].autoUpdate(list);
		loaders[i].addEventListener("load", (function(j){return function(){
			ok(loaders[j].generate()._resource.src === list[j]._resource.src, "changed");
		}}(i)));
	}
	setTimeout(start, 500);
});