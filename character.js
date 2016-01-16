//動体を定義する関数---------------------------------------------------------------------------------------------------------------


var Character = function(){
	//諸々の設定
	this.position = new Point();
	this.velocity = new Point();
	this.alive = false;
	this.color = 0;
	this.size = 0;
	this.weight = 0;
	this.distortionF = false;
	this.collisionC = 0;
	this.collisionCC = 0;
	this.touchF = false;
	this.firedC = 0;
	this.contact = new Array(12);
	for(i=0; i < this.contact.length; i++){
		this.contact[i] = new Point();
		this.contact[i].rad = 0;
		this.contact[i].excess = 0;
		this.contact[i].tangent = 0;
		this.contact[i].weight = 0;
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
	this.rad_gap = new Array(12);
	this.gap_number = new Array(12);
	this.touchArea = new Array(OBJECT_MAX_COUNT);
	for(i=0; i < this.touchArea.length; i++){
		this.touchArea[i] = new Point();
		this.touchArea[i].len = 0;
		this.touchArea[i].rad = 0;
		this.touchArea[i].num = 0;
	}
	this.ballCollisionF = new Array(BALL_MAX_COUNT);
	this.wallCollisionF = new Array(OBJECT_MAX_COUNT);
	for(i=0; i<this.ballCollisionF.length; i++){
		this.ballCollisionF[i] = false;
	}
	this.bezier = new Array(12);
	for(i=0; i<this.bezier.length; i++){
		this.bezier[i] = {}
		this.bezier[i].rad_gap = 0;
		this.bezier[i].gap_number = 0;
		this.bezier[i].midPoint = new Point();
		this.bezier[i].midTangent = 0;
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
Character.prototype.strokeDottedLine = function(){
	var space = 10;
	var dotted = Math.floor( (length + 0 + 11) / space );
	
	var p1x, p1y, p2x, p2y;

	ctx.beginPath();

	for(var i = 1; i < dotted / 2 - 1; i++){

		p1x = this.position.x + (length - 8 - space * 2 * i + this.size) * Math.cos(radian);
		p1y = this.position.y + (length - 8 - space * 2 * i + this.size) * -Math.sin(radian);
		p2x = this.position.x + (length - 8 - space * (2 * i + 1) + this.size) * Math.cos(radian);
		p2y = this.position.y + (length - 8 - space * (2 * i + 1) + this.size ) * -Math.sin(radian);

		ctx.moveTo(p1x, p1y);
		ctx.lineTo(p2x, p2y);
	}

	if(dotted % 2 == 0){
		ctx.moveTo(this.position.x + (length - 8 - space * (2 * i) + this.size) * Math.cos(radian), this.position.y + (length - 8 - space * (2 * i) + this.size) * -Math.sin(radian))
		ctx.lineTo(this.position.x + this.size * Math.cos(radian), this.position.y + this.size * -Math.sin(radian));
	}

	ctx.strokeStyle = DOTTED_LINE_COLOR;
	//ctx.lineCap = "round";
	ctx.lineWidth = 6;
	ctx.closePath();
	ctx.stroke();
};

//マウスを放した時に動作する関数
Character.prototype.shoot = function(b){
	this.size = 13;
	this.weight = this.size*this.size;
	this.velocity.x = length / 25 * Math.cos(radian);
	this.velocity.y = length / 25 * Math.sin(radian);
	this.position.x = b.position.x + (b.size + this.size) * Math.cos(radian) - this.velocity.x;
	this.position.y = b.position.y - (b.size + this.size) * Math.sin(radian) + this.velocity.y;
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
	this.velocity.y -= 0.2;
};


//速度を位置情報に変換
Character.prototype.move = function(){
	//速度の上限を設定
	var maxvel = 30;
	if(this.velocity.x >=  maxvel) this.velocity.x =  maxvel;
	if(this.velocity.x <= -maxvel) this.velocity.x = -maxvel;
	if(this.velocity.y >=  maxvel) this.velocity.y =  maxvel;
	if(this.velocity.y <= -maxvel) this.velocity.y = -maxvel;

	//速度を位置情報に変換
	this.position.x += this.velocity.x;
	this.position.y -= this.velocity.y;

};

Character.prototype.touchCheck = function(){
	var num = this.collisionC + this.collisionCC;
	var con = this.contact
	for(i=0; i<num-1; i++){
		for(j=i+1; j<num; j++){
		console.log(con[i].distance(con[j]).length(), this.size* 0.17)
			if(con[i].distance(con[j]).length() < this.size* 0.15){
				for(k=j; k<num-1; k++){
					this.contact[k].x = this.contact[k+1].x;
					this.contact[k].y = this.contact[k+1].y;
					this.contact[k].rad = this.contact[k+1].rad;
					this.contact[k].excess = this.contact[k+1].excess;
					this.contact[k].tangent = this.contact[k+1].tangent;
					this.contact[k].weight = this.contact[k+1].weight;
					this.contact[k].position.x = this.contact[k+1].position.x;
					this.contact[k].position.y = this.contact[k+1].position.y;
					this.contact[k].velocity.x = this.contact[k+1].velocity.x;
					this.contact[k].velocity.y = this.contact[k+1].velocity.y;
				}
				num--;
				//console.log(this.lastDistortion, this.distortionF)
				if(k < this.collisionC) this.collisionC--;
				else this.collisionCC--;
			}
		}
	}
}
Character.prototype.bound = function(){
	var num1 = 0;
	var num2 = this.collisionC+this.collisionCC;
	for(i=num1; i<num2; i++){
		//まずめり込んだ分の補正を行う
		var rad = this.contact[i].rad + Math.PI;
		var excess = this.contact[i].excess;
		this.position.x += excess* Math.cos(rad);
		this.position.y += excess* Math.sin(rad);
		//衝突後の速度を求める
		if(this.contact[i].weight == "NaN"){
			//相手が壁の場合。まずは速度を壁に対して水平、垂直な方向に分解する
			var velhx = (this.velocity.x * Math.sin(rad) - this.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(this.velocity.x * Math.sin(rad) - this.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = this.velocity.x - velhx;
			var velvy = this.velocity.y - velhy;
			velvx *= -e;
			velvy *= -e;
			this.velocity.x = velhx + velvx;
			this.velocity.y = velhy + velvy;
		}
		else{
			//相手がボールの場合
			var b = this.contact[i]
			var t;
			var vx =  (this.position.x - b.position.x);
			var vy = -(this.position.y - b.position.y);

			t = - ( vx * b.velocity.x + vy * b.velocity.y) / (vx * vx + vy * vy);
			var arx = b.velocity.x + vx * t;
			var ary = b.velocity.y + vy * t;

			t = - (-vy * b.velocity.x + vx * b.velocity.y) / (vx * vx + vy * vy);
			var amx = b.velocity.x - vy * t;
			var amy = b.velocity.y + vx * t;

			t = - ( vx * this.velocity.x + vy * this.velocity.y) / (vx * vx + vy * vy);
			var brx = this.velocity.x + vx * t;
			var bry = this.velocity.y + vy * t;

			t = - (-vy * this.velocity.x + vx * this.velocity.y) / (vx * vx + vy * vy);
			var bmx = this.velocity.x - vy * t;
			var bmy = this.velocity.y + vx * t;

			//反発係数の設定と重さの決定、衝突後の重心方向の値を求める
			var e1 = 0.9;
			var adx = (b.weight * amx + this.weight * bmx + bmx * e1 * this.weight - amx * e1 * this.weight) / (this.weight + b.weight);
			var bdx = -e1 * (bmx - amx) + adx;
			var ady = (b.weight * amy + this.weight * bmy + bmy * e1 * this.weight - amy * e1 * this.weight) / (this.weight + b.weight);
			var bdy = -e1 * (bmy - amy) + ady;
			//接戦方向速度と重心方向速度を足して衝突後の速度を求める
			//b.velocity.x = adx + arx;
			//b.velocity.y = ady + ary;
			this.velocity.x = bdx + brx;
			this.velocity.y = bdy + bry;
		}
		//console.log(this.velocity)
	}
}

Character.prototype.distortCheck = function(){
	
}

Character.prototype.distort = function(b){
	var i, j, k;
	var excessC =0;
	var con = this.contact;
	var dot = this.dot
	var bez = this.bezier;
	var num = this.collisionC+this.collisionCC;
	var PI2 = Math.PI*2;
	var PI_2 = Math.PI/2;
	//とりあえず各接点について速度は反転するようにしとく
	
	//まずは各接点についてexcessが一定値を超えているとカウントをインクリメントし、ついでに近い点があったら無視するようにする。
	for(i=0; i<num; i++){
		if(con[i].excess>=this.size*0.25) excessC++;
	}
	//カウントが一定数を超えていたらめり込みによって破裂する
	if(excessC >= num){
		this.alive = false;
		this.collisionC = 0;
		this.collisionCC= 0;
		var amount = Math.floor(Math.sqrt(this.size/3) + Math.random()*2);
		for(j=b.length-1; j>b.length-amount-1; j--){
			if(!b[j].alive){
				var v = new Point();
				var size = Math.sqrt(this.weight/amount) + Math.random()*3 -2;
				v.x = Math.sqrt(Math.abs(this.velocity.x/2))*Math.sign(this.velocity.x) +  Math.random()*10- 5;
				v.y = Math.sqrt(Math.abs(this.velocity.y/2))*Math.sign(this.velocity.y) +  Math.random()*12- 5;
				b[j].set(this.position, size, v, Math.ceil(Math.random()*2));
				b[j].touchF = false;
			}
		}
	}
	else{
		this.position.x = this.lastPosition.x;
		this.position.y = this.lastPosition.y;
		//各接点を中心からの角度が小さい順に並び返す
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
		//それぞれの接点間の角度を計算する。後曲線の変わり目がどこにあるのか計算する。ついでに中心座標が受けるべき大きさ、方向を計算する
		var power = new Point();
		var weight;
		for(i=0; i<num; i++){
			bez[i].rad_gap = (con[(i+1)%num].rad- con[i].rad + PI2)% (PI2);
			bez[i].gap_number = (Math.round(con[i].rad* dot.length/ PI2) + dot.length) % dot.length;
			con[i].length = this.position.distance(con[i]).length();
			con[i].excess = this.size- con[i].length;
			if(con[i].excess <=0) continue;
			//if(con[i].weight == "NaN") weight = 100;
			//else weight = con[i].weight;
			power.x += con[i].excess* con[i].excess* -Math.cos(con[i].tangent- PI_2);
			power.y += con[i].excess* con[i].excess* -Math.sin(con[i].tangent- PI_2);
		}
		this.position.x += power.x/ this.size;
		this.position.y += power.y/ this.size;
		/*console.log(power, con[0].excess* con[0].excess, -Math.cos(con[0].tangent- PI_2))
		console.log(power, con[1].excess* con[1].excess, -Math.cos(con[1].tangent- PI_2))
		console.log(con[0].excess, con[0].length, con[0])
		console.log(con[1].excess, con[1].length, con[1])*/
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
		//歪フラグを真にする
		this.distortionF = true;
		//各dotのrelとradを求める
		for(i=0; i<dot.length; i++){
			dot[i].rel.x = dot[i].abs.x - this.position.x;
			dot[i].rel.y = dot[i].abs.y - this.position.y;
			dot[i].rad = Math.atan2(dot[i].rel.y, dot[i].rel.x)
		}
	}
}

Character.prototype.draw = function(){
	//ボールの色に描写を合わせる
	switch(this.color){
		case 0:
			ctx.fillStyle = GREEN;
			break;
		
		case 1:
			ctx.fillStyle = BLUE;
			break;
		
		case 2:
			ctx.fillStyle = RED;
			break;
		
		default:
			ctx.fillStyle = GRAY;
	}
	if(this.lastDistortion || this.distortionF){
		//歪円だった場合
		var dot = this.dot
		ctx.beginPath();
		ctx.moveTo(dot[0].abs.x, dot[0].abs.y);
		for(i=1; i<dot.length; i++){
			ctx.lineTo(dot[i].abs.x, dot[i].abs.y);
		}
		ctx.closePath();
		ctx.fill();
	}
	else{
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI, true)
		ctx.fill();
	}
	
}

//二体の物体を結合する========================================================================================================
//正円と正円で衝突判定を取る
Character.prototype.absorption01 = function(b){
	if(b.position.distance(this.position).length() < this.size + b.size){
		//吸収後の重さと半径、重心と速度を求める
		var weight = this.weight + b.weight;
		this.position.x = (this.weight* this.position.x + b.weight* b.position.x)/ weight;
		this.position.y = (this.weight* this.position.y + b.weight* b.position.y)/ weight;
		this.velocity.x = (this.weight* this.velocity.x + b.weight* b.velocity.x)/ weight;
		this.velocity.y = (this.weight* this.velocity.y + b.weight* b.velocity.y)/ weight;
		this.weight = weight;
		this.size = Math.sqrt(weight);
		//遅い番号のaliveを偽にし、諸々の情報をリセットする
		b.alive = false;
		b.touchF = false;
		b.collisionC = 0;
		b.collisionCC = 0;
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
			b.alive = false;
			b.touchF = false;
			b.collisionC = 0;
			b.collisionCC = 0;
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
				ball[i].dot[j].abs.x = ball[i].position.x+ ball[i].dot[j].rel.x;
				ball[i].dot[j].abs.y = ball[i].position.y+ ball[i].dot[j].rel.y;
			}
			//遅い番号のaliveを偽にし、諸々の情報をリセットする
			this.alive = false;
			this.touchF = false;
			this.collisionC = 0;
			this.collisionCC = 0;
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
		//遅い番号のaliveを偽にし、諸々の情報をリセットする
		b.alive = false;
		b.touchF = false;
		b.collisionC = 0;
		b.collisionCC = 0;
	}
}

Character.prototype.collision01 = function(b){
	if(b.position.distance(this.position).length() < this.size + b.size){
		//衝突時の接点の情報を求める
		var rad = Math.atan2(b.position.y- this.position.y, b.position.x- this.position.x);
		var len = b.position.distance(this.position).length();
		var len1 = (len*len + this.size*this.size - b.size*b.size)/ (2*len);
		var len2 = (len*len + b.size*b.size - this.size*this.size)/ (2*len);
		
		this.contact[this.collisionC].rad = rad;
		this.contact[this.collisionC].tangent = rad + Math.PI/2;
		this.contact[this.collisionC].excess = this.size - len1;
		this.contact[this.collisionC].x = this.position.x + Math.cos(rad)* len1;
		this.contact[this.collisionC].y = this.position.y + Math.sin(rad)* len1;
		this.contact[this.collisionC].length = this.contact[this.collisionC].distance(this.position).length();
		this.contact[this.collisionC].weight = b.weight;
		this.contact[this.collisionC].position.x = b.position.x;
		this.contact[this.collisionC].position.y = b.position.y;
		this.contact[this.collisionC].velocity.x = b.velocity.x;
		this.contact[this.collisionC].velocity.y = b.velocity.y;
		
		rad = rad+ Math.PI;
		b.contact[b.collisionC].rad = rad;
		b.contact[b.collisionC].tangent = rad + Math.PI/2;
		b.contact[b.collisionC].excess = b.size - len2;
		b.contact[b.collisionC].x = b.position.x + Math.cos(rad)* len2;
		b.contact[b.collisionC].y = b.position.y + Math.sin(rad)* len2;
		b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
		b.contact[b.collisionC].weight = this.weight;
		b.contact[b.collisionC].position.x = this.position.x;
		b.contact[b.collisionC].position.y = this.position.y;
		b.contact[b.collisionC].velocity.x = this.velocity.x;
		b.contact[b.collisionC].velocity.y = this.velocity.y;
		//最後にcollisionCをインクリメントして終了
		this.collisionC++;
		b.collisionC++;
	}
}

Character.prototype.collision02 = function(b, f){
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
		//衝突時の接点の情報を求める
		var excess = b.size- len;
		var rad = Math.atan2(this.dot[i].abs.y- b.position.y, this.dot[i].abs.x- b.position.x);
		//接点の座標をpで表す
		var p = new Point();
		p.x = b.position.x + Math.cos(rad)* (b.size- excess*this.size/(this.size+b.size));
		p.y = b.position.y + Math.sin(rad)* (b.size- excess*this.size/(this.size+b.size));
		
		this.contact[this.collisionC].rad = Math.atan2(p.y- this.position.y, p.x- this.position.x);
		this.contact[this.collisionC].tangent = rad - Math.PI/2;
		this.contact[this.collisionC].excess = excess* this.size/ (this.size+b.size);
		this.contact[this.collisionC].x =　p.x;
		this.contact[this.collisionC].y = p.y;
		this.contact[this.collisionC].length = this.contact[this.collisionC].distance(this.position).length();
		this.contact[this.collisionC].weight = b.weight;
		this.contact[this.collisionC].position.x = b.position.x;
		this.contact[this.collisionC].position.y = b.position.y;
		this.contact[this.collisionC].velocity.x = b.velocity.x;
		this.contact[this.collisionC].velocity.y = b.velocity.y;
		
		b.contact[b.collisionC].rad = rad;
		b.contact[b.collisionC].tangent = rad + Math.PI/2;
		b.contact[b.collisionC].excess = excess* b.size/ (this.size+b.size);
		b.contact[b.collisionC].x = p.x;
		b.contact[b.collisionC].y = p.y;
		b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
		b.contact[b.collisionC].weight = this.weight
		b.contact[b.collisionC].position.x = this.position.x;
		b.contact[b.collisionC].position.y = this.position.y;
		b.contact[b.collisionC].velocity.x = this.velocity.x;
		b.contact[b.collisionC].velocity.y = this.velocity.y;
		//最後にcollisionCをインクリメントして終了
		this.collisionC++;
		b.collisionC++;
	}
}

Character.prototype.collision03 = function(b){
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
	if(this.position.distance(b.position).length() < (len1 + len2)* 0.95){
		//衝突時の接点の情報を求める
		var p = new Point();
		p.x = b.position.x + (this.size* this.dot[i].rel.x + b.size* (b.dot[j].abs.x- this.position.x))/ (this.size+b.size);
		p.y = b.position.y + (this.size* this.dot[i].rel.y + b.size* (b.dot[j].abs.y- this.position.y))/ (this.size+b.size);
		
		this.contact[this.collisionC].rad = Math.atan2(p.y- this.position.y);
		this.contact[this.collisionC].tangent = //"NaN";
		this.contact[this.collisionC].excess = "//NaN";
		this.contact[this.collisionC].x = p.x;
		this.contact[this.collisionC].y = p.y;
		this.contact[this.collisionC].length = this.contact[this.collisionC].distance(this.position).length();
		this.contact[this.collisionC].weight = b.weight;
		this.contact[this.collisionC].position.x = b.position.x;
		this.contact[this.collisionC].position.y = b.position.y;
		this.contact[this.collisionC].velocity.x = b.velocity.x;
		this.contact[this.collisionC].velocity.y = b.velocity.y;
		
		b.contact[b.collisionC].rad = Math.atan2(p.x- this.position.x);
		b.contact[b.collisionC].tangent = "NaN";
		b.contact[b.collisionC].excess = "NaN";
		b.contact[b.collisionC].x = p.x
		b.contact[b.collisionC].y = p.y
		b.contact[b.collisionC].length = b.contact[b.collisionC].distance(b.position).length();
		b.contact[b.collisionC].weight = this.weight;
		b.contact[b.collisionC].position.x = this.position.x;
		b.contact[b.collisionC].position.y = this.position.y;
		b.contact[b.collisionC].velocity.x = this.velocity.x;
		b.contact[b.collisionC].velocity.y = this.velocity.y;
		//最後にcollisionCをインクリメントして終了
		this.collisionC++;
		b.collisionC++;
	}
}
