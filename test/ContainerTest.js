module("Container", {
	setup: function(){
		elements = [new ImageDraw("resources/alvo.gif"), new ImageDraw("resources/caixa0.gif"), new ImageDraw("resources/caixa1.gif"), new ImageDraw("resources/fundo.gif"), new ImageDraw("resources/parede.gif"), new ImageDraw("resources/Personagem00.gif")];
		containers = [];
		for(var i=0; i<5; i++)
			containers.push(new Container());
		containers[0].add(elements);
	}
});

var containers, elements;

test("add Elements", function(){
	for(var i=0; i<elements.length; i++)
		ok(containers[0].itens[i] == elements[i], "itens["+i+"] == elements["+i+"] :: "+elements[i]._location);
});

test("remove Element", function(){
	containers[0].remove(0);
	for(var i=1; i<elements.length; i++)
		ok(containers[0].itens[i-1] == elements[i], "itens["+(i-1)+"] == elements["+i+"] :: "+elements[i]._location);
});

asyncTest("drawSketch", 3, function(){
	call("containers[0].drawImage", "drawImage called");

	var sketch = new Sketch();
	sketch.paint(function(){
		this.fillRect(0, 0, 300, 150);
		this.clearRect(5, 5, 290, 140);
		this.fillText("Tenho bordas pretas e voce consegue me ler?", 40, this.height()/2);
		this.fillText("E' seu dia de sorte!", 100, this.height()/2+20);
	});
	containers[0].drawSketch(sketch);
	visual(containers[0], "Tem bordas pretas e voce consegue ler?");

	elements[0].addEventListener("load", function(){
		var sketch2 = new Sketch();
		sketch2.paint(function(){
			this.fillRect(0, 0, 300, 150);
			this.clearRect(5, 5, 290, 140);
			this.fillText("Voce ve um desenho abaixo? Deveria...", 50, 20);
		});
		containers[1].drawSketch(sketch2);
		containers[1].drawSketch(this);
		visual(containers[1]);
	}, true);
	setTimeout(start, 200);
});

asyncTest("draw", 2, function(){
	call("containers[0].draw", "draw() called");
	for(var i=0; i<elements.length; i++)
		elements[i].addEventListener("load", (function(j){
			return function(){
				this.setPosition(30*(j-3), 0);
			}
		})(i), false);
	containers[0].addEventListener("load", function(){
		visual(containers[0].draw(), "Voce ve "+elements.length+" desenhos abaixo?");
	});
	setTimeout(start, 200);
});

asyncTest("load and fail", 3, function(){
	ok(!containers[0].loaded(), "imagens ainda nao carregadas");
	ok(!containers[0].failed(), "imagens nao falhas");
	var loaded = 0;
	for(var i=0; i<elements.length; i++)
		elements[i].addEventListener("load", (function(j){ return function(){
			this._loaded = true;
			if(elements.length == ++loaded){
				ok(containers[0].loaded(), "imagens carregadas");}
		}})(i), false);
	setTimeout(start, 200);
});