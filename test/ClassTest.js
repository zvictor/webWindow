//module
module("Class", {
	setup: function(){
		ExtendedClass = Class.extend({
			init:function(){
				this.some = "thing";
			}
		});
		ImplementedClass = Class.implement({
			init:function(){
				this.another = "gniht";
			}
		});
		ExImClass = Class.extend({
			init:function(){
				this.some = "thing";
			}
		}).implement({
			init:function(){
				this.another = "gniht";
			}
		});
		ExImImClass = Class.extend({
			init:function(){
				this.some = "thing";
			}
		}).implement({
			init:function(){
				this.another = "gniht";
			}
		}).implement({
			init:function(){
				this.other = "other";
			}
		});
		ImExClass = Class.implement({
			init:function(){
				this.another = "gniht";
			}
		}).extend({
			init:function(){
				this._super();
				this.some = "thing";
			}
		});
	}
});

var ExtendedClass, ImplementedClass, ExImClass, ExImImClass, ImExClass;

test("attributes", function(){
	same(new ExtendedClass().some, "thing", "correct attr extending");
	same(new ImplementedClass().another, "gniht", "correct attr implementing");
	same(new ExImClass().some, "thing", "Extend->Implement: extended attr remains");
	same(new ExImClass().another, "gniht", "Extend->Implement: implemented attr remains");
	same(new ExImImClass().some, "thing", "Extend->Implement->Implement: extended attr remains");
	same(new ExImImClass().another, "gniht", "Extend->Implement->Implement: implemented attr remains");
	same(new ExImImClass().other, "other", "Extend->Implement->Implement: implemented attr remains");
	same(new ImExClass().some, "thing", "Implement->Extend: extended attr remains");
	same(new ImExClass().another, "gniht", "Implement->Extend: implemented attr remains");
});

test("super0", function(){
	var a = Class.extend({
		init: function(){
			same(this._super, undefined, "sem _super");
		},
		a: function(){}
	});
	new a();
});

test("super1", function(){
	var a = Class.extend({
		init: function(){
			same(this._super, undefined, "sem _super");
		},
		a: function(){}
	});
	var b = a.extend({
		init: function(){
			this._super();
			same(this._super, a.prototype.init, "b._super === a.init");
		},
		b: function(){}
	});
	new b();
});

test("super2", function(){
	var a = Class.extend({
		init: function(){
			same(this._super, undefined, "sem _super");
		},
		a: function(){}
	});
	var b = a.extend({
		init: function(){
			this._super();
			same(this._super, a.prototype.init, "b._super === a.init");
		},
		b: function(){}
	});
	var c = b.extend({
		init: function(){
			this._super();
			same(this._super, b.prototype.init, "c._super === b.init");
		},
		c: function(){}
	});
	new c();
});

test("super3", function(){
	var a = Class.extend({
		init: function(){
			same(this._super, undefined, "sem _super");
		},
		a: function(){}
	});
	var b = {
		init: function(){
			this._super();
			same(this._super, a.prototype.init, "b._super === a.init");
		},
		b: function(){}
	};
	b = a.extend(b);
	var c = b.extend({
		init: function(){
			this._super();
			same(this._super, b.prototype.init, "c._super === b.init");
		},
		c: function(){}
	});
	new c();
});


test("super4", function(){
	var a = Class.extend({
		init: function(){
			same(this._super, undefined, "sem _super");
		},
		a: function(){}
	});
	var b = a.extend(Loading);
	var c = b.extend({
		init: function(){
			this._super();
			same(this._super, b.prototype.init, "c._super === b.init");
		},
		c: function(){}
	});
	new c();
});