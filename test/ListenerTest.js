//module
module("Listener", {
	setup: function(){
		listener = new ListenerMock();
	}
});

//vars
var listener, ListenerMock = Class.implement(Listener);

//mocking
//function Image(){}


test("new instance", function(){
	listener.addEventListener("load", function(){}, false);
	same( new ListenerMock().listener, {}, 'fresh attribute');
});

//test cases
asyncTest("dispatchEvent", 4, function(){
	var reached = false;
	listener.addEventListener("load", function(){
		ok(true, "load non-bubble");
		ok(reached, "non-bubble after");
		reached = true;
	}, false);
	listener.addEventListener("load", function(){
		ok(true, "load bubble");
		ok(!reached, "bubble first");
		reached = true;
	}, true);
	listener.dispatchEvent(new Event("load"));
	setTimeout(start, 500);
});

asyncTest("rightScope", 2, function(){
	var dispatched = new Event("load");
	listener.addEventListener("load", function(event){
		same(this, listener, 'who is "this"?');
		same(event, dispatched, 'who is "event"?');
	}, false);
	listener.dispatchEvent(dispatched);
	setTimeout(start, 500);
});