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
}

Confetti.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.pos.x+ this.hei* cos(this.rad1), this.pos.y+ this.wid* sin(this.rad1));
	ctx.lineTo(this.pos.x+ this.hei* cos(this.rad2), this.pos.y+ this.wid* sin(this.rad2));
	ctx.lineTo(this.pos.x- this.hei* cos(this.rad1), this.pos.y- this.wid* sin(this.rad1));
	ctx.lineTo(this.pos.x- this.hei* cos(this.rad2), this.pos.y- this.wid* sin(this.rad2));
	ctx.closePath();
	// ctx.arc(this.pos.x+ this.hei* cos(this.rad1), this.pos.y+ this.wid* sin(this.rad1), 10, 0, PI2, true)
	// ctx.arc(this.pos.x+ this.hei* cos(this.rad2), this.pos.y+ this.wid* sin(this.rad2), 10, 0, PI2, true)
	// ctx.arc(this.pos.x- this.hei* cos(this.rad1), this.pos.y- this.wid* sin(this.rad1), 10, 0, PI2, true)
	// ctx.arc(this.pos.x- this.hei* cos(this.rad2), this.pos.y- this.wid* sin(this.rad2), 10, 0, PI2, true)
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
	this.vel.x += sin(counter/7)*0.1*sin(this.rad1)*1.4;
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
	this.radv1 = Math.random()* 0.6- 0.3;
	this.radv2 = r1/7* 0.4- 0.2;
	this.color = r1;
	this.isAlive = true;
	this.fallVel = 0.07+ r2/13* 0.09
}

var paperTape = function(){
	this.pos1 = new Point();
	this.pos2 = new Point();
	
}