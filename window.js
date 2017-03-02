var box = function(){
	this.tl = new Point();
	this.tr = new Point();
	this.br = new Point();
	this.bl = new Point();
	
	this.srt = "";
	this.sc = "black";
	this.bc = "white";
	this.type = 0;
}



box.prototype.set = function(tlx, tly, brx, bry, str, fc, fs, bc, type){
	this.tl = new Point(tlx, tly);
	this.tr = new Point(brx, tly);
	this.br = new Point(brx, bry);
	this.bl = new Point(tlx, bry);
	
	this.srt = str;
	this.fc = fc;
	this.fs = fs;
	this.bc = bc;
	this.type = type;
}

box.prototype.draw = function(){
	ctx.moveTo(this.tl.x, this.tl.y);
	ctx.lineTo(this.tr.x, this.tr.y);
	ctx.lineTo(this.br.x, this.br.y);
	ctx.lineTo(this.bl.x, this.bl.y);
	ctx.closePath();
	ctx.fillStyle = this.fc;
	ctx.fill()
}

setBox = function(tlx, tly, brx, bry, str, fc, fs, bc){
	ctx.moveTo(tlx, tly);
	ctx.lineTo(brx, tly);
	ctx.lineTo(brx, bry);
	ctx.lineTo(tlx, bry);
	ctx.closePath();
	// ctx.fillStyle = bc;
	ctx.fill()
}