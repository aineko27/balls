﻿//動体を定義する関数---------------------------------------------------------------------------------------------------------------


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
	this.contact = new Array(8);
	for(i=0; i < this.contact.length; i++){
		this.contact[i] = new Point();
		this.contact[i].rad = 0;
		this.contact[i].excess = 0;
		this.contact[i].tangent = 0;
	}
	this.dot = new Array(24)
	for(i=0; i < this.dot.length; i++){
		this.dot[i] = new Point();
	}
	this.lastPosition = new Point();
	this.rad_gap = new Array(8);
	this.gap_number = new Array(8);
	this.touchArea = new Array(OBJECT_MAX_COUNT);
	for(i=0; i < OBJECT_MAX_COUNT; i++){
		this.touchArea[i] = new Point();
		this.touchArea[i].len = 0;
		this.touchArea[i].rad = 0;
		this.touchArea[i].num = 0;
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

//球の描写をする関数
/*Character.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.dot[0].x, this.dot[0].y);
	for(i=1; i<this.dot.length; i++){
		ctx.lineTo(this.dot[i].x, this.dot[i].y);
	}
	ctx.closePath();
	ctx.fill();
}*/



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
		ctx.closePath();
	}

	if(dotted % 2 == 0){
		ctx.moveTo(this.position.x + (length - 8 - space * (2 * i) + this.size) * Math.cos(radian), this.position.y + (length - 8 - space * (2 * i) + this.size) * -Math.sin(radian))
		ctx.lineTo(this.position.x + this.size * Math.cos(radian), this.position.y + this.size * -Math.sin(radian));
		ctx.closePath();
	}

	ctx.strokeStyle = DOTTED_LINE_COLOR;
	ctx.lineCap = "round";
	ctx.lineWidth = 4;
	ctx.stroke();
};

//マウスを放した時に動作する関数
Character.prototype.shoot = function(b){
	this.size = 13;
	this.weight = this.size*this.size;
	this.velocity.x = length / 40 * Math.cos(radian);
	this.velocity.y = length / 40 * Math.sin(radian);
	this.position.x = b.position.x + (b.size + this.size) * Math.cos(radian) - this.velocity.x;
	this.position.y = b.position.y - (b.size + this.size) * Math.sin(radian) + this.velocity.y;
	this.alive = true;
	this.touchF = true;
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
	var maxvel = 20;
	if(this.velocity.x >=  maxvel) this.velocity.x =  maxvel;
	if(this.velocity.x <= -maxvel) this.velocity.x = -maxvel;
	if(this.velocity.y >=  maxvel) this.velocity.y =  maxvel;
	if(this.velocity.y <= -maxvel) this.velocity.y = -maxvel;

	//速度を位置情報に変換
	this.position.x += this.velocity.x;
	this.position.y -= this.velocity.y;

	//位置情報の上限を設定
	//if(this.position.y >= screenCanvas.height - 15 - this.size) this.position.y = screenCanvas.height - 15 - this.size;
	//if(this.position.x <= this.size ) this.position.x = this.size;
	//if(this.position.x >= screenCanvas.width - this.size) this.position.x = screenCanvas.width - this.size;
};


