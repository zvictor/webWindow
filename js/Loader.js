var Loader = Class.extend(Loading).extend({
	init: function(value){
		this._super();
		if(typeof value != "string" || this.isDataURI(value))
			this.validate(value);
		else
			this.open(value);
	},
	
	validate: function(value){
		if(this.isDataURI(value)){
			this._location = value;
			this._contentType = ["image", "png;base64"];
			this.dispatchEvent(new Event("load"));
		} else
			throw Error("unhandled type on Loader: "+typeof value);
	},

	isDataURI: function(value){
		return typeof value == "string" ? value.substring(0, 5) == "data:" : false;
	},
/*
	newXhr : function() { // TODO: is this needed on IE 9?
		if (typeof(XMLHttpRequest) != "undefined")
			return new XMLHttpRequest();
		else if (typeof(ActiveXObject) != "undefined")
			return new ActiveXObject("Microsoft.XMLHTTP");
		else
			throw new Error("No XMLHTTPRequest support detected");
	},*/
	request : function(method, callback){
		var that = this;
		var req = new XMLHttpRequest(); // var req =this.newXhr()
		req.onreadystatechange=function(){
			if (this.readyState==4)
				if(this.status == 200)
					callback(this);
				else
					that.dispatchEvent(new Event("error"));
		}
		req.open(method, this._location, true);
		req.send(null);
		return req;
	},

	open: function(value){
		Loader.prefix = (Loader.prefix[Loader.prefix.length-1] != "/")? Loader.prefix += "/" : Loader.prefix;
		value = Loader.prefix+value;
		value.replace("(\/*)", "/");
		this._location = value;
		var that = this;
		this.request("HEAD", function(server){
			that._contentType = server.getResponseHeader("Content-Type").split("/"); //"image/png"
			that._content = server.responseText;
			if(that._contentType[0] == "image" || that._content != "")
				that.dispatchEvent(new Event("load"));
			else
				that.read();
		});
		return this;
	},

	read: function(){
		var that = this;
		this.request("GET", function(server){
			that._contentType = server.getResponseHeader("Content-Type").split("/"); //"image/png"
			that._content = server.responseText;
			that.dispatchEvent(new Event("load"));
		});
	},

	generate: function(){
		if(!this.loaded())
			throw Error("not yet!");
		if(this._contentType[0] == "image")
			return new ImageDraw(this._location);
		if(this._contentType[0] == "text") //////////////// TODO: json type?
			return JSON.parse(this._content);
		return this._content;
	},

	autoUpdate: function(list){
		var that = this;
		this.addEventListener("load", function(){
			for (var i = 0; i < list.length; i++)
				if (list[i] == that)
					list[i] = that.generate();
		});
		return this;
	}
});
Loader.prefix = "";