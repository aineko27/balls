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
	this.vechx =  wid * Math.cos(rad1);
	this.vechy = -wid * Math.sin(rad1);
	this.vecvx =  hei * Math.cos(rad2);
	this.vecvy = -hei * Math.sin(rad2);

	//四隅の座標の取得
	this.tlx = tlx;
	this.tly = tly;
	this.trx = tlx + this.vechx;
	this.try = tly + this.vechy;
	this.blx = tlx + this.vecvx;
	this.bly = tly + this.vecvy;
	this.brx = tlx + this.vechx + this.vecvx;
	this.bry = tly + this.vechy + this.vecvy;

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

//壁とボールの衝突判定
Object.prototype.collision = function(b){
	//線分と球の当り判定
	for(i = 0; i <= 3; i++){
		switch(i){
			case 0:	
			var vecax = b.position.x - this.tlx;
			var vecay = b.position.y - this.tly;
			var vecbx = b.position.x - this.trx;
			var vecby = b.position.y - this.try;
			var vecox = this.vechx;
			var vecoy = this.vechy;
			var rad   = this.rad1;
			var len   = this.wid;
			break;

			case 1:	
			var vecax = b.position.x - this.trx;
			var vecay = b.position.y - this.try;
			var vecbx = b.position.x - this.brx;
			var vecby = b.position.y - this.bry;
			var vecox = this.vecvx;
			var vecoy = this.vecvy;
			var rad   = this.rad2;
			var len   = this.hei;
			break;

			case 2:	
			var vecax = b.position.x - this.brx;
			var vecay = b.position.y - this.bry;
			var vecbx = b.position.x - this.blx;
			var vecby = b.position.y - this.bly;
			var vecox = -this.vechx;
			var vecoy = -this.vechy;
			var rad   = this.rad1 + Math.PI;
			var len   = this.wid;
			break;

			case 3:	
			var vecax = b.position.x - this.blx;
			var vecay = b.position.y - this.bly;
			var vecbx = b.position.x - this.tlx;
			var vecby = b.position.y - this.tly;
			var vecox = -this.vecvx;
			var vecoy = -this.vecvy;
			var rad   = this.rad2 + Math.PI;
			var len   = this.hei;
			break;
		}

		//条件式１、ボールからを降ろした垂線が半径より小さい
		var c1 = Math.abs(vecox * vecay - vecoy * vecax) / len;

		//条件式２、内積どうしの積が0より小さい
		var c2 = (vecax * vecox + vecay * vecoy) * (vecbx * vecox + vecby * vecoy);

		//条件式３、壁に対して速度ベクトルが近づく方向である
		var c3 = (b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad))

		if(c1 <= b.size && c2 <= 0 /*&& c3 > 0*/) {
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.cos(rad);
			var velhy = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.sin(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.collisionC++;
			for(i=0; i <= 7; i++){
				if(!b.contact[i].x){
					b.contact[i].x = b.position.x + c1*Math.sin(rad);
					b.contact[i].y = b.position.y + c1*Math.cos(rad);
					b.contact[i].tangent = -rad + Math.PI;
					break;
				}
			}
			var excess = b.size - c1;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess * -Math.sin(rad);
			b.position.y += excess * -Math.cos(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
			return;
		}
	}

	//角と球の当り判定
	var con = new Point();
	for(i = 0; i <= 3; i++){
		switch(i){
			case 0:	
			var vecax = b.position.x - this.tlx;
			var vecay = b.position.y - this.tly;
			   con.x = this.tlx;
			   con.y = this.tly;
			break;

			case 1:	
			var vecax = b.position.x - this.trx;
			var vecay = b.position.y - this.try;
			    con.x = this.trx;
			    con.y = this.try;
			break;

			case 2:	
			var vecax = b.position.x - this.brx;
			var vecay = b.position.y - this.bry;
			    con.x = this.brx;
			    con.y = this.bry;
			break;

			case 3:	
			var vecax = b.position.x - this.blx;
			var vecay = b.position.y - this.bly;
			    con.x = this.blx;
			    con.y = this.bly;
			break;
		}

		var l = b.position.distance(con).length();
		if(l <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.atan2(vecay + b.velocity.y, -vecax - b.velocity.x);
			var velhx = 　(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;

			//反発後の計算
			var excess = b.size - l;   
			b.position.x += excess * -Math.cos(rad);
			b.position.y += excess * Math.sin(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
			b.collisionC++;
			for(i=0; i <= 7; i++){
				if(!b.contact[i].x){
					b.contact[i].x = con.x;
					b.contact[i].y = con.y;
					b.contact[i].tangent = "NaN"
					break;
				}
			}
			break;
		}
	}
};