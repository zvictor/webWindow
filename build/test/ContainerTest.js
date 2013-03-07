module("Container", {
	setup: function(){
		var elements = [new Loader("alvo.gif"), new Loader("caixa0.gif"), new Loader("caixa1.gif"), new Loader("fundo.gif"), new Loader("parede.gif"), new Loader("Personagem00.gif")];
		containers = [];
		for(var i=0; i<5; i++)
			containers.push(new Container());
	}
});

var containers;

asyncTest("a container test", function(){

	setTimeout(start, 1000);
});
