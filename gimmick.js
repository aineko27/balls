//ギミックを定義する関数
var Star = function(){
	this.pos = new Point();
	this.homePos = new Point();
	this.isAlive = false;
	this.condition = "invisible";
	this.color = 0;
	this.num = 0;
	this.rad = 0;
	this.blinkRadius1 = 0;
	this.blinkRadius2 = 0;
	this.blinkRadius3 = 0;
	this.div = 0;
	this.homeFlame = 0;
}

Star.prototype.set = function(p, c){
	//座標と色をセット
	this.pos.x = p.x;
	this.pos.y = p.y;
	this.homePos.x = 660+ this.num*50;
	this.homePos.y = 20;
	this.isAlive = true;
	this.condition = "visible";
	this.color = c;
	this.rad = 0;
	this.blinkRadius1 = 0;
	this.blinkRadius2 = 0;
	this.div = 5.5
	this.homeFlame = 0;
}

Star.prototype.draw = function(){
	var x = this.pos.x;
	var y = this.pos.y;
	var div = this.div;
	var rad = this.rad;
	ctx.beginPath();
	ctx.moveTo(x- 95/div* cos(rad)+ 20/div* sin(rad), y- 95/div* sin(rad)- 20/div* cos(rad));
	ctx.lineTo(x- 29/div* cos(rad)+ 30/div* sin(rad), y- 29/div* sin(rad)- 30/div* cos(rad));
	ctx.lineTo(x- 0/div* cos(rad)+ 90/div* sin(rad), y- 0/div* sin(rad)- 90/div* cos(rad));
	ctx.lineTo(x+ 28/div* cos(rad)+ 30/div* sin(rad), y+ 28/div* sin(rad)- 30/div* cos(rad));
	ctx.lineTo(x+ 94/div* cos(rad)+ 20/div* sin(rad), y+ 94/div* sin(rad)- 20/div* cos(rad));
	ctx.lineTo(x+ 42/div* cos(rad)- 24/div* sin(rad), y+ 42/div* sin(rad)+ 24/div* cos(rad));
	ctx.lineTo(x+ 58/div* cos(rad)- 89/div* sin(rad), y+ 58/div* sin(rad)+ 89/div* cos(rad));
	ctx.lineTo(x+ 0/div* cos(rad)- 62/div* sin(rad), y+ 0/div* sin(rad)+ 62/div* cos(rad));
	ctx.lineTo(x- 58/div* cos(rad)- 89/div* sin(rad), y- 58/div* sin(rad)+ 89/div* cos(rad));
	ctx.lineTo(x- 42/div* cos(rad)- 24/div* sin(rad), y- 42/div* sin(rad)+ 24/div* cos(rad));
	ctx.closePath()
	ctx.lineWidth = 1;
	ctx.strokeStyle = color[07];
	ctx.lineCap = "round";
	ctx.stroke();
	var grad = ctx.createLinearGradient(x-95/div, y-90/div, x+95/div, y+90/div);
	grad.addColorStop(0, color[this.color+10])
	grad.addColorStop(1, color[this.color+20])
	ctx.fillStyle = grad;
	ctx.fill()
}

Star.prototype.homeDraw = function(){
	var x = this.homePos.x;
	var y = this.homePos.y;
	var div = this.div;
	ctx.beginPath();
	ctx.moveTo(x- 95/div, y- 20/div);
	ctx.lineTo(x- 29/div, y- 30/div);
	ctx.lineTo(x- 0/div, y- 90/div);
	ctx.lineTo(x+ 28/div, y- 30/div);
	ctx.lineTo(x+ 94/div, y- 20/div);
	ctx.lineTo(x+ 42/div, y+ 24/div);
	ctx.lineTo(x+ 58/div, y+ 89/div);
	ctx.lineTo(x+ 0/div, y+ 62/div);
	ctx.lineTo(x- 58/div, y+ 89/div);
	ctx.lineTo(x- 42/div, y+ 24/div);
	ctx.closePath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = color[this.color];
	ctx.stroke();
}

Star.prototype.detectCollision = function(ball){
	if(this.color==ball.color && this.pos.sub(ball.pos).norm()<ball.size+15){
		this.isAlive = false;
		this.condition = "rotation"
		this.isBlink = true;
		this.blinkRadius1 = 30;
		this.blinkRadius2 = 17;
		this.blinkRadius3 = 3;
	}
}

