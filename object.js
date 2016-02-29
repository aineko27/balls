//壁を定義する関数---------------------------------------------------------------------------------------------------------------
var Object = function(){
	//諸々の設定
	this.alive  = false;
	this.color  = 0;
	//this.rad    = 0;
	this.rad1   = 0;
	this.rad2   = 0;
	this.num    = 0;
	this.type   = 0;
	this.weight = 0;
	this.uMax   = 0;
	this.lMax   = 0;
	this.pair   = 0;
	this.len    = 0;
	this.crad   = 0;
	this.vel    = new Point();
	this.radv   = 0;;
	this.center = new Point();

	this.vechx = 0;
	this.vechy = 0;
	this.vecvx = 0;
	this.vecvy = 0;
	this.contact = new Array(12);
	this.collisionC = 0;
	for(i=0; i < this.contact.length; i++){
		this.contact[i] = new Point();
		this.contact[i].excess = 0;
		this.contact[i].num = "0";
		this.contact[i].weight = 0;
		this.contact[i].color = 0;
		this.contact[i].side = 0;
		this.contact[i].rad = 0;
		this.contact[i].position = new Point();
		this.contact[i].velocity = new Point();
	}
};

Object.prototype.set = function(tlx, tly, wid, hei, rad1, rad2, c, t, w, p, um, lm){
	//水平方向の幅ベクトル(vech)の値と、垂直方向の幅ベクトル(vecv)の値の計算
	if(!rad2) rad2 = rad1 - Math.PI/2;
	this.vechx = wid * Math.cos(rad1);
	this.vechy = wid * Math.sin(rad1);
	this.vecvx = hei * Math.cos(rad2);
	this.vecvy = hei * Math.sin(rad2);

	//四隅の座標の取得
	this.tlx = tlx;
	this.tly = tly;
	this.trx = tlx + this.vechx;
	this.try = tly + this.vechy;
	this.blx = tlx - this.vecvx;
	this.bly = tly - this.vecvy;
	this.brx = tlx + this.vechx - this.vecvx;
	this.bry = tly + this.vechy - this.vecvy;
	this.center.x = (this.tlx+ this.brx)/2;
	this.center.y = (this.tly+ this.bry)/2;
	
	this.wid = wid;
	this.hei = hei;
	this.rad1 = rad1;
	this.rad2 = rad2;
	this.color = c;
	this.type = t;
	this.alive = true;
	if(t == 1){
		this.pair = p;
	}
	if(t == 2 || t== 3){
		this.weight = w;
		this.pair = p;
		this.uMax = um;
		this.lMax = lm;
		this.tlyTemp = this.tly;
		this.tryTemp = this.try;
		this.bryTemp = this.bry;
		this.blyTemp = this.bly;
	}
	if(t == 4){
		this.weight = w;
		this.uMax = um;
		this.lMax = lm;
		this.center.x = (this.tlx+ this.brx)/2;
		this.center.y = (this.tly+ this.bry)/2;
		this.len = Math.sqrt((this.tlx- this.center.x)*(this.tlx- this.center.x) + (this.tly- this.center.y)*(this.tly- this.center.y));
		this.crad = Math.atan2(this.tly- this.center.y, this.tlx- this.center.x);
	}
};

//壁の描写
Object.prototype.draw1 = function(object){
	switch(this.type){
		case 1:
			var obje = object[this.pair];
			ctx.beginPath();
			ctx.moveTo(this.center.x, this.center.y);
			ctx.lineTo(obje.center.x, this.center.y);
			ctx.lineTo(obje.center.x, obje.center.y);
			ctx.lineCap = "butt";
			ctx.lineWidth = "16";
			ctx.strokeStyle = color[13];
			ctx.stroke();
			ctx.beginPath();
			var num = (obje.center.x- this.center.x)/20;
			for(i=0; i<Math.abs(num)-1/2; i++){
				ctx.arc(obje.center.x- i*20*Math.sign(num), this.center.y, 6, 0, PI2, true);
			}
			ctx.fillStyle = color[10+this.color];
			ctx.fill();
			ctx.beginPath();
			num = (obje.center.y- this.center.y)/20;
			for(i=1; i<Math.abs(num)-1/2; i++){
				ctx.arc(obje.center.x, this.center.y+ i*20*Math.sign(num), 6, 0, PI2, true);
			}
			ctx.fill();
			break;
		/*case 3:
			ctx.beginPath();
			ctx.moveTo(this.center.x+ 3/10* this.wid, this.center.y+ this.uMax);
			ctx.lineTo(this.center.x+ 3/10* this.wid, this.center.y- this.lMax);
			ctx.moveTo(this.center.x- 3/10* this.wid, this.center.y+ this.uMax);
			ctx.lineTo(this.center.x- 3/10* this.wid, this.center.y- this.lMax);
			ctx.lineCap = "round";
			ctx.lineWidth = 10;
			ctx.strokeStyle = color[13];
			ctx.stroke();
			ctx.stroke();*/
		
	}
	ctx.beginPath();
	ctx.moveTo(this.tlx, this.tly);
	ctx.lineTo(this.trx, this.try);
	ctx.lineTo(this.brx, this.bry);
	ctx.lineTo(this.blx, this.bly);
	ctx.closePath();
	ctx.fillStyle = color[4];
	ctx.fill();
	if(this.type == 3){
		ctx.beginPath();
		ctx.moveTo(this.center.x+ 3/10* this.wid, this.center.y+ this.uMax);
		ctx.lineTo(this.center.x+ 3/10* this.wid, this.center.y- this.lMax);
		ctx.moveTo(this.center.x- 3/10* this.wid, this.center.y+ this.uMax);
		ctx.lineTo(this.center.x- 3/10* this.wid, this.center.y- this.lMax);
		ctx.lineCap = "round";
		ctx.lineWidth = 10;
		ctx.strokeStyle = color[10+this.color];
		ctx.stroke();
		ctx.stroke();
	}
}

