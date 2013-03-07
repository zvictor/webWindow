var HTMLEvent = Class.extend({
	init: function(type) {
		var event;
		var args =  [];
		for(var i=0; i<arguments.length; i++)
			args.push(arguments[i]);

		if(["click"].contains(type)){
			event = document.createEvent( 'MouseEvents' )
			event.initMouseEvent.apply(this, args);
		}else if(["keypress", "keydown"].contains(type)){
			event = document.createEvent( 'KeyboardEvent' )
			event.initKeyEvent.apply(this, args);
		}else{
			debugger
			event = document.createEvent( 'HTMLEvents' )
			event.initEvent.apply(this, args);
		}
		return event;
	}
} );