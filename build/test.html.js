if(!Array.prototype.contains)Array.prototype.contains=function(a){for(var b=0;b<this.length;b++)if(this[b]==a)return true;return false};(function(){var a=false,b=/xyz/.test(function(){})?/\b_super\b/:/.*/,c=this.Class=function(){};Class.extend=function(d){function e(){!a&&this.init&&this.init.apply(this,arguments)}var g=this.prototype;a=true;var h=new this;a=false;for(var f in d)h[f]=typeof d[f]=="function"&&typeof g[f]=="function"&&b.test(d[f])?function(j,k){return function(){var l=this._super;this._super=g[j];var n=k.apply(this,arguments);this._super=l;return n}}(f,d[f]):d[f];e.prototype=h;e.constructor=e;e.extend=arguments.callee;
e.implement=c.implement;return e};Class.implement=function(d){function e(){!a&&this.init&&this.init.apply(this,arguments)}var g=this.prototype;a=true;var h=new this;a=false;for(var f in d)h[f]=g[f]!==undefined?g[f]:d[f];if(d.init)h.init=function(){d.init.apply(this,arguments);g.init&&g.init.apply(this,arguments)};e.prototype=h;e.constructor=e;e.implement=arguments.callee;e.extend=c.extend;return e}})();var Listener={init:function(){this.listener={}},addEventListener:function(a,b,c){this.listener[a]||(this.listener[a]=[]);this.listener[a].push([b,c]);return this},dispatchEvent:function(a){for(var b=this.listener[a.type]||[],c=0;c<b.length;c++)b[c][1]&&b.splice(c,1)[0][0].apply(this,[a]);for(c=0;c<b.length;c++)b[c][0].apply(this,[a])},removeEventListener:function(a,b){for(var c=0;c<this.listen[a].length;c++)this.listen[a][c][0]==b&&delete this.listen[a][c]}};var Loading=Class.implement(Listener).extend({init:function(){this._super();this._loaded=this._failed=false},loaded:function(){return this._loaded},failed:function(){return this._failed},addEventListener:function(a,b,c){if(a==="load"&&this.loaded()||a==="fail"&&this.failed())b.apply(this,[]);this._super(a,b,c)},dispatchEvent:function(a){this._loaded=a.type==="load"||this._loaded;this._failed=a.type==="fail"||this._failed;this._super(a)}});var Position=Class.extend({init:function(a,b){this.x=a;this.y=b},referenced:function(a){return new Position(this.x+a.x,this.y+a.y,1)}});var methods=["arc","arcTo","beginPath","bezierCurveTo","clearRect","clip","closePath","createImageData","createLinearGradient","createRadialGradient","createPattern","drawFocusRing","drawImage","fill","fillRect","fillText","getImageData","isPointInPath","lineTo","measureText","moveTo","putImageData","quadraticCurveTo","rect","restore","rotate","save","scale","setTransform","stroke","strokeRect","strokeText","transform","translate"],props=["canvas","fillStyle","font","globalAlpha","globalCompositeOperation",
"lineCap","lineJoin","lineWidth","miterLimit","shadowOffsetX","shadowOffsetY","shadowBlur","shadowColor","strokeStyle","textAlign","textBaseline"],methodsMap,propsMap;methodsMap=propsMap={};for(var i=0;i<methods.length;i++){var m=methods[i];methodsMap[m]=function(a){return function(){this.context[a].apply(this.context,arguments);return this}}(m)}
for(i=0;i<props.length;i++){var p=props[i];propsMap[p]=function(a){return function(b){if(typeof b==="undefined")return this.context[a];this.context[a]=b;return this}}(p)}var Sketch=Class.extend(propsMap);Sketch=Sketch.extend(methodsMap);
Sketch=Sketch.extend({init:function(a){a=a||document.createElement("canvas");this.context=a.getContext("2d");this._position=new Position(0,0);this._outdated=true},toDataURL:function(){return this.context.canvas.toDataURL()},dimensions:function(a,b){if(a===undefined)return new Dimensions(this.context.canvas.width,this.context.canvas.height);this.context.canvas.width=a.width||a;this.context.canvas.height=a.height||b;this.update()},width:function(a){if(typeof a===undefined)return this.context.canvas.width;
this.context.canvas.width=a;this.update()},height:function(a){if(typeof a===undefined)return this.context.canvas.height;this.context.canvas.height=a;this.update()},clean:function(){this.clearRect(0,0,this.width(),this.height())},center:function(){return new Position(this.width()/2,this.height()/2)},setPosition:function(a,b,c){this._position=a instanceof Position?a:new Position(a,b,c);this.update();return this},getPosition:function(a){if(a)return this._position.referenced(new Position(-this.width()/
2,-this.height()/2)).referenced(a);return this._position},require:function(a){if(!this.requirements)this.requirements=[];this.requirements=this.requirements.concat(a)},getProgress:function(){for(var a=this.requirements||[],b=0,c=0;c<a.length;c++)if(!a[c].loaded||a[c].loaded()||a[c].failed())b++;return b/a.length},update:function(){this._outdated=true},paint:function(a){if(a){this._paint=a;this.update();return this}else if(this._paint)return this._paint()},draw:function(){if(this._outdated){this.clean();
this.paint();this._outdated=false;return this}}});var TextDraw=Sketch.extend({init:function(a,b){this._super();this.content(a);this.font(b);this.context.textBaseline="middle"},content:function(a){if(typeof a==="undefined")return this._content;this._content=a;this.update()},font:function(a){if(typeof a==="undefined")return this._font;this.context.font=a;this.update()},update:function(){this.width(this.context.measureText(this._content).width);this.context.font.split(" ");this.height(this.context.measureText("M").width*2)},paint:function(){this.fillText(this._content,
0,this.height()/2)}});var ImageDraw=Sketch.extend({init:function(a){this._super();if(typeof a==="string"||a instanceof Image)a=new Resource(a);if(!a instanceof Resource)throw"Incompatible type";var b=this;a.addEventListener("load",function(){b.width(this.width);b.height(this.height)},true);a.addEventListener("error",function(){throw"Image loading failed";},true);this._resource=a},loaded:function(){return this._resource._loaded},failed:function(){return this._resource._failed},paint:function(){this.image&&this._loaded&&
this.drawImage(this._resource.content(),0,0)}});var ImagesAnimation=Sketch.extend({init:function(a,b){this._super();for(var c in a){if(typeof a[c]==="string"||a[c]instanceof Image)a[c]=new Resource(a[c]);if(!a[c]instanceof Resource)throw"Incompatible type";}this.frames=a;this._indice=0;this.pointTo=this.frames[this._indice];var d=this;this.pointTo.addEventListener("load",function(){d.width(this.width);d.height(this.height)},false);this.running=null;b=b||{};this._runForever=b.runForever;this.action=b.action||{};b.speed&&this.run(speed)},loaded:function(){for(var a=
0;a<this.frames.length;a++)if(!this.frames[a].loaded())return false;return true},failed:function(){for(var a=0;a<this.frames.length;a++)if(!this.frames[a].failed())return true;return false},paint:function(){this.pointTo&&this.pointTo.loaded()&&this.drawSketch(this.pointTo.content())},change:function(a){this._indice=a;this.pointTo=this.frames[this._indice]},run:function(a){clearTimeout(this.running);this.pointTo=this.frames[this._indice++];this._indice%=this.frames.length;var b=this;this.running=this._indice!=
0||this._runForever?setTimeout(function(){b.run(a)},a):null;return this},paused:function(){return this.running===null}});var Container=Sketch.extend({init:function(a){this._super(a);this.itens=[]},add:function(a,b,c){a=a instanceof Array?a:[a];if(c!==false)for(c=0;c<a.length;c++){this.require(a[c]);a[c]instanceof Loader&&a[c].autoUpdate(this.requirements)}c=a;c.unshift(b||this.itens.length,0);this.itens.splice.apply(this,c);for(c=0;c<a.length;c++)a[c]instanceof Loader&&a[c].autoUpdate(this.itens);return this},remove:function(a){a=this.itens.splice(a,1);for(var b=0;b<this.requirements.length;b++)a===this.requirements[b]&&
delete this.requirements[b];return this},drawSketch:function(){for(var a=[],b=0;b<arguments.length;b++)a.push(arguments[b]);b=a[0];var c=b.getPosition(this.center());b.draw();a[0]=b.context.canvas;a[1]=parseInt(c.x);a[2]=parseInt(c.y);return this.drawImage.apply(this,a)},draw:function(){if(this._outdated){this.clean();this.paint();for(var a=0;a<this.itens.length;a++)this.drawSketch(this.itens[a]);this._outdated=false;return this}}});var Window=Container.extend({init:function(a){this._super();this.originalDimensions=new Dimensions(a.width,a.height);this.dimensions(this.originalDimensions);this.scaleable=a.scaleable?a.scaleable:false},scale:function(a){this.dimensions(a);if(this.scaleable){a=this.ratio(a);this.context.scale(a,a)}},ratio:function(a){var b=a.width/this.originalDimensions.width;a=a.height/this.originalDimensions.height;return b<a?b:a},getPosition:function(a){if(a){var b=this.center();if(this.scaleable){var c=this.ratio(this.dimensions());
b.x*=c;b.y*=c}return this._position.referenced(new Position(-b.x,-b.y)).referenced(a)}return this._position},center:function(){if(this.scaleable)return new Position(this.originalDimensions.width/2,this.originalDimensions.height/2);return new Position(this.dimensions().width/2,this.dimensions().height/2)},loading:function(){this.clean();this.drawSketch(new TextDraw("loading...  "+parseInt(this.getProgress()*100)+"%"));return this},draw:function(){return this.getProgress()<1?this.loading():this._super()}});var Canvas=Container.extend({init:function(a,b){this._super(a);b=b||{};this.maxSize=b.maxSize!==undefined?b.maxSize:true;this.fullScreen=b.fullScreen!==undefined?b.fullScreen:false;this.showFps=b.showFps!==undefined?b.showFps:false;this.fps=b.fps!==undefined?b.fps:15;this.running=null;this.resize();var c=this;window.addEventListener("resize",function(d){c.resize(d)},true)},add:function(a,b,c){a=a instanceof Array?a:[a];for(var d=0;d<a.length;d++)a[d].scale(this.dimensions());this._super(a,b,c);return this},
resize:function(){if(this.fullScreen){this.dimensions(window.innerWidth,window.innerHeight);this.context.canvas.style.position="fixed";this.context.canvas.style.top=this.context.canvas.style.right=this.context.canvas.style.bottom=this.context.canvas.style.left=0}else if(this.maxSize){this.width(this.context.canvas.parentNode.clientWidth);this.height(this.context.canvas.parentNode.clientHeight)}for(var a=0;a<this.itens.length;a++)this.itens[a].scale(this.width(),this.height())},paint:function(){this.showFps&&
this.fillText("FPS: "+this.fps,this.width()-45,this.height()-10)},run:function(){clearTimeout(this.running);var a=0,b=new Date;this.draw();b=new Date-b;var c=1E3/this.fps;if(b*9.1>c)this.fps=this.fps==1?1:--this.fps;else{b*9.1<c&&this.fps++;a=c-b}var d=this;this.running=setTimeout(function(){d.run()},c+a)}});var Loader=Loading.extend({init:function(a){this._super();if(a instanceof Array)this.assign(new ImagesAnimationResource(a));else a instanceof Image||this.isDataURI(a)?this.assign(new ImageResource(a)):this.check(a)},assign:function(a){this._resource=a;this.dispatchEvent(new Event("load"))},newXhr:function(){if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;else if(typeof ActiveXObject!="undefined")return new ActiveXObject("Microsoft.XMLHTTP");else throw Error("No XMLHTTPRequest support detected");
},request:function(a,b){var c=this,d=this.newXhr();d.onreadystatechange=function(){if(this.readyState==4)this.status==200?b(this):c.dispatchEvent(new Event("fail"))};d.open(a,this._location,true);d.send(null);return d},check:function(a){Loader.prefix=Loader.prefix[Loader.prefix.length-1]!="/"?Loader.prefix+="/":Loader.prefix;a=Loader.prefix+a;a.replace("(/*)","/");this._location=a;var b=this;this.request("HEAD",function(c){b._contentType=c.getResponseHeader("Content-Type").split("/");switch(b._contentType[0]){case "image":b.assign(new ImageResource(b._location));
break;default:b.open();break}});return this},open:function(){this.request("GET",function(a){return function(b){a._contentType=b.getResponseHeader("Content-Type").split("/");switch(a._contentType[0]){case "text":a.assign(new JsonResource(b.responseText));break}}}(this))},isDataURI:function(a){return a.substring(0,5)=="data:"},newInstance:function(){return this._resource.newInstance()},autoUpdate:function(a){var b=this;this.addEventListener("load",function(){for(var c=0;c<a.length;c++)if(a[c]==b)a[c]=
b.newInstance()})}});Loader.prefix="";var Resource=Loading.extend({init:function(){this._super()},content:function(){return this._content},newInstance:function(){}});var ImageResource=Resource.extend({init:function(a){this._super();if(a instanceof Image)this._content=a;if(typeof a==="string"){this._content=new Image;this._content.src=a}var b=this;this._content.addEventListener("load",function(c){b.dispatchEvent(c);b._loaded=true},true);this._content.addEventListener("error",function(c){b.dispatchEvent(c);b._failed=true;console.log({Error:arguments,instance:b})},true)},newInstance:function(){return new ImageDraw(this)}});var ImagesAnimationResource=Resource.extend({init:function(a){this._super();if(!(!a instanceof Array)){this._content=[];for(var b=0;b<a.length;b++)this._content.push(new Resource(a[b]))}},newInstance:function(){return new ImagesAnimation(this)}});var JsonResource=Resource.extend({init:function(a){this._super();try{this._content=JSON.parse(a)}catch(b){this._content=a}this._loaded=true},newInstance:function(){return this.content()}});var Library=Class.extend({init:function(){this.requirements={};this.general={}},addCategorie:function(a){if(this[a]&&typeof this[a]!=="object")throw"[ERROR.webWindow] Library.addCategorie: "+a+" already exists";this[a]={}}});Library=function(){return new Library}();var Event=Class.extend({init:function(a){this.type=a}});var HTMLEvent=Class.extend({init:function(a){var b,c=[];for(b=0;b<arguments.length;b++)c.push(arguments[b]);if(["click"].contains(a)){b=document.createEvent("MouseEvents");b.initMouseEvent.apply(this,c)}else if(["keypress","keydown"].contains(a)){b=document.createEvent("KeyboardEvent");b.initKeyEvent.apply(this,c)}else{debugger;b=document.createEvent("HTMLEvents");b.initEvent.apply(this,c)}return b}});var InitializedEvent=Class.extend({init:function(){this.type="initialized"}});var Level=Class.extend({init:function(a){this.name=a.name;this.objects=[];for(var b=0;b<a.objects.length;b++)this.objects.push(a.objects[b][0].addEventListener("load",function(c,d,e){return function(){c.objects[d]=this.newInstance().setPosition(e)}}(this,new Position(a.objects[b][1][0],b,a.objects[b][1][1],30)),true));Library.addCategorie(this.name);Library[this.name]=this.objects}});function log(){for(var a=[],b=0;b<arguments.length;b++)a.push(arguments[b]);if(console&&console.log)try{console.log.apply(this,a)}catch(c){console.log(a)}}function call(a,b){eval(a);eval(a+'= function(){ok(true, "'+b+'"); oldFn.apply(this, arguments);}')};module("Class",{setup:function(){ExtendedClass=Class.extend({init:function(){this.some="thing"}});ImplementedClass=Class.implement({init:function(){this.another="gniht"}});ExImClass=Class.extend({init:function(){this.some="thing"}}).implement({init:function(){this.another="gniht"}});ImExClass=Class.implement({init:function(){this.another="gniht"}}).extend({init:function(){this._super();this.some="thing"}})}});var ExtendedClass,ImplementedClass,ExImClass,ImExClass;
test("attributes",function(){same((new ExtendedClass).some,"thing","correct attr extending");same((new ImplementedClass).another,"gniht","correct attr implementing");same((new ExImClass).some,"thing","Extend->Implement: extended attr remains");same((new ExImClass).another,"gniht","Extend->Implement: implemented attr remains");same((new ImExClass).some,"thing","Implement->Extend: extended attr remains");same((new ImExClass).another,"gniht","Implement->Extend: implemented attr remains")});module("Listener",{setup:function(){listener=new ListenerMock}});var listener,ListenerMock=Class.implement(Listener);test("newInstance",function(){log("newInstance");listener.addEventListener("load",function(){},false);same((new ListenerMock).listener,{},"fresh attribute")});
asyncTest("dispatchEvent",4,function(){log("dispatchEvent");var a=false;listener.addEventListener("load",function(){ok(true,"load non-bubble");ok(a,"non-bubble after");a=true},false);listener.addEventListener("load",function(){ok(true,"load bubble");ok(!a,"bubble first");a=true},true);listener.dispatchEvent(new Event("load"));setTimeout(start,1E3)});
asyncTest("rightScope",2,function(){log("rightScope");var a=new Event("load");listener.addEventListener("load",function(b){same(this,listener,'who is "this"?');same(b,a,'who is "event"?')},false);listener.dispatchEvent(a);setTimeout(start,1E3)});module("Loading",{setup:function(){log("setUp");loading=new Loading}});var loading;test("all set",function(){ok(!loading.loaded(),"not loaded");ok(!loading.failed(),"not failed");same((new Loading).listener,{},"fresh attribute")});test("changing values",function(){loading._loaded=true;ok(loading.loaded(),"already loaded");ok(!loading.failed(),"hasn't failed yet");loading._failed=true;ok(loading.failed(),"has already failed")});
test("dispatching events",function(){loading.dispatchEvent(new Event("any"));ok(!loading.loaded()&&!loading.failed(),"didn't change loading values");loading.dispatchEvent(new Event("load"));ok(loading.loaded()&&!loading.failed(),"loaded");loading=new Loading;loading.dispatchEvent(new Event("fail"));ok(loading.failed()&&!loading.loaded(),"failed")});module("Loader",{setup:function(){Loader.prefix="resources";loaders=[new Loader("caixa0.gif"),new Loader("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC"),new Loader("json.json"),new Loader(["abrir.png","abrir2.png"]),new Loader("404.404")]}});var loaders,error=function(){ok(false,"this event couldn't be happened!")};
asyncTest("Load",4,function(){for(var a=[function(){ok(this.newInstance()instanceof ImageDraw,"caixa0.gif: ImageDraw")},function(){ok(this.newInstance()instanceof ImageDraw,"image/png;base64: ImageDraw")},function(){ok(typeof this.newInstance()=="object","json.json: object")},function(){ok(true,"imagesAnimation temp. deactivated")},error],b=0;b<loaders.length;b++)loaders[b].addEventListener("load",a[b]);setTimeout(start,2E3)});
asyncTest("404",1,function(){for(var a=[error,error,error,error,function(){ok(true,"succesfully failed on 404")}],b=0;b<loaders.length;b++)loaders[b].addEventListener("fail",a[b]);setTimeout(start,2E3)});module("Sketch",{setup:function(){sketchs=[new Sketch]}});var sketchs;test("canvas links",function(){for(var a=0;a<methods.length;a++)ok(typeof sketchs[0][methods[a]]==="function",methods[a]+" is function");for(a=0;a<props.length;a++)ok(typeof sketchs[0][props[a]]==="function",props[a]+" is function")});module("Canvas",{setup:function(){var a=[];canvas=[];for(var b=0;b<5;b++){a.push(document.createElement("canvas"));document.body.appendChild(a[b]);canvas.push(new Canvas(a[b]))}}});var canvas;asyncTest("run",function(){call("canvas[0].run","run called");canvas[0].draw=function(){ok(true,"draw called")};canvas[0].run();var a=0;setInterval(function(){ok(canvas[0].fps!=a,"fps changed to "+canvas[0].fps);a=canvas[0].fps},150);setTimeout(start,1E3)});