//物体間の衝突においてめり込んだ分の補正を行う
Character.prototype.positionCorrect = function(b){
	//物体二点間の差を表すベクトル、距離、めり込んだ長さをを求める
	var vx = b.position.x - this.position.x;
	var vy = b.position.y - this.position.y;
	var len = Math.sqrt(vx * vx + vy * vy);
	var excess = (this.size + b.size) - len;
	
	//接点の情報を調べる
	var len1 = (len*len + this.size*this.size - b.size*b.size)/ (2*len);
	var len2 = (len*len + b.size*b.size - this.size*this.size)/ (2*len);
	
	this.contact[this.collisionC].rad =Math.atan2(vy, vx); 
	this.contact[this.collisionC].tangent = this.contact[this.collisionC].rad+ Math.PI/2;
	this.contact[this.collisionC].excess = this.size - len1;
	this.contact[this.collisionC].x = this.position.x + Math.cos(this.contact[this.collisionC].rad)*len1;
	this.contact[this.collisionC].y = this.position.y + Math.sin(this.contact[this.collisionC].rad)*len1;
	
	b.contact[b.collisionC].rad = Math.atan2(vy, vx) + Math.PI;
	b.contact[b.collisionC].tangent = b.contact[b.collisionC].rad + Math.PI/2
	b.contact[b.collisionC].excess = b.size - len2;
	b.contact[b.collisionC].x = b.position.x + Math.cos(b.contact[b.collisionC].rad)*len2;
	b.contact[b.collisionC].y = b.position.y + Math.sin(b.contact[b.collisionC].rad)*len2;
	this.collisionC++;
	b.collisionC++;

	//ベクトルの正規化を行う、長さが0以下の場合はエラーを打ち出してゲームを止める
	if(len > 0){
		len = 1 / len;
		vx *= len;
		vy *= len;
	}
	else console.log("Character.positionCorrection ERROR");

	//めり込んだ分を押し出すように補正する
	excess /= this.size + b.size;
	b.position.x += vx * excess * this.size;
	b.position.y += vy * excess * this.size;
	this.position.x -= vx * excess * b.size;
	this.position.y -= vy * excess * b.size;
	
};


//物体間の衝突後の速度をそれぞれ求める
Character.prototype.collisionCalculate = function(b){
	//それぞれの速度を重心方向(mx,my)と接戦方向(rx,ry)に分解する
	var t;
	var vx =  (b.position.x - this.position.x);
	var vy = -(b.position.y - this.position.y);

	t = - ( vx * this.velocity.x + vy * this.velocity.y) / (vx * vx + vy * vy);
	var arx = this.velocity.x + vx * t;
	var ary = this.velocity.y + vy * t;

	t = - (-vy * this.velocity.x + vx * this.velocity.y) / (vx * vx + vy * vy);
	var amx = this.velocity.x - vy * t;
	var amy = this.velocity.y + vx * t;

	t = - ( vx * b.velocity.x + vy * b.velocity.y) / (vx * vx + vy * vy);
	var brx = b.velocity.x + vx * t;
	var bry = b.velocity.y + vy * t;

	t = - (-vy * b.velocity.x + vx * b.velocity.y) / (vx * vx + vy * vy);
	var bmx = b.velocity.x - vy * t;
	var bmy = b.velocity.y + vx * t;

	//反発係数の設定と重さの決定、衝突後の重心方向の値を求める
	var e = 0.9;
	var adx = (this.weight * amx + b.weight * bmx + bmx * e * b.weight - amx * e * b.weight) / (this.weight + b.weight);
	var bdx = -e * (bmx - amx) + adx;
	var ady = (this.weight * amx + b.weight * bmy + bmy * e * b.weight - amy * e * b.weight) / (this.weight + b.weight);
	var bdy = -e * (bmy - amy) + ady;

	//接戦方向速度と重心方向速度を足して衝突後の速度を求める
	this.velocity.x = adx + arx;
	this.velocity.y = ady + ary;
	b.velocity.x = bdx + brx;
	b.velocity.y = bdy + bry;
};

//二体の物体を結合する
Character.prototype.absorptionCalculate = function(b){
	//二体間の重心を求める
	var cp = new Point();
	cp.x = (this.weight * this.position.x + b.weight * b.position.x) / (this.weight + b.weight);
	cp.y = (this.weight * this.position.y + b.weight * b.position.y) / (this.weight + b.weight);

	//吸収後の速度を求める
	var cv = new Point();
	cv.x = (this.weight * this.velocity.x + b.weight * b.velocity.x) / (this.weight + b.weight);
	cv.y = (this.weight * this.velocity.y + b.weight * b.velocity.y) / (this.weight + b.weight);

	//古いほうのボールのaliveフラグを偽にし、位置情報と速度、サイズ、質量を更新する
	this.alive = false;
	b.position.x = cp.x;
	b.position.y = cp.y;
	b.velocity.x = cv.x;
	b.velocity.y = cv.y;
	b.weight = b.weight + this.weight;
	b.size = Math.sqrt(b.weight);

};