Star.prototype.blink = function(){
	this.blinkRadius1 += 3;
	this.blinkRadius2 += 4.5;
	this.blinkRadius3 += 4;
	if(this.blinkRadius1>55.){
		this.isBlink = false;
		this.blinkRadius1 = 0;
		this.blinkRadius2 = 0;
	}
	ctx.beginPath();
	ctx.arc(200, 200, 20, 0, PI2, true);
	ctx.arc(this.pos.x, this.pos.y, 30, 0, PI2, true)
	ctx.fillStyle = "gray";
	ctx.closePath()
	ctx.fill();
	ctx.stroke()
}

Star.prototype.twinkle = function(){
	ctx.beginPath();
	var div = 4.5 + sin(counter/15);
	var x = this.pos.x;
	var y = this.pos.y;
	ctx.moveTo(x- 95/div, y- 20/div);
	ctx.lineTo(x- 29/div, y- 30/div);
	ctx.lineTo(x- 0/div, y- 90/div);
	ctx.lineTo(x+ 28/div, y- 30/div);
	ctx.lineTo(x+ 94/div, y- 20/div);
	ctx.lineTo(x+ 42/div, y+ 24/div);
	ctx.lineTo(x+ 58/div, y+ 89/div);
	ctx.lineTo(x+ 0/div, y+ 62/div);
	ctx.lineTo(x- 58/div, y+ 89/div);
	ctx.lineTo(x- 42/div, y+ 24/div);
	ctx.closePath();
	var grad  = ctx.createRadialGradient(x, y, 0, x, y, 20);
	grad.addColorStop(0, color[this.color]);
	grad.addColorStop(1, color[04])
	ctx.fillStyle = grad;
	ctx.fill()
	
	
	ctx.beginPath();
	var div = 18.5 + sin(counter/15);
	var x = this.pos.x;
	var y = this.pos.y;
	ctx.moveTo(x- 95/div, y- 20/div);
	ctx.lineTo(x- 29/div, y- 30/div);
	ctx.lineTo(x- 0/div, y- 90/div);
	ctx.lineTo(x+ 28/div, y- 30/div);
	ctx.lineTo(x+ 94/div, y- 20/div);
	ctx.lineTo(x+ 42/div, y+ 24/div);
	ctx.lineTo(x+ 58/div, y+ 89/div);
	ctx.lineTo(x+ 0/div, y+ 62/div);
	ctx.lineTo(x- 58/div, y+ 89/div);
	ctx.lineTo(x- 42/div, y+ 24/div);
	ctx.closePath();
	var grad  = ctx.createRadialGradient(x, y, 0, x, y, 20);
	grad.addColorStop(0, color[04]);
	grad.addColorStop(1, color[this.color+10])
	ctx.fillStyle = color[04];
	ctx.fill()
}

//==============================================================================================================
var Converter = function(){
	this.pos = new Point();
	this.isAlive = false;
	this.color = 0;
	this.num = 0;
	this.pair = 0;
	this.rampCnt = 0;
}

Converter.prototype.set = function(p, pair){
	this.pos = p.add(P0);
	this.isAlive = true;
	this.color = 3;
	this.pair = pair;
	this.rampCnt = 0;
}

