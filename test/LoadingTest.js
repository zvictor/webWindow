//module
module("Loading", {
	setup: function(){
		LoadingClass = Class.extend(Loading);
		loading = new LoadingClass();
		listening = new (Class.implement(Listener).extend(Loading))();
	}
});

var loading, LoadingClass, listening;

test("all set", function(){
	ok(!loading.loaded(), "not loaded");
	ok(!loading.failed(), "not failed");
	same( new LoadingClass().listener, {}, 'fresh attribute');
});

test("changing values", function(){
    loading._loaded = true;
	ok(loading.loaded(), "already loaded");
	ok(!loading.failed(), "hasn't failed yet");
	loading._failed = true;
	ok(loading.failed(), "has already failed");
});

test("dispatching events", function(){
    loading.dispatchEvent(new Event("any"));
	ok(!loading.loaded() && !loading.failed(), "didn't change loading values");

    loading.dispatchEvent(new Event("load"));
	ok(loading.loaded() && !loading.failed(), "loaded");

	loading = new LoadingClass();
	loading.dispatchEvent(new Event("error"));
	ok(loading.failed() && !loading.loaded(), "failed");
});


test("pre-listening", function(){
	expect(2);
	listening.addEventListener("load", function(){
		ok(this.loaded(), "loaded");
	})

    listening.dispatchEvent(new Event("any"));
	ok(!listening.loaded() && !listening.failed(), "didn't change loading values");

    listening.dispatchEvent(new Event("load"));
});