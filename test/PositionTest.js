module("Position", {
	setup: function(){
		aPosition = new Position(83,19.99);
	}
});

var aPosition;

test("attr", function(){
	same(aPosition.x, 83, "x");
	same(aPosition.y, 19, "y");
});

test("referenced", function(){
	var referenced = aPosition.referenced(aPosition);
	same(referenced.x, aPosition.x*2, "x");
	same(referenced.y, aPosition.y*2, "y");
});
