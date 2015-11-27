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

//壁と正円の衝突判定
Object.prototype.collision01 = function(b){
	var len01 = (b.position.x - this.tlx)* (b.position.x - this.tlx) + (b.position.y - this.tly)* (b.position.y - this.tly);
	var len02 = (b.position.x - this.trx)* (b.position.x - this.trx) + (b.position.y - this.try)* (b.position.y - this.try);
	var len03 = (b.position.x - this.brx)* (b.position.x - this.brx) + (b.position.y - this.bry)* (b.position.y - this.bry);
	var len04 = (b.position.x - this.blx)* (b.position.x - this.blx) + (b.position.y - this.bly)* (b.position.y - this.bly);
	var corner = new Point();

	//どの角が一番歪円の中心に近いかを計算
	if(len01<=len02 && len01<=len04){
		corner.x = this.tlx;
		corner.y = this.tly;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = -this.rad1;
		rad02 = -this.rad2 - Math.PI;
	}
	
	else if(len01>len02 && len01<= len04){
		len01 = len02;
		corner.x = this.trx;
		corner.y = this.try;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = -this.rad2;
		rad02 = -this.rad1;
	}
	
	else if(len01>len02){
		len01 = len03;
		corner.x = this.brx;
		corner.y = this.bry;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = -this.rad1 + Math.PI;
		rad02 = -this.rad2;
	}
	
	else{
		len01 = len04;
		corner.x = this.blx;
		corner.y = this.bly;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = -this.rad2 - Math.PI;
		rad02 = -this.rad1 + Math.PI;
	}

	//ぶつかるとしたら角(点)にぶつかるのかそれとも辺(線分)にぶつかるかの計算をif文で分ける
	//角にぶつかるかの判定
	if((Math.cos(rad01)* (b.position.y- corner.y)< Math.sin(rad01)* (b.position.x- corner.x))&&(Math.cos(rad02)* (b.position.y- corner.y)< Math.sin(rad02)* (b.position.x- corner.x))){
	len01 = Math.sqrt(len01);
		if(len01 <= b.size){
			//角に対して垂直、平行方向に速度ベクトルを分解
			rad = Math.atan2(b.position.y - corner.y + b.velocity.y, -b.position.x + corner.x - b.velocity.x);
			var velhx = 　(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.sin(rad);
			var velhy = -(b.velocity.x * Math.sin(rad) - b.velocity.y * Math.cos(rad)) * Math.cos(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;

			//反発後の計算
			var excess = b.size - len01;   
			b.position.x += excess * -Math.cos(rad);
			b.position.y += excess * Math.sin(rad);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
			
			b.contact[b.collisionC].x = corner.x;
			b.contact[b.collisionC].y = corner.y;
			b.contact[b.collisionC].tangent = "NaN";
			b.collisionC++;
		}
	}
	
	//ボールが辺１にぶつかるかの判定
	else if((Math.cos(rad01)* (b.position.y- corner.y)< Math.sin(rad01)* (b.position.x- corner.x))&&(Math.cos(rad02)* (b.position.y- corner.y)>= Math.sin(rad02)* (b.position.x- corner.x))){
		//ボールから降ろした垂線が半径より小さいかの判定
		var drop = Math.abs(side01* Math.cos(rad01)* (b.position.y - corner.y) - (b.position.x - corner.x)* side01* Math.sin(rad01))/ side01
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad01) + b.velocity.y * Math.sin(-rad01)) * Math.cos(rad01);
			var velhy = (b.velocity.x * Math.cos(rad01) + b.velocity.y * Math.sin(-rad01)) * Math.sin(-rad01);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			console.log(velhx,velhy,velvx,velvy, b.velocity.x, b.velocity.y)
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(rad01);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(rad01);
			b.contact[b.collisionC].tangent = rad01 + Math.PI; 
			b.collisionC++;
			
			var excess = b.size - drop;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess * Math.sin(rad01);
			b.position.y += excess * -Math.cos(rad01);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
	}
	
	//ボールが辺２にぶつかるかの判定
	else if(Math.cos(rad02)* (b.position.y- corner.y)< Math.sin(rad02)* (b.position.x- corner.x)){
		//ボールから降ろした垂線が半径より小さいかの判定
		var drop = Math.abs(side02* Math.cos(rad02)* (b.position.y - corner.y) - (b.position.x - corner.x)* side02* Math.sin(rad02))/ side02
		if( drop <= b.size){
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad02) + b.velocity.y * Math.sin(-rad02)) * Math.cos(rad02);
			var velhy = (b.velocity.x * Math.cos(rad02) + b.velocity.y * Math.sin(-rad02)) * Math.sin(-rad02);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x - drop*Math.sin(rad02);
			b.contact[b.collisionC].y = b.position.y + drop*Math.cos(rad02);
			b.contact[b.collisionC].tangent = rad02 + Math.PI; 
			b.collisionC++;
			
			var excess = b.size - drop;
			b.velocity.x += Math.sqrt(2 * 0.3 * e * excess);
			b.velocity.y += Math.sqrt(2 * 0.3 * e * excess);
			b.position.x += excess * Math.sin(rad02);
			b.position.y += excess * -Math.cos(rad02);
			velvx *= -e;
			velvy *= -e;
			b.velocity.x = velhx + velvx;
			b.velocity.y = velhy + velvy;
		}
	}
		
		
	//それ以外はボールが内側に入っていることになる、ありえない挙動なのでエラーを返すようにする
	else {
		console.log("error 正円が内部に入り込んでいる");
	}
}

