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

Confetti.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.pos.x*sr+ this.hei* cos(this.rad1)*sr+ scrWid0, this.pos.y*sr+ this.wid* sin(this.rad1)*sr+ scrHei0);
	ctx.lineTo(this.pos.x*sr+ this.hei* cos(this.rad2)*sr+ scrWid0, this.pos.y*sr+ this.wid* sin(this.rad2)*sr+ scrHei0);
	ctx.lineTo(this.pos.x*sr- this.hei* cos(this.rad1)*sr+ scrWid0, this.pos.y*sr- this.wid* sin(this.rad1)*sr+ scrHei0);
	ctx.lineTo(this.pos.x*sr- this.hei* cos(this.rad2)*sr+ scrWid0, this.pos.y*sr- this.wid* sin(this.rad2)*sr+ scrHei0);
	ctx.closePath();
	ctx.fillStyle = color[this.color];
	ctx.fill();
}


var updateConfetti = function(){
	for(var i=0; i<confetti.length; i++){
		if(confetti[i].isAlive){
			confetti[i].move();
			if(confetti[i].pos.y>scrHei1+10) confetti[i].isAlive = false;
		}
	}
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
	this.rad2 = PI_2;
}

var PaperTape = function(){
	this.pos1 = new Point();
	this.pos2 = new Point();
	this.vel1 = new Point();
	this.vel2 = new Point();
	this.isAlive = true;
	this.color = 0;
	this.section = new Array()
	this.side = 0;
}

PaperTape.prototype.fire = function(x, y, s){
	this.pos1.x = x;
	this.pos1.y = y;
	this.pos2.x = x;
	this.pos2.y = y;
	this.vel1.x = (15+ Math.random()* 8)* s;
	this.vel1.y = -26+ Math.random()* 18;
	this.vel2.x = (15+ Math.random()* 8)* s* 0.1;
	this.vel2.y = (-26+ Math.random()* 18)* 0.6;
	this.color = Math.floor(Math.random()*3);
	this.section = new Array(Math.ceil(10+ Math.random()*6));
	for(var i=0; i<this.section.length; i++){
		if(i==0 || i==(this.section.length-1)) this.section[i] = 0;
		else this.section[i] = 1;
	}
	this.side = s;
}

