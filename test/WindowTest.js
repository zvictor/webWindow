module("Window", {
	setup: function(){
		images = [
			new ImageDraw("resources/alvo.gif"),
			new ImageDraw("resources/caixa0.gif"),
			new ImageDraw("resources/caixa1.gif"),
			new ImageDraw("resources/fundo.gif"),
			new ImageDraw("resources/parede.gif"),
			new ImageDraw("resources/Personagem00.gif")
		];
		windows = [
			new Window().add(images),
			new Window({width: 450, height: 350, scaleable: true}).add(images),
			new Window({width: 200, height: 100, scaleable: true}).dimensions(500, 300).add(images),
			new Window({width: 200, height: 100, scaleable: false}).dimensions(100, 200).add(images)
		];
	}
});

var images, windows;

test("a loading draw", function(){
	visual(windows[0].draw(), "should see \"loading... 0%\"");
});

test("center", function(){
	same(windows[0].center().x, 150, "default: center.x");
	same(windows[0].center().y, 75, "default: center.y");
	same(windows[1].center().x, 225, "defined: center.x");
	same(windows[1].center().y, 175, "defined: center.y");
	same(windows[2].center().x, 100, "changed: center.x");
	same(windows[2].center().y, 50, "changed: center.y");
	same(windows[3].center().x, 50, "changed: center.x");
	same(windows[3].center().y, 100, "changed: center.y");
});

test("ratio", function(){
	same(windows[0].ratio(windows[0].dimensions()), 1, "default: center.x");
	same(windows[1].ratio(windows[1].dimensions()), 1, "defined: center.x");
	same(windows[2].ratio(windows[2].dimensions()), 500/200, "changed: center.x");
	same(windows[3].ratio(windows[3].dimensions()), 100/200, "changed: center.x");
});