Object.prototype.draw2 = function(object){
	ctx.beginPath();
	ctx.moveTo(this.tlx, this.tly);
	ctx.lineTo(this.trx, this.try);
	ctx.lineTo(this.brx, this.bry);
	ctx.lineTo(this.blx, this.bly);
	ctx.closePath();
	//ctx.fillStyle = color[4];
	//ctx.fill();
	ctx.fillStyle = color[this.color];
	ctx.fill();
	//if(this.type == 3){
	//	ctx.fillStyle = color[10+this.color];
	//	ctx.fill();
	//}
	switch(this.type){
		case 1:
			if(this.wid > this.hei) var len = this.hei;
			else var len = this.wid;
			if(len > 35) len = 35;
			len = len*1.2;
			ctx.font = "bold 50px 'Times New Roman'"
			ctx.font = "bold " + len+"px " + "Times New Roman";
			ctx.fillStyle = color[4];
			var str = "!";
			ctx.fillText(str, this.center.x-len/6, this.center.y+len/3);
			break;
			
		case 3:
			if(this.wid > this.hei) var len = this.hei;
			else var len = this.wid;
			if(len > 35) len = 35;
			var hei = (this.tly+ this.bly)/2;
			var wid1 = this.center.x+ 3/10* this.wid;
			var wid2 = this.center.x- 3/10* this.wid;
			ctx.beginPath();
			ctx.arc(wid1, hei, len*0.39, 0, PI2, true);
			ctx.arc(wid2, hei, len*0.39, 0, PI2, true);
			ctx.fillStyle = color[4];
			ctx.fill();
			ctx.beginPath();
			ctx.arc(wid1, hei, len*0.34, 0, PI2, true);
			ctx.arc(wid2, hei, len*0.34, 0, PI2, true);
			ctx.fillStyle = color[this.color];
			ctx.fill();
			ctx.fill();
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(wid1, hei- len*0.22);
			ctx.lineTo(wid1, hei+ len*0.22);
			ctx.moveTo(wid2, hei- len*0.22);
			ctx.lineTo(wid2, hei+ len*0.22);
			ctx.strokeStyle = color[4];
			ctx.lineWidth = len/10;
			ctx.lineCap = "round";
			ctx.stroke();
			break;
			
		case 4:
			if(this.wid > this.hei) var len = this.hei;
			else var len = this.wid;
			if(len > 35) len = 35;
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, len*0.43, 0, PI2, true);
			ctx.fillStyle = color[4];
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.center.x, this.center.y, len*0.36, 0, PI2, true);
			ctx.fillStyle = color[this.color];
			ctx.fill();
			ctx.fill();
			ctx.fill();
			ctx.beginPath();
			ctx.moveTo(this.center.x+ len*0.28* Math.cos(this.rad1+ PI_4), this.center.y+ len*0.28* Math.sin(this.rad1+ PI_4));
			ctx.lineTo(this.center.x- len*0.28* Math.cos(this.rad1+ PI_4), this.center.y- len*0.28* Math.sin(this.rad1+ PI_4));
			ctx.moveTo(this.center.x+ len*0.28* Math.cos(this.rad1- PI_4), this.center.y+ len*0.28* Math.sin(this.rad1- PI_4));
			ctx.lineTo(this.center.x- len*0.28* Math.cos(this.rad1- PI_4), this.center.y- len*0.28* Math.sin(this.rad1- PI_4));
			ctx.strokeStyle = color[4];
			ctx.lineWidth = len/10;
			ctx.lineCap = "round";
			ctx.stroke();
			break;
	}
};