//古い当り判定の取り方、上の改善版に比べて遅いはず
/*Object.prototype.collision01 = function(b){
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

		if(c1 <= b.size && c2 <= 0 /*&& c3 > 0*//*) {
			//壁に対して垂直、平行方向に速度ベクトルを分解
			var velhx = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.cos(rad);
			var velhy = (b.velocity.x * Math.cos(rad) + b.velocity.y * Math.sin(rad)) * Math.sin(rad);
			var velvx = b.velocity.x - velhx;
			var velvy = b.velocity.y - velhy;
			//反発後の計算
			b.contact[b.collisionC].x = b.position.x + c1*Math.sin(rad);
			b.contact[b.collisionC].y = b.position.y + c1*Math.cos(rad);
			b.contact[b.collisionC].tangent = -rad + Math.PI; 
			b.collisionC++;
			
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
			
			b.contact[b.collisionC].x = con.x;
			b.contact[b.collisionC].y = con.y;
			b.contact[b.collisionC].tangent = "NaN";
			b.collisionC++;
			break;
		}
	}
};*/

//壁と歪円の衝突判定
Object.prototype.collision02 = function(b){
	var len01 = (b.position.x - this.tlx)* (b.position.x - this.tlx) + (b.position.y - this.tly)* (b.position.y - this.tly);
	var len02 = (b.position.x - this.trx)* (b.position.x - this.trx) + (b.position.y - this.try)* (b.position.y - this.try);
	var len03 = (b.position.x - this.brx)* (b.position.x - this.brx) + (b.position.y - this.bry)* (b.position.y - this.bry);
	var len04 = (b.position.x - this.blx)* (b.position.x - this.blx) + (b.position.y - this.bly)* (b.position.y - this.bly);
	var corner = new Point();
	
	//どの角が一番歪円の中心に近いかを計算
	if(len01<=len02 && len01<=len04){
		len03 = len04;
		corner.x = this.tlx;
		corner.y = this.tly;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = this.rad1;
		rad02 = this.rad2;
	}
	
	else if(len01>len02 && len01<= len04){
		len04 = len01;
		len01 = len02;
		len02 = len03;
		len03 = len04;
		corner.x = this.trx;
		corner.y = this.try;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = this.rad2 + Math.PI;
		rad02 = this.rad1;
	}
	
	else if(len01>len02){
		len01 = len03;
		len03 = len02;
		len02 = len04;
		corner.x = this.brx;
		corner.y = this.bry;
		side01 = this.wid;
		side02 = this.hei;
		rad01 = this.rad1 + Math.PI;
		rad02 = this.rad2 + Math.PI;
	}
	
	else{
		len02 = len01;
		len01 = len04;
		corner.x = this.blx;
		corner.y = this.bly;
		side01 = this.hei;
		side02 = this.wid;
		rad01 = this.rad2;
		rad02 = this.rad1 + Math.PI;
	}
	//ぶつかるとしたら角(点)にぶつかるのかそれとも辺(線分)にぶつかるかの計算をif文で分ける
	//角にぶつかるかの判定
	if((len02 - len01 > side01* side01) && (len03 - len01 > side02)){
		var dot_number = (Math.ceil(Math.atan2(corner.y - b.position.y, corner.x - b.position.x)*12/Math.PI) + 24) % 24
		if( (b.dot[(dot_number+1)%24].x- b.dot[dot_number].x)* (corner.y- b.dot[dot_number].y ) < 
		    (corner.x- b.dot[dot_number].x)* (b.dot[(dot_number+1)%24].y- b.dot[dot_number].y) ){
			b.contact[collisionC].x = corner.x;
			b.contact[collisionC].y = corner.y;
			b.contact[collisionC].tangent = "NaN";
			collisionC++;
			return ;
		}
	}
		
	//ボールが内側に入っているかの判定、ありえない挙動なのでエラーを返すようにする
	else if((len02 - len01 <= side01* side01) && (len03 - len01 <= side02* side02) ) console.log("error 歪円が内部に入り込んでいる");
	
	else if( len02 - len01 <= side01* side01){
		var dot_number = (Math.round((rad01 + Math.PI/2)*12/Math.PI) + 24) % 24;
		if( side01* Math.cos(rad01)* (b.dot[dot_number].y- corner.y) <(b.dot[dot_number].x - corner.x)* side01* Math.sin(rad01)){
			
		}
		else{
			
		}
	}
	
	
		
	
};	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	