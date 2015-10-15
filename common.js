function Point(){
	this.x = 0;
	this.y = 0;
};

Point.prototype.distance = function(p){
	var q = new Point();
	q.x = p.x - this.x;
	q.y = p.y - this.y;
	return q;
};

Point.prototype.length = function(){
	return Math.sqrt(this.x * this.x +this.y * this.y);
};

Point.prototype.normalize = function(){
	var i = this.length();
	if(i > 0){
		var j = 1 / i;
		this.x *= j;
		this.y *= j;
	}
	else console.log("Point.normalize ERROR")
};

function Area(){
	this.tlx = 0;
	this.tly = 0;
	this.trx = 0;
	this.try = 0;
	this.blx = 0;
	this.bly = 0;
	this.brx = 0;
	this.bry = 0;
};