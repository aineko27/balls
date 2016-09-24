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
	this.vel.x += sin(counter%13)*0.1*sin(this.rad1)*1.4;
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

var PaperTape = function(){
	this.pos1 = new Point();
	this.pos2 = new Point();
	this.vel1 = new Point();
	this.vel2 = new Point();
	this.isAlive = true;
	this.color = 0;
}

PaperTape.prototype.draw = function(){
	// ctx.beginPath();
	// ctx.moveTo(this.pos1.x, this.pos1.y);
	// ctx.lineTo(this.pos2.x, this.pos2.y);
	// ctx.strokeStyle = color[this.color];
	// ctx.lineWidth = 5;
	// ctx.stroke();
	var section = new Array(1, 1, 1.1, 1.2, 1.3, 1.5, 1.8, 2.1, 2.3, 2.6, 3.0, 3.5, 4.0);
	section = section.mul(1/section.sum())
	
	var len = this.pos1.sub(this.pos2).norm();
	var direction = this.pos2.sub(this.pos1);
	var sum = 0;
	var width = 20;
	if(len==0) return;
	direNorm = direction.normalize();
	ctx.beginPath();
	ctx.moveTo(this.pos1.x, this.pos1.y);
	for(i=1; i<section.length; i++){
		sum += section[i];
		ctx.lineTo(this.pos1.x+ direction.x* sum- width* direNorm.y* (-1)**i, this.pos1.y+ direction.y* sum+ width* direNorm.x* (-1)**i, 7, 0, PI2, true);
	}
	ctx.strokeStyle = color[this.color];
	ctx.stroke();
	
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












