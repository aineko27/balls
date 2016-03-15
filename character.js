//動体を定義する関数---------------------------------------------------------------------------------------------------------------


var Character = function(){
	//諸々の設定
	this.position = new Point();
	this.velocity = new Point();
	this.alive = false;
	this.color = 0;
	this.size = 0;
	this.weight = 0;
	this.num = 0;
	this.arc = 0;
	this.distortionF = false;
	this.collisionC = 0;
	this.collisionC_temp = 0;
	this.collisionCC = 0;
	this.touchF = false;
	this.firedC = 0;
	this.explosionC = 0;
	this.contact = new Array(12);
	for(i=0; i < this.contact.length; i++){
		this.contact[i] = new Point();
		this.contact[i].rad = 0;
		this.contact[i].excess = 0;
		this.contact[i].tangent = 0;
		this.contact[i].num = "0";
		this.contact[i].weight = 0;
		this.contact[i].side = 0;
		this.contact[i].position = new Point();
		this.contact[i].velocity = new Point();
	}
	this.dot = new Array(64);
	for(i=0; i < this.dot.length; i++){
		this.dot[i] = {};
		this.dot[i].abs = new Point();
		this.dot[i].rel = new Point();
		this.dot[i].rad = 0;
	}
	this.lastPosition = new Point();
	this.lastDistortion = false;
	this.touchArea = new Array(OBJECT_MAX_COUNT);
	for(i=0; i < this.touchArea.length; i++){
		this.touchArea[i] = new Point();
		this.touchArea[i].len = 0;
		this.touchArea[i].rad = 0;
		this.touchArea[i].num = 0;
		this.touchArea[i].side = 0;
	}
	this.bezier = new Array(12);
	for(i=0; i<this.bezier.length; i++){
		this.bezier[i] = {}
		this.bezier[i].rad_gap = 0;
		this.bezier[i].gap_number = 0;
		this.bezier[i].midPoint = new Point();
		this.bezier[i].midTangent = 0;
		this.bezier[i].midExcess = 0;
		this.bezier[i].midPoint_tangent = 0
		this.bezier[i].midPoint_excess = 0
		this.bezier[i].arc1 = 0;
		this.bezier[i].arc2 = 0;
		this.bezier[i].arc_mid = 0;
	}
}

Character.prototype.set = function(p, s, v, c){
	//座標、速度、サイズをセット
	this.position.x = p.x;
	this.position.y = p.y;

	this.velocity.x = v.x;
	this.velocity.y = v.y;

	this.color = c;
	this.size = s;
	this.weight = s * s;
	//生存フラグを立てる
	this.alive = true;
	this.touchF = true;
};




//クリック時に動作する関数
//マウスを押した時に動作する関数
Character.prototype.strokeDottedLine = function(c){
	var space = 10;
	var dotted = Math.floor( (length + 0 + 11) / space );
	var p1x, p1y, p2x, p2y;
	ctx.beginPath();
	
	for(var i = 1; i < dotted / 2 - 1; i++){
		p1x = this.position.x + (length - 8 - space * 2 * i + this.size) *  Math.cos(radian);
		p1y = this.position.y + (length - 8 - space * 2 * i + this.size) * -Math.sin(radian);
		p2x = this.position.x + (length - 8 - space * (2 * i + 1) + this.size) * Math.cos(radian);
		p2y = this.position.y + (length - 8 - space * (2 * i + 1) + this.size ) * -Math.sin(radian);

		ctx.moveTo(p1x, p1y);
		ctx.lineTo(p2x, p2y);
	}

	if(dotted % 2 == 0 && dotted > 2){
		ctx.moveTo(this.position.x + (length - 8 - space * (2 * i) + this.size) * Math.cos(radian), this.position.y + (length - 8 - space * (2 * i) + this.size) * -Math.sin(radian))
		ctx.lineTo(this.position.x + this.size * Math.cos(radian), this.position.y + this.size * -Math.sin(radian));
	}

	console.log(dotted)
	ctx.strokeStyle = color[c];
	//ctx.lineCap = "round";
	ctx.lineCap = "butt";
	ctx.lineWidth = 6;
	ctx.closePath();
	ctx.stroke();
};

//マウスを放した時に動作する関数
Character.prototype.shoot = function(b){
	this.size = 13;
	this.weight = this.size*this.size;
	this.velocity.x =  length / 25 * Math.cos(radian)*1.3;
	this.velocity.y = -length / 25 * Math.sin(radian)*1.3;
	if(this.velocity.length() > maxVel){
		var p = this.velocity.normalize();
		this.velocity.x = maxVel* p.x;
		this.velocity.y = maxVel* p.y;
	}
	//this.velocity.x = 0;
	//this.velocity.y = 20
	this.position.x = b.position.x + (b.size + this.size)*20/19 * Math.cos(radian) - this.velocity.x;
	this.position.y = b.position.y - (b.size + this.size)*20/19 * Math.sin(radian) - this.velocity.y;
	this.alive = true;
	this.touchF = true;
	this.firedC = counter;
	b.weight -= this.weight;
	b.size = Math.sqrt(b.weight);
}
;

//物体の動きを制御する関数---------------------------------------------------------------------------------------------------------


//自由落下
Character.prototype.fall = function(){
	if(!this.distortionF) this.velocity.y += 0.2;
	else this.velocity.y += Math.max(0, 0.1- this.arc/ this.size/3.5)
	console.log(0.1- this.arc/ this.size/3.4)
};


//速度を位置情報に変換
Character.prototype.move = function(){
	//速度の上限を設定
	//var maxVel = 20;
	if(this.velocity.length() > maxVel){
		var p = this.velocity.normalize();
		this.velocity.x = maxVel* p.x;
		this.velocity.y = maxVel* p.y;
	}
	if(this.velocity.x >=  maxVel) this.velocity.x =  maxVel;
	if(this.velocity.x <= -maxVel) this.velocity.x = -maxVel;
	if(this.velocity.y >=  maxVel) this.velocity.y =  maxVel;
	if(this.velocity.y <= -maxVel) this.velocity.y = -maxVel;

	//速度を位置情報に変換
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;

};

Character.prototype.initialize = function(){
	this.alive = false;
	this.collisionC = 0;
	this.collisionCC = 0;
	this.collisionC_temp = 0;
	this.distortionF = false;
	this.lastDistortion = false;
}

Character.prototype.explosion = function(ball, object){
	this.initialize();
	var amount = Math.max(Math.floor(Math.sqrt(this.size/3)+ Math.random()*2), 4);
	var count = 0;
	var j = 1;
	while(count < amount){
		if(!ball[ball.length-j].alive){
			var v = new Point();
			var size = Math.max(Math.sqrt(this.weight/amount)+ Math.random()*3- 2, 3);
			v.x = Math.min(Math.sqrt(Math.abs(this.velocity.x/2))*4, 3)+ Math.random()*8- 4;
			v.y = Math.min(Math.sqrt(Math.abs(this.velocity.y/2))*4, 3)+ Math.random()*6- 7;
			ball[ball.length-j].set(this.position, size, v, Math.ceil(Math.random()*2));
			ball[ball.length-j].touchF = false;
			count++;
		}
		j++;
	}
}

Character.prototype.touchCheck = function(ball, object){
	var num1 = this.collisionC;
	var num2 = this.collisionCC;
	var con = this.contact
	for(i=0; i<num1-1; i++){
		for(j=i+1; j<num1; j++){
			if(con[i].distance(con[j]).length() < this.size* 0.01){
				for(k=j; k<num1; k++){
					this.contact[k].x = this.contact[k+1].x;
					this.contact[k].y = this.contact[k+1].y;
					this.contact[k].rad = this.contact[k+1].rad;
					this.contact[k].length = this.contact[k+1].length;
					this.contact[k].excess = this.contact[k+1].excess;
					this.contact[k].tangent = this.contact[k+1].tangent;
					this.contact[k].weight = this.contact[k+1].weight;
					this.contact[k].num = this.contact[k+1].num;
					this.contact[k].position.x = this.contact[k+1].position.x;
					this.contact[k].position.y = this.contact[k+1].position.y;
					this.contact[k].velocity.x = this.contact[k+1].velocity.x;
					this.contact[k].velocity.y = this.contact[k+1].velocity.y;
				}
				num1--;
				this.collisionC--;
			}
		}
	}
	for(i=6; i<6+num2-1; i++){
		for(j=i+1; j<6+num2; j++){
			if(con[i].distance(con[j]).length() < this.size* 0.01){
				for(k=j; k<6+num2; k++){
					this.contact[k].x = this.contact[k+1].x;
					this.contact[k].y = this.contact[k+1].y;
					this.contact[k].rad = this.contact[k+1].rad;
					this.contact[k].length = this.contact[k+1].length;
					this.contact[k].excess = this.contact[k+1].excess;
					this.contact[k].tangent = this.contact[k+1].tangent;
					this.contact[k].weight = this.contact[k+1].weight;
					this.contact[k].num = this.contact[k+1].num;
					this.contact[k].position.x = this.contact[k+1].position.x;
					this.contact[k].position.y = this.contact[k+1].position.y;
					this.contact[k].velocity.x = this.contact[k+1].velocity.x;
					this.contact[k].velocity.y = this.contact[k+1].velocity.y;
				}
				num2--;
				this.collisionCC--;
			}
		}
	}
	if(this.collisionC==2){
		//console.log((con[0].rad- con[1].rad+ PI2)%PI2 < Math.PI*0.1, (con[1].rad- con[0].rad+ PI2)%PI2 < Math.PI*0.1)
		if((con[0].rad- con[1].rad+ PI2)%PI2 < Math.PI*0.1 || (con[1].rad- con[0].rad+ PI2)%PI2 < Math.PI*0.1){
			if(con[0].length < con[1].length) j = 0;
			else j = 1;
			//相手の方も消してあげないといけない
			if(con[(j+1)%2].num.slice(-3,-2) != "w"){
				
			}
			else{
				var obje = object[con[(j+1)%2].num.slice(0,-3)];
				for(k=0; k<11; k++){
					console.log(obje, obje.contact[k], obje.contact[k].num.slice(0,-2))
					if(obje.contact[k].num.slice(0,-2) == this.num+"c"){
						for(l=k; l<11; l++){
							obje.contact[l].x = obje.contact[l+1].x;
							obje.contact[l].y = obje.contact[l+1].y;
							obje.contact[l].excess = obje.contact[l+1].excess;
							obje.contact[l].num = obje.contact[l+1].num;
							obje.contact[l].weight = obje.contact[l+1].weight;
							obje.contact[l].color = obje.contact[l+1].color;
							obje.contact[l].side = obje.contact[l+1].side;
							obje.contact[l].rad = obje.contact[l+1].rad;
						}
						obje.collisionC--;
						break;
					}
				}
			}
			
			con[0].x          = con[j].x;
			con[0].y          = con[j].y;
			con[0].rad        = con[j].rad;
			con[0].length     = con[j].length;
			con[0].excess     = con[j].excess;
			con[0].tangent    = con[j].tangent;
			con[0].weight     = con[j].weight;
			con[0].num        = con[j].num;
			con[0].position.x = con[j].position.x;
			con[0].position.y = con[j].position.y;
			con[0].velocity.x = con[j].velocity.x;
			con[0].velocity.y = con[j].velocity.y;
			this.collisionC  = 1;
			this.collisionCC = 0;
		}
	}
}

