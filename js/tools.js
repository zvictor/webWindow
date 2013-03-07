if(typeof values === "undefined")
	function values(object){
		var array = [];
		for(var x in object)
			array.push(object[x]);
		return array;
	}

/*if(!Object.prototype.clone)
	Object.prototype.clone = function() {
		var newObj = (this instanceof Array) ? [] : {};

		for (i in this) {
			if (i == 'clone') continue;
			//debugger
			if(this[i] == this){
			debugger;	newObj[i] = newObj;
			}
			else if (this[i] && typeof this[i] == "object")
				newObj[i] = this[i].clone();
			else
				newObj[i] = this[i]
		} return newObj;
	};*/

//if(!Array.prototype.sort)
//	Array.prototype.sort=function()
//	{
//		var tmp;
//		for(var i=0;i<this.length;i++)
//		{
//			for(var j=0;j<this.length;j++)
//			{
//				if(this[i]<this[j])
//				{
//					tmp = this[i];
//					this[i] = this[j];
//					this[j] = tmp;
//				}
//			}
//		}
//	};
//
//if(!Array.prototype.unshift)
//	Array.prototype.unshift=function(item)
//	{
//		this[this.length] = null;/* create a new last element */
//		for(var i=1;i<this.length;i++)
//		{
//			this[i] = this[i-1]; /* shift elements upwards */
//		}
//		this[0] = item;
//	};
//
//if(!Array.prototype.shift)
//	Array.prototype.shift=function()
//	{
//		for(var i=1;i<this.length;i++)
//		{
//			this[i-1] = this[i] /* shift element downwards */
//		}
//		this.length =  this.length-1;
//	};
//
//if(!Array.prototype.clear)
//	Array.prototype.clear=function()
//	{
//		this.length = 0;
//	};

if(!Array.prototype.contains)
	Array.prototype.contains = function (element)
	{
		for (var i = 0; i < this.length; i++)
		{
			if (this[i] == element)
			{
				return true;
			}
		}
		return false;
	};

///* Shuffles the Array elements randomly */
//if(!Array.prototype.shuffle)
//	Array.prototype.shuffle=function()
//	{
//		var i=this.length,j,t;
//		while(i--)
//		{
//			j=Math.floor((i+1)*Math.random());
//			t=arr[i];
//			arr[i]=arr[j];
//			arr[j]=t;
//		}
//	}
//
///* Removes redundant elements from the array */
//if(!Array.prototype.unique)
//	Array.prototype.unique=function()
//	{
//		var a=[],i;
//		this.sort();
//		for(i=0;i<this.length;i++)
//		{
//			if(this[i]!==this[i+1])
//			{
//				a[a.length]=this[i];
//			}
//		}
//		return a;
//	}
//
///* Returns the index of the element matched from the behind */
//if(!Array.prototype.lastIndexOf)
//	Array.prototype.lastIndexOf=function(n)
//	{
//		var i=this.length;
//		while(i--)
//		{
//			if(this[i]===n)
//			{
//				return i;
//			}
//		}
//		return -1;
//	}