PaperTape.prototype.draw = function(){
	// section = this.section.mul(1);
	// var section = new Array(0, 0.6, 1, 1.1, 1.2, 1.3, 1.5, 1.8, 2.1, 2.3, 2.6, 3.0, 3.5, 4.0);
	// sectionSum = calcSum(section);
	// for(var i=0; i<section.length; i++){
		// section[i] /= sectionSum;
	// }
	section = arrMulX(this.section, 1/calcSum(this.section));
	
	var p1 = this.pos1;
	var p2 = this.pos2;
	var len = p1.sub(p2).norm();
	var dir = p2.sub(p1);
	var sum = 0;
	if(len==0) return;
	dirNorm = dir.normalize();
	// var wid = arrMulX(dirNorm, 20);
	// var hei = arrMulX(dirNorm, 10);
	var wid = dirNorm.mul(20);
	var hei = dirNorm.mul(10);
	ctx.beginPath();
	sum1 = 0;
	sum2 = section[0]
	for(var i=0; i<section.length-1; i++){
		sum1 += section[i];
		sum2 += section[i+1];
		if(i==0)ctx.moveTo(p1.x+ dir.x* sum1+ wid.y,        p1.y+ dir.y* sum1- wid.x);
		ctx.bezierCurveTo(p1.x+ dir.x* sum1+ wid.y* (-1)**i+ wid.x* section[i]*10, p1.y+ dir.y* sum1- wid.x* (-1)**i+ wid.y* section[i]*10,
		                  p1.x+ dir.x* sum2- wid.y* (-1)**i- wid.x* section[i]*10, p1.y+ dir.y* sum2+ wid.x* (-1)**i- wid.y* section[i]*10,
						  p1.x+ dir.x* sum2- wid.y* (-1)**i,        p1.y+ dir.y* sum2+ wid.x* (-1)**i);
	}
	ctx.lineWidth = 1
	for(var i=section.length-2; i>-1; i--){
		ctx.bezierCurveTo(p1.x+ dir.x* sum2- wid.y* (-1)**i- wid.x* section[i]*10+ hei.x, p1.y+ dir.y* sum2+ wid.x* (-1)**i- wid.y* section[i]*10+ hei.y,
		                  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ wid.x* section[i]*10+ hei.x, p1.y+ dir.y* sum1- wid.x* (-1)**i+ wid.y* section[i]*10+ hei.y,
						  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ hei.x,        p1.y+ dir.y* sum1- wid.x* (-1)**i+ hei.y);
		sum1 -= section[i];
		sum2 -= section[i+1];
	}
	ctx.closePath();
	ctx.fillStyle = gradation1(p1.sub(wid.rot(P0, PI_2).mul(0.8*this.side)), p1.sub(wid.rot(P0, -PI_2).mul(0.8*this.side)), color[this.color], color[this.color+20])
	sum1 = 0;
	sum2 = section[0];
	for(var i=0; i<section.length-1; i++){
		sum1 += section[i];
		sum2 += section[i+1];
		if(((i%2==1)&&this.side==1) || ((i%2==0)&&this.side==-1)) continue;
		ctx.beginPath();
		ctx.moveTo(p1.x+ dir.x* sum1+ wid.y* (-1)**i, p1.y+ dir.y* sum1- wid.x* (-1)**i)
		ctx.bezierCurveTo(p1.x+ dir.x* sum1+ wid.y* (-1)**i+ wid.x* section[i]*10, p1.y+ dir.y* sum1- wid.x* (-1)**i+ wid.y* section[i]*10,
		                  p1.x+ dir.x* sum2- wid.y* (-1)**i- wid.x* section[i]*10, p1.y+ dir.y* sum2+ wid.x* (-1)**i- wid.y* section[i]*10,
						  p1.x+ dir.x* sum2- wid.y* (-1)**i,        p1.y+ dir.y* sum2+ wid.x* (-1)**i);
		ctx.lineTo(p1.x+ dir.x* sum2- wid.y* (-1)**i+ hei.x,        p1.y+ dir.y* sum2+ wid.x* (-1)**i+ hei.y);
		ctx.bezierCurveTo(p1.x+ dir.x* sum2- wid.y* (-1)**i+ hei.x- wid.x* section[i]*10, p1.y+ dir.y* sum2+ wid.x* (-1)**i+ hei.y- wid.y* section[i]*10,
		                  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ hei.x+ wid.x* section[i]*10, p1.y+ dir.y* sum1- wid.x* (-1)**i+ hei.y+ wid.y* section[i]*10,
						  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ hei.x, p1.y+ dir.y* sum1- wid.x* (-1)**i+ hei.y)
		ctx.closePath();
		ctx.fillStyle = color[this.color+20];
		console.log()
		ctx.fillStyle = gradation2(p1.add(dir.mul((sum1+sum2)/2)), 0, wid.norm()*1.3, color[this.color], color[this.color+20]);
		ctx.fill();
	}
	sum1 = 0;
	sum2 = section[0];
	for(var i=0; i<section.length-1; i++){
		sum1 += section[i];
		sum2 += section[i+1];
		if(((i%2==0)&&this.side==1) || ((i%2==1)&&this.side==-1)) continue
		ctx.beginPath();
		ctx.moveTo(p1.x+ dir.x* sum1+ wid.y* (-1)**i, p1.y+ dir.y* sum1- wid.x* (-1)**i)
		ctx.bezierCurveTo(p1.x+ dir.x* sum1+ wid.y* (-1)**i+ wid.x* section[i]*10, p1.y+ dir.y* sum1- wid.x* (-1)**i+ wid.y* section[i]*10,
		                  p1.x+ dir.x* sum2- wid.y* (-1)**i- wid.x* section[i]*10, p1.y+ dir.y* sum2+ wid.x* (-1)**i- wid.y* section[i]*10,
						  p1.x+ dir.x* sum2- wid.y* (-1)**i,        p1.y+ dir.y* sum2+ wid.x* (-1)**i);
		ctx.lineTo(p1.x+ dir.x* sum2- wid.y* (-1)**i+ hei.x,        p1.y+ dir.y* sum2+ wid.x* (-1)**i+ hei.y);
		ctx.bezierCurveTo(p1.x+ dir.x* sum2- wid.y* (-1)**i+ hei.x- wid.x* section[i]*10, p1.y+ dir.y* sum2+ wid.x* (-1)**i+ hei.y- wid.y* section[i]*10,
		                  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ hei.x+ wid.x* section[i]*10, p1.y+ dir.y* sum1- wid.x* (-1)**i+ hei.y+ wid.y* section[i]*10,
						  p1.x+ dir.x* sum1+ wid.y* (-1)**i+ hei.x, p1.y+ dir.y* sum1- wid.x* (-1)**i+ hei.y)
		ctx.closePath();
		ctx.fillStyle = color[04];
		ctx.fill();
		ctx.fillStyle = color[this.color];
		ctx.fillStyle = gradation2(p1.add(dir.mul((sum1+sum2)/2)), 0, wid.norm(), color[this.color], color[this.color+10]);
		ctx.fillStyle = gradation2(new Point(p1.x+ dir.x* sum2+ wid.y* (-1)**i, p1.y+ dir.y* sum2- wid.x* (-1)**i), 0, wid.norm(), color[this.color+10], color[this.color]);
		ctx.fillStyle = gradation1(new Point(p1.x+ dir.x* sum2- wid.y* (-1)**i+ hei.x, p1.y+ dir.y* sum2+ wid.x* (-1)**i+ hei.y),
		                           new Point(p1.x+ dir.x* sum1+ wid.y* (-1)**i, p1.y+ dir.y* sum1- wid.x* (-1)**i), color[this.color], color[this.color+10]);
		ctx.fill();
	} 
}

