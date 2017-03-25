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
