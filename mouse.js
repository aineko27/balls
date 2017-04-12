var drawMouse = function(){
	var m = ball[0].pos.add(angle(radian).mul(length+ ball[0].dot[radNum].rel.norm()));
	if(!pauseFlag) m2 = new Point(mouse.x, mouse.y);
	
	if(leftDown1 && nowWindow=="stage") ctx.fillStyle = color[01];
	else if(rightDown1 && nowWindow=="stage") ctx.fillStyle = color[02];
	if(length>0){
		if(leftDown1 != rightDown1 && !pauseFlag && nowWindow=="stage"){
			var rad = radian+ PI_2;
			var t = 0.9+ length/1440;
			ctx.beginPath();
			var p1 = new Point(m.x, m.y-18*t).rot(m, rad);
			var p2 = new Point(m.x+13*t, m.y+12*t).rot(m, rad);
			var p3 = new Point(m.x, m.y+8*t).rot(m, rad);
			var p4 = new Point(m.x-13*t, m.y+12*t).rot(m, rad);
			ctx.moveTo(p1.x*sr+ scrWid0, p1.y*sr+ scrHei0);
			ctx.lineTo(p2.x*sr+ scrWid0, p2.y*sr+ scrHei0);
			ctx.lineTo(p3.x*sr+ scrWid0, p3.y*sr+ scrHei0);
			ctx.lineTo(p4.x*sr+ scrWid0, p4.y*sr+ scrHei0);
			ctx.closePath();
			ctx.arc(m.x*sr+ scrWid0, m.y*sr+ scrHei0, 6*sr, 0, PI2, true);
			ctx.closePath();
			ctx.fill();
		}
		else{
			ctx.beginPath();
			ctx.moveTo(m2.x*sr+ scrWid0, m2.y*sr - 14*sr+ scrHei0);
			ctx.lineTo(m2.x*sr+ scrWid0 + 14*sr, m2.y*sr+ scrHei0);
			ctx.lineTo(m2.x*sr+ scrWid0, m2.y*sr + 14*sr+ scrHei0);
			ctx.lineTo(m2.x*sr+ scrWid0 - 14*sr, m2.y*sr+ scrHei0);
			ctx.closePath();
			ctx.arc(m2.x*sr+ scrWid0, m2.y*sr+ scrHei0, 9*sr, 0, PI2, true);
			ctx.closePath();
			ctx.fillStyle = color[00];
			ctx.fill();
		}
	}
	ctx.beginPath();
	ctx.arc(m2.x*sr+ scrWid0, m2.y*sr+ scrHei0, 4*sr, 0, PI2, true);
	ctx.closePath();
	ctx.fill();

	// 点線の描画
	if(ball[0].isAlive && !pauseFlag && nowWindow=="stage"){
		if(leftDown1 && rightDown1){
			leftDown1 = false;
			rightDown1 = false;
		}
		else if(leftDown1) ball[0].strokeDottedLine(1);
		else if(rightDown1) ball[0].strokeDottedLine(2);
	}
}

var calcMouseInfo = function(){
	//自機とマウス位置の相対ベクトル(vector)、距離(length)、角度(radian)をそれぞれ計算する
	vector = mouse.sub(ball[0].pos);
	if(!keyCode1[16]){
		length = ball[0].pos.sub(mouse).norm();
		radian = atan2(vector);
	}
	else{
		var n = Math.round(atan2(vector.y, vector.x)*4/ PI);
		radian = n/4* PI;
		switch((n+4)%4){
			case 0:
				length = Math.abs(mouse.x- ball[0].pos.x);
				break;

			case 1:
				length = Math.abs((vector.x+ vector.y)/ SQRT2);
				break;

			case 2:
				length = Math.abs(mouse.y- ball[0].pos.y);
				break;

			default:
				length = Math.abs((vector.x- vector.y)/ SQRT2);
		}
	}
	var dot = ball[0].dot;
	if(ball[0].isDistort || ball[0].isDistorted){
		radNum = mod(Math.round(radian* dotLen/ PI2)+ Math.ceil(dotLen*7/8));
		while(mod(radian- dot[radNum].rad, PI2) > mod(dot[mod(radNum+1)].rad- dot[radNum].rad, PI2)){
			radNum = mod(radNum+1);
		}
		length -= dot[radNum].rel.norm();
	}
	else{
		radNum = mod(Math.round(radian* dotLen/ PI2));
		length -= ball[0].size
	}
	if(length > 380) length = 380;
};
