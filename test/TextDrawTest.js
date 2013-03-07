//module
module("TextDraw", {
	setup: function(){
		texts = [
			new TextDraw("This is a big verdana! 50px", "50px verdana"),
			new TextDraw("16px arial", "16px Arial"),
			new TextDraw("Helvetica!", "16px Helvetica"),
			new TextDraw("Helvetica Neue Light", "16px Helvetica Neue Light"),
			new TextDraw("12px sans-serif", "12px sans-serif"),
			new TextDraw("16px sans-serif", "16px sans-serif")
		];
	}
});

var texts;

test("texts draw", function(){
	expect(texts.length);
	for(var i=0; i<texts.length; i++){
			visual(texts[i].draw(), "Voce le '"+texts[i]._content+"' abaixo?");
	}
});
