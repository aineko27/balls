//壁を定義する関数---------------------------------------------------------------------------------------------------------------
var Object = function(){
	//諸々の設定
	this.alive = false;
	this.color = 0;
	this.rad   = 0;

	this.vechx = 0;
	this.vechy = 0;
	this.vecvx = 0;
	this.vecvy = 0;
};

Object.prototype.set = function(tlx, tly, wid, hei, rad1, rad2, c){
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

	this.wid = wid;
	this.hei = hei;
	this.rad1 = rad1;
	this.rad2 = rad2;
	this.color = c;
	this.alive = true;
};

//壁の描写
Object.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.tlx, this.tly);
	ctx.lineTo(this.trx, this.try);
	ctx.lineTo(this.brx, this.bry);
	ctx.lineTo(this.blx, this.bly);
	ctx.closePath();
	ctx.fill();
};

//壁と正円の衝突判定
Object.prototype.collision01 = function(b, j){
		//円がどの辺あるいはどの角と衝突するかの判定
		if(Math.cos(this.rad1)* (b.position.y-this.tly) - Math.sin(this.rad1)* (b.position.x-this.tlx) < 0){
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.tlx;
				b.touchArea[j].y = this.tly;
				b.touchArea[j].num = 1;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.trx;
				b.touchArea[j].y = this.try;
				b.touchArea[j].num = 1;
			}
			else{
				b.touchArea[j].x = this.tlx;
				b.touchArea[j].y = this.tly;
				b.touchArea[j].rad = this.rad1;
				b.touchArea[j].num = 2;
			}
		}
		else if(Math.cos(this.rad1+Math.PI)* (b.position.y-this.bry) - Math.sin(this.rad1+Math.PI)* (b.position.x-this.brx) < 0){
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.blx;
				b.touchArea[j].y = this.bly;
				b.touchArea[j].num = 1;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.brx;
				b.touchArea[j].y = this.bry;
				b.touchArea[j].num = 1;
			}
			else{
				b.touchArea[j].x = this.brx;
				b.touchArea[j].y = this.bry;
				b.touchArea[j].rad = this.rad1 + Math.PI;
				b.touchArea[j].num = 2;
			}
		}
		else{
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.blx;
				b.touchArea[j].y = this.bly;
				b.touchArea[j].rad = this.rad2;
				b.touchArea[j].num = 2;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.trx;
				b.touchArea[j].y = this.try;
				b.touchArea[j].rad = this.rad2 + Math.PI
				b.touchArea[j].num = 2;
			}
			else{
				b.touchArea[j].num = 3;
			}
		}
	
	//得られた判別から当り判定を取っていく
	if(b.touchArea[j].num < 2){
		//この場合は角に当たる
		b.touchArea[j].len = b.position.distance(b.touchArea[j]).length();
		if(b.touchArea[j].len <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.atan2(b.position.y - b.touchArea[j].y + b.velocity.y, -b.position.x + b.touchArea[j].x - b.velocity.x);
			var velhx = 　(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;

			//反発後の計算
			/*var excess = b.size - b.touchArea[j].len;   
			b.position.x += excess * -Math.cos(rad);
			b.position.y += excess * Math.sin(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;*/
			
			b.contact[b.collisionC].x = b.touchArea[j].x;
			b.contact[b.collisionC].y = b.touchArea[j].y;
			b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
			b.contact[b.collisionC].rad = Math.atan2(b.touchArea[j].y- b.position.y, b.touchArea[j].x- b.position.x);
			b.contact[b.collisionC].tangent = b.contact[b.collisionC].rad+ Math.PI/2;
			b.contact[b.collisionC].excess = b.size- b.touchArea[j].distance(b.position).length();
			b.contact[b.collisionC].weight = "NaN";
			b.collisionC++;
		}
		else if(b.touchArea[j].len <= b.size*1.5) return;
	}
	else if(b.touchArea[j].num < 3){
		//この場合は辺に当たる
		var drop = -Math.cos(b.touchArea[j].rad)* (b.position.y - b.touchArea[j].y) + (b.position.x - b.touchArea[j].x)* Math.sin(b.touchArea[j].rad)
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(b.touchArea[j].rad) + b.velocity.y * Math.sin(-b.touchArea[j].rad)) * Math.cos(b.touchArea[j].rad);
			var velhy = (b.velocity.x * Math.cos(b.touchArea[j].rad) + b.velocity.y * Math.sin(-b.touchArea[j].rad)) * Math.sin(-b.touchArea[j].rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(b.touchArea[j].rad);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(b.touchArea[j].rad);
			b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
			b.contact[b.collisionC].rad = b.touchArea[j].rad+ Math.PI/2;
			b.contact[b.collisionC].tangent = b.touchArea[j].rad + Math.PI;
			b.contact[b.collisionC].excess = b.size- drop;
			b.contact[b.collisionC].weight = "NaN";
			b.collisionC++;
			
			/*var excess = b.size - drop;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess *  Math.sin(b.touchArea[j].rad);
			b.position.y += excess * -Math.cos(b.touchArea[j].rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;*/
		}
		else if(drop <= b.size*1.5) return;
	}
	else{
		console.log("正円が内部に入っている")
	}
	b.touchArea[j].num = 4;
}

