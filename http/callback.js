function learn(sth){
	this.words=sth;
	//console.log(global===this);
	console.log(this);
}

function we(callback,sth){
	sth+="is cool";
	new callback(sth);
}

setTimeout(function(){
	we(learn,"nodejs ");
},10);
setTimeout(function(){
	we(learn,"js ");
},-100);

we(function(sth){
	console.warn(sth)
},"javascript ")