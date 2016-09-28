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
	this.homePos.x = 100/*scrWid-300*/ + this.num*50;
	this.homePos.y = scrHei + 60;
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
	ctx.moveTo(x*sr- 95/div* cos(rad)*sr+ 20/div* sin(rad)*sr, y*sr- 95/div* sin(rad)*sr- 20/div* cos(rad)*sr);
	ctx.lineTo(x*sr- 29/div* cos(rad)*sr+ 30/div* sin(rad)*sr, y*sr- 29/div* sin(rad)*sr- 30/div* cos(rad)*sr);
	ctx.lineTo(x*sr- 0/div* cos(rad)*sr+ 90/div* sin(rad)*sr, y*sr- 0/div* sin(rad)*sr- 90/div* cos(rad)*sr);
	ctx.lineTo(x*sr+ 28/div* cos(rad)*sr+ 30/div* sin(rad)*sr, y*sr+ 28/div* sin(rad)*sr- 30/div* cos(rad)*sr);
	ctx.lineTo(x*sr+ 94/div* cos(rad)*sr+ 20/div* sin(rad)*sr, y*sr+ 94/div* sin(rad)*sr- 20/div* cos(rad)*sr);
	ctx.lineTo(x*sr+ 42/div* cos(rad)*sr- 24/div* sin(rad)*sr, y*sr+ 42/div* sin(rad)*sr+ 24/div* cos(rad)*sr);
	ctx.lineTo(x*sr+ 58/div* cos(rad)*sr- 89/div* sin(rad)*sr, y*sr+ 58/div* sin(rad)*sr+ 89/div* cos(rad)*sr);
	ctx.lineTo(x*sr+ 0/div* cos(rad)*sr- 62/div* sin(rad)*sr, y*sr+ 0/div* sin(rad)*sr+ 62/div* cos(rad)*sr);
	ctx.lineTo(x*sr- 58/div* cos(rad)*sr- 89/div* sin(rad)*sr, y*sr- 58/div* sin(rad)*sr+ 89/div* cos(rad)*sr);
	ctx.lineTo(x*sr- 42/div* cos(rad)*sr- 24/div* sin(rad)*sr, y*sr- 42/div* sin(rad)*sr+ 24/div* cos(rad)*sr);
	ctx.closePath()
	ctx.lineWidth = 1*sr;
	ctx.strokeStyle = color[07];
	ctx.lineCap = "round";
	ctx.stroke();
	var grad = ctx.createLinearGradient(x*sr-95/div*sr, y*sr-90/div*sr, x*sr+95/div*sr, y*sr+90/div*sr);
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
	ctx.moveTo(x*sr- 95/div*sr, y*sr- 20/div*sr);
	ctx.lineTo(x*sr- 29/div*sr, y*sr- 30/div*sr);
	ctx.lineTo(x*sr- 0/div*sr, y*sr- 90/div*sr);
	ctx.lineTo(x*sr+ 28/div*sr, y*sr- 30/div*sr);
	ctx.lineTo(x*sr+ 94/div*sr, y*sr- 20/div*sr);
	ctx.lineTo(x*sr+ 42/div*sr, y*sr+ 24/div*sr);
	ctx.lineTo(x*sr+ 58/div*sr, y*sr+ 89/div*sr);
	ctx.lineTo(x*sr+ 0/div*sr, y*sr+ 62/div*sr);
	ctx.lineTo(x*sr- 58/div*sr, y*sr+ 89/div*sr);
	ctx.lineTo(x*sr- 42/div*sr, y*sr+ 24/div*sr);
	ctx.closePath();
	ctx.lineWidth = 1*sr;
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
	ctx.arc(200*sr, 200*sr, 20, 0, PI2, true);
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 30*sr, 0, PI2, true)
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
	ctx.moveTo(x*sr- 95/div*sr, y*sr- 20/div*sr);
	ctx.lineTo(x*sr- 29/div*sr, y*sr- 30/div*sr);
	ctx.lineTo(x*sr- 0/div*sr, y*sr- 90/div*sr);
	ctx.lineTo(x*sr+ 28/div*sr, y*sr- 30/div*sr);
	ctx.lineTo(x*sr+ 94/div*sr, y*sr- 20/div*sr);
	ctx.lineTo(x*sr+ 42/div*sr, y*sr+ 24/div*sr);
	ctx.lineTo(x*sr+ 58/div*sr, y*sr+ 89/div*sr);
	ctx.lineTo(x*sr+ 0/div*sr, y*sr+ 62/div*sr);
	ctx.lineTo(x*sr- 58/div*sr, y*sr+ 89/div*sr);
	ctx.lineTo(x*sr- 42/div*sr, y*sr+ 24/div*sr);
	ctx.closePath();
	var grad  = ctx.createRadialGradient(x*sr, y*sr, 0*sr, x*sr, y*sr, 20*sr);
	grad.addColorStop(0, color[this.color]);
	grad.addColorStop(1, color[04])
	ctx.fillStyle = grad;
	ctx.fill()
	
	
	ctx.beginPath();
	var div = 18.5 + sin(counter/15);
	var x = this.pos.x;
	var y = this.pos.y;
	ctx.moveTo(x*sr- 95/div*sr, y*sr- 20/div*sr);
	ctx.lineTo(x*sr- 29/div*sr, y*sr- 30/div*sr);
	ctx.lineTo(x*sr- 0/div*sr, y*sr- 90/div*sr);
	ctx.lineTo(x*sr+ 28/div*sr, y*sr- 30/div*sr);
	ctx.lineTo(x*sr+ 94/div*sr, y*sr- 20/div*sr);
	ctx.lineTo(x*sr+ 42/div*sr, y*sr+ 24/div*sr);
	ctx.lineTo(x*sr+ 58/div*sr, y*sr+ 89/div*sr);
	ctx.lineTo(x*sr+ 0/div*sr, y*sr+ 62/div*sr);
	ctx.lineTo(x*sr- 58/div*sr, y*sr+ 89/div*sr);
	ctx.lineTo(x*sr- 42/div*sr, y*sr+ 24/div*sr);
	ctx.closePath();
	var grad  = ctx.createRadialGradient(x*sr, y*sr, 0*sr, x*sr, y*sr, 20*sr);
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
	ctx.moveTo(this.pos.x*sr, this.pos.y*sr-30*sr);
	ctx.lineTo(this.pos.x*sr, this.pos.y*sr+30*sr);
	ctx.moveTo(this.pos.x*sr-30*sr, this.pos.y*sr);
	ctx.lineTo(this.pos.x*sr+30*sr, this.pos.y*sr);
	ctx.lineWidth = 5*sr;
	ctx.lineCap = "butt";
	ctx.strokeStyle = color[this.color];
	ctx.stroke()
	ctx.beginPath();
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 20*sr, 0, PI2, false);
	ctx.fillStyle = color[04];
	ctx.fill()
	ctx.beginPath();
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 15*sr, 0, PI2, false);
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 20*sr, 0, PI2, true);
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 25*sr, 0, PI2, false);
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 30*sr, 0, PI2, true);
	ctx.fillStyle = color[this.color];
	ctx.fill()
	ctx.beginPath();
	ctx.moveTo(this.pos.x*sr+15*sr, this.pos.y*sr-15*sr);
	ctx.lineTo(this.pos.x*sr-15*sr, this.pos.y*sr+15*sr);
	ctx.moveTo(this.pos.x*sr+15*sr, this.pos.y*sr+15*sr);
	ctx.lineTo(this.pos.x*sr-15*sr, this.pos.y*sr-15*sr);
	ctx.strokeStyle = color[04];
	ctx.stroke();
	//本体から延びる奴の描写
	obje = wall[this.pair]
	ctx.beginPath();
	ctx.moveTo(this.pos.x*sr, this.pos.y*sr);
	ctx.lineTo(obje.center.x*sr, this.pos.y*sr);
	ctx.lineTo(obje.center.x*sr, obje.center.y*sr);
	ctx.lineCap = "butt";
	ctx.lineWidth = "16";
	ctx.strokeStyle = color[13];
	ctx.stroke();
	ctx.beginPath();
	var num = (obje.center.x- this.pos.x)/20;
	for(i=0; i<Math.abs(num)-1/2; i++){
		ctx.arc(obje.center.x*sr- i*20*Math.sign(num)*sr, this.pos.y*sr, 6*sr, 0, PI2, true);
	}
	ctx.fillStyle = color[04];
	ctx.fill();
	ctx.beginPath();
	num = (obje.center.y- this.pos.y)/20;
	for(i=1; i<Math.abs(num)-1/2; i++){
		ctx.arc(obje.center.x*sr, this.pos.y*sr+ i*20*Math.sign(num)*sr, 6, 0, PI2, true);
	}
	ctx.fill();
	//===========================
	ctx.beginPath();
	ctx.moveTo(this.pos.x*sr, this.pos.y*sr);
	ctx.lineTo(obje.center.x*sr, this.pos.y*sr);
	ctx.lineTo(obje.center.x*sr, obje.center.y*sr);
	ctx.lineCap = "butt";
	ctx.lineWidth = "16";
	ctx.strokeStyle = color[13];
	ctx.stroke();
	ctx.beginPath();
	var num1 = Math.floor(Math.abs((this.pos.x- obje.center.x)/20));
	for(i=0; i<Math.min(Math.abs(num1)-1/2, this.rampCnt); i++){
		ctx.arc(obje.center.x*sr- (num1-i)*20*Math.sign(num1)*sr, this.pos.y*sr, 6*sr, 0, PI2, true);
	}
	ctx.fillStyle = color[this.color];
	ctx.fill();
	if(this.rampCnt<num1) return;
	ctx.beginPath();
	var num2 = (Math.abs(this.pos.y- obje.center.y)/20);
	for(i=0; i<Math.min(Math.abs(num2)-1/2, this.rampCnt- num1); i++){
		ctx.arc(obje.center.x*sr, this.pos.y*sr- i*20*Math.sign(num2)*sr, 6*sr, 0, PI2, true);
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
	// wall[this.pair].color = this.color;
}

Converter.prototype.draw2 = function(wall){
	ctx.beginPath();
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 30*sr, 0, PI2, true);
	ctx.arc(this.pos.x*sr, this.pos.y*sr, 25*sr, 0, PI2, false);
	ctx.fillStyle = color[this.color];
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(this.pos.x*sr-30*sr, this.pos.y*sr);
	ctx.lineTo(this.pos.x*sr+30*sr, this.pos.y*sr);
	ctx.moveTo(this.pos.x*sr, this.pos.y*sr-30*sr);
	ctx.lineTo(this.pos.x*sr, this.pos.y*sr+30*sr);
	ctx.strokeStyle = color[04];
	ctx.lineWidth = 15*sr;
	ctx.stroke();
	for(i=0; i<4; i++){
		
	}
}