Converter.prototype.draw = function(wall){
	// ctx.beginPath();
	// ctx.arc(this.pos.x, this.pos.y, 5, 0, PI2, true);
	// ctx.fillStyle = color[03];
	// ctx.fill();
	//本体の描写
	// var grad = ctx.createLinearGradient(this.pos.x-30, this.pos.y-30, this.pos.x+30, this.pos.y+30);
	// grad.addColorStop(0, color[this.color+10])
	// grad.addColorStop(1, color[this.color+20])
	ctx.beginPath();
	ctx.moveTo(this.pos.x, this.pos.y-30);
	ctx.lineTo(this.pos.x, this.pos.y+30);
	ctx.moveTo(this.pos.x-30, this.pos.y);
	ctx.lineTo(this.pos.x+30, this.pos.y);
	ctx.lineWidth = 5;
	ctx.lineCap = "butt";
	ctx.strokeStyle = color[this.color];
	ctx.stroke()
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, 20, 0, PI2, false);
	ctx.fillStyle = color[04];
	ctx.fill()
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, 15, 0, PI2, false);
	ctx.arc(this.pos.x, this.pos.y, 20, 0, PI2, true);
	ctx.arc(this.pos.x, this.pos.y, 25, 0, PI2, false);
	ctx.arc(this.pos.x, this.pos.y, 30, 0, PI2, true);
	ctx.fillStyle = color[this.color];
	ctx.fill()
	ctx.beginPath();
	ctx.moveTo(this.pos.x+15, this.pos.y-15);
	ctx.lineTo(this.pos.x-15, this.pos.y+15);
	ctx.moveTo(this.pos.x+15, this.pos.y+15);
	ctx.lineTo(this.pos.x-15, this.pos.y-15);
	ctx.strokeStyle = color[04];
	ctx.stroke();
	//本体から延びる奴の描写
	obje = wall[this.pair]
	ctx.beginPath();
	ctx.moveTo(this.pos.x, this.pos.y);
	ctx.lineTo(obje.center.x, this.pos.y);
	ctx.lineTo(obje.center.x, obje.center.y);
	ctx.lineCap = "butt";
	ctx.lineWidth = "16";
	ctx.strokeStyle = color[13];
	ctx.stroke();
	ctx.beginPath();
	var num = (obje.center.x- this.pos.x)/20;
	for(i=0; i<Math.abs(num)-1/2; i++){
		ctx.arc(obje.center.x- i*20*Math.sign(num), this.pos.y, 6, 0, PI2, true);
	}
	ctx.fillStyle = color[04];
	ctx.fill();
	ctx.beginPath();
	num = (obje.center.y- this.pos.y)/20;
	for(i=1; i<Math.abs(num)-1/2; i++){
		ctx.arc(obje.center.x, this.pos.y+ i*20*Math.sign(num), 6, 0, PI2, true);
	}
	ctx.fill();
	//===========================
	ctx.beginPath();
	ctx.moveTo(this.pos.x, this.pos.y);
	ctx.lineTo(obje.center.x, this.pos.y);
	ctx.lineTo(obje.center.x, obje.center.y);
	ctx.lineCap = "butt";
	ctx.lineWidth = "16";
	ctx.strokeStyle = color[13];
	ctx.stroke();
	ctx.beginPath();
	var num1 = Math.floor(Math.abs((this.pos.x- obje.center.x)/20));
	for(i=0; i<Math.min(Math.abs(num1)-1/2, this.rampCnt); i++){
		ctx.arc(obje.center.x- (num1-i)*20*Math.sign(num1), this.pos.y, 6, 0, PI2, true);
	}
	ctx.fillStyle = color[this.color];
	ctx.fill();
	console.log(this.rampCnt, num1)
	if(this.rampCnt<num1) return;
	ctx.beginPath();
	var num2 = (Math.abs(this.pos.y- obje.center.y)/20);
	for(i=0; i<Math.min(Math.abs(num2)-1/2, this.rampCnt- num1); i++){
		ctx.arc(obje.center.x, this.pos.y- i*20*Math.sign(num2), 6, 0, PI2, true);
	}
	ctx.fill();
	if(this.rampCnt>num1+num2) obje.color = this.color;
	
}

Converter.prototype.attract = function(b, wall){
	var len = this.pos.sub(b.pos).norm()
	if(len<b.size){
		// b.pos.x = (this.pos.x + 7*b.pos.x)/8;
		// b.pos.y = (this.pos.y + 7*b.pos.y)/8;
		b.vel.x += 7* cos(atan2(this.pos.sub(b.pos)))/ b.size**2/0.1;
		b.vel.y += 7* sin(atan2(this.pos.sub(b.pos)))/ b.size**2/0.1;
		// b.vel.y -= 0.2;
		b.vel.x *= 0.9
		b.vel.y *= 0.9
	}
	else if(len < 25){
		b.vel.x += (35-len)**2*0.05* cos(atan2(this.pos.sub(b.pos)))/ b.size**2/0.1;
		b.vel.y += (35-len)**2*0.05* sin(atan2(this.pos.sub(b.pos)))/ b.size**2/0.1;
		b.vel.x *= 0.87
		b.vel.y *= 0.87
	}
	if(len<b.size*0.2){
		this.color = b.color;
		if(counter%3==0)this.rampCnt += 2;
	}
	console.log(this.rampCnt)
	// wall[this.pair].color = this.color;
}

Converter.prototype.draw2 = function(wall){
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, 30, 0, PI2, true);
	ctx.arc(this.pos.x, this.pos.y, 25, 0, PI2, false);
	ctx.fillStyle = color[this.color];
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(this.pos.x-30, this.pos.y);
	ctx.lineTo(this.pos.x+30, this.pos.y);
	ctx.moveTo(this.pos.x, this.pos.y-30);
	ctx.lineTo(this.pos.x, this.pos.y+30);
	ctx.strokeStyle = color[04];
	ctx.lineWidth = 15;
	ctx.stroke();
	for(i=0; i<4; i++){
		
	}
}