var updatePaperTape = function(){
	for(var i=0; i<paperTape.length; i++){
		if(paperTape[i].isAlive){
			paperTape[i].move();
		}
	}
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
	this.vel2.x *= 0.97;
	this.vel2.y *= 0.97;
	this.vel1.y += 0.15;
	this.vel2.y += 0.13;
	//あまりに伸びすぎていたら復元力が働くようにする
	var len = this.pos1.sub(this.pos2).norm();
	if(len>600){
		this.pos1.x -= (len-600)* 0.03* this.pos1.sub(this.pos2).normalize().x;
		this.pos1.y -= (len-600)* 0.03* this.pos1.sub(this.pos2).normalize().y;
	}
	var sum = 1;
	for(var i=0; i<this.section.length; i++){
		sum *= 1.2
		this.section[i] += sum;
	}
}


var stageClearEffect = function(){
	//紙吹雪の発射
	for(var i=0; i<confetti.length/2; i++){
		confetti[i].fire(-100, scrHei1, 1, i%7, i%13);
	}for(var i=Math.ceil(confetti.length/2); i<confetti.length; i++){
		confetti[i].fire(scrWid1+100, scrHei1, -1, i%7, i%13);
	}
	//紙テープの発射
	for(var i=0; i<paperTape.length/2; i++){
		paperTape[i].fire(-100, scrHei1, 1);
	}
	for(var i=Math.ceil(paperTape.length/2); i<paperTape.length; i++){
		paperTape[i].fire(scrWid1+100, scrHei1, -1);
	}
	for(var i=0; i<confetti.length/2; i++){
		confetti[i].fire(-100, scrHei1, 1, i%7, i%13);
	}for(var i=confetti.length/2; i<confetti.length; i++){
		confetti[i].fire(scrWid1+100, scrHei1, -1, i%7, i%13);

	}
	clearFlag = true;
}









