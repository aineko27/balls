//壁を定義する関数---------------------------------------------------------------------------------------------------------------
var Object = function(){
	//諸々の設定
	this.area  = new Area();
	this.alive = false;
	this.color = 0;
	this.rad   = 0

	this.vechx = 0;
	this.vechy = 0;
	this.vecvx = 0;
	this.vecvy = 0;
}

Object.prototype.set = function(tlx, tly, wid, hei, rad, c){
	//水平方向の幅ベクトル(vech)の値と、垂直方向の幅ベクトル(vecv)の値の計算
	this.vechx =  wid * Math.cos(rad);
	this.vechy = -wid * Math.sin(rad);
	this.vecvx =  hei * Math.sin(rad);
	this.vecvy =  hei * Math.cos(rad);

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
	this.rad = rad;
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
};

//壁とボールの衝突判定
Object.prototype.collision = function(b){
	//条件式１　内積どうしの積がマイナスであること
	var con = new Point();
	for(i = 0; i <= 3; i++){
		switch(i){
			case 0:		
			var vecax = b.position.x - this.tlx;
			var vecay = b.position.y - this.tly;
			var vecbx = b.position.x - this.trx;
			var vecby = b.position.y - this.try;
			var vecox = this.vechx;
			var vecoy = this.vechy;
			var rad   = this.rad;
			var len   = this.wid;
			   con.x = this.tlx;
			   con.y = this.tly;
			break;

			case 1:		
			var vecax = b.position.x - this.trx;
			var vecay = b.position.y - this.try;
			var vecbx = b.position.x - this.brx;
			var vecby = b.position.y - this.bry;
			var vecox = this.vecvx;
			var vecoy = this.vecvy;
			var rad   = this.rad - Math.PI / 2;
			var len   = this.hei;
			    con.x = this.trx;
			    con.y = this.try;
			break;

			case 2:		
			var vecax = b.position.x - this.brx;
			var vecay = b.position.y - this.bry;
			var vecbx = b.position.x - this.blx;
			var vecby = b.position.y - this.bly;
			var vecox = -this.vechx;
			var vecoy = -this.vechy;
			var rad   = this.rad + Math.PI;
			var len   = this.wid;
			    con.x = this.brx;
			    con.y = this.bry;
			break;

			case 3:		
			var vecax = b.position.x - this.blx;
			var vecay = b.position.y - this.bly;
			var vecbx = b.position.x - this.tlx;
			var vecby = b.position.y - this.tly;
			var vecox = -this.vecvx;
			var vecoy = -this.vecvy;
			var rad   = this.rad + Math.PI / 2;
			var len   = this.hei;
			    con.x = this.blx;
			    con.y = this.bly;
			break;
		}

		//条件式１、ボールからを降ろした垂線が半径より小さい
		var c1 = Math.abs(vecox * vecay - vecoy * vecax) / len;

		//条件式２、内積どうしの積が0より小さい
		var c2 = (vecax * vecox + vecay * vecoy) * (vecbx * vecox + vecby * vecoy);

		//線分と球の当り判定
		if(c1 <= b.size && c2 <= 0) {
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.cos(rad);
			var velhy = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.sin(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			var excess = b.size - c1;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess) + 0.52;
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess) + 0.52;
			b.position.x += excess * -Math.sin(rad);
			b.position.y += excess * -Math.cos(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
		
		//角と球の当り判定
		var l = b.position.distance(con).length();
		if(l <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.PI + Math.atan2(vecax,vecay);
			var velhx = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.cos(rad);
			var velhy = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.sin(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			var velvy = b.velocity.y - velhy;

			//反発後の計算
			var excess = b.size - l;   
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess) + 0.52;
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess) + 0.52;
			b.position.x += excess * -Math.sin(rad);
			b.position.y += excess * -Math.cos(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
	}
};