Object.prototype.move = function(){
	//速度の上限を設定
	var maxVel = 3;
	if(this.vel.x >=  maxVel) this.vel.x =  maxVel;
	if(this.vel.x <= -maxVel) this.vel.x = -maxVel;
	if(this.vel.y >=  maxVel) this.vel.y =  maxVel;
	if(this.vel.y <= -maxVel) this.vel.y = -maxVel;
	//速度を位置情報に変換
	//console.log(this.num, this.type)
	switch(this.type){
		case 2:
			this.tlx += this.vel.x;
			this.trx += this.vel.x;
			this.tly += this.vel.y;
			this.try += this.vel.y;
			if(this.tly- this.tlyTemp > this.uMax){
				this.tly = this.tlyTemp + this.uMax;
				this.try = this.tryTemp + this.uMax;
				this.vel.x = this.vel.x;
				this.vel.y *= -0.1;
			}
			else if(this.tlyTemp- this.tly > this.lMax){
				this.tly = this.tlyTemp - this.lMax;
				this.try = this.tryTemp - this.lMax;
				this.vel.y = 0;
				this.vel.x = 0;
			}
			break;
			
		case 3:
			this.tlx += this.vel.x;
			this.trx += this.vel.x;
			this.brx += this.vel.x;
			this.blx += this.vel.x;
			this.tly += this.vel.y;
			this.try += this.vel.y;
			this.bry += this.vel.y;
			this.bly += this.vel.y;
			if(this.tly- this.tlyTemp > this.uMax){
				this.tly = this.tlyTemp + this.uMax;
				this.try = this.tryTemp + this.uMax;
				this.bry = this.bryTemp + this.uMax;
				this.bly = this.blyTemp + this.uMax;
				this.vel.y *= -0.03;
			}
			if(this.tlyTemp- this.tly > this.lMax){
				this.tly = this.tlyTemp - this.lMax;
				this.try = this.tryTemp - this.lMax;
				this.bry = this.bryTemp - this.lMax;
				this.bly = this.blyTemp - this.lMax;
				this.vel.y *= -0.03;
			}
			break;
			
		case 4:
			this.rad1 += this.radv;
			this.rad2 += this.radv;
			if(this.rad1 > this.uMax){
				this.rad2 -= this.rad1- this.uMax;
				this.rad1 = this.uMax;
				this.radv *= -0.1
			}
			else if(this.rad1 < this.lMax){
				this.rad2 -= this.rad1- this.lMax;
				this.rad1 = this.lMax;
				this.radv *= -0.1;
			}
			if(!this.uMax && !this.lMax){
				if(this.rad1 < -PI || this.rad1 > PI){
					this.rad1 = (((this.rad1% PI2)+ PI2) % PI2 + PI)% PI2 -PI;
				}
				if(this.rad2 < -PI || this.rad2 > PI){
					this.rad2 = (((this.rad2% PI2)+ PI2) % PI2 + PI)% PI2 -PI;
				}
				if(this.crad < -PI || this.crad > PI){
					this.crad = (((this.crad% PI2)+ PI2) % PI2 + PI)% PI2 -PI;
				}
			}
			//console.log(this.radv, this.crad, this.rad1, this.rad2)
			this.tlx = this.center.x+ this.len* Math.cos(this.rad1+ this.crad);
			this.tly = this.center.y+ this.len* Math.sin(this.rad1+ this.crad);
			this.trx = this.center.x+ this.len* Math.cos(this.rad1- this.crad+ Math.PI);
			this.try = this.center.y+ this.len* Math.sin(this.rad1- this.crad+ Math.PI);
			this.brx = this.center.x+ this.len* Math.cos(this.rad1+ this.crad+ Math.PI);
			this.bry = this.center.y+ this.len* Math.sin(this.rad1+ this.crad+ Math.PI);
			this.blx = this.center.x+ this.len* Math.cos(this.rad1- this.crad);
			this.bly = this.center.y+ this.len* Math.sin(this.rad1- this.crad);
			//console.log(this)
			break;
	}
}
Object.prototype.detect01 = function(ball, object){
	if(this.collisionC <1) return;
	else if(this.collisionC == 1){
		this.color = this.contact[0].color;
		object[this.pair].color = this.color;
		return;
	}
	for(i=0; i<this.collisionC-1; i++){
		for(j=i; j<this.collisionC; j++){
			if(this.contact[i].color != this.contact[j].color){
				console.log(this.contact[i].color, this.contact[j].color)
				this.color = 3;
				ball[this.pair].color = this.color;
				return;
			}
		}
	}
	this.color = this.contact[0].color;
		ball[this.pair].color = this.color;
}
Object.prototype.detect02 = function(ball, object){
	for(i=0; i<this.collisionC; i++){
		var b = this.contact[i];
		if(b.side > 0 && b.side < 4){
			console.log(b.velocity.y)
			if(b.velocity.y < 0.15){
				this.vel.y += 0.1* b.weight/ this.weight;
				continue;
			}
			var temp = (b.velocity.y* (b.weight- e*this.weight) + this.vel.y* this.weight*(1+e))/ (this.weight+b.weight);
			this.vel.y = (this.vel.y* (this.weight- e*b.weight) + b.velocity.y* b.weight*(1+e))/ (this.weight+b.weight);
			b.velocity.y = temp;
			console.log(b, temp, this.vel.y, b.velocity.y, e, this.weight, b.weight, b.velocity.y, this.vel.y)
		}
	}
	if(this.tly- this.tlyTemp > this.uMax){
		this.tly = this.tlyTemp + this.uMax;
		this.try = this.tryTemp + this.uMax;
	}
	if(this.tlyTemp- this.tly > this.lMax){
		this.tly = this.tlyTemp - this.lMax;
		this.try = this.tryTemp - this.lMax;
	}
	if(this.tly- this.tlyTemp > this.uMax* 0.85) object[this.pair].alive = false;
	if(this.tly- this.tlyTemp < this.uMax* 0.5) object[this.pair].alive = true;
}

