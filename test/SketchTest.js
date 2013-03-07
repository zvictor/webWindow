//module
module("Sketch", {
	setup: function(){
		sketchs = [new Sketch()];
		sket = sketchs[0];
	}
});

var sketchs, sket;

test("canvas links", function(){
	for(var i=0; i<methods.length; i++)
		ok(typeof sketchs[0][methods[i]] === "function", methods[i]+" is function");
	for(var i=0; i<props.length; i++)
		ok(typeof sketchs[0][props[i]] === "function", props[i]+" is function");
});


test("getPosition", function(){
	var position = sket.getPosition();
	same([position.x, position.y], [0,0], "sketch starts at 0,0");
	position = sket.dimensions(45, 45).getPosition(new Position(68,654));
	same([position.x, position.y], [46, 632], "sketch centered");
});

test("draw", function(){
	sketchs[0].paint(function(){
		this.fillRect(0, 0, 300, 150);
		this.clearRect(5, 5, 290, 140);
		this.fillText("Tenho bordas pretas e voce consegue me ler?", 40, this.height()/2-10);
		this.fillText("Ponto pra voce!", 100, this.height()/2+10);

	});

	call("sketchs[0].draw", "Sketch.draw called");
	sketchs[0].draw();
	visual(sketchs[0]);

});