// -global ------------------------------------------------------------------------------------------------------------------------

var screenCanvas;
var run = true;
var fps = 1000 / 60;
var mouse = new Point();
var ctx;
var counter = 0;
var creatF = false;
var prepLF = false;
var prepRF = false;
var fireLF = false;
var fireRF = false;
var lineLF = false;
var lineRF = false;
var kc;
var vector;
var length;
var lenAlt;
var radian;
var keyCode1 = new Array();
var keyCode2 = new Array();
var testF = false;
var e = 0.6;
var pauseF = false;
var lCounter = 0;
var nowStage = 0;
var maxVel = 30;


// -const -------------------------------------------------------------------------------------------------------------------------

var PI = Math.PI;
var PI2 = Math.PI*2;
var PI_2 = Math.PI/2;
var PI_4 = Math.PI/4;
var BALL_MAX_COUNT = 1023;
var OBJECT_MAX_COUNT = 31;
var color = new Array();
color[00] = "rgba(  0, 255,   0, 0.75)";//緑
color[01]　= "rgba(  0,   0, 255, 0.75)";//青
color[02] = "rgba(255,   0,   0, 0.75)";//赤
color[03]　= "rgba( 85,  85,  85, 0.80)";//グレー
color[04] = "rgba(255, 255, 255, 1.00)";//白
color[05] = "rgba(255, 140,   0, 0.80)";//オレンジ
color[06] = "rgba(200,   0, 100, 0.80)";//暗赤
color[10] = "rgba(  0, 255,   0, 0.30)";//緑
color[11]　= "rgba(  0,   0, 255, 0.30)";//青
color[12] = "rgba(255,   0,   0, 0.30)";//赤
color[13]　= "rgba( 85,  85,  85, 0.30)";//グレー
color[14] = "rgba(255, 255, 255, 1.00)";//白
color[15] = "rgba(255, 140,   0, 0.80)";//オレンジ
color[16] = "rgba(200,   0, 100, 0.80)";//暗赤
var GREEN  　　= "rgba(  0, 255,   0, 0.85)";//緑
var BLUE 　　= "rgba(  0,   0, 255, 0.60)";//青
var RED　　 = "rgba(255,   0,   0, 0.60)";//赤
var GRAY    　　= "rgba( 85,  85,  85, 0.75)";//グレー
var ORANGE = "rgba(255, 140,   0, 0.80)";//オレンジ
var DARK_RED    = "rgba(200,   0, 100, 0.80)";//暗赤



// -main --------------------------------------------------------------------------------------------------------------------------