Character.prototype.positionCorrection = function(){
	//めり込んだ分の補正を行う
	//console.log(this.num, this.contact[0], this.position)
	var rad = this.contact[0].rad + Math.PI;
	var excess = this.contact[0].excess;
	//console.log(this.position, this.position.x+excess*Math.cos(rad), this.position.y+excess* Math.sin(rad))
	this.position.x += excess* Math.cos(rad);
	this.position.y += excess* Math.sin(rad);
}



Character.prototype.bound = function(ball, object){
	var con = this.contact;
	for(i=0; i<this.collisionC; i++){
		if(con[i].num ==0) continue;
		//まずめり込んだ分の補正を行う
		var rad = this.contact[i].rad + Math.PI;
		//if(f==2 && Math.cos(rad)* this.velocity.x + Math.sin(rad)* this.velocity.y > 0) continue;
		//衝突後の速度を求める
		//if(this.contact[i].weight == "NaN"){
		if(this.contact[i].num.slice(-3,-2) == "w"){
			var obje = object[this.contact[i].num.slice(0,-3)];
			//相手が壁の場合。まずは速度を壁に対して水平、垂直な方向に分解する
			var velhx =  (this.velocity.x * Math.sin(rad) - this.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(this.velocity.x * Math.sin(rad) - this.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = this.velocity.x - velhx;
			var velvy = this.velocity.y - velhy;
			//console.log(obje.type)
			if(obje.type == 0 || obje.type == 1){
				velvx *= -e;
				velvy *= -e;
				this.velocity.x = velhx + velvx;
				this.velocity.y = velhy + velvy;
			}
			else if(obje.type == 2){
				if(con[i].side > 3 && con[i].side < 7){
					velvx *= -e;
					velvy = (velvy* (this.weight- e*obje.weight*10) + obje.vel.y* (1+e)* obje.weight*10)/ (this.weight+ obje.weight*10);
					this.velocity.x = velhx + velvx;
					this.velocity.y = velhy + velvy;
				}
				else if(con[i].side != 0 && con[i].side != 5){
					velvx *= -e;
					velvy *= -e;
					this.velocity.x = velhx + velvx;
					this.velocity.y = velhy + velvy;
				}
			}
			else if(obje.type == 3){
				if(con[i].side == 4 || con[i].side == 6){
					velvx *= -e;
					velvy *= -e;
					this.velocity.x = velhx + velvx;
					this.velocity.y = velhy + velvy;
				}
				else if(con[i].side != 0 && con[i].side != 5){
					if(con[i].side < 4 && Math.abs(velvy) < 0.01 && obje.vel.y > 0) continue;
					if(con[i].side > 6 && Math.abs(velvy) < 0.01 && obje.vel.y < 0) continue;
					velvx *= -e;
					velvy = (velvy* (this.weight- e*obje.weight*10) + obje.vel.y* (1+e)* obje.weight*10)/ (this.weight+ obje.weight*10);
					this.velocity.x = velhx + velvx;
					this.velocity.y = velhy + velvy;
				}
			}
			else if(obje.type == 4){
				var rad;
				var len;
				if(con[i].side%2 == 0 && con[i].side > 1){
					//console.log(con[i])
					if(con[i].side == 2) rad = obje.rad1;
					else if(con[i].side == 4) rad = obje.rad2;
					else if(con[i].side == 6) rad = obje.rad2+ PI;
					else if(con[i].side == 8) rad = obje.rad1+ PI;
					len = (con[i].x- obje.center.x)* Math.cos(rad) + (con[i].y- obje.center.y)* Math.sin(rad);
					var vx = len* obje.radv* Math.cos(rad+ PI_2);
					var vy = len* obje.radv* Math.sin(rad+ PI_2);
					velvx = (velvx* (this.weight- e*obje.weight*10) + vx* (1+e)* obje.weight*10)/ (this.weight+ obje.weight*10);
					velvy = (velvy* (this.weight- e*obje.weight*10) + vy* (1+e)* obje.weight*10)/ (this.weight+ obje.weight*10);
					this.velocity.x = velhx + velvx;
					this.velocity.y = velhy + velvy;
				}
				else if(con[i].side != 0 && con[i].side != 5){
					rad = Math.atan2(con[i].y- this.position.y, con[i].x- this.position.x)- Math.atan2(obje.center.y- con[i].y, obje.center.x- con[i].x);
					len = obje.center.distance(con[i]).length()* Math.sin(rad);
					rad = Math.atan2(con[i].y- this.position.y, con[i].x- this.position.x);
					var vx = len* obje.radv* Math.cos(rad);
					var vy = len* obje.radv* Math.sin(rad);
					velvx = (velvx* (this.weight- e*obje.weight*10) + vx* (1+e)* obje.weight*10)/ (this.weight+ obje.weight*10);
					velvy = (velvy* (this.weight- e*obje.weight*10) + vy* (1+e)* obje.weight*10)/ (this.weight+ obje.weight*10);
					this.velocity.x = velhx + velvx;
					this.velocity.y = velhy + velvy;
				}
				var vx = len* obje.radv
			}
		}
		else{
			//相手がボールの場合
			var b = this.contact[i];
			var t;
			var vx =  (this.position.x- b.position.x);
			var vy =  (this.position.y- b.position.y);

			t = -( vx* b.velocity.x + vy* b.velocity.y) / (vx*vx + vy*vy);
			var arx = b.velocity.x + vx * t;
			var ary = b.velocity.y + vy * t;

			t = -(-vy* b.velocity.x + vx* b.velocity.y) / (vx*vx + vy*vy);
			var amx = b.velocity.x - vy * t;
			var amy = b.velocity.y + vx * t;

			t = -( vx* this.velocity.x + vy* this.velocity.y) / (vx*vx + vy*vy);
			var brx = this.velocity.x + vx * t;
			var bry = this.velocity.y + vy * t;

			t = -(-vy* this.velocity.x + vx* this.velocity.y) / (vx*vx + vy*vy);
			var bmx = this.velocity.x - vy * t;
			var bmy = this.velocity.y + vx * t;
			
			console.log((amx-bmx)*vx + (amy-bmy)*vy);
			if((amx-bmx)*vx + (amy-bmy)*vy < 0) {
				continue;
				bmx *= -0.1;
				bmy *= -0.1;
				run = false;
			}

			//反発係数の設定と重さの決定、衝突後の重心方向の値を求める
			var e1 = 0.9;
			var adx = (b.weight * amx + this.weight * bmx + bmx * e1 * this.weight - amx * e1 * this.weight) / (this.weight + b.weight);
			var bdx = -e1 * (bmx - amx) + adx;
			var ady = (b.weight * amy + this.weight * bmy + bmy * e1 * this.weight - amy * e1 * this.weight) / (this.weight + b.weight);
			var bdy = -e1 * (bmy - amy) + ady;
			//接戦方向速度と重心方向速度を足して衝突後の速度を求める
			this.velocity.x = bdx + brx;
			this.velocity.y = bdy + bry;
		}
	}
	for(i=6; i<6+this.collisionCC; i++){
		if(con[i].num ==0) continue;
		//まずめり込んだ分の補正を行う
		var rad = this.contact[i].rad + Math.PI;
		//if(f==1 && Math.cos(rad)* this.velocity.x - Math.sin(rad)* this.velocity.y > 0) continue;
		//衝突後の速度を求める
		if(this.contact[i].weight == "NaN"){
			//相手が壁の場合。まずは速度を壁に対して水平、垂直な方向に分解する
			var velhx =  (this.velocity.x * Math.sin(rad) - this.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(this.velocity.x * Math.sin(rad) - this.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = this.velocity.x - velhx;
			var velvy = this.velocity.y - velhy;
			//console.log(velhx, velhy, velvx, velvy)
			velvx *= -e;
			velvy *= -e;
			this.velocity.x = velhx + velvx;
			this.velocity.y = velhy + velvy;
		}
		else{
			//相手がボールの場合
			var b = this.contact[i]
			var t;
			var vx =  (this.position.x- b.position.x);
			var vy =  (this.position.y- b.position.y);

			t = - ( vx* b.velocity.x + vy* b.velocity.y) / (vx*vx + vy*vy);
			var arx = b.velocity.x + vx * t;
			var ary = b.velocity.y + vy * t;

			t = - (-vy* b.velocity.x + vx* b.velocity.y) / (vx*vx + vy*vy);
			var amx = b.velocity.x - vy * t;
			var amy = b.velocity.y + vx * t;

			t = - ( vx* this.velocity.x + vy* this.velocity.y) / (vx*vx + vy*vy);
			var brx = this.velocity.x + vx * t;
			var bry = this.velocity.y + vy * t;

			t = - (-vy* this.velocity.x + vx* this.velocity.y) / (vx*vx + vy*vy);
			var bmx = this.velocity.x - vy * t;
			var bmy = this.velocity.y + vx * t;
			
			if((amx-bmx)*vx + (amy-bmy)*vy < 0) {
				continue;
				bmx *= -0.1;
				bmy *= -0.1;
				run = false;
			}
			
			//反発係数の設定と重さの決定、衝突後の重心方向の値を求める
			var e1 = 0.9;
			var adx = (b.weight * amx + this.weight * bmx + bmx * e1 * this.weight - amx * e1 * this.weight) / (this.weight + b.weight);
			var bdx = -e1 * (bmx - amx) + adx;
			var ady = (b.weight * amy + this.weight * bmy + bmy * e1 * this.weight - amy * e1 * this.weight) / (this.weight + b.weight);
			var bdy = -e1 * (bmy - amy) + ady;
			//接戦方向速度と重心方向速度を足して衝突後の速度を求める
			this.velocity.x = bdx + brx;
			this.velocity.y = bdy + bry;
		}
	}
}

Character.prototype.distortCheck01 = function(ball, object){
	var i, j, k;
	var num = this.collisionC
	var con = this.contact;
	var dot = this.dot;
	var bez = this.bezier;

	//各接点同士について、excess*tan(rad_gap/4)で歪円に対する寄与の大きさを計算する。一番大きいものを取っておく
	var rad_gap;
	var arc;
	var max = 0;
	var maxi=0, maxj=0;
	for(i=0; i<num; i++){
		con[i].length = con[i].distance(this.position).length();
		con[i].excess = this.size- con[i].length;
	}
	for(i=0; i<num-1; i++){
		for(j=i+1; j<num; j++){
			rad_gap = (con[i].rad- con[j].rad + 2*PI2)% (PI2);
			if(rad_gap > Math.PI) rad_gap = PI2 - rad_gap;
			arc = 4/3* this.weight/ (con[i].length+con[j].length)/2* Math.tan(rad_gap/4);
			if(arc > max){
				max = arc;
				maxi = i;
				maxj = j;
			}
		}
	}
	this.arc = max;
	//console.log(maxi, maxj, i, max, num)
	//console.log(con[maxi], con[maxj], con[i], num, max, this.num)
	//console.log(con[0].num, con[1].num, con[2].num, con[3].num, con[0], con[1], con[2], con[3])
	if(max < this.size*0.1*4/3){
		console.log("TESTALERT!", max, this.size*0.1*4/3, num);
		var mini;
		var min = this.size*3;
		var len = 0;
		for(i=0; i<num; i++){
			len = con[i].distance(this.position).length();
			console.log(i, mini, min, len)
			if(len < min){
				min = len;
				mini = i;
			}
		}
		if(num==undefined) return;
		if(mini==undefined) return;
		con[0].x = con[mini].x;
		con[0].y = con[mini].y;
		con[0].rad = con[mini].rad;
		con[0].length = con[mini].length;
		con[0].excess = con[mini].excess;
		con[0].tangent = con[mini].tangent;
		con[0].weight = con[mini].weight;
		con[0].num = con[mini].num;
		con[0].position.x = con[mini].position.x;
		con[0].position.y = con[mini].position.y;
		con[0].velocity.x = con[mini].velocity.x;
		con[0].velocity.y = con[mini].velocity.y;
		this.collisionC = 1;
		return;
	}
	else{
		//一番影響の強い二つの接点によって描かれる歪を計算する
		bez[0].rad_gap = (con[maxj].rad- con[maxi].rad + PI2)% PI2;
		bez[0].gap_number = (Math.round(con[maxi].rad* dot.length/ PI2) + dot.length) % dot.length;
		bez[1].rad_gap = (con[maxi].rad- con[maxj].rad + PI2)% PI2;
		bez[1].gap_number = (Math.round(con[maxj].rad* dot.length/ PI2) + dot.length) % dot.length;
		//歪の計算をする
		bez[0].arc1 　　　　　= 4/3* this.weight/ con[maxi].length* Math.tan(bez[0].rad_gap/4);
		bez[0].arc2 　　　　　= 4/3* this.weight/ con[maxj].length* Math.tan(bez[0].rad_gap/4);
		bez[0].midPoint.x = 1/8*con[maxi].x + 3/8*(con[maxi].x+ bez[0].arc1* Math.cos(con[maxi].tangent))+ 3/8*(con[maxj].x- bez[0].arc2* Math.cos(con[maxj].tangent))+ 1/8*con[maxj].x;
		bez[0].midPoint.y = 1/8*con[maxi].y + 3/8*(con[maxi].y+ bez[0].arc1* Math.sin(con[maxi].tangent))+ 3/8*(con[maxj].y- bez[0].arc2* Math.sin(con[maxj].tangent))+ 1/8*con[maxj].y;
		bez[0].midTangent = con[maxi].rad + bez[0].rad_gap/2 + PI_2;
		bez[0].midExcess  = this.size - this.position.distance(bez[0].midPoint).length();
		bez[0].arc1       = 4/3* this.weight/ con[maxi].length* Math.tan(bez[0].rad_gap/8);
		bez[0].arc_mid    = 4/3* this.weight/ (this.size- bez[0].midExcess)* Math.tan(bez[0].rad_gap/8);
		bez[0].arc2       = 4/3* this.weight/ con[maxj].length* Math.tan(bez[0].rad_gap/8);
		//もっかいやる
		bez[1].arc1 　　　　　= 4/3* this.weight/ con[maxj].length* Math.tan(bez[1].rad_gap/4);
		bez[1].arc2 　　　　　= 4/3* this.weight/ con[maxi].length* Math.tan(bez[1].rad_gap/4);
		bez[1].midPoint.x = 1/8*con[maxj].x + 3/8*(con[maxj].x+ bez[1].arc1* Math.cos(con[maxj].tangent))+ 3/8*(con[maxi].x- bez[1].arc2* Math.cos(con[maxi].tangent))+ 1/8*con[maxi].x;
		bez[1].midPoint.y = 1/8*con[maxj].y + 3/8*(con[maxj].y+ bez[1].arc1* Math.sin(con[maxj].tangent))+ 3/8*(con[maxi].y- bez[1].arc2* Math.sin(con[maxi].tangent))+ 1/8*con[maxi].y;
		bez[1].midTangent = con[maxj].rad + bez[1].rad_gap/2 + PI_2;
		bez[1].midExcess  = this.size - this.position.distance(bez[1].midPoint).length();
		bez[1].arc1       = 4/3* this.weight/ con[maxj].length* Math.tan(bez[1].rad_gap/8);
		bez[1].arc_mid    = 4/3* this.weight/ (this.size- bez[1].midExcess)* Math.tan(bez[1].rad_gap/8);
		bez[1].arc2       = 4/3* this.weight/ con[maxi].length* Math.tan(bez[1].rad_gap/8);
		//ここから曲線状の各点の座標計算
		var gap = (bez[1].gap_number- bez[0].gap_number+ dot.length)% dot.length;
		for(i=0; i<gap/2;i++){
			var t = 2*i/gap;
			dot[(bez[0].gap_number+i)%dot.length].abs.x = (1-t)*(1-t)*(1-t)*con[maxi].x + 3*(1-t)*(1-t)*t*(con[maxi].x+bez[0].arc1* Math.cos(con[maxi].tangent)) +
														  3*(1-t)*t*t*(bez[0].midPoint.x- bez[0].arc_mid* Math.cos(bez[0].midTangent)) + t*t*t*bez[0].midPoint.x;
			dot[(bez[0].gap_number+i)%dot.length].abs.y = (1-t)*(1-t)*(1-t)*con[maxi].y + 3*(1-t)*(1-t)*t*(con[maxi].y+bez[0].arc1* Math.sin(con[maxi].tangent)) +
														  3*(1-t)*t*t*(bez[0].midPoint.y- bez[0].arc_mid* Math.sin(bez[0].midTangent)) + t*t*t*bez[0].midPoint.y;
		}
		for(i=gap-1; i>=gap/2; i--){
			var t = (i-gap/2)*2/gap;
			dot[(bez[0].gap_number+i)%dot.length].abs.x = (1-t)*(1-t)*(1-t)*bez[0].midPoint.x + 3*(1-t)*(1-t)*t*(bez[0].midPoint.x+ bez[0].arc_mid* Math.cos(bez[0].midTangent)) +
														  3*(1-t)*t*t*(con[maxj].x- bez[0].arc2* Math.cos(con[maxj].tangent)) + t*t*t*con[maxj].x;
			dot[(bez[0].gap_number+i)%dot.length].abs.y = (1-t)*(1-t)*(1-t)*bez[0].midPoint.y + 3*(1-t)*(1-t)*t*(bez[0].midPoint.y+ bez[0].arc_mid* Math.sin(bez[0].midTangent)) +
														  3*(1-t)*t*t*(con[maxj].y- bez[0].arc2* Math.sin(con[maxj].tangent)) + t*t*t*con[maxj].y;
		}
		//もっかいやる
		gap = (bez[0].gap_number- bez[1].gap_number+ dot.length)% dot.length;
		for(i=0; i<gap/2;i++){
			var t = 2*i/gap;
			dot[(bez[1].gap_number+i)%dot.length].abs.x = (1-t)*(1-t)*(1-t)*con[maxj].x + 3*(1-t)*(1-t)*t*(con[maxj].x+bez[1].arc1* Math.cos(con[maxj].tangent)) +
														  3*(1-t)*t*t*(bez[1].midPoint.x- bez[1].arc_mid* Math.cos(bez[1].midTangent)) + t*t*t*bez[1].midPoint.x;
			dot[(bez[1].gap_number+i)%dot.length].abs.y = (1-t)*(1-t)*(1-t)*con[maxj].y + 3*(1-t)*(1-t)*t*(con[maxj].y+bez[1].arc1* Math.sin(con[maxj].tangent)) +
														  3*(1-t)*t*t*(bez[1].midPoint.y- bez[1].arc_mid* Math.sin(bez[1].midTangent)) + t*t*t*bez[1].midPoint.y;
		}
		for(i=gap-1; i>=gap/2; i--){
			var t = (i-gap/2)*2/gap;
			dot[(bez[1].gap_number+i)%dot.length].abs.x = (1-t)*(1-t)*(1-t)*bez[1].midPoint.x + 3*(1-t)*(1-t)*t*(bez[1].midPoint.x+ bez[1].arc_mid* Math.cos(bez[1].midTangent)) +
														  3*(1-t)*t*t*(con[maxi].x- bez[1].arc2* Math.cos(con[maxi].tangent)) + t*t*t*con[maxi].x;
			dot[(bez[1].gap_number+i)%dot.length].abs.y = (1-t)*(1-t)*(1-t)*bez[1].midPoint.y + 3*(1-t)*(1-t)*t*(bez[1].midPoint.y+ bez[1].arc_mid* Math.sin(bez[1].midTangent)) +
														  3*(1-t)*t*t*(con[maxi].y- bez[1].arc2* Math.sin(con[maxi].tangent)) + t*t*t*con[maxi].y;
		}
		//各dotのrelとradを求める
		for(i=0; i<dot.length; i++){
			dot[i].rel.x = dot[i].abs.x - this.position.x;
			dot[i].rel.y = dot[i].abs.y - this.position.y;
			dot[i].rad = Math.atan2(dot[i].rel.y, dot[i].rel.x)
		}
		var power = new Point();
		for(i=0; i<num; i++){
			if(i==maxi || i==maxj){
				power.x += con[i].excess* con[i].excess* -Math.cos(con[i].tangent- PI_2);
				power.y += con[i].excess* con[i].excess* -Math.sin(con[i].tangent- PI_2);
				//相手が動く壁だった場合に相手の壁にかかる力を計算する
				//この場合は上下方向に動く壁
				if(con[i].num.slice(-3,-2) == "w" && object[con[i].num.slice(0,-3)].type == 3){
					var obje = object[con[i].num.slice(0,-3)];
					var pow = con[i].excess* con[i].excess* Math.sin(con[i].rad)/ Math.sqrt(obje.weight)*2.4;
					obje.tly += pow;
					obje.try += pow;
					obje.bry += pow;
					obje.bly += pow;
					obje = object[obje.pair];
					obje.tly -= pow;
					obje.try -= pow;
					obje.bry -= pow;
					obje.bly -= pow;
				}
				//この場合は角度が動く壁
				else if(con[i].num.slice(-3,-2) == "w" && object[con[i].num.slice(0,-3)].type == 4){
					var obje = object[con[i].num.slice(0,-3)];
					if(con[i].side%2 == 0 && con[i].side > 1){
						if(con[i].side == 2) rad = obje.rad1 + PI;
						else if(con[i].side == 4) rad = obje.rad2 + PI;
						else if(con[i].side == 6) rad = obje.rad2;
						else rad = obje.rad1;
						var len = (this.contact[i].x- obje.center.x)* Math.cos(rad) + (this.contact[i].y- obje.center.y)* Math.sin(rad);
						var pow = con[i].excess* con[i].excess* len/ Math.sqrt(obje.weight)/ 1000;
						//console.log(534534, pow, len, this.position.x, obje.center.x, obje, Math.cos(rad), Math.sin(rad), obje.radv)
						obje.radv -= pow/10;
						//obje.rad1 -= pow;
						//obje.rad2 -= pow;
						if(obje.rad1 > obje.uMax){
							obje.rad2 -= obje.rad1- obje.uMax;
							obje.rad1 = obje.uMax;
							obje.radv *= -0.1
						}
						else if(obje.rad1 < obje.lMax){
							obje.rad2 -= obje.rad1- obje.lMax;
							obje.rad1 = obje.lMax;
							obje.radv *= -0.1;
						}
					}
					else if(con[i].side != 5 && con[i].side != 0){
						var rad = Math.atan2(con[i].y- this.position.y, con[i].x- this.position.x)- Math.atan2(obje.center.y- this.position.y, obje.center.x- this.position.x);
						var len = this.position.distance(obje.center).length()* Math.sin(rad);
						var pow = con[i].excess* con[i].excess* len/ Math.sqrt(obje.weight)/ 1000;
						obje.rad1 -= pow;
						obje.rad2 -= pow;
						if(obje.rad1 > obje.uMax){
							obje.rad2 -= obje.rad1- obje.uMax;
							obje.rad1 = obje.uMax;
							obje.radv *= -0.1
						}
						else if(obje.rad1 < obje.lMax){
							obje.rad2 -= obje.rad1- obje.lMax;
							obje.rad1 = obje.lMax;
							obje.radv *= -0.1;
						}
						console.log(23445, pow)
					}
				}
			}
		}
		//console.log(power)
		for(i=this.collisionC-1; i>=0; i--){
			if(i==maxi || i==maxj) continue;
			//console.log(con[i].num, con[i])
			//仮の中心座標とiの接点までの距離を調べる
			var a = new Point();
			var b = new Point();
			var p = new Point();
			a.x = (con[maxi].x + con[maxj].x)/2;
			a.y = (con[maxi].y + con[maxj].y)/2;
			b.x = (con[maxj].y - con[maxi].y);
			b.y =-(con[maxj].x - con[maxi].x);
			var sqrt = b.length();
			b.x = b.x/ sqrt;
			b.y = b.y/ sqrt;
			p.x = ((this.position.x- a.x)*b.x + (this.position.y- a.y)*b.y)* b.x;
			p.y = ((this.position.x- a.x)*b.x + (this.position.y- a.y)*b.y)* b.y;
			p.x += a.x;
			p.y += a.y;
			//console.log(maxi, maxj, con[maxi], con[maxj], a, b, p)
			//各dotのrelとradを求める
			for(j=0; j<dot.length; j++){
				dot[j].rel.x = dot[j].abs.x - p.x;
				dot[j].rel.y = dot[j].abs.y - p.y;
				dot[j].rad = Math.atan2(dot[j].rel.y, dot[j].rel.x)
				//console.log(dot[j])
			}
			//次にiの接点方向に伸びる直線と歪の曲線との交点を調べる
			var rad = Math.atan2(con[i].y- p.y, con[i].x- p.x);
			for(j=0; j<this.dot.length; j++){
				if( (rad+ 2*Math.PI)%(2*Math.PI) < (this.dot[j].rad+ 2*Math.PI- this.dot[0].rad)%(2*Math.PI)) break;
			}
			var gap_number = (j+dot.length-1)% dot.length;
			var t = (rad- dot[gap_number].rad)/ (dot[(gap_number+1)%dot.length].rad- dot[gap_number].rad);
			var len1 = dot[gap_number].abs.distance(this.position).length();
			var len2 = dot[(gap_number+1)%dot.length].abs.distance(this.position).length();
			
			len1 = (1-t)* len1 + t* len2;
			//console.log(this.position)
			//console.log(t, len1)
			//console.log(p, rad, j , dot[gap_number])
			//console.log(dot[gap_number].abs.distance(p).length(), con[i].distance(p).length())
			if(len1- con[i].distance(p).length() < this.size*0.03){
				//もし消すべき接点の相手がボールだった場合、相手のボールの接点も消しといてあげないといけない
				if(con[i].num.slice(-3,-2) != "w"){
					var B = ball[con[i].num.slice(0,-3)]
					//console.log(B, con[i].num, con[i].num.slice(0,-3), ball[1], this, i, B.collisionC, B.collisionCC);
					for(j=0; j<12; j++){
						if(B.contact[j].num.slice(0,-3)+"a" == this.num+"a" && B.contact[j].num.slice(-3,-2) != "w"){
							//console.log(j)
							if(j<6){
								for(k=j; k<5; k++){	
									B.contact[k].x = B.contact[k+1].x;
									B.contact[k].y = B.contact[k+1].y;
									B.contact[k].rad = B.contact[k+1].rad;
									B.contact[k].length = B.contact[k+1].length;
									B.contact[k].excess = B.contact[k+1].excess;
									B.contact[k].tangent = B.contact[k+1].tangent;
									B.contact[k].weight = B.contact[k+1].weight;
									B.contact[k].num = B.contact[k+1].num;
									B.contact[k].position.x = B.contact[k+1].position.x;
									B.contact[k].position.y = B.contact[k+1].position.y;
									B.contact[k].velocity.x = B.contact[k+1].velocity.x;
									B.contact[k].velocity.y = B.contact[k+1].velocity.y;
								}
								B.collisionC--;
								break;
							}
							else{
								for(k=6+j; k<12; k++){
									B.contact[k].x = B.contact[k+1].x;
									B.contact[k].y = B.contact[k+1].y;
									B.contact[k].rad = B.contact[k+1].rad;
									B.contact[k].length = B.contact[k+1].length;
									B.contact[k].excess = B.contact[k+1].excess;
									B.contact[k].tangent = B.contact[k+1].tangent;
									B.contact[k].weight = B.contact[k+1].weight;
									B.contact[k].num = B.contact[k+1].num;
									B.contact[k].position.x = B.contact[k+1].position.x;
									B.contact[k].position.y = B.contact[k+1].position.y;
									B.contact[k].velocity.x = B.contact[k+1].velocity.x;
									B.contact[k].velocity.y = B.contact[k+1].velocity.y;
								}
								B.collisionCC--;
								break;
							}
						}
					}
				}
				//相手が壁でも同じことをする
				else{
					var obje = object[con[i].num.slice(0,-3)]
					for(j=0; j<12; j++){
						console.log(98764, obje, obje.contact[j].num, obje.contact[j].num.slice(0,-3), obje.contact[j].num.slice(-3,-2))
						if(obje.contact[j].num.slice(0,-3)+"a" == this.num+"a" && obje.contact[j].num.slice(-3,-2) != "w"){
							console.log(98765, obje, this.num, obje.contact[j].num.slice(0,-3), 0+"b" == "0"+"b")
							for(k=j; k<11; k++){
								obje.contact[k].x = obje.contact[k+1].x;
								obje.contact[k].y = obje.contact[k+1].y;
								obje.contact[k].excess = obje.contact[k+1].excess;
								obje.contact[k].num = obje.contact[k+1].num;
								obje.contact[k].weight = obje.contact[k+1].weight;
								obje.contact[k].color = obje.contact[k+1].color;
								obje.contact[k].side = obje.contact[k+1].side;
								obje.contact[k].rad = obje.contact[k+1].rad;
							}
							obje.collisionC--;
							break;
						}
					}
				}
				for(j=i; j<num; j++){
				//console.log(j)
					this.contact[j].x = this.contact[j+1].x;
					this.contact[j].y = this.contact[j+1].y;
					this.contact[j].rad = this.contact[j+1].rad;
					this.contact[j].length = this.contact[j+1].length;
					this.contact[j].excess = this.contact[j+1].excess;
					this.contact[j].tangent = this.contact[j+1].tangent;
					this.contact[j].weight = this.contact[j+1].weight;
					this.contact[j].num = this.contact[j+1].num;
					this.contact[j].position.x = this.contact[j+1].position.x;
					this.contact[j].position.y = this.contact[j+1].position.y;
					this.contact[j].velocity.x = this.contact[j+1].velocity.x;
					this.contact[j].velocity.y = this.contact[j+1].velocity.y;
				}
				this.collisionC--;
				if(maxi > i) maxi--;
				if(maxj > i) maxj--;
			}
			else{
				console.log(con[0], con[1], con[2])
				if(con[i].num.slice(-3,-2) == "c") {
					var excess = len1- con[i].distance(p).length();
					power.x += excess*excess* -Math.cos(con[i].tangent- PI_2);
					power.y += excess*excess* -Math.sin(con[i].tangent- PI_2);
					console.log(excess)
					//run=false;
					//console.log(23445)
					//continue;
				}
				//相手が動く壁だった場合に相手の壁にかかる力を計算する
				//この場合は上下方向に動く壁
				if(con[i].num.slice(-3,-2) == "w" && object[con[i].num.slice(0,-3)].type == 3){
					var obje = object[con[i].num.slice(0,-3)];
					var pow = con[i].excess* con[i].excess* Math.sin(con[i].rad)/ Math.sqrt(obje.weight);
					obje.tly += pow;
					obje.try += pow;
					obje.bry += pow;
					obje.bly += pow;
					obje = object[obje.pair];
					obje.tly -= pow;
					obje.try -= pow;
					obje.bry -= pow;
					obje.bly -= pow;
				}
				//この場合は角度が動く壁
				else if(con[i].num.slice(-3,-2) == "w" && object[con[i].num.slice(0,-3)].type == 4){
					var obje = object[con[i].num.slice(0,-3)];
					if(con[i].side%2 == 0 && con[i].side > 1){
						if(con[i].side == 2) rad = obje.rad1 + PI;
						else if(con[i].side == 4) rad = obje.rad2 + PI;
						else if(con[i].side == 6) rad = obje.rad2;
						else rad = obje.rad1;
						var len = (this.contact[i].x- obje.center.x)* Math.cos(rad) + (this.contact[i].y- obje.center.y)* Math.sin(rad);
						var pow = con[i].excess* con[i].excess* len/ Math.sqrt(obje.weight)/ 1000;
						console.log(534534, pow, len, this.position.x, obje.center.x, obje, Math.cos(rad), Math.sin(rad), obje.radv)
						obje.radv -= pow/10;
						//obje.rad1 -= pow;
						//obje.rad2 -= pow;
						if(obje.rad1 > obje.uMax){
							obje.rad2 -= obje.rad1- obje.uMax;
							obje.rad1 = obje.uMax;
							obje.radv *= -0.1
						}
						else if(obje.rad1 < obje.lMax){
							obje.rad2 -= obje.rad1- obje.lMax;
							obje.rad1 = obje.lMax;
							obje.radv *= -0.1;
						}
					}
					else if(con[i].side != 5 && con[i].side != 0){
						var rad = Math.atan2(con[i].y- this.position.y, con[i].x- this.position.x)- Math.atan2(obje.center.y- this.position.y, obje.center.x- this.position.x);
						var len = this.position.distance(obje.center).length()* Math.sin(rad);
						var pow = con[i].excess* con[i].excess* len/ Math.sqrt(obje.weight)/ 1000;
						obje.rad1 -= pow;
						obje.rad2 -= pow;
						if(obje.rad1 > obje.uMax){
							obje.rad2 -= obje.rad1- obje.uMax;
							obje.rad1 = obje.uMax;
							obje.radv *= -0.1
						}
						else if(obje.rad1 < obje.lMax){
							obje.rad2 -= obje.rad1- obje.lMax;
							obje.rad1 = obje.lMax;
							obje.radv *= -0.1;
						}
						console.log(23445, pow)
					}
				}
			}
		}
		//console.log(max, this.size*0.1, con[maxi], con[maxj], con[i])
		//console.log()
	}
	//console.log(power)
	this.position.x += power.x/ this.size;
	this.position.y += power.y/ this.size;
	for(i=0; i<OBJECT_MAX_COUNT; i++){
		this.touchArea[i].num = 0
	}
	for(i=0; i<this.collisionC+this.collisionCC; i++){
		if(con[i].num.slice(-3,-2) =="w" && con[i].num.slice(-2,-1) =="c"){
			this.touchArea[con[i].num.slice(0,-3)].num = 4;
		}
	}
	//console.log(con[0].num, con[1].num, con[2].num, con[3].num)
	//console.log(con[0], con[1], con[2], con[3])
	//console.log(this.num, this.collisionC, this.collisionCC)
	//console.log(dot[0])
}


Character.prototype.distort01 = function(ball, object){
	//取ってはいけない接点を排除したので、改めて歪を計算する
	var i, j, k;
	var num = this.collisionC
	var con = this.contact;
	var dot = this.dot;
	var bez = this.bezier;
	var excessC = 0;
	//まずは各接点についてexcessが一定値を超えているとカウントをインクリメントする。
	for(i=0; i<num; i++){
		if(con[i].excess >= this.size*0.15) excessC++;
	}
	//カウントが一定数を超えていたらめり込みによって破裂する
	if(excessC >= 2){
		if(this.explosionC+2 > counter){
			this.explosion(ball, object);
			/*console.log(this, this.lastDistortion)
			this.alive = false;
			this.collisionC  = 0;
			this.collisionCC = 0;
			this.distortionF = false
			this.lastDistortion = false;
			console.log(this, this.lastDistortion)
			var amount = Math.floor(Math.sqrt(this.size/3) + Math.random()*2);
			for(j=ball.length-1; j>ball.length-amount-1; j--){
				var v = new Point();
				var size = Math.sqrt(this.weight/amount) + Math.random()*3 -2;
				v.x = Math.sqrt(Math.abs(this.velocity.x/2))*Math.sin(this.velocity.x) +  Math.random()*10- 5;
				v.y = Math.sqrt(Math.abs(this.velocity.y/2))*Math.sin(this.velocity.y) +  Math.random()*12- 5;
				ball[j].set(this.position, size, v, Math.ceil(Math.random()*2));
				ball[j].touchF = false;
			}*/
		}
		else this.explosionC = counter;
	return;
	}
	//この時点でボールがひずんだことは確定したのでフラグを真にする
	this.distortionF = true;
	//もし接点が二つしかなかったらdistortCheckで計算した曲線で十分なのでここで終わり
	if(this.collisionC < 3) return;
	
	//この時点で接点が三つ以上あったら改めて歪を計算する必要がある
	//まず各接点を中心からの角度が小さい順に並び返す
	for(i=0; i<num; i++){
		for(j=num-1; j>i; j--){
			if((con[j-1].rad+ PI2)%PI2 > (con[j].rad+ PI2)%PI2){
				var temp;
				temp = con[j];
				con[j] = con[j-1];
				con[j-1] =temp;
			}
		}
	}
	//それぞれの接点間の角度を計算する。後曲線の変わり目がどこにあるのか計算する
	var power = new Point();
	var weight;
	for(i=0; i<num; i++){
		bez[i].rad_gap = (con[(i+1)%num].rad- con[i].rad + PI2)% PI2;
		bez[i].gap_number = (Math.round(con[i].rad* dot.length/ PI2) + dot.length) % dot.length;
		con[i].length = this.position.distance(con[i]).length();
		con[i].excess = this.size- con[i].length;
	}
	//ベジエ曲線でゆがみを表現していく。ついでに曲線状の各点の座標を計算していく
	for(i=0; i<num; i++){
		bez[i].arc1 = 4/3* this.weight/ con[i].length* Math.tan(bez[i].rad_gap/4);
		bez[i].arc2 = 4/3* this.weight/ con[(i+1)%num].length* Math.tan(bez[i].rad_gap/4);
		//各接点間の中点を求める
		bez[i].midPoint.x = 1/8*con[i].x + 3/8*(con[i].x+ bez[i].arc1* Math.cos(con[i].tangent))+ 3/8*(con[(i+1)%num].x- bez[i].arc2* Math.cos(con[(i+1)%num].tangent)) + 1/8*con[(i+1)%num].x;
		bez[i].midPoint.y = 1/8*con[i].y + 3/8*(con[i].y+ bez[i].arc1* Math.sin(con[i].tangent))+ 3/8*(con[(i+1)%num].y- bez[i].arc2* Math.sin(con[(i+1)%num].tangent)) + 1/8*con[(i+1)%num].y;
		bez[i].midTangent = con[i].rad + bez[i].rad_gap/2 + PI_2;
		bez[i].midExcess  = this.size - this.position.distance(bez[i].midPoint).length();
		bez[i].arc1       = 4/3* this.weight/ con[i].length* Math.tan(bez[i].rad_gap/8);
		bez[i].arc_mid    = 4/3* this.weight/ (this.size- bez[i].midExcess)* Math.tan(bez[i].rad_gap/8);
		bez[i].arc2       = 4/3* this.weight/ con[(i+1)%num].length* Math.tan(bez[i].rad_gap/8);
		//ここから曲線状の各点の座標計算
		var gap = (bez[(i+1)%num].gap_number- bez[i].gap_number+ dot.length)% dot.length;
		for(j=0; j< gap/2; j++){
			var t = 2*j/gap;
			dot[(bez[i].gap_number+j)%dot.length].abs.x = (1-t)*(1-t)*(1-t)*con[i].x + 3*(1-t)*(1-t)*t*(con[i].x+bez[i].arc1* Math.cos(con[i].tangent)) +
											 3*(1-t)*t*t*(bez[i].midPoint.x- bez[i].arc_mid* Math.cos(bez[i].midTangent)) + t*t*t*bez[i].midPoint.x;
			dot[(bez[i].gap_number+j)%dot.length].abs.y = (1-t)*(1-t)*(1-t)*con[i].y + 3*(1-t)*(1-t)*t*(con[i].y+bez[i].arc1* Math.sin(con[i].tangent)) +
											 3*(1-t)*t*t*(bez[i].midPoint.y- bez[i].arc_mid* Math.sin(bez[i].midTangent)) + t*t*t*bez[i].midPoint.y;
		}
		for(j=gap-1; j>=gap/2; j--){
			var t = (j-gap/2)*2/gap;
			dot[(bez[i].gap_number+j)%dot.length].abs.x = (1-t)*(1-t)*(1-t)*bez[i].midPoint.x + 3*(1-t)*(1-t)*t*(bez[i].midPoint.x+ bez[i].arc_mid* Math.cos(bez[i].midTangent)) + 
											3*(1-t)*t*t*(con[(i+1)%num].x- bez[i].arc2* Math.cos(con[(i+1)%num].tangent)) + t*t*t*con[(i+1)%num].x;
			dot[(bez[i].gap_number+j)%dot.length].abs.y = (1-t)*(1-t)*(1-t)*bez[i].midPoint.y + 3*(1-t)*(1-t)*t*(bez[i].midPoint.y+ bez[i].arc_mid* Math.sin(bez[i].midTangent)) +
											3*(1-t)*t*t*(con[(i+1)%num].y- bez[i].arc2* Math.sin(con[(i+1)%num].tangent)) + t*t*t*con[(i+1)%num].y;
		}
	}
	//各dotのrelとradを求める
	for(j=0; j<dot.length; j++){
		dot[j].rel.x = dot[j].abs.x - this.position.x;
		dot[j].rel.y = dot[j].abs.y - this.position.y;
		dot[j].rad = Math.atan2(dot[j].rel.y, dot[j].rel.x)
	}
}

Character.prototype.distort02 = function(ball){
	//console.log(ball[1].dot[48].abs)
	var i, j, k;
	var num1 = this.collisionC;
	var num2 = this.collisionCC;
	var con = this.contact;
	var dot = this.dot;
	var bez = this.bezier;
	var conNum;
	var dotNum;
	var dot_temp = new Array(dot.length);
	var power = new Point();
	//console.log(dot[0])
	//まず新しくできた各接点がどの既存の接点間にあるのかを調べる。接点はcon[conNum]とcon[conNum+1]の間にある
	if(num1<2) return; 
	for(i=6; i<6+num2; i++){
		//console.log(con)
		//console.log(this.num, num1, num2, con[i])
		con[i].rad = (con[i].rad+ PI2)% PI2;
		con[0].rad = (con[0].rad+ PI2)% PI2;
		for(j=0; j<num1; j++){
			con[(j+1)%num1].rad = (con[(j+1)%num1].rad+ PI2) % PI2;
			//console.log(i, j, (j+1)%num1, con[i].rad, con[j].rad, con[(j+1)%num1].rad)
			if(con[i].rad < con[j].rad){
				break;
			}
		}
		//console.log(conNum, j);
		if(j==0 || j==num1) conNum = num1-1;
		else conNum = j-1
		//conNum = (j-1+num1)%num1;
		dotNum = (bez[(conNum+1)%num1].gap_number- bez[conNum].gap_number+ dot.length)% dot.length;
		//console.log(conNum, con[conNum], con[(conNum+1)%num1])
		var dot_temp = new Array(dotNum+1);
		var contact = {};
		contact.length = this.size;
		contact.excess = 0;
		contact.rad = con[i].rad;
		contact.x = this.position.x + this.size* Math.cos(con[i].rad);
		contact.y = this.position.y + this.size* Math.sin(con[i].rad);
		contact.tangent = con[i].rad + PI_2;
		//こっから計算
		contact.rad_gap = (contact.rad- con[conNum].rad + PI2)% PI2;
		contact.gap_number = (Math.round(contact.rad* dot.length/ PI2) + dot.length) % dot.length;
		//曲線上の各点の座標を計算していく
		contact.arc1 = 4/3* this.weight/ con[conNum].length* Math.tan(contact.rad_gap/4);
		contact.arc2 = 4/3* this.weight/ contact.length* Math.tan(contact.rad_gap/4);
		//console.log(contact.arc1, contact.arc2)
		//各接点間の中点を求める
		contact.midPoint = new Point();
		contact.midPoint.x = 1/8*con[conNum].x + 3/8*(con[conNum].x+ contact.arc1* Math.cos(con[conNum].tangent))+ 3/8*(contact.x- contact.arc2* Math.cos(contact.tangent)) + 1/8*contact.x;
		contact.midPoint.y = 1/8*con[conNum].y + 3/8*(con[conNum].y+ contact.arc1* Math.sin(con[conNum].tangent))+ 3/8*(contact.y- contact.arc2* Math.sin(contact.tangent)) + 1/8*contact.y;
		contact.midTangent = con[conNum].rad + contact.rad_gap/2 + PI_2;
		contact.midExcess  = this.size - this.position.distance(contact.midPoint).length();
		contact.arc1       = 4/3* this.weight/ con[conNum].length* Math.tan(contact.rad_gap/8);
		contact.arc_mid    = 4/3* this.weight/ (this.size- contact.midExcess)* Math.tan(contact.rad_gap/8);
		contact.arc2       = 4/3* this.weight/ contact.length* Math.tan(contact.rad_gap/8);
		//ここから曲線状の各点の座標計算
		var gap = (contact.gap_number- bez[conNum].gap_number+ dot.length)% dot.length;
		for(j=0; j<gap/2; j++){
			var t = 2*j/gap;
			dot_temp[(bez[conNum].gap_number+j)%dot.length] = new Point();
			dot_temp[(bez[conNum].gap_number+j)%dot.length].x = (1-t)*(1-t)*(1-t)*con[conNum].x + 3*(1-t)*(1-t)*t*(con[conNum].x+ contact.arc1* Math.cos(con[conNum].tangent))+
													            3*(1-t)*t*t*(contact.midPoint.x- contact.arc_mid* Math.cos(contact.midTangent)) + t*t*t*contact.midPoint.x;
			dot_temp[(bez[conNum].gap_number+j)%dot.length].y = (1-t)*(1-t)*(1-t)*con[conNum].y + 3*(1-t)*(1-t)*t*(con[conNum].y+ contact.arc1* Math.sin(con[conNum].tangent))+
			                                                    3*(1-t)*t*t*(contact.midPoint.y- contact.arc_mid* Math.sin(contact.midTangent)) + t*t*t*contact.midPoint.y;
		}
		for(j=gap-1; j>=gap/2; j--){
			var t = (j-gap/2)*2/gap;
			dot_temp[(bez[conNum].gap_number+j)%dot.length] = new Point();
			dot_temp[(bez[conNum].gap_number+j)%dot.length].x = (1-t)*(1-t)*(1-t)*contact.midPoint.x + 3*(1-t)*(1-t)*t*(contact.midPoint.x+ contact.arc_mid* Math.cos(contact.midTangent))+
			                                                    3*(1-t)*t*t*(contact.x- contact.arc2* Math.cos(contact.tangent)) + t*t*t*contact.x;
			dot_temp[(bez[conNum].gap_number+j)%dot.length].y = (1-t)*(1-t)*(1-t)*contact.midPoint.y + 3*(1-t)*(1-t)*t*(contact.midPoint.y+ contact.arc_mid* Math.sin(contact.midTangent))+
			                                                    3*(1-t)*t*t*(contact.y- contact.arc2* Math.sin(contact.tangent)) + t*t*t*contact.y;
		}
		
		//上までのは接点1とcontactについて今度はcontactと接点2について計算を行う
		conNum = (conNum+1)%num1;
		con[conNum].rad = Math.atan2(con[conNum].y- this.position.y, con[conNum].x- this.position.x)
		con[conNum].tangent = con[conNum].rad + PI_2;
		//contact.tangent = con[i].rad - PI_2;
		contact.rad_gap = (con[conNum].rad- contact.rad + PI2)% PI2;
		//曲線上の各点の座標を計算していく
		contact.arc1 = 4/3* this.weight/ contact.length* Math.tan(contact.rad_gap/4);
		contact.arc2 = 4/3* this.weight/ con[conNum].length* Math.tan(contact.rad_gap/4);
		//各接点の中点を求める
		//console.log(contact.midPoint, contact.midTangent, contact.arc1, contact.arc_mid, contact.arc2, contact.rad_gap)
		contact.midPoint = new Point();
		contact.midPoint.x = 1/8*contact.x + 3/8*(contact.x+ contact.arc1* Math.cos(contact.tangent))+ 3/8*(con[conNum].x- contact.arc2* Math.cos(con[conNum].tangent)) + 1/8*con[conNum].x;
		contact.midPoint.y = 1/8*contact.y + 3/8*(contact.y+ contact.arc1* Math.sin(contact.tangent))+ 3/8*(con[conNum].y- contact.arc2* Math.sin(con[conNum].tangent)) + 1/8*con[conNum].y;
		contact.midTangent = contact.rad + contact.rad_gap/2 + PI_2;
		contact.midExcess  = this.size - this.position.distance(contact.midPoint).length();
		contact.arc1       = 4/3* this.weight/ contact.length* Math.tan(contact.rad_gap/8);
		contact.arc_mid    = 4/3* this.weight/ (this.size- contact.midExcess)* Math.tan(contact.rad_gap/8);
		contact.arc2       = 4/3* this.weight/ con[conNum].length* Math.tan(contact.rad_gap/8);
		//console.log(contact.midPoint, contact.midTangent, contact.arc1, contact.arc_mid, contact.arc2, contact.rad_gap)
		//console.log(contact, con[conNum], con[conNum].rad, contact.rad, con[conNum].x, con[conNum].y)
		//ここから曲線状の座標計算
		gap = (bez[conNum].gap_number- contact.gap_number+ dot.length)% dot.length;
		//console.log(gap)
		for(j=0; j<gap/2; j++){
			var t = 2*j/gap;
			dot_temp[(contact.gap_number+j)%dot.length] = new Point();
			dot_temp[(contact.gap_number+j)%dot.length].x = (1-t)*(1-t)*(1-t)*contact.x + 3*(1-t)*(1-t)*t*(contact.x+ contact.arc1* Math.cos(contact.tangent))+
			                                                3*(1-t)*t*t*(contact.midPoint.x- contact.arc_mid* Math.cos(contact.midTangent)) + t*t*t*contact.midPoint.x;
			dot_temp[(contact.gap_number+j)%dot.length].y = (1-t)*(1-t)*(1-t)*contact.y + 3*(1-t)*(1-t)*t*(contact.y+ contact.arc1* Math.sin(contact.tangent))+
			                                                3*(1-t)*t*t*(contact.midPoint.y- contact.arc_mid* Math.sin(contact.midTangent)) + t*t*t*contact.midPoint.y;
		}
		for(j=gap-1; j>=gap/2; j--){
			var t = (j-gap/2)*2/gap;
			dot_temp[(contact.gap_number+j)%dot.length] = new Point();
			dot_temp[(contact.gap_number+j)%dot.length].x = (1-t)*(1-t)*(1-t)*contact.midPoint.x + 3*(1-t)*(1-t)*t*(contact.midPoint.x+ contact.arc_mid* Math.cos(contact.midTangent))+ 
			                                                3*(1-t)*t*t*(con[conNum].x- contact.arc2* Math.cos(con[conNum].tangent))+ t*t*t*con[conNum].x;
			dot_temp[(contact.gap_number+j)%dot.length].y = (1-t)*(1-t)*(1-t)*contact.midPoint.y + 3*(1-t)*(1-t)*t*(contact.midPoint.y+ contact.arc_mid* Math.sin(contact.midTangent))+
			                                                3*(1-t)*t*t*(con[conNum].y- contact.arc2* Math.sin(con[conNum].tangent))+ t*t*t*con[conNum].y;
		}
		conNum = (conNum-1+num1)%num1;
		//接点がどのdotの間にあるのか調べる。jがdot_numberになる
		for(j=0; j<dot.length; j++){
			dot[j].rad = Math.atan2(dot[j].rel.y, dot[j].rel.x);
		}
		for(j=0; j<dot.length; j++){
			if( (con[i].rad+ PI2- dot[0].rad)%PI2 < (dot[j].rad+ PI2- dot[0].rad)%PI2) break;
		}
		var gap_number = (j+dot.length-1)% dot.length;
		var t = ((con[i].rad- dot[gap_number].rad+PI2)%PI2)/ ((dot[(gap_number+1)%dot.length].rad- dot[gap_number].rad+PI2)%PI2);
		var len1 = dot[gap_number].abs.distance(this.position).length();
		var len2 = dot[(gap_number+1)%dot.length].abs.distance(this.position).length();
		console.log(t, len1, len2)
		if(t>1) t=1;
		else if(t<0) t=0;
		
		len1 = (1-t)* len1 + t* len2;
		len2 = con[i].distance(this.position).length();
		//console.log(con[i], this.position)
		//ついでにここでボールが受ける力も計算しておく
		var excess = len1- len2;
		power.x += excess*excess* -Math.cos(contact.tangent- PI_2);
		power.y += excess*excess* -Math.sin(contact.tangent- PI_2);
		if(t > 10){
			console.log("t is too large")
			run = false;
		}
		//console.log(dot[(gap_number+1)%dot.length].rel, dot[gap_number].rel, gap_number)
		//console.log(contact, rad- dot[gap_number].rad, dot[(gap_number+1)%dot.length].rad- dot[gap_number].rad)
		//console.log(power, excess, contact.tangent, len1, len2, gap_number)
		//console.log(dot[gap_number].abs, dot[(gap_number+1)%dot.length].abs, this.position, t);
		//console.log(rad, dot[gap_number].rad, dot[(gap_number+1)%dot.length].rad)
		//if(!excess) run = false
		if(!len2){
			console.log("len2 is false")
			run = false;
		}
		t = (len2-this.size)/ (len1-this.size);
		console.log()
		if(t>1) t=1;
		else if(t<0) t=0;
		//console.log(conNum, bez[conNum], t)
		for(j=0; j<dotNum-2; j++){
			//console.log((bez[conNum].gap_number+j), (bez[conNum].gap_number+j)%dot.length, dot_temp, dotNum)
			//console.log(dot[(bez[conNum].gap_number+j)%dot.length].rad, dot[(bez[conNum].gap_number+j)%dot.length].abs)
			//console.log((bez[conNum].gap_number+j)%dot.length)
			dot[(bez[conNum].gap_number+j)%dot.length].abs.x = t* dot[(bez[conNum].gap_number+j)%dot.length].abs.x + (1-t)* dot_temp[(bez[conNum].gap_number+j)%dot.length].x;
			dot[(bez[conNum].gap_number+j)%dot.length].abs.y = t* dot[(bez[conNum].gap_number+j)%dot.length].abs.y + (1-t)* dot_temp[(bez[conNum].gap_number+j)%dot.length].y;
		}
	}
	this.position.x += power.x/ this.size;
	this.position.y += power.y/ this.size;
}

Character.prototype.draw = function(f){
	//ボールの色に描写を合わせる
	ctx.fillStyle = color[4];
	if(this.lastDistortion || this.distortionF){
		//歪円だった場合
		var dot = this.dot
		ctx.beginPath();
		ctx.moveTo(dot[0].abs.x, dot[0].abs.y);
		for(i=1; i<dot.length; i++){
			ctx.lineTo(dot[i].abs.x, dot[i].abs.y);
		}
		ctx.closePath();
		if(f == 1) ctx.fillStype = color[4];
		else ctx.fillStyle = color[this.color];
		ctx.fill();
	}
	else{
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI, true);
		if(f == 1) ctx.fillStype = color[4];
		else ctx.fillStyle = color[this.color];
		ctx.fill();
	}
	
}

//二体の物体を結合する========================================================================================================
//正円と正円で衝突判定を取る
Character.prototype.absorption01 = function(b){
	if(b.position.distance(this.position).length() < this.size + b.size){
		//吸収後の重さと半径、重心と速度を求める
		var weight = this.weight + b.weight;
		//this.position.x = (this.weight* this.position.x + b.weight* b.position.x)/ weight;
		//this.position.y = (this.weight* this.position.y + b.weight* b.position.y)/ weight;
		this.velocity.x = (this.weight* this.velocity.x + b.weight* b.velocity.x)/ weight;
		this.velocity.y = (this.weight* this.velocity.y + b.weight* b.velocity.y)/ weight;
		this.weight = weight;
		this.size = Math.sqrt(weight);
		//球の各dotの座標を移動する
		for(i=0; i<this.dot.length; i++){
			this.dot[i].abs.x = this.position.x+ this.dot[i].rel.x;
			this.dot[i].abs.y = this.position.y+ this.dot[i].rel.y;
		}
		//遅い番号のaliveを偽にし、諸々の情報をリセットする
		b.initialize();
	}
}

Character.prototype.absorption02 = function(b, f){
	//まずは正円に一番近い歪円上の点を求める。中心座標間の角度からどの辺にありそうかを推測し、その後より近い点を探していく。iがdot_numになる。
	var rad = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x);
	var i = (Math.ceil(rad* this.dot.length/Math.PI/2)+ this.dot.length)% this.dot.length;
	if(this.dot[(i+1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
		i++;
		if(i>this.dot.length-1) i=0;
		while(this.dot[(i+1)%b.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i++
			if(i>this.dot.length-1) i=0;
		}
	}
	else{
		while(this.dot[(i+this.dot.length-1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i--;
			if(i<0) i=this.dot.length-1;
		}
	}
	var len = this.dot[i].abs.distance(b.position).length();
	if(len <b.size || this.position.distance(b.position).length() < this.position.distance(this.dot[i].abs).length()){
		//番号が遅いほうを殺す。その判定をfでおこなう
		if(f){
			//吸収後の重さと半径、重心と速度を求める
			var weight = this.weight + b.weight;
			this.position.x = (this.weight* this.position.x + b.weight* b.position.x)/ weight;
			this.position.y = (this.weight* this.position.y + b.weight* b.position.y)/ weight;
			this.velocity.x = (this.weight* this.velocity.x + b.weight* b.velocity.x)/ weight;
			this.velocity.y = (this.weight* this.velocity.y + b.weight* b.velocity.y)/ weight;
			this.weight = weight;
			this.size = Math.sqrt(weight);
			//遅い番号のaliveを偽にし、諸々の情報をリセットする
			b.initialize();
		}
		else{
			//吸収後の重さと半径、重心と速度を求める
			var weight = this.weight + b.weight;
			b.size = Math.sqrt(this.weight);
			b.position.x = (this.weight* this.position.x + b.weight* b.position.x)/ weight;
			b.position.y = (this.weight* this.position.y + b.weight* b.position.y)/ weight;
			b.velocity.x = (this.weight* this.velocity.x + b.weight* b.velocity.x)/ weight;
			b.velocity.y = (this.weight* this.velocity.y + b.weight* b.velocity.y)/ weight;
			b.weight = weight;
			b.size = Math.sqrt(weight);
			//球の各dotの座標を移動する
			for(i=0; i<this.dot.length; i++){
				this.dot[i].abs.x = this.position.x+ this.dot[i].rel.x;
				this.dot[i].abs.y = this.position.y+ this.dot[i].rel.y;
			}
			//遅い番号のaliveを偽にし、諸々の情報をリセットする
			this.initialize();
		}
	}
}

Character.prototype.absorption03 = function(b){
	//両方の歪円に対して、他方の中心座標に一番近いdotの位置を計算する。どの辺にありそうか推測した後、より近い点を計算する。i,jがそれぞれdot_numとなる
	var rad1 = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x);
	var i = (Math.ceil(rad1* this.dot.length/Math.PI/2)+ this.dot.length)% this.dot.length;
	if(this.dot[(i+1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
		i++;
		if(i>this.dot.length-1) i=0;
		while(this.dot[(i+1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i++
			if(i>this.dot.length-1) i=0;
		}
	}
	else{
		while(this.dot[(i+this.dot.length-1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i--;
			if(i<0) i=this.dot.length-1;
		}
	}
	var rad2 = Math.atan2(this.position.y- b.position.y, this.position.x- b.position.x);
	var j = (Math.ceil(rad2* b.dot.length/Math.PI/2)+ b.dot.length)% b.dot.length;
	if(b.dot[(j+1)%b.dot.length].abs.distance(this.position).length() < b.dot[j].abs.distance(this.position).length()){
		j++;
		if(j>b.dot.length-1) j=0;
		while(b.dot[(j+1)%b.dot.length].abs.distance(this.position).length() < b.dot[j].abs.distance(this.position).length()){
			j++
			if(j>b.dot.length-1) j=0;
		}
	}
	else{
		while(b.dot[(j+b.dot.length-1)%b.dot.length].abs.distance(this.position).length() < b.dot[j].abs.distance(this.position).length()){
			j--;
			if(j<0) j=b.dot.length-1;
		}
	}
	var len1 = this.dot[i].abs.distance(this.position).length();
	var len2 = b.dot[j].abs.distance(b.position).length();
	if(this.position.distance(b.position).length() < (len1 + len2)){// * 0.95){
		//吸収後の重さと半径、重心と速度を求める
		var weight = this.weight + b.weight;
		this.position.x = (this.weight* this.position.x + b.weight* b.position.x)/ weight;
		this.position.y = (this.weight* this.position.y + b.weight* b.position.y)/ weight;
		this.velocity.x = (this.weight* this.velocity.x + b.weight* b.velocity.x)/ weight;
		this.velocity.y = (this.weight* this.velocity.y + b.weight* b.velocity.y)/ weight;
		this.weight = weight;
		this.size = Math.sqrt(weight);
		//球の各dotの座標を移動する
		for(i=0; i<this.dot.length; i++){
			this.dot[i].abs.x = this.position.x+ this.dot[i].rel.x;
			this.dot[i].abs.y = this.position.y+ this.dot[i].rel.y;
		}
		//遅い番号のaliveを偽にし、諸々の情報をリセットする
		b.initialize();
	}
}

Character.prototype.collision01 = function(b){
	if(this.contact[0].num.slice(0,-3) == b.num+"b") return;
	for(i=0; i<b.collisionC+b.collisionCC; i++){
		if(this.contact[i].num.slice(0,-3) == b.num && this.contact[i].num.slice(-3,-2) != "w") return; 
	}
	if(b.position.distance(this.position).length() < this.size + b.size){
		//衝突時の接点の情報を求める
		var rad = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x);
		var len = b.position.distance(this.position).length();
		var len1 = (len*len + this.size*this.size - b.size*b.size)/ (2*len);
		var len2 = (len*len + b.size*b.size - this.size*this.size)/ (2*len);
		
		this.contact[this.collisionC].x = this.position.x + Math.cos(rad)* len1;
		this.contact[this.collisionC].y = this.position.y + Math.sin(rad)* len1;
		this.contact[this.collisionC].rad = rad;
		this.contact[this.collisionC].tangent = rad + Math.PI/2;
		this.contact[this.collisionC].length = this.contact[this.collisionC].distance(this.position).length();
		this.contact[this.collisionC].excess = this.size - len1;
		this.contact[this.collisionC].weight = b.weight;
		this.contact[this.collisionC].num = b.num+"c"+"c"+"0";
		this.contact[this.collisionC].position.x = b.position.x;
		this.contact[this.collisionC].position.y = b.position.y;
		this.contact[this.collisionC].velocity.x = b.velocity.x;
		this.contact[this.collisionC].velocity.y = b.velocity.y;
		
		rad = rad+ Math.PI;
		b.contact[b.collisionC].x = b.position.x + Math.cos(rad)* len2;
		b.contact[b.collisionC].y = b.position.y + Math.sin(rad)* len2;
		b.contact[b.collisionC].rad = rad;
		b.contact[b.collisionC].tangent = rad + Math.PI/2;
		b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
		b.contact[b.collisionC].excess = b.size - len2;
		b.contact[b.collisionC].weight = this.weight;
		b.contact[b.collisionC].num = this.num+"c"+"c"+"0";
		b.contact[b.collisionC].position.x = this.position.x;
		b.contact[b.collisionC].position.y = this.position.y;
		b.contact[b.collisionC].velocity.x = this.velocity.x;
		b.contact[b.collisionC].velocity.y = this.velocity.y;
		console.log(this.contact[this.collisionC+this.collisionCC].x, b.contact[b.collisionC+b.collisionCC].x)
		//最後にcollisionCをインクリメントと互いの衝突済みフラグを真にして終わりして終了
		this.collisionC++;
		b.collisionC++;
	}
}

Character.prototype.collision02 = function(b, f){
	if(!f && this.contact[0].num.slice(0,-2) == b.num+"b") return;
	for(i=0; i<6+b.collisionCC; i++){
		if(f){
			if(this.contact[i].num.slice(0,-3) == b.num && this.contact[i].num.slice(-3,-2) != "w") return; 
		}
		else{
			if(b.contact[i].num.slice(0,-3) == this.num && b.contact[i].num.slice(-3,-2) != "w") return;
		}
	}
	//まずは正円に一番近い歪円上の点を求める。中心座標間の角度からどの辺にありそうかを推測し、その後より近い点を探していく。iがdot_numになる。
	var rad = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x);
	var i = (Math.ceil(rad* this.dot.length/Math.PI/2)+ this.dot.length)% this.dot.length;
	if(this.dot[(i+1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
		i++;
		if(i>this.dot.length-1) i=0;
		while(this.dot[(i+1)%b.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i++
			if(i>this.dot.length-1) i=0;
		}
	}
	else{
		while(this.dot[(i+this.dot.length-1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i--;
			if(i<0) i=this.dot.length-1;
		}
	}
	var len = this.dot[i].abs.distance(b.position).length();
	if(len <b.size || this.position.distance(b.position).length() < this.position.distance(this.dot[i].abs).length()){
		//if(dot[(i+1)%dot.length].distance(this.position).length() < dot[(i+dot.length-1)%dot.length].distance(this.position).length()) i = (i+1)%dot.length;
		//var t = ((dot[i].rad- dot[(i+dot.length-1)%dot.length]+ PI2)%PI2)/ (())
		//衝突時の接点の情報を求める
		var excess = b.size- len;
		var rad = Math.atan2(this.dot[i].abs.y- b.position.y, this.dot[i].abs.x- b.position.x);
		var rad2 = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x)
		//接点の座標をpで表す
		var p = new Point();
		var num = this.dot.length;
		p.x = this.dot[i].abs.x;//b.position.x + Math.cos(rad)* (b.size- excess*this.size/(this.size+b.size));
		p.y = this.dot[i].abs.y;//b.position.y + Math.sin(rad)* (b.size- excess*this.size/(this.size+b.size));
		var tangent1 = Math.atan2(this.dot[(i-2+num)%num].abs.y- this.dot[i].abs.y, this.dot[(i-2+num)%num].abs.x- this.dot[i].abs.x);
		var tangent2 = Math.atan2(this.dot[i].abs.y- this.dot[(i+2)%num].abs.y, this.dot[i].abs.x- this.dot[(i+2)%num].abs.x);
		var t = ((rad2- this.dot[(i-1+num)%num].rad+ PI2)% PI2)/ ((this.dot[(i+1)%num].rad- this.dot[(i-1+num)%num].rad+ PI2)%PI2);
		if(t>1) t = 1;
		else if(t<0) t = 0;
		var tangent = (((( tangent2- tangent1+ PI2)% PI2)* t) + tangent1)%PI2;
		this.contact[6+this.collisionCC].x =　p.x;
		this.contact[6+this.collisionCC].y = p.y;
		this.contact[6+this.collisionCC].rad = Math.atan2(p.y- this.position.y, p.x- this.position.x);
		this.contact[6+this.collisionCC].tangent = rad - Math.PI/2;
		this.contact[6+this.collisionCC].length = this.contact[6+this.collisionCC].distance(this.position).length();
		this.contact[6+this.collisionCC].excess = excess* this.size/ (this.size+b.size);
		this.contact[6+this.collisionCC].weight = b.weight;
		this.contact[6+this.collisionCC].num = b.num+"c"+"d"+"0";
		this.contact[6+this.collisionCC].position.x = b.position.x;
		this.contact[6+this.collisionCC].position.y = b.position.y;
		this.contact[6+this.collisionCC].velocity.x = b.velocity.x;
		this.contact[6+this.collisionCC].velocity.y = b.velocity.y;
		
		b.contact[b.collisionC].x = p.x;
		b.contact[b.collisionC].y = p.y;
		b.contact[b.collisionC].rad = rad;
		b.contact[b.collisionC].tangent = tangent;
		b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
		b.contact[b.collisionC].excess = excess* b.size/ (this.size+b.size);
		b.contact[b.collisionC].weight = this.weight
		b.contact[b.collisionC].num = this.num+"d"+"c"+"0";
		b.contact[b.collisionC].position.x = this.position.x;
		b.contact[b.collisionC].position.y = this.position.y;
		b.contact[b.collisionC].velocity.x = this.velocity.x;
		b.contact[b.collisionC].velocity.y = this.velocity.y;
		//console.log(p)
		console.log(this.num, b.num, i)
		console.log(tangent1, tangent2, tangent, t)
		console.log(this.dot[(i-1+num)%num].rad, this.dot[(i+1)%num].rad, rad2, rad-Math.PI)
		console.log(b.contact[b.collisionC].tangent, this.dot[(i+1)%num].abs, this.dot[(i-1+num)%num].abs)
		//if(b.contact[b.collisionC].tangent < -2) run = false;
		//最後にcollisionCをインクリメントして終了
		this.collisionCC++;
		b.collisionC++;
	}
}

Character.prototype.collision03 = function(b){
	for(i=0; i<b.collisionC+b.collisionCC; i++){
		if(this.contact[i].num.slice(0,-3) == b.num && this.contact[i].num.slice(-3,-2) != "w") return; 
	}
	//両方の歪円に対して、他方の中心座標に一番近いdotの位置を計算する。どの辺にありそうか推測した後、より近い点を計算する。i,jがそれぞれdot_numとなる
	var rad1 = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x);
	var i = (Math.ceil(rad1* this.dot.length/Math.PI/2)+ this.dot.length)% this.dot.length;
	if(this.dot[(i+1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
		i++;
		if(i>this.dot.length-1) i=0;
		while(this.dot[(i+1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i++
			if(i>this.dot.length-1) i=0;
		}
	}
	else{
		while(this.dot[(i+this.dot.length-1)%this.dot.length].abs.distance(b.position).length() < this.dot[i].abs.distance(b.position).length()){
			i--;
			if(i<0) i=this.dot.length-1;
		}
	}
	var rad2 = Math.atan2(this.position.y- b.position.y, this.position.x- b.position.x);
	var j = (Math.ceil(rad2* b.dot.length/Math.PI/2)+ b.dot.length)% b.dot.length;
	if(b.dot[(j+1)%b.dot.length].abs.distance(this.position).length() < b.dot[j].abs.distance(this.position).length()){
		j++;
		if(j>b.dot.length-1) j=0;
		while(b.dot[(j+1)%b.dot.length].abs.distance(this.position).length() < b.dot[j].abs.distance(this.position).length()){
			j++
			if(j>b.dot.length-1) j=0;
		}
	}
	else{
		while(b.dot[(j+b.dot.length-1)%b.dot.length].abs.distance(this.position).length() < b.dot[j].abs.distance(this.position).length()){
			j--;
			if(j<0) j=b.dot.length-1;
		}
	}
	var len1 = this.dot[i].abs.distance(this.position).length();
	var len2 = b.dot[j].abs.distance(b.position).length();
	console.log(i, j, len1, len2, this.position.distance(b.position).length())
	if(this.position.distance(b.position).length() < (len1 + len2)){
		//衝突時の接点の情報を求める
		var p = new Point();
		p.x = (this.size* this.dot[i].abs.x + b.size* b.dot[j].abs.x)/(this.size+ b.size);//b.position.x - (this.size* this.dot[i].rel.x + b.size* (b.dot[j].abs.x- this.position.x))/ (this.size+b.size);
		p.y = (this.size* this.dot[i].abs.y + b.size* b.dot[j].abs.y)/(this.size+ b.size);//b.position.y - (this.size* this.dot[i].rel.y + b.size* (b.dot[j].abs.y- this.position.y))/ (this.size+b.size);
		console.log(this.collisionC, this.collisionCC)
		console.log(b.collisionC, b.collisionCC)
		this.contact[6+this.collisionCC].x = p.x;
		this.contact[6+this.collisionCC].y = p.y;
		this.contact[6+this.collisionCC].rad = Math.atan2(p.y- this.position.y, p.x- this.position.x);
		this.contact[6+this.collisionCC].tangent = "NaN";
		this.contact[6+this.collisionCC].length = p.distance(this.position).length();
		this.contact[6+this.collisionCC].excess = "NaN";
		this.contact[6+this.collisionCC].weight = b.weight;
		this.contact[6+this.collisionCC].num = b.num+"d"+"d"+"0";
		this.contact[6+this.collisionCC].position.x = b.position.x;
		this.contact[6+this.collisionCC].position.y = b.position.y;
		this.contact[6+this.collisionCC].velocity.x = b.velocity.x;
		this.contact[6+this.collisionCC].velocity.y = b.velocity.y;
		
		b.contact[6+b.collisionCC].x = p.x;
		b.contact[6+b.collisionCC].y = p.y;
		b.contact[6+b.collisionCC].rad = Math.atan2(p.y- b.position.y, p.x- b.position.x);
		b.contact[6+b.collisionCC].excess = "NaN";
		b.contact[6+b.collisionCC].length = p.distance(b.position).length();
		b.contact[6+b.collisionCC].tangent = "NaN";
		b.contact[6+b.collisionCC].weight = this.weight;
		b.contact[6+b.collisionCC].num = this.num+"d"+"d"+"0";
		b.contact[6+b.collisionCC].position.x = this.position.x;
		b.contact[6+b.collisionCC].position.y = this.position.y;
		b.contact[6+b.collisionCC].velocity.x = this.velocity.x;
		b.contact[6+b.collisionCC].velocity.y = this.velocity.y;
		//最後にcollisionCをインクリメントして終了
		this.collisionCC++;
		b.collisionCC++;
	}
}
