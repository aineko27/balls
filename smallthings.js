var Padlock = function(x, y, isLocked){
	this.center = new Point(x, y);
	this.isAlive = true;
	this.isLocked = isLocked;
}

Padlock.prototype.draw = function(){
	ctx.beginPath();
	var wid1 = 26;
	var hei1 = 8;
	var hei2 = 20;
	ctx.moveTo((this.center.x- wid1)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
	ctx.lineTo((this.center.x+ wid1)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
	ctx.lineTo((this.center.x+ wid1)* sr+ scrWid0, (this.center.y+ hei2)* sr+ scrHei0);
	ctx.lineTo((this.center.x- wid1)* sr+ scrWid0, (this.center.y+ hei2)* sr+ scrHei0);
	ctx.closePath();
	ctx.fillStyle = "white";
	ctx.fill();
	ctx.fillStyle = "gray";
	ctx.fill();
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	// ctx.stroke();
	
	// ctx.beginPath();
	if(this.isLocked==true){
		var wid1 = 20;
		var wid2 = 12;
		var hei1 = 8;
		var hei2 = 17
		ctx.moveTo((this.center.x- wid1)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
		ctx.lineTo((this.center.x- wid1)* sr+ scrWid0, (this.center.y- hei2)* sr+ scrHei0);
		ctx.arc(this.center.x* sr+ scrWid0, (this.center.y- hei2)*sr+ scrHei0, wid1*sr, PI, 0, false);
		ctx.lineTo((this.center.x+ wid1)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
		ctx.moveTo((this.center.x+ wid2)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
		ctx.lineTo((this.center.x+ wid2)* sr+ scrWid0, (this.center.y- hei2)* sr+ scrHei0);
		ctx.arc(this.center.x* sr+ scrWid0, (this.center.y- hei2)*sr+ scrHei0, wid2*sr, 0, PI, true);
		ctx.lineTo((this.center.x-wid2)* sr+ scrWid0,  (this.center.y- hei1)* sr+ scrHei0);
		// ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.fillStyle = "gray";
		ctx.fill();
		ctx.stroke();
	}
	else{
		// ctx.stroke();
		// ctx.beginPath();
		var wid1 = 20;
		var wid2 = 12;
		var hei1 = 8;
		var hei2 = 26;
		var hei3 = 12;
		ctx.moveTo((this.center.x- wid1)* sr+ scrWid0, (this.center.y- hei3)* sr+ scrHei0);
		ctx.lineTo((this.center.x- wid1)* sr+ scrWid0, (this.center.y- hei2)* sr+ scrHei0);
		ctx.arc(this.center.x* sr+ scrWid0, (this.center.y- hei2)*sr+ scrHei0, wid1*sr, PI, 0, false);
		ctx.lineTo((this.center.x+ wid1)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
		ctx.lineTo((this.center.x+ wid2)* sr+ scrWid0, (this.center.y- hei1)* sr+ scrHei0);
		ctx.lineTo((this.center.x+ wid2)* sr+ scrWid0, (this.center.y- hei2)* sr+ scrHei0);
		ctx.arc(this.center.x* sr+ scrWid0, (this.center.y- hei2)*sr+ scrHei0, wid2*sr, 0, PI, true);
		ctx.arc((this.center.x- wid2)* sr+ scrWid0, (this.center.y- (hei2+hei3)/2)* sr+ scrHei0, 4*sr, -PI_2-0.2, PI_2+0.2, true);
		ctx.lineTo((this.center.x- wid2)* sr+ scrWid0, (this.center.y- hei3)* sr+ scrHei0);
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.fillStyle = "gray";
		ctx.fill();
		ctx.stroke();
	}
	
	var wid1 = 6;
	var hei1 = 3;
	var hei2 = 15;
	var theta = 1.1
	ctx.beginPath();
	ctx.arc(this.center.x* sr+ scrWid0, (this.center.y+hei1)* sr+ scrHei0, wid1*sr, PI- theta, theta, false);
	ctx.lineTo((this.center.x+wid1)* sr+ scrWid0, (this.center.y+hei2)* sr+ scrHei0)
	ctx.lineTo((this.center.x-wid1)* sr+ scrWid0, (this.center.y+hei2)* sr+ scrHei0)
	ctx.closePath();
	ctx.fillStyle = "black";
	ctx.fill();
}
