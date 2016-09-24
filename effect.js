var Confetti = function(){
	this.pos = new Point();
	this.vel = new Point();
	this.isAlive = false;
	this.color = 0;
	this.hei = 0;
	this.wid = 0;
	this.rad1 = 0;
	this.rad2 = 0;
	this.radv1 = 0;
	this.radv2 = 0;
	this.fallVel = 0;
	this.num = 0;
}

Confetti.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.pos.x+ this.hei* cos(this.rad1), this.pos.y+ this.wid* sin(this.rad1));
	ctx.lineTo(this.pos.x+ this.hei* cos(this.rad2), this.pos.y+ this.wid* sin(this.rad2));
	ctx.lineTo(this.pos.x- this.hei* cos(this.rad1), this.pos.y- this.wid* sin(this.rad1));
	ctx.lineTo(this.pos.x- this.hei* cos(this.rad2), this.pos.y- this.wid* sin(this.rad2));
	ctx.closePath();
	test[0] = this.pos.x+ this.hei* cos(this.rad1)
	test[1] = this.pos.x- this.hei* cos(this.rad1)
	ctx.fillStyle = color[this.color];
	ctx.fill();
}

Confetti.prototype.move = function(){
	this.pos.x += this.vel.x;
	this.pos.y += this.vel.y;
	this.vel.x *= 0.97;
	this.vel.y *= 0.97;
	this.rad1 += this.radv1;
	this.rad2 += this.radv2;
	this.vel.y += this.fallVel;
	this.vel.x += sin(counter%40+this.num)*0.4*sin(this.rad1)*1.4;
	this.rad2 = PI_2
}

Confetti.prototype.fire = function(x, y, s, r1, r2){
	this.pos.x = x+ r2/13* 200- 100;
	this.pos.y = y-0;
	this.vel.x = (0+ Math.random()* 22)* s;
	this.vel.y = -22+ Math.random()* 15;
	this.hei = 9;
	this.wid = 7;
	this.rad1 = 0;
	this.rad2 = PI_2;
	this.radv1 = (Math.random()* 0.6- 0.3)*2;
	this.radv2 = r1/2* 0.4- 0.2;
	this.color = r1;
	this.isAlive = true;
	this.fallVel = 0.07+ r2/13* 0.09
}

var PaperTape = function(){
	this.pos1 = new Point();
	this.pos2 = new Point();
	this.vel1 = new Point();
	this.vel2 = new Point();
	this.isAlive = true;
	this.color = 0;
}

PaperTape.prototype.draw = function(){
	var section = new Array(0, 1, 1, 1.1, 1.2, 1.3, 1.5, 1.8, 2.1, 2.3, 2.6, 3.0, 3.5, 4.0);
	section = section.mul(1/section.sum())
	
	var p1 = this.pos1;
	var p2 = this.pos2;
	var len = p1.sub(p2).norm();
	var dir = p2.sub(p1);
	var sum = 0;
	if(len==0) return;
	dirNorm = dir.normalize();
	var wid = dirNorm.mul(20);
	var hei = dirNorm.mul(12);
	ctx.beginPath();
	ctx.lineWidth = 5;
	// ctx.moveTo(this.pos1.x, this.pos1.y);
	// for(i=1; i<section.length; i++){
		// sum += section[i];
		// ctx.lineTo(p1.x+ dir.x* sum- wid.y* (-1)**i, p1.y+ dir.y* sum+ wid.x* (-1)**i, 7, 0, PI2, true);
	// }
	sum1 = 0;
	sum2 = section[0]
	ctx.moveTo(p1.x, p1.y);
	for(i=0; i<section.length-1; i++){
		sum1 += section[i];
		sum2 += section[i+1];
		ctx.bezierCurveTo(p1.x+ dir.x* sum1+ wid.y* (-1)**i+ wid.x, p1.y+ dir.y* sum1- wid.x* (-1)**i+ wid.y,
		                  p1.x+ dir.x* sum2- wid.y* (-1)**i- wid.x, p1.y+ dir.y* sum2+ wid.x* (-1)**i- wid.y,
						  p1.x+ dir.x* sum2- wid.y* (-1)**i,        p1.y+ dir.y* sum2+ wid.x* (-1)**i);
	}
	for(i=section.length-2; i>-1; i--){
		ctx.bezierCurveTo(p1.x+ dir.x* sum2- wid.y* (-1)**i- wid.x+ hei.x, p1.y+ dir.y* sum2+ wid.x* (-1)**i- wid.y+ hei.y,
		                  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ wid.x+ hei.x, p1.y+ dir.y* sum1- wid.x* (-1)**i+ wid.y+ hei.y,
						  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ hei.x,        p1.y+ dir.y* sum1- wid.x* (-1)**i+ hei.y);
		sum1 -= section[i];
		sum2 -= section[i+1];
	}
	ctx.closePath();
	ctx.fillStyle = color[this.color]
	ctx.fill()
}

PaperTape.prototype.move = function(){
	this.pos1.x += this.vel1.x;
	this.pos1.y += this.vel1.y;
	this.pos2.x += this.vel2.x;
	this.pos2.y += this.vel2.y;
	this.vel1.x *= 0.97;
	this.vel1.y *= 0.97;
	this.vel2.x *= 0.97;
	this.vel2.y *= 0.97;
	this.vel1.y += 0.15;
	this.vel2.y += 0.02;
	
}

PaperTape.prototype.fire = function(x, y, s){
	this.pos1.x = x;
	this.pos1.y = y;
	this.pos2.x = x;
	this.pos2.y = y;
	this.vel1.x = (15+ Math.random()* 8)* s;
	this.vel1.y = -26+ Math.random()* 18;
	this.color = Math.floor(Math.random()*3);
}