//ページ読み込み時に起動するfunciton
window.onload = function(){

	//ローカル変数の定義
	var i, j, k, l;
	var p = new Point();
	var v = new Point();
	var vector = new Point();


	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = 800;
	screenCanvas.height = 512;
	var canvasCenter = new Point();
	canvasCenter.x = screenCanvas.width/2;
	canvasCenter.y = screenCanvas.height/2;


	//2dコンテキスト
	ctx = screenCanvas.getContext("2d");


	//右クリックの禁止
	screenCanvas.addEventListener("contextmenu", function(e){
		e.preventDefault();
	 }, false);

	//イベントの登録
	window.addEventListener("mousemove", mouseMove, true);
	screenCanvas.addEventListener("mousedown", mouseDown, true);
	window.addEventListener("mouseup", mouseUp, true);
	window.addEventListener("keydown", keyDown, true);
	window.addEventListener("keyup", keyUp, true);


	//エレメント登録
	info = document.getElementById("info");


	//球初期化
	var ball = new Array(BALL_MAX_COUNT);
	for(i = 0; i < ball.length; i++){
		ball[i] = new Character;
		ball[i].num = i;
	};

	//壁初期化
	var object =new Array(OBJECT_MAX_COUNT);
	for(i = 0; i <= OBJECT_MAX_COUNT; i++){
		object[i] = new Object;
		object[i].num = i;
	};


	//自機初期化
	p.x = screenCanvas.width / 2;
	p.y = screenCanvas.height / 2 -15;
	v.x = 0;
	v.y = 0;
	ball[0].set(p, 15, v, 0);
	
//初期ステージ読み込み
stage03(ball, object);

//test
//p.x = 778, p.y=330;
//v.x = 0, v.y = 0;
//ball[1].set(p, 20, v, 2);

//レンダリング処理を呼び出す-----------------------------------------------------------------------------------------------

(function(){
	if(keyCode1[32] && !keyCode2[32]) pauseF = !pauseF;
	if(!pauseF){
		//カcウンターの値を増やす
		counter ++;





		//入力による変更-------------------------------------------------------------------------------------------

		/*if(counter>100){
			kc = true;
			ball[0].size = 65;
			ball[0].weight = 4225;
			keyCode1[65] = true;
		}
		if(counter>155) keyCode1[65] = false;
		if(counter == 170) run = false;*/
		if(kc){
			//console.log("入力されたキーコードは " + kc)

			if(keyCode1[67]) creatF = 1;// true;
			if(keyCode1[86]) creatF = 2;
			if(keyCode1[65]) ball[0].velocity.x += -0.3; if(ball[0].velocity.x <= -4) ball[0].velocity.x = -4;
			if(keyCode1[87] && ball[0].jumpF){
			ball[0].velocity.y = -7;
			ball[0].jumpF = false;
			testF = false;
			}
			if(keyCode1[68]) ball[0].velocity.x +=  0.3; if(ball[0].velocity.x >=  4) ball[0].velocity.x =  4;
			if(keyCode1[83]) ball[0].velocity.x =  0;
			
			if(keyCode1[70]) ball[0].velocity.x  = -3;
			if(keyCode1[84]) ball[0].velocity.y  = -3;
			if(keyCode1[72]) ball[0].velocity.x  =  3;

			if(keyCode1[39]) ball[0].position.x += 0.3;
			if(keyCode1[37]) ball[0].position.x -= 0.3;

			if(keyCode1[85]) fps = 2000 / 1 ;
			if(keyCode1[73]) fps = 1000 / 2 ;
			if(keyCode1[79]) fps = 1000 / 20;
			if(keyCode1[80]) fps = 1000 / 60;
			if(keyCode1[192]) fps = 1000/180;
			if(keyCode1[76]) lCounter++
			
			if(keyCode1[81]) {
				ball[0].position.x = 180//345;
				ball[0].velocity.x = 0;
			}
			if(keyCode1[90] && !keyCode2[90]){
				ball[0].size = 65;
				ball[0].weight = 4225;
			}
		}


		if(!keyCode1[65] && !keyCode1[68]) ball[0].velocity.x *= 0.85;
		
		//ステージ読み込み================================================================================================
		if(keyCode1[48]) stage00(ball, object);
		if(keyCode1[49]) stage01(ball, object);
		if(keyCode1[50]) stage02(ball, object);
		if(keyCode1[51]) stage03(ball, object);
		if(keyCode1[52]) stage04(ball, object);
		if(keyCode1[53]) stage05(ball, object);
		
		//ステージごとのフラグ管理
		//ステージ1について
		if(nowStage == 1){
			if(ball[0].position.x > 800) stage02(ball, object);
			for(i=0; i<ball.length; i++){
				if(ball[i].position.x > 755 && ball[i].position.y>220 && ball[i].position.y < 260) object[4].alive = false;
			}
		}



		//フラグ管理-----------------------------------------------------------------------------------------------

		
		//他機生成
		if(creatF){
			for(i = 1; i < ball.length; i++){
				if(!ball[i].alive){
					p.x = mouse.x;
					p.y = mouse.y;
					v.x = 0;
					v.y = 0;
					var s = 10//Math.floor(Math.random() * 4) + 6;
					var c = 1//Math.floor(Math.random() * 2) + 1;
					if(creatF == 2) c = 2;
					ball[i].set(p, s, v, c);
					creatF = false;
					break;
				}
			}
		}

		//点線フラグd
		if(prepLF) lineLF = true;
		if(prepRF) lineRF = true;

		//青球発射
		if(fireLF){
			for(i = 1; i < ball.length; i++){
				if(!ball[i].alive && ball[0].weight > 300){
					ball[i].color = 1;
					ball[i].shoot(ball[0]);
					break;
				}
			}
			prepLF = false;
			fireLF = false;
			lineLF = false;
		}

		//赤球発射
		if(fireRF){
			for(i = 1; i < ball.length; i++){
				if(!ball[i].alive && ball[0].weight > 300){
					ball[i].color = 2;
					ball[i].shoot(ball[0]);
					break;
				}
			}
			prepRF = false;
			fireRF = false;
			lineRF = false;
		}
		
		//物体の動きを制御-----------------------------------------------------------------------------------------
		for(i=0; i<ball.length; i++){
			if(ball[i].alive){
				//重力を反映
				/*if(!ball[i].distortionF) */ball[i].fall();
				//もし変形しているのであれば摩擦で減速する
				if(ball[i].distortionF){
					var f = Math.min(Math.max(1.86- ball[i].arc/ball[i].size*3, 0.65), 0.98)
					ball[i].velocity.x *= f;
					ball[i].velocity.y *= f;
					console.log(i, f, ball[i].arc/ball[i].size)
				}
				//速度を位置情報に変換
				ball[i].move();
				if(ball[i].touchF){
					//衝突カウンターと接点、歪フラグを初期化
					ball[i].collisionC = 0;
					ball[i].collisionCC = 0;
					ball[i].distortionF = false;
					ball[i].arc = 0;
					for(j=0; j<ball[i].contact.length; j++){
						ball[i].contact[j].x = 0;
						ball[i].contact[j].y = 0;
						ball[i].contact[j].rad = 0;
						ball[i].contact[j].excess = 0;
						ball[i].contact[j].length = 0;
						ball[i].contact[j].tangent = 0;
						ball[i].contact[j].weight = "NaN"
						ball[i].contact[j].num = ""+0;
						ball[i].contact[j].side = 0;
						ball[i].contact[j].position.x = 0;
						ball[i].contact[j].position.y = 0;
						ball[i].contact[j].velocity.x = 0;
						ball[i].contact[j].velocity.y = 0;
					}
					for(j=0; j<ball[i].bezier.length; j++){
						ball[i].bezier[j].rad_gap = 0;
						ball[i].bezier[j].gap_number = 0;
						ball[i].bezier[j].midPoint.x = 0;
						ball[i].bezier[j].midPoint.y = 0;
						ball[i].bezier[j].midTangent = 0;
						ball[i].bezier[j].midExcess = 0;
						ball[i].bezier[j].arc1 = 0;
						ball[i].bezier[j].arc2 = 0;
						ball[i].bezier[j].arc_mid = 0;
					}
					//周りの点の情報を更新
					for(j=0; j<ball[i].dot.length; j++){
						if(!ball[i].lastDistortion){
							ball[i].dot[j].rel.x = ball[i].size* Math.cos(j* 2* Math.PI/ ball[i].dot.length);
							ball[i].dot[j].rel.y = ball[i].size* Math.sin(j* 2* Math.PI/ ball[i].dot.length);
							ball[i].dot[j].abs.x = ball[i].position.x+ ball[i].dot[j].rel.x;
							ball[i].dot[j].abs.y = ball[i].position.y+ ball[i].dot[j].rel.y;
						}
						else{
							ball[i].dot[j].rel.x = (100*ball[i].dot[j].rel.x + 0*ball[i].size* Math.cos(j* 2* Math.PI/ ball[i].dot.length))/100;
							ball[i].dot[j].rel.y = (100*ball[i].dot[j].rel.y + 0*ball[i].size* Math.sin(j* 2* Math.PI/ ball[i].dot.length))/100;
							ball[i].dot[j].abs.x = ball[i].position.x+ ball[i].dot[j].rel.x;
							ball[i].dot[j].abs.y = ball[i].position.y+ ball[i].dot[j].rel.y;
						}
					}
					//現在の位置情報を仮の値で保存しておく
					ball[i].lastPosition.x = ball[i].position.x;
					ball[i].lastPosition.y = ball[i].position.y;
					//歪円当り判定チャンスをfalseにしておく
					for(j=0; j<ball[i].touchArea.length; j++){
						ball[i].touchArea[j].num = 0;
					}
				}
			}
		}
		
		for(i=0; i<object.length; i++){
			if(object[i].alive){
				if(object[i].type == 2){
					//object[i].vel.x *= 0.9;
					if(object[i].vel.y > 0) object[i].vel.y *= .9;
					object[i].vel.y -= 0.01
					object[i].move(ball, object);
				}
				
				else if(object[i].type == 3){
					if(i < object[i].pair){//object[i].collisionC == 0 && object[object[i].pair].collisionC == 0 && i < object[i].pair){
						object[i].vel.y *= 0.98;
						object[object[i].pair].vel.y *= 0.98;
					}
					object[i].move();
				}
				else if(object[i].type == 4){
					if(keyCode1[78]) object[i].radv += -0.003;
					else if(keyCode1[77]) object[i].radv += 0.003;
					else object[i].radv *= 0.93;
					object[i].move();
				}
				object[i].collisionC = 0;
				for(j=0; j<object[i].contact.length; j++){
					object[i].contact[j].x = 0;
					object[i].contact[j].y = 0;
					object[i].contact[j].excess = 0;
					object[i].contact[j].num = "0";
					object[i].contact[j].weight = 0;
					object[i].contact[j].rad = 0;
					object[i].contact[j].color = 0;
					object[i].contact[j].side = 0;
				}
			}
		}
		//吸収判定、衝突判定について========================================================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].alive && ball[i].touchF){
				for(j=i+1; j<ball.length; j++){
					if(ball[j].alive && ball[j].touchF && ball[i].position.distance(ball[j].position).length() < (ball[i].size+ball[j].size)*2){
						//ここまではお互いの球が生きていて十分に近いかの判定。ここからは2つの球の色から吸収するのか反発するのかの計算
						if(ball[i].color == ball[j].color || ((ball[i].color == 0) && (ball[i].size > ball[j].size))){
							//ボールが発射された直後は吸収判定を取らない
							//if(ball[i].color==0 && ball[j].firedC + 3 > counter) continue;
							//この場合は吸収判定になる
							if(!ball[i].lastDistortion && !ball[j].lastDistortion){
								//ここはどちらも正円だった場合の当り判定
								ball[i].absorption01(ball[j]);
							}
							else if(ball[i].lastDistortion && !ball[j].lastDistortion){
								//ここは若い番号が歪円、遅い番号が正円だった場合
								ball[i].absorption02(ball[j], true);
							}
							else if(!ball[i].lastDistortion && ball[j].lastDistortion){
								//ここは若い番号が正円、遅い番号が歪円だった場合
								ball[j].absorption02(ball[i], false);
							}
							else{
								//ここはどちらも歪円だった場合
								ball[i].absorption03(ball[j])
							}
						}
					}
				}
			}
		}
		//衝突判定始まり=================================================================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].alive && ball[i].touchF){
				for(j=i+1; j<ball.length; j++){
					if(ball[j].alive && ball[j].touchF && ball[i].color != ball[j].color){
						ball[i].collision01(ball[j]);
					}
				}
			}
		}
		for(i=0; i<ball.length; i++){
			if(ball[i].alive && ball[i].touchF){
				//ボールがひずんでいるかで場合分けをする必要がある
				collisionCheck = function(f){
					//この場合はボールは正円
					for(j=i+1; j<ball.length; j++){
						//まずはほかのボールとの当り判定
						if(ball[j].alive && ball[j].touchF && ball[i].color != ball[j].color){
							if(!ball[j].lastDistortion && f) ball[i].collision01(ball[j]);
							else                        ball[j].collision02(ball[i], false);
						}
					}
					//次に壁との当り判定
					for(j=0; j<object.length; j++){
						if(object[j].alive && ball[i].color != object[j].color) object[j].collision01(ball[i], ball, object);
					}
				}
				collisionCheck(false);
				//ほぼ同じ位置にある接点を排除する
				ball[i].touchCheck(ball, object);
				//得られた接点の数からボールの状態を場合分けする
				//接点が無いの場合
				if(ball[i].collisionC == 0){
					ball[i].collisionC_temp = ball[i].collisionC;
					continue;
				}
				//接点が一つの場合
				else if(ball[i].collisionC == 1){
					ball[i].positionCorrection();
					collisionCheck(true);
					ball[i].touchCheck(ball, object);;
					if(ball[i].collisionC == 1) {}//ball[i].bound(ball, object);
					else{
						ball[i].distortCheck01(ball, object);
						ball[i].distort01(ball, object);
					}
				}
				//接点が二つ以上の場合
				else {
					ball[i].distortCheck01(ball, object);
					if(ball[i].collisionC == 1){
						ball[i].positionCorrection();//この後にもっかい当り判定取るべき
						collisionCheck(true);
						ball[i].touchCheck(ball, object);;
						if(ball[i].collisionC == 1) {}//ball[i].bound(ball, object);
						else{
							ball[i].distortCheck01(ball, object);
							ball[i].distort01(ball, object);
						}
					}
					else{
						//ball[i].bound(ball, object);
						ball[i].distort01(ball, object);
					}
				}
				ball[i].collisionC_temp = ball[i].collisionC;
			}
		}
		//一度目の衝突判定終わり、次は二回目=================================================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].alive && ball[i].touchF){
				if(ball[i].lastDistortion || ball[i].distortionF){
					//この場合はボールは歪円
					for(j=i+1; j<ball.length; j++){
						//if(ball[i].color==0 && ball[j].firedC + 6 > counter) continue;//ボールが発射された直後は吸収判定を取らない
						if(ball[j].alive && ball[j].touchF && ball[i].color != ball[j].color){//まずはほかのボールとの当り判定
							if(!ball[j].lastDistortion || !ball[j].distortionF) ball[i].collision02(ball[j], true);
							else                                                ball[i].collision03(ball[j]);
						}
					}
					//次に壁との当り判定
					for(j=0; j<object.length; j++){
						if(object[j].alive && ball[i].color != object[j].color) object[j].collision02(ball[i]);
					}
					ball[i].touchCheck(ball, object);;
					var num = ball[i].collisionC + ball[i].collisionCC;
					if(num>ball[i].collisionC && ball[i].collisionC>0){
						//ball[i].bound(ball, object);
						ball[i].distort02(ball);
						num = ball[i].collisionC + ball[i].collisionCC;
					}
				}//console.log("ball"+ball[i].num+"isEnd")
			}
		}
		//とられた接点から衝突の計算を行う
		for(i=0; i<ball.length; i++){
			if(ball[i].alive && ball[i].touchF){
				if(ball[i].collisionC_temp < 2 && ball[i].collisionC >1){
					ball[i].distortCheck01(ball, object);
					ball[i].distort01(ball, object);
				}
				if(ball[i].collisionC_temp < 1 && ball[i].collisionC==1) ball[i].positionCorrection();
				ball[i].bound(ball, object);
			}
		}
		for(i=0; i<object.length; i++){
			if(object[i].alive){
				if(object[i].type == 1) object[i].detect01(ball, object);
				else if(object[i].type == 2) object[i].detect02(ball, object);
				else if(object[i].type == 3) object[i].detect03(ball, object);
				else if(object[i].type == 4) object[i].detect04(ball, object);
			}
		}
		
		//吸収判定、衝突判定について========================================================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].alive && ball[i].touchF){
				for(j=i+1; j<ball.length; j++){
					if(ball[j].alive && ball[j].touchF && ball[i].position.distance(ball[j].position).length() < (ball[i].size+ball[j].size)*2){
						//ここまではお互いの球が生きていて十分に近いかの判定。ここからは2つの球の色から吸収するのか反発するのかの計算
						if(ball[i].color == ball[j].color || ((ball[i].color == 0) && (ball[i].size > ball[j].size))){
							//ボールが発射された直後は吸収判定を取らない
							//if(ball[i].color==0 && ball[j].firedC + 3 > counter) continue;
							//この場合は吸収判定になる
							if(!ball[i].lastDistortion && !ball[j].lastDistortion){
								//ここはどちらも正円だった場合の当り判定
								ball[i].absorption01(ball[j]);
							}
							else if(ball[i].lastDistortion && !ball[j].lastDistortion){
								//ここは若い番号が歪円、遅い番号が正円だった場合
								ball[i].absorption02(ball[j], true);
							}
							else if(!ball[i].lastDistortion && ball[j].lastDistortion){
								//ここは若い番号が正円、遅い番号が歪円だった場合
								ball[j].absorption02(ball[i], false);
							}
							else{
								//ここはどちらも歪円だった場合
								ball[i].absorption03(ball[j])
							}
						}
					}
				}
			}
		}
		//当り判定終わり==================================================================================================
		



		//自機とマウス位置の相対ベクトル(vector)、距離(length)、角度(radian)をそれぞれ計算する
		vector.x =   mouse.x - ball[0].position.x;
		vector.y =  -(mouse.y - ball[0].position.y);
		length = ball[0].position.distance(mouse).length() - ball[0].size;
		radian = Math.atan2(vector.y, vector.x);

		if(keyCode1[16]){
			var n = Math.round(Math.atan2(vector.y, vector.x) * 4 / Math.PI);
			radian = n / 4 * Math.PI;
			switch(n % 4){
				case 0:
					length = Math.abs(mouse.x - ball[0].position.x) - ball[0].size;
					break;

				case 1:
					length = Math.abs(Math.sqrt(1 / 2) * (vector.x + vector.y)) - ball[0].size;
					break;

				case 2:
					length = Math.abs(mouse.y - ball[0].position.y) - ball[0].size;
					break;

				default:
					length = Math.abs(Math.sqrt(1 / 2) * (vector.x - vector.y)) - ball[0].size;
					break;
			}
		}

		if(length >= 380) length = 380;
	};


	//ジャンプフラグの確認を行う
	if(keyCode1[87] && !keyCode2[87]) testF = true;
	for(i=0; i<ball[0].collisionC+ball[0].collisionCC; i++){
		var i_rad = (ball[0].contact[i].tangent+ 2*Math.PI)% (2*Math.PI);
		if(i_rad >= 3/4* Math.PI && i_rad <= 5/4* Math.PI && testF) ball[0].jumpF = true;
	}

	//画面の外遠くまで行ってしまったらボールを死んだことにする
	for(i=0; i<ball.length; i++){
		if(ball[i].alive){
			if(ball[i].position.distance(canvasCenter).length() > screenCanvas.width) ball[i].initialize();
		}
	}
	//画面の描画を行う-------------------------------------------------------------------------------------------------


	//スクリーンクリア
	ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

	//背景の描画-------------------------------------------------

	//背景の描画
	for(i=0; i<object.length; i++){
		if(object[i].alive) object[i].draw1(object);
	}
	
	//球の描写1
	for(i=0; i<ball.length; i++){
		if(ball[i].alive) ball[i].draw(1);
	}
	
	//壁の描画
	for(i=0; i<object.length; i++){
		if(object[i].alive) object[i].draw2(object);
	};

	
	//球の描写2
	for(i=0; i<ball.length; i++){
		if(ball[i].alive){
			//球そのものの描写
			ball[i].draw(2);
			//球の中心の描写
			ctx.beginPath()
			ctx.arc(ball[i].position.x, ball[i].position.y, 2, 0, 2* Math.PI, true);
			ctx.fillStyle = GRAY;
			ctx.fill();
			//球の接点の中点の描写
			continue;
			if(ball[i].collisionC+ball[i].collisionCC < 2) continue;
			for(j=0; j<ball[i].collisionC+ ball[i].collisionCC; j++){
				ctx.beginPath();
				ctx.arc(ball[i].bezier[j].midPoint.x, ball[i].bezier[j].midPoint.y, 2, 0, 2*Math.PI, true);
				ctx.fillStyle = GRAY;
				ctx.fill()
			}
		}
	}
	
	if(lCounter%4){
		ctx.beginPath();
		ctx.arc(ball[1].position.x, ball[1].position.y, ball[1].size, 0, PI2, true)
		ctx.fillStyle = GRAY;
		ctx.fill()
	}
	if(false){//lCounter%4){
		ctx.fillStyle = "BLACK";
		for(i=0; i<ball[0].dot.length; i++){
			ctx.beginPath();
			ctx.arc(ball[0].dot[i].abs.x, ball[0].dot[i].abs.y, 1, 0, 2*Math.PI, true)
			ctx.closePath();
			ctx.fill();
		}
	}
	//マウスの現在地の描画
	var mx = ball[0].position.x + vector.x;
	var my = ball[0].position.y - vector.y;

	ctx.beginPath();
	ctx.moveTo(mx, my - 15);
	ctx.lineTo(mx + 15, my);
	ctx.lineTo(mx, my + 15);
	ctx.lineTo(mx - 15, my);
	ctx.closePath();
	ctx.arc(mx, my, 10, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.arc(mx, my, 4, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = GREEN;
	ctx.fill();

	//点線の描画
	if(lineLF){// && (ball[0].size + 19 < length)){
		ball[0].strokeDottedLine(1);
	}

	if(lineRF){// && (ball[0].size + 19 < length)){
		ball[0].strokeDottedLine(2);
	}
	
console.log(object[4])
//console.log(ball);
console.log(ball[1], ball[2], ball[3])
console.log(ball[0].velocity, ball[0].position, ball[0].arc)
console.log(ball[1].velocity, ball[1].position.x)
console.log(counter, "===================================================================================================")



	//その他の設定----------------------------------------------------------------------------------------------------
	//キーコード初期化
	//kc = null;
	//前フレームにキーを押していたかの情報
	keyCode2[32] = keyCode1[32];
	keyCode2[87] = keyCode1[87];
	//物体との接触判定のフラグを初期化しておく
	for(i=0; i<ball.length; i++){
		if(ball[i].alive){
			if(ball[i].arc > ball[i].size*0.15)ball[i].lastDistortion = true;
			else ball[i].lastDistortion = false;
		}
	}

	//スペースバーが押されたらポーズ/ポーズ解除　する
	if(pauseF && ball[0].alive){
		ctx.beginPath();
		ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2, true);
		ctx.fillStyle = "rgba(  0,   0, 000, 0.5)";
		ctx.fill();
		
		ctx.fillStyle = DARK_RED;
		ctx.font = "60px 'MSゴシック'"
		ctx.fillText("PAUSE", screenCanvas.width / 2 - 94, screenCanvas.height / 3);
	}
	
	//自機が死んだら描写をストップしてリトライを促す
	if(!ball[0].alive){
		ctx.fillStyle = DARK_RED;
		ctx.font = "60px 'MSゴシック'"
		ctx.fillText("GAME OVER", screenCanvas.width / 2 -165, screenCanvas.height/ 3);
		ctx.fillText('PRESS "F5" TO RETRY', screenCanvas.width / 2 - 295, screenCanvas.height/ 3*2);
	}

	//HTMLを更新
	info.innerHTML = "PLAYER WEIGHT: " + ball[0].weight +
	 "<br>PLAYER SIZE &nbsp;&nbsp;&nbsp;&nbsp;:" + ball[0].size +
	 "<br>移動　WASD <br>青玉発射 左クリック　赤玉発射　右クリック" +
	 "<br>発射角度調整　SHIFT<br>デバッグ用TFGH, L, C, V, Q, Z, N, M<br>" +
	 mouse.x +" "+ mouse.y




		//フラグにより再起呼び出し-----------------------------------------------------------------------------------------
		if(run){setTimeout(arguments.callee, fps);}
	})();
};




// -event--------------------------------------------------------------------------------------------------------------------------

var mouseMove = function(e){
	//マウスカーソルの座標の更新
	mouse.x = e.clientX - screenCanvas.offsetLeft;
	mouse.y = e.clientY - screenCanvas.offsetTop;
};

var keyDown = function(e){
	kc = e.keyCode;
	keyCode1[kc] = true;
	if(keyCode1[27]) run = false;
};

var keyUp = function(e){
	keyCode1[e.keyCode] = false;
};

var mouseDown = function(e){
	if(e.button == 0) prepLF = true;
	if(e.button == 2) prepRF = true;
};

var mouseUp = function(e){
	if(e.button == 0) fireLF = true;
	if(e.button == 2) fireRF = true;
};
window.onblur = function (){

	// 配列をクリアする
	keyCode1.length = 0;
};