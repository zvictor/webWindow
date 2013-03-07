function log(){
	var args = [];
	for(var i=0;i<arguments.length;i++)
		args.push(arguments[i]);
	
	if(console && console.log)
		try{
			console.log.apply(this, args);
		}catch(e){
			console.log(args);
		}
}

function call(address, msg){
	var oldFn = eval(address);
	eval(address+'= function(){ok(true, "'+msg+'"); return oldFn.apply(this, arguments);}');
}