//壁と歪円の衝突判定
Object.prototype.collision02 = function(b, j){
	if(b.touchArea[j].num == 4) return;
	if(b.lastDistortion){
		//円がどの辺あるいはどの角と衝突するかの判定
		if(Math.cos(this.rad1)* (b.position.y-this.tly) - Math.sin(this.rad1)* (b.position.x-this.tlx) < 0){
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.tlx;
				b.touchArea[j].y = this.tly;
				b.touchArea[j].num = 1;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.trx;
				b.touchArea[j].y = this.try;
				b.touchArea[j].num = 1;
			}
			else{
				b.touchArea[j].x = this.tlx;
				b.touchArea[j].y = this.tly;
				b.touchArea[j].rad = this.rad1;
				b.touchArea[j].num = 2;
			}
		}
		else if(Math.cos(this.rad1+Math.PI)* (b.position.y-this.bry) - Math.sin(this.rad1+Math.PI)* (b.position.x-this.brx) < 0){
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.blx;
				b.touchArea[j].y = this.bly;
				b.touchArea[j].num = 1;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.brx;
				b.touchArea[j].y = this.bry;
				b.touchArea[j].num = 1;
			}
			else{
				b.touchArea[j].x = this.brx;
				b.touchArea[j].y = this.bry;
				b.touchArea[j].rad = this.rad1 + Math.PI;
				b.touchArea[j].num = 2;
			}
		}
		else{
			if(Math.cos(this.rad2)* (b.position.y-this.bly) - Math.sin(this.rad2)* (b.position.x-this.blx) < 0){
				b.touchArea[j].x = this.blx;
				b.touchArea[j].y = this.bly;
				b.touchArea[j].rad = this.rad2;
				b.touchArea[j].num = 2;
			}
			else if(Math.cos(this.rad2+Math.PI)* (b.position.y-this.try) - Math.sin(this.rad2+Math.PI)* (b.position.x-this.trx) < 0){
				b.touchArea[j].x = this.trx;
				b.touchArea[j].y = this.try;
				b.touchArea[j].rad = this.rad2 + Math.PI
				b.touchArea[j].num = 2;
			}
			else{
				b.touchArea[j].num = 3;
			}
		}
	}
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
			b.contact[b.collisionC+ b.collisionCC].x = b.touchArea[j].x;
			b.contact[b.collisionC+ b.collisionCC].y = b.touchArea[j].y;
			b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
			b.contact[b.collisionC+ b.collisionCC].rad = rad;
			b.contact[b.collisionC+ b.collisionCC].tangent = (1-t)*tangent1 + t*tangent2; 
			b.contact[b.collisionC+ b.collisionCC].excess = -excess;
			b.contact[b.collisionC].weight = "NaN";
			b.collisionCC++;
		}
		return;
	}
	//線とぶつかるかの判定
	else if(b.touchArea[j].num < 3){
		var rad = b.touchArea[j].rad
		var dot_number = (Math.round((rad + Math.PI/2)*b.dot.length/Math.PI/2) + b.dot.length) % b.dot.length;
		//壁に垂直な向きへの長さが一番大きい点を調べる
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
		console.log(b.position)
		console.log(b.touchArea[j], rad)
		console.log(dot_number)
		console.log(b.dot[dot_number].abs)
		if(Math.cos(rad)* (b.dot[dot_number].abs.y- b.touchArea[j].y)>= Math.sin(rad)* (b.dot[dot_number].abs.x- b.touchArea[j].x)){
			//接点の計算
			var a1 = (b.dot[dot_number].abs.y- b.position.y)/ (b.dot[dot_number].abs.x- b.position.x);
			var a3 = Math.tan(rad);
			b.contact[b.collisionC+ b.collisionCC].x = (a1*b.position.x- b.position.y- a3*b.touchArea[j].x+ b.touchArea[j].y)/ (a1-a3);
			b.contact[b.collisionC+ b.collisionCC].y = a1* (b.contact[b.collisionC+ b.collisionCC].x- b.position.x)+ b.position.y;
			//var div = Math.sin(rad)* b.dot[dot_number].rel.x- Math.cos(rad)* b.dot[dot_number].rel.y;
			//b.contact[b.collisionC+ b.collisionCC].x = ((b.position.y* b.dot[dot_number].abs.x- b.position.x* b.dot[dot_number].abs.y)* Math.cos(rad)- (b.touchArea[j].y* (b.touchArea[j].x+ Math.cos(rad))- b.touchArea[j].x* (b.touchArea[j].y+ Math.sin(rad)))* b.dot[dot_number].rel.x)/ div;
			//b.contact[b.collisionC+ b.collisionCC].y = ((b.position.y* b.dot[dot_number].abs.x- b.position.x* b.dot[dot_number].abs.y)* Math.sin(rad)- (b.touchArea[j].y* (b.touchArea[j].x+ Math.cos(rad))- b.touchArea[j].x* (b.touchArea[j].y+ Math.sin(rad)))* b.dot[dot_number].rel.y)/ div;
			b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
			b.contact[b.collisionC+ b.collisionCC].rad = rad + Math.PI/2; 
			b.contact[b.collisionC+ b.collisionCC].tangent = rad + Math.PI;
			b.contact[b.collisionC+ b.collisionCC].excess = Math.cos(rad)* (b.dot[dot_number].abs.y- b.contact[b.collisionC+ b.collisionCC].y)- Math.sin(rad)* (b.dot[dot_number].abs.x- b.contact[b.collisionC+ b.collisionCC].x);
			b.contact[b.collisionC].weight = "NaN";
			b.collisionCC++;
			
		}
		return;
	}
	else{
	
	}
}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	