Object.prototype.detect03 = function(ball, object){
	var obje = object[this.pair];
	if(this.num > obje.num) return;
	for(i=0; i<this.collisionC; i++){
		var b = this.contact[i];
		if(b.side == 2 || b.side == 8){
			console.log(b.velocity.y, this.vel.y, ball[0].velocity)
			//var temp = (b.velocity.y* (b.weight- e*this.weight) + this.vel.y* this.weight*(1+e))/ (this.weight+b.weight);
			if(b.side == 2 && b.velocity.y < 0) b.velocity.y *= -0.1;
			else if(b.side == 8 && b.velocity.y > 0) b.velocity.y *= -0.1;
			this.vel.y = (this.vel.y* (this.weight- e*b.weight) + b.velocity.y* b.weight*(1+e))/ (this.weight+b.weight);
			//b.velocity.y = temp;
		}
		else if(b.side < 4 || b.side > 6){
			var velhx =  (b.velocity.x* Math.sin(b.rad)- b.velocity.y* Math.cos(b.rad))* Math.sin(b.rad);
			var velhy = -(b.velocity.x* Math.sin(b.rad)- b.velocity.y* Math.cos(b.rad))* Math.cos(b.rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			if(b.side < 4 && velvy < 0) velvy = b.velocity.y *= -0.1;
			if(b.side > 6 && velvy > 0) velvy = b.velocity.y *= -0.1;
			//var temp = (velvy* (b.weight- e*this.weihgt) + this.vel.y* this.weight*(1+e))/ (this.weight+b.weight);
			this.vel.y = (this.vel.y* (this.weight- e*b.weight) + velvy* b.weight*(1+e))/ (this.weight+b.weight);
		}
	}
	for(i=0; i<obje.collisionC; i++){
		var b = obje.contact[i];
		if(b.side == 2 || b.side == 8){
			var temp = (b.velocity.y* (b.weight- e*obje.weight) + obje.vel.y* obje.weight*(1+e))/ (obje.weight+b.weight);
			obje.vel.y = (obje.vel.y* (obje.weight- e*b.weight) + b.velocity.y* b.weight*(1+e))/ (obje.weight+b.weight);
			b.velocity.y = temp;
		}
		else if(b.side < 4 || b.side > 6){
			var velhx =  (b.velocity.x* Math.sin(b.rad)- b.velocity.y* Math.cos(b.rad))* Math.sin(b.rad);
			var velhy = -(b.velocity.x* Math.sin(b.rad)- b.velocity.y* Math.cos(b.rad))* Math.cos(b.rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			if(b.side < 4) velvy =  Math.abs(velvy);
			if(b.side > 6) velvy = -Math.abs(velvy);
			var temp = (velvy* (b.weight- e*obje.weihgt) + obje.vel.y* obje.weight*(1+e))/ (obje.weight+b.weight);
			obje.vel.y = (obje.vel.y* (obje.weight- e*b.weight) + velvy* b.weight*(1+e))/ (obje.weight+b.weight);
		}
	}
	this.vel.y = (this.weight* this.vel.y - obje.weight* obje.vel.y)/ (this.weight+obje.weight);
	obje.vel.y = -this.vel.y;
}

Object.prototype.detect04 = function(ball, object){
	for(i=0; i<this.collisionC; i++){
		var b = this.contact[i];
		var rad1;
		if(b.side%2 == 0 && b.side > 1){
			if(b.side == 2) rad1 = this.rad1 + PI;
			else if(b.side == 4) rad1 = this.rad2+ PI;
			else if(b.side == 6) rad1 = this.rad2;
			else if(b.side == 8) rad1 = this.rad1;
			
			var len = (b.x- this.center.x)* Math.cos(rad1) + (b.y- this.center.y)* Math.sin(rad1);
			var rad2 = Math.atan2(b.velocity.y, b.velocity.x);
			var vel = Math.sqrt(b.velocity.x*b.velocity.x + b.velocity.y*b.velocity.y);
			var hvel = Math.cos(rad2- rad1)* vel;
			var vvel = -Math.abs(Math.sin(rad2- rad1)* vel);
			if(false){//vvel < 0.1 && vvel > 0){
				this.radv += 0.0001* len* b.weight/ this.weight/PI2; 
			}
			else{
				this.radv += 0.001* len* vvel* b.weight/ this.weight/ PI2;
			}
		}
		else if(b.side != 0 && b.side != 5){
			var rad = Math.atan2(b.velocity.y, b.velocity.x)- Math.atan2(b.y- b.position.y, b.x- b.position.x);
			var vel = Math.sqrt(b.velocity.x*b.velocity.x + b.velocity.y*b.velocity.y);
			var hvel = Math.sin(rad)* vel;
			var vvel = -Math.cos(rad)* vel;
			var rad = Math.atan2(b.y- b.position.y, b.x- b.position.x)- Math.atan2(this.center.y- b.y, this.center.x- b.x);
			var len = this.center.distance(b).length()* Math.sin(rad);
			if(false){//vvel < 0.1 && vvel > 0){
				this.radv += 0.0001* len* b.weight/ this.weight/ PI2;
			}
			else{
				this.radv += 0.001* len* vvel* b.weight/ this.weight/ PI2;
			}
		}
	}
}

//壁と正円の衝突判定
Object.prototype.collision01 = function(b){
	var j = this.num;
	var side = 0;
	if(b.contact[0].num.slice(0,-2) == this.num+"w") return;
	//円がどの辺あるいはどの角と衝突するかの判定
	if(Math.cos(this.rad1)* (b.position.y-this.tly) - Math.sin(this.rad1)* (b.position.x-this.tlx) < 0){
		if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
			b.touchArea[j].x = this.tlx;
			b.touchArea[j].y = this.tly;
			b.touchArea[j].num = 1;
			side = 1;
		}
		else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
			b.touchArea[j].x = this.trx;
			b.touchArea[j].y = this.try;
			b.touchArea[j].num = 1;
			side = 3;
		}
		else{
			b.touchArea[j].x = this.tlx;
			b.touchArea[j].y = this.tly;
			b.touchArea[j].rad = this.rad1;
			b.touchArea[j].num = 2;
			side = 2;
		}
	}
	else if(Math.cos(this.rad1+Math.PI)* (b.position.y-this.bry) - Math.sin(this.rad1+Math.PI)* (b.position.x-this.brx) < 0){
		if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
			b.touchArea[j].x = this.blx;
			b.touchArea[j].y = this.bly;
			b.touchArea[j].num = 1;
			side = 7;
		}
		else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
			b.touchArea[j].x = this.brx;
			b.touchArea[j].y = this.bry;
			b.touchArea[j].num = 1;
			side = 9;
		}
		else{
			b.touchArea[j].x = this.brx;
			b.touchArea[j].y = this.bry;
			b.touchArea[j].rad = this.rad1 + Math.PI;
			b.touchArea[j].num = 2;
			side = 8;
		}
	}
	else{
		if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
			b.touchArea[j].x = this.blx;
			b.touchArea[j].y = this.bly;
			b.touchArea[j].rad = this.rad2;
			b.touchArea[j].num = 2;
			side = 4;
		}
		else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
			b.touchArea[j].x = this.trx;
			b.touchArea[j].y = this.try;
			b.touchArea[j].rad = this.rad2 + Math.PI
			b.touchArea[j].num = 2;
			side = 6;
		}
		else{
			b.touchArea[j].num = 3;
			side = 5;
		}
	}
	
	//得られた判別から当り判定を取っていく
	if(b.touchArea[j].num < 2){
		//この場合は角に当たる
		//console.log(b.touchArea[j].len, b.size)
		b.touchArea[j].len = b.position.distance(b.touchArea[j]).length();
		if(b.touchArea[j].len <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.atan2(-b.position.y+ b.touchArea[j].y- b.velocity.y, -b.position.x+ b.touchArea[j].x- b.velocity.x);
			/*var velhx = 　(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy =  (b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;*/

			//反発後の計算
			this.contact[this.collisionC].x = b.touchArea[j].x;
			this.contact[this.collisionC].y = b.touchArea[j].y;
			this.contact[this.collisionC].excess = b.size- b.touchArea[j].distance(b.position).length();
			this.contact[this.collisionC].num = b.num+"c"+"w"+"0";
			this.contact[this.collisionC].weight = b.weight;
			this.contact[this.collisionC].rad = Math.atan2(b.position.y- b.touchArea[j].y, b.position.x- b.touchArea[j].x);
			this.contact[this.collisionC].color = b.color;
			this.contact[this.collisionC].side = side;
			this.contact[this.collisionC].position.x = b.position.x;
			this.contact[this.collisionC].position.y = b.position.y;
			this.contact[this.collisionC].velocity.x = b.velocity.x;
			this.contact[this.collisionC].velocity.y = b.velocity.y;
			
			b.contact[b.collisionC].x = b.touchArea[j].x;
			b.contact[b.collisionC].y = b.touchArea[j].y;
			b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
			b.contact[b.collisionC].excess = b.size- b.touchArea[j].distance(b.position).length();
			b.contact[b.collisionC].rad = Math.atan2(b.touchArea[j].y- b.position.y+ b.velocity.y, b.touchArea[j].x- b.position.x+ b.velocity.x);
			b.contact[b.collisionC].tangent = b.contact[b.collisionC].rad+ Math.PI/2;
			b.contact[b.collisionC].weight = "NaN";
			b.contact[b.collisionC].num = this.num+"w"+"c"+"0";
			b.contact[b.collisionC].side = side;
			//最後にcollisionCをインクリメントして終わり
			this.collisionC++;
			b.collisionC++;
		}
		else if(b.touchArea[j].len <= b.size*1.5) return;
	}
	else if(b.touchArea[j].num < 3){
		//この場合は辺に当たる
		var drop = -Math.cos(b.touchArea[j].rad)* (b.position.y - b.touchArea[j].y) + (b.position.x - b.touchArea[j].x)* Math.sin(b.touchArea[j].rad)
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			/*var velhx = (b.velocity.x * Math.cos(b.touchArea[j].rad) + b.velocity.y * Math.sin(-b.touchArea[j].rad)) * Math.cos(b.touchArea[j].rad);
			var velhy = (b.velocity.x * Math.cos(b.touchArea[j].rad) + b.velocity.y * Math.sin(-b.touchArea[j].rad)) * Math.sin(b.touchArea[j].rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;*/
			//反発後の計算
			this.contact[this.collisionC].x = b.position.x - drop*Math.sin(b.touchArea[j].rad);
			this.contact[this.collisionC].y = b.position.y + drop*Math.cos(b.touchArea[j].rad);
			this.contact[this.collisionC].excess = b.size- drop;
			this.contact[this.collisionC].num = b.num+"c"+"w"+"0";
			this.contact[this.collisionC].weight = b.weight;
			this.contact[this.collisionC].rad = b.touchArea[j].rad- Math.PI/2;
			this.contact[this.collisionC].color = b.color;
			this.contact[this.collisionC].side = side;
			this.contact[this.collisionC].position.x = b.position.x;
			this.contact[this.collisionC].position.y = b.position.y;
			this.contact[this.collisionC].velocity.x = b.velocity.x;
			this.contact[this.collisionC].velocity.y = b.velocity.y;
			
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(b.touchArea[j].rad);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(b.touchArea[j].rad);
			b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
			b.contact[b.collisionC].excess = b.size- drop;
			b.contact[b.collisionC].rad = b.touchArea[j].rad+ Math.PI/2;
			b.contact[b.collisionC].tangent = b.touchArea[j].rad + Math.PI;
			b.contact[b.collisionC].weight = "NaN";
			b.contact[b.collisionC].num = this.num+"w"+"c"+"0";
			b.contact[b.collisionC].side = side;
			//最後にcollisionCをインクリメントして終わり
			this.collisionC++;
			b.collisionC++;
		}
		else if(drop <= b.size*1.5) return;
	}
	else{
		//console.log("正円が内部に入っている")
	}
	b.touchArea[j].num = 4;
}

//壁と歪円の衝突判定
Object.prototype.collision02 = function(b){
	var j = this.num;
	var side = 0;
	//console.log(this.num, b.touchArea[j].num)
	if(b.touchArea[j].num == 4) return;
	if(true){//b.lastDistortion || b.touchArea[j].num == 5){
		//円がどの辺あるいはどの角と衝突するかの判定
		if(Math.cos(this.rad1)* (b.position.y-this.tly) - Math.sin(this.rad1)* (b.position.x-this.tlx) < 0){
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.tlx;
				b.touchArea[j].y = this.tly;
				b.touchArea[j].num = 1;
				side = 1;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.trx;
				b.touchArea[j].y = this.try;
				b.touchArea[j].num = 1;
				side = 3;
			}
			else{
				b.touchArea[j].x = this.tlx;
				b.touchArea[j].y = this.tly;
				b.touchArea[j].rad = this.rad1;
				b.touchArea[j].num = 2;
				side = 2;
			}
		}
		else if(Math.cos(this.rad1+Math.PI)* (b.position.y-this.bry) - Math.sin(this.rad1+Math.PI)* (b.position.x-this.brx) < 0){
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.blx;
				b.touchArea[j].y = this.bly;
				b.touchArea[j].num = 1;
				side = 7;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.brx;
				b.touchArea[j].y = this.bry;
				b.touchArea[j].num = 1;
				side = 9;
			}
			else{
				b.touchArea[j].x = this.brx;
				b.touchArea[j].y = this.bry;
				b.touchArea[j].rad = this.rad1 + Math.PI;
				b.touchArea[j].num = 2;
				side = 8;
			}
		}
		else{
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.blx;
				b.touchArea[j].y = this.bly;
				b.touchArea[j].rad = this.rad2;
				b.touchArea[j].num = 2;
				side = 4;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.trx;
				b.touchArea[j].y = this.try;
				b.touchArea[j].rad = this.rad2 + Math.PI
				b.touchArea[j].num = 2;
				side = 6;
			}
			else{
				b.touchArea[j].num = 3;
				side = 5;
			}
		}
	}
	//console.log(b.num, this.num, b.touchArea[j])
	//点とぶつかるかの判定
	if(b.touchArea[j].num < 2){
		var rad = Math.atan2(b.touchArea[j].y - b.position.y, b.touchArea[j].x - b.position.x);
		//接点がどのdotの間にあるのか調べる。iがdot_numberになる
		var i;
		for(i=0; i<b.dot.length; i++){
			if( (rad+ 2*Math.PI)%(2*Math.PI) < (b.dot[i].rad+ 2*Math.PI- b.dot[0].rad)%(2*Math.PI)) break;
		}
		if(i >= b.dot.length) i = 0;
		var t = (rad- b.dot[(i+b.dot.length-1)%b.dot.length].rad)/ (b.dot[i].rad- b.dot[(i+b.dot.length-1)%b.dot.length].rad);
		var tangent1 = Math.atan2(b.dot[i].abs.y- b.dot[(i+b.dot.length-2)%b.dot.length].abs.y, b.dot[i].abs.x- b.dot[(i+b.dot.length-2)%b.dot.length].abs.x); 
		var tangent2 = Math.atan2(b.dot[(i+1)%b.dot.length].abs.y- b.dot[(i+b.dot.length-1)%b.dot.length].abs.y, b.dot[(i+1)%b.dot.length].abs.x- b.dot[(i+b.dot.length-1)%b.dot.length].abs.x); 
		var excess = (b.dot[(i+b.dot.length-1)%b.dot.length].abs.x- b.dot[i].abs.x)* (b.touchArea[j].y- b.dot[i].abs.y)- (b.touchArea[j].x- b.dot[i].abs.x)* (b.dot[(i+b.dot.length-1)%b.dot.length].abs.y- b.dot[i].abs.y);
		if(excess < 0){
			//接点の計算
			this.contact[this.collisionC].x = b.touchArea[j].x;
			this.contact[this.collisionC].y = b.touchArea[j].y;
			this.contact[this.collisionC].excess = -excess;
			this.contact[this.collisionC].num = b.num+"d"+"w"+"0";
			this.contact[this.collisionC].weight = b.weight;
			this.contact[this.collisionC].rad = rad+ Math.PI;
			this.contact[this.collisionC].color = b.color;
			this.contact[this.collisionC].side = side;
			this.contact[this.collisionC].position.x = b.position.x;
			this.contact[this.collisionC].position.y = b.position.y;
			this.contact[this.collisionC].velocity.x = b.velocity.x;
			this.contact[this.collisionC].velocity.y = b.velocity.y;
			
			b.contact[6+b.collisionCC].x = b.touchArea[j].x;
			b.contact[6+b.collisionCC].y = b.touchArea[j].y;
			b.contact[6+b.collisionCC].length = b.contact[6+b.collisionCC].distance(b.position).length();
			b.contact[6+b.collisionCC].excess = -excess;
			b.contact[6+b.collisionCC].rad = rad;
			b.contact[6+b.collisionCC].tangent = (1-t)*tangent1 + t*tangent2;
			b.contact[6+b.collisionCC].weight = "NaN";
			b.contact[6+b.collisionCC].num = this.num+1+"w"+"d"+"0";
			b.contact[6+b.collisionCC].side = side;
			//console.log(tangent1, tangent2, t, b.contact[b.collisionC+ b.collisionCC].tangent)
			//console.log((rad- b.dot[(i+b.dot.length-1)%b.dot.length].rad), (b.dot[i].rad- b.dot[(i+b.dot.length-1)%b.dot.length].rad))
			//最後にcollisionCをインクリメントして終わり
			this.collisionC++;
			b.collisionCC++;
		}
		return;
	}
	//線とぶつかるかの判定
	else if(b.touchArea[j].num < 3){
		var rad = b.touchArea[j].rad
		var dot_number = (Math.round((rad + Math.PI/2)*b.dot.length/Math.PI/2) + b.dot.length) % b.dot.length;
		//壁に垂直な向きへの長さが一番大きい点を調べる
		//console.log(dot_number, rad)
		if(b.dot[(dot_number+1)%b.dot.length].rel.x* Math.cos(rad+ Math.PI/2)+ b.dot[(dot_number+1)%b.dot.length].rel.y* Math.sin(rad+ Math.PI/2)> b.dot[(dot_number+b.dot.length-1)%b.dot.length].rel.x* Math.cos(rad+ Math.PI/2)+ b.dot[(dot_number+b.dot.length-1)%b.dot.length].rel.y* Math.sin(rad+ Math.PI/2)){
			while(b.dot[(dot_number+1)%b.dot.length].rel.x* Math.cos(rad+ Math.PI/2)+ b.dot[(dot_number+1)%b.dot.length].rel.y* Math.sin(rad+ Math.PI/2)> b.dot[dot_number].rel.x* Math.cos(rad+ Math.PI/2)+ b.dot[dot_number].rel.y* Math.sin(rad+ Math.PI/2)){
				dot_number++;
				if(dot_number >= b.dot.length) dot_number = 0;
			}
		}
		else{
			while(b.dot[(dot_number+b.dot.length-1)%b.dot.length].rel.x* Math.cos(rad+ Math.PI/2)+ b.dot[(dot_number+b.dot.length-1)%b.dot.length].rel.y* Math.sin(rad+ Math.PI/2)> b.dot[dot_number].rel.x* Math.cos(rad+ Math.PI/2)+ b.dot[dot_number].rel.y* Math.sin(rad+ Math.PI/2)){
				dot_number--;
				if(dot_number <= -1) dot_number = b.dot.length-1;
			}
		}
		//console.log(b.position)
		//console.log(b.touchArea[j], rad)
		//console.log(dot_number)
		//console.log(b.dot[dot_number].abs)
		if(Math.cos(rad)* (b.dot[dot_number].abs.y- b.touchArea[j].y)>= Math.sin(rad)* (b.dot[dot_number].abs.x- b.touchArea[j].x)){
			//接点の計算
			var a1 = (b.dot[dot_number].abs.y- b.position.y)/ (b.dot[dot_number].abs.x- b.position.x);
			var a3 = Math.tan(rad);
			
			this.contact[this.collisionC].x = (a1*b.position.x- b.position.y- a3*b.touchArea[j].x+ b.touchArea[j].y)/ (a1-a3);
			this.contact[this.collisionC].y = a1* (this.contact[this.collisionC].x- b.position.x)+ b.position.y;
			if(a1 == Infinity || a1 == -Infinity){
				this.contact[this.collisionC].x = b.touchArea[j].x;
				this.contact[this.collisionC].y = b.touchArea[j].y;
			}
			this.contact[this.collisionC].excess = Math.cos(rad)* (b.dot[dot_number].abs.y- this.contact[this.collisionC].y)- Math.sin(rad)* (b.dot[dot_number].abs.x- this.contact[this.collisionC].x);
			this.contact[this.collisionC].num = b.num+"d"+"w"+"0";
			this.contact[this.collisionC].weight = b.weight;
			this.contact[this.collisionC].rad = rad- PI_2;
			this.contact[this.collisionC].color = b.color;
			this.contact[this.collisionC].side = side;
			this.contact[this.collisionC].position.x = b.position.x;
			this.contact[this.collisionC].position.y = b.position.y;
			this.contact[this.collisionC].velocity.x = b.velocity.x;
			this.contact[this.collisionC].velocity.y = b.velocity.y;
			
			b.contact[6+b.collisionCC].x = (a1*b.position.x- b.position.y- a3*b.touchArea[j].x+ b.touchArea[j].y)/ (a1-a3);
			b.contact[6+b.collisionCC].y = a1* (b.contact[6+b.collisionCC].x- b.position.x)+ b.position.y;
			if(a1 == Infinity || a1 == -Infinity){
				b.contact[6+b.collisionCC].x = b.touchArea[j].x;
				b.contact[6+b.collisionCC].y = b.touchArea[j].y;
			}
			b.contact[6+b.collisionCC].length = b.contact[6+b.collisionCC].distance(b.position).length();
			b.contact[6+b.collisionCC].excess = Math.cos(rad)* (b.dot[dot_number].abs.y- b.contact[6+b.collisionCC].y)- Math.sin(rad)* (b.dot[dot_number].abs.x- b.contact[6+b.collisionCC].x);
			b.contact[6+b.collisionCC].rad = rad + Math.PI/2; 
			b.contact[6+b.collisionCC].tangent = rad + Math.PI;
			b.contact[6+b.collisionCC].weight = "NaN";
			b.contact[6+b.collisionCC].num = this.num+"w"+"d"+"0";
			b.contact[6+b.collisionCC].side = side;
			//最後にcollisionCをインクリメントして終わり
			this.collisionC++;
			b.collisionCC++;
		}
		return;
	}
	else{
	
	}
}
