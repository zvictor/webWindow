//module
module("ImageDraw", {
	setup: function(){
		images = [new ImageDraw("resources/alvo.gif"), new ImageDraw("resources/caixa0.gif"), new ImageDraw("resources/caixa1.gif"), new ImageDraw("resources/fundo.gif"), new ImageDraw("resources/parede.gif"), new ImageDraw("resources/Personagem00.gif")];
	}
});

var images;

asyncTest("images draw", function(){
	expect(images.length);
	for(var i=0; i<images.length; i++){
		images[i].addEventListener("load", function(){
			this.draw();
			visual(this, "Voce ve "+this._resource.src+" abaixo?");
		}, true);
	}
	setTimeout(start, 500);
});
