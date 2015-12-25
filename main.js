// -global ------------------------------------------------------------------------------------------------------------------------

var screenCanvas;
var run = true;
var fps = 1000 / 60;
var mouse = new Point();
var ctx;
var counter;
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
var keyCode = new Array();
var e = 0.6;
var lastSpace = false;
var pauseF = false;
var lCounter = 0;

// -const -------------------------------------------------------------------------------------------------------------------------

var BALL_MAX_COUNT = 255;
var OBJECT_MAX_COUNT = 31;
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
	vector = new Point();


	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = 800;
	screenCanvas.height = 512;


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
	for(i = 0; i <= BALL_MAX_COUNT; i++){
		ball[i] = new Character;
	};

	//壁初期化
	var object =new Array(OBJECT_MAX_COUNT);
	for(i = 0; i <= OBJECT_MAX_COUNT; i++){
		object[i] = new Object;
	};


	//自機初期化
	p.x = screenCanvas.width / 2;
	p.y = screenCanvas.height / 2 -15;
	v.x = 0;
	v.y = 0;
	ball[0].set(p, 15, v, 0);
	
//test
object[0].set(   0, 497, 800, 316, 0, 0, 3);
object[1].set(-300,-300, 300, 812, 0, 0, 3);
object[2].set( 800,-300, 300, 812, 0, 0, 3);
object[3].set(  40, 463, 100,  10, -Math.PI / 15, 0, 0);
//object[4].set( 100, 228,  80,  80, Math.PI / 8,  0, 2);
object[5].set( 280, 330, 240,  75, 0.1,     0, 2);
object[7].set(  30, 330, 220,  75, -0.1,     0, 2);
//object[8].set( 470, 330,  60,  100,  0.3, 0, 1);
//object[6].set( 360,  40,  30, 250, 0.1,          0, 3);
/*object[3].set(   0, 130,  74,  75, 0,  0,  2);
object[5].set( 272, 130, 170,  75, 0.0,            0, 3);
object[4].set(  74, 130, 170,  75, 0.0,            0, 3);
object[6].set( 442, 130,  30,  367,  0,  0,  3);*/

//チュートリアル用ステージ
p.x = 100, p.y = 50;
//test
//p.x = 700, p.y = 400;
ball[0].set(p, 25, v, 0);
p.x = 285, p.y = 120;
ball[1].set(p, 45, v, 1);
p.x = 650, p.y = 135;
ball[2].set(p, 15, v, 2);
p.x = 700, p.y = 135;
ball[3].set(p, 15, v, 1);
p.x = 750, p.y = 135;
ball[4].set(p, 15, v, 2);
p.x = 240, p.y = 480;
ball[5].set(p, 22, v, 1);
p.x = 220, p.y = 420;
ball[6].set(p, 22, v, 2);

object[03].set(   0, 140, 220,  10, 0, 0, 3);
object[04].set(   0, 150, 760,  30, 0, 0, 3);
object[05].set( 200,   0, 150,  80, 0, 0, 3);
object[06].set( 350,   0,  40, 100, 0, 0, 3);
object[07].set( 600,   0, 200, 110, 0, 0, 3);
object[08].set( 280, 467, 200,  30, 0, 0, 3);
object[09].set( 280, 400, 200,  67, 0, 0, 2);
object[10].set( 280, 310, 200,  90, 0, 0, 3);
object[11].set( 180, 350,  20, 147, 0, 0, 3);
object[12].set( 680, 447, 120,  50, 0, 0, 3);
object[13].set( 720, 397,  80,  50, 0, 0, 3);
object[14].set( 760, 347,  40,  50, 0, 0, 3);
object[15].set( 280, 280, 420,  30, 0, 0, 3);
object[16].set( 180, 180,  20, 120, 0, 0, 3);
object[17].set( 200, 280,  80,  20, 0, 0, 0);

	//レンダリング処理を呼び出す-----------------------------------------------------------------------------------------------

	(function(){
		if(keyCode[32] && !lastSpace) pauseF = !pauseF;
		if(!pauseF){
			//カcウンターの値を増やす
			counter ++;





			//入力による変更-------------------------------------------------------------------------------------------

			if(kc){
				//console.log("入力されたキーコードは " + kc)

				if(keyCode[67]) creatF = true;
				if(keyCode[65]) ball[0].velocity.x += -0.3; if(ball[0].velocity.x <= -4) ball[0].velocity.x = -4;
				if(keyCode[87] && ball[0].jumpF) ball[0].velocity.y  =  5; ball[0].jumpF = false
				if(keyCode[68]) ball[0].velocity.x +=  0.3; if(ball[0].velocity.x >=  4) ball[0].velocity.x =  4;
				if(keyCode[83]) ball[0].velocity.x =  0;
				
				if(keyCode[70]) ball[0].velocity.x  = -3;
				if(keyCode[84]) ball[0].velocity.y  =  3;
				if(keyCode[72]) ball[0].velocity.x  =  3;

				if(keyCode[39]) ball[0].position.x += 0.3;
				if(keyCode[37]) ball[0].position.x -= 0.3;

				if(keyCode[73]) fps = 1000 / 2 ;
				if(keyCode[79]) fps = 1000 / 20;
				if(keyCode[80]) fps = 1000 / 60;
				if(keyCode[76]) lCounter++
				
				if(keyCode[81]) ball[0].position.x = 345;

			}


			if(!keyCode[65] && !keyCode[68]) ball[0].velocity.x *= 0.85;



			//フラグ管理-----------------------------------------------------------------------------------------------

			//他機生成
			if(creatF){
				for(i = 0; i < BALL_MAX_COUNT; i++){
					if(!ball[i].alive){
						p.x = mouse.x;
						p.y = mouse.y;
						v.x = 0;
						v.y = 0;
						var s = 10//Math.floor(Math.random() * 4) + 6;
						var c = 1//Math.floor(Math.random() * 2) + 1;
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
				for(i = 1; i < BALL_MAX_COUNT; i++){
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
				for(i = 1; i < BALL_MAX_COUNT; i++){
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

			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive){
					//重力を反映
					if(!ball[i].distortionF) ball[i].fall();
					//もし変形しているのであれば摩擦で減速する
					if(ball[i].distortionF){
						ball[i].velocity.x *= 0.85;
						ball[i].velocity.y *= 0.85;
					}
					//速度を位置情報に変換
					ball[i].move();
					//衝突カウンターと接点、歪フラグを初期化
					ball[i].collisionC = 0;
					ball[i].collisionCC = 0;
					for(j=0; j<=7; j++){
						ball[i].contact[j].x = 0;
						ball[i].contact[j].y = 0;
						ball[i].distortionF = false;
					}
					//周りの点の情報を更新
					/*for(j=0; j<ball[i].dot.length; j++){
						ball[i].dot[j].x = ball[i].position.x+ ball[i].size* Math.cos(j* 2* Math.PI/ ball[i].dot.length);
						ball[i].dot[j].y = ball[i].position.y+ ball[i].size* Math.sin(j* 2* Math.PI/ ball[i].dot.length);
					}*/
					//現在の位置情報を仮の値で保存しておく
					ball[i].lastPosition.x = ball[i].position.x;
					ball[i].lastPosition.y = ball[i].position.y;
					//歪円当り判定チャンスをfalseにしておく
					for(j=0; j<ball[i].touchArea.length; j++){
						ball[i].touchArea[j].num = 0;
					}
				}
			}

			//ボール同士の衝突、結合
			for(i = 0; i < BALL_MAX_COUNT; i++){
				for(j = i + 1; j < BALL_MAX_COUNT; j++){
					if(ball[i].alive && ball[i].touchF && ball[j].alive && ball[j].touchF){
						p = ball[j].position.distance(ball[i].position);
						if( (p.length() < ball[j].size + ball[i].size) && (ball[i].color + ball[j].color == 3|| !i && ball[0].size < ball[j].size + 1) ){
							//ボールのめり込んだ位置関係を元に戻す
							ball[j].positionCorrect(ball[i]);
							//ボールの衝突後の速度を求める
							ball[j].collisionCalculate(ball[i]);
						}
						else if( p.length() < ball[j].size + ball[i].size - 2 && ball[i].color + ball[j].color != 3){
							if(!i && ball[0].size < ball[j].size + 1){
								break;
							}
							//ボール同士を結合する
							ball[j].absorptionCalculate(ball[i]);
						}
					}
				}
			}

			//壁との衝突
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive && ball[i].touchF){
					for(j = 0; j < OBJECT_MAX_COUNT; j++){
						if(object[j].alive && ball[i].color != object[j].color){
							//ボールと壁の衝突判定を行う
							object[j].collision01(ball[i], j);
						}
					}
				}
			};


			//自機とマウス位置の相対ベクトル(vector)、距離(length)、角度(radian)をそれぞれ計算する
			vector.x =   mouse.x - ball[0].position.x;
			vector.y = -(mouse.y - ball[0].position.y);
			length = ball[0].position.distance(mouse).length() - ball[0].size;
			radian = Math.atan2(vector.y, vector.x);

			if(keyCode[16]){
				var n = Math.round(Math.atan2(vector.y, vector.x) * 4 / Math.PI);
				radian = n / 4 * Math.PI;
				switch(n % 4){
					case 0:
						length = Math.abs(mouse.x - ball[0].position.x);
						break;

					case 1:
						length = Math.abs(Math.sqrt(1 / 2) * (vector.x + vector.y))
						break;

					case 2:
						length = Math.abs(mouse.y - ball[0].position.y);
						break;

					default:
						length = Math.abs(Math.sqrt(1 / 2) * (vector.x - vector.y))
						break;
				}
			}

			if(length >= 280) length = 280;
		};

		lastSpace = keyCode[32];



		//画面の描画を行う-------------------------------------------------------------------------------------------------


		//スクリーンクリア
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

		//背景の描画-------------------------------------------------

		//壁の描画
		for(i = 0;i <= OBJECT_MAX_COUNT; i++){
			if(object[i].alive){
				switch (object[i].color){
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
				object[i].draw();
			}
		};

		var x = [];
		for(var i=1;i<10;i++){
			x[i] = i*2;
		}
		
		var xmin = -1000;
		for(var i=1;i<10;i++){
			if(xmin>x[i]){
				xmin = x[i];
			}
		}
		
		//動体の描画-------------------------------------------------
		//ボールのひずみを計算する
		//2点以上で物体に接している場合
		for(i=0; i<=BALL_MAX_COUNT; i++){
			if(ball[i].alive && ball[i].collisionC >= 2){
				ball[i].position.x = ball[i].lastPosition.x
				ball[i].position.y = ball[i].lastPosition.y
				var excessC = 0;
				//各接点において、ボールの中心座標からの角度とめり込みぐらいを計算する。あと接線の角度を計算する
				for(j=0; j<=ball[i].collisionC-1; j++){
					ball[i].contact[j].rad = Math.atan2(ball[i].contact[j].y - ball[i].position.y, ball[i].contact[j].x - ball[i].position.x);
					ball[i].contact[j].excess = ball[i].size - ball[i].position.distance(ball[i].contact[j]).length();
					if(ball[i].contact[j].tangent == "NaN") ball[i].contact[j].tangent = ball[i].contact[j].rad + Math.PI/2;
					if(ball[i].contact[j].excess >= ball[i].size* 0.25) excessC++;
				}
				//もしボールが３つ以上の接点を持っている場合
				if(ball[i].collisionC >= 3){
					//excessの値が大きい接点を上から２つ選び、maxとして保存する
					var max1, max2, num1, num2;
					max1 = 0;
					max2 = 0;
					for(j=0; j<ball[i].collisionC; j++){
						if(ball[i].contact[j].excess > max1){
							max2 = max1;
							num2 = num1;
							max1 = ball[i].contact[j].excess;
							num1 = j;
						} 
						else if(ball[i].contact[j].excess > ball[i].contact[ball[i].contact.length-2].excess){
							max2 = ball[i].contact[j].excess;
							num2 = j;
						}
					}
					if(max2) {
						for(j=0; j<ball[i].collisionC; j++){
							if((num1 != j && (Math.cos(ball[i].contact[num1].tangent)* (ball[i].contact[j].y - ball[i].contact[num1].y) - Math.sin(ball[i].contact[num1].tangent)* (ball[i].contact[j].x - ball[i].contact[num1].x) < 0.0001))||
							   (num2 != j && (Math.cos(ball[i].contact[num2].tangent)* (ball[i].contact[j].y - ball[i].contact[num2].y) - Math.sin(ball[i].contact[num2].tangent)* (ball[i].contact[j].x - ball[i].contact[num2].x) < 0.0001))){
							   var temp;
							   temp = ball[i].contact[j]
								for(k=j; k<ball[i].collisionC; k++){
									if(k == ball[i].collisionC-1) break;
									ball[i].contact[k] = ball[i].contact[k+1];
							   }
							   ball[i].contact[ball[i].collisionC-1] = temp;
							   ball[i].collisionC--;
							   ball[i].excessC--;
							   break;
							}
						}
					}
				}
				
				//もし各接点でボールが基準値よりめり込んでいたら破裂する
				if(excessC >= ball[i].collisionC){
					ball[i].alive = false;
					var amount = Math.floor((Math.random()*3) + 7);
					for(j=BALL_MAX_COUNT; j >= BALL_MAX_COUNT - amount; j--){
						ball[j].size = Math.random()*3+Math.sqrt(ball[i].weight/amount)-2;
						ball[j].velocity.x = Math.random()*12 - 6;
						ball[j].velocity.y = Math.random()*12;
						ball[j].set(ball[i].position, ball[j].size, ball[j].velocity, Math.ceil(Math.random()*2));
						ball[j].touchF = false
					}
				}
				else{
					//各接点を中心からの角度が小さい順に並び返す
					for(j=0; j<ball[i].collisionC; j++){
						for(k=ball[i].collisionC-1; k>j; k--){
							if(ball[i].contact[k-1].rad > ball[i].contact[k].rad){
							var temp
								temp = ball[i].contact[k];
								ball[i].contact[k] = ball[i].contact[k-1];
								ball[i].contact[k-1] = temp;
							}
						}
					}
					//それぞれの接点間の角度を計算する。あと曲線の変わり目がどこにあるのか計算する
					for(j=0; j<ball[i].collisionC; j++){
						ball[i].rad_gap[j] = (ball[i].contact[(j+1)%ball[i].collisionC].rad - ball[i].contact[j].rad + 2*Math.PI) % (2*Math.PI);
						ball[i].gap_number[j] = (Math.round(ball[i].contact[j].rad* 12/ Math.PI) + ball[i].dot.length) % ball[i].dot.length;
					}
					
					//各接点におけるめり込みぐらいから、中心座標が受けるべき力の大きさ、方向を計算する
					var power = new Point();
					for(j=0; j<ball[i].collisionC; j++){
						if(ball[i].contact[j].excess<=0) continue;
						power.x += ball[i].contact[j].excess* ball[i].contact[j].excess* -Math.cos(ball[i].contact[j].tangent- Math.PI/2);
						power.y += ball[i].contact[j].excess* ball[i].contact[j].excess* -Math.sin(ball[i].contact[j].tangent- Math.PI/2);
					}
					ball[i].position.x += 2*power.x/ ball[i].size;
					ball[i].position.y += 2*power.y/ ball[i].size;
					//ベジエ曲線で歪みを表現していく。ついでに曲線状の各点の座標を計算していく
					ctx.beginPath();
					ctx.moveTo(ball[i].contact[0].x, ball[i].contact[0].y);
					var bezier = new Array(ball[i].collisionC);
					for(j=0; j<ball[i].collisionC; j++){
						bezier[j] = {};
						bezier[j].arc1 = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[j].excess)* Math.tan(ball[i].rad_gap[j]/4);
						bezier[j].arc2 = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[(j+1)%ball[i].collisionC].excess)* Math.tan(ball[i].rad_gap[j]/4);
						//各接点間の中点を求める
						bezier[j].midPoint = new Point();
						bezier[j].midPoint.x = 1/8* ball[i].contact[j].x+ 3/8* (ball[i].contact[j].x + bezier[j].arc1* Math.cos(ball[i].contact[j].tangent))+ 3/8* (ball[i].contact[(j+1)%ball[i].collisionC].x- bezier[j].arc2* Math.cos(ball[i].contact[(j+1)%ball[i].collisionC].tangent)) + 1/8* ball[i].contact[(j+1)%ball[i].collisionC].x
						bezier[j].midPoint.y = 1/8* ball[i].contact[j].y+ 3/8* (ball[i].contact[j].y + bezier[j].arc1* Math.sin(ball[i].contact[j].tangent))+ 3/8* (ball[i].contact[(j+1)%ball[i].collisionC].y- bezier[j].arc2* Math.sin(ball[i].contact[(j+1)%ball[i].collisionC].tangent)) + 1/8* ball[i].contact[(j+1)%ball[i].collisionC].y
						bezier[j].midPoint_tangent = ball[i].contact[j].rad + ball[i].rad_gap[j]/2 + Math.PI/2;
						bezier[j].midPoint_excess = ball[i].size - ball[i].position.distance(bezier[j].midPoint).length();
						bezier[j].arc1    = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[j].excess)* Math.tan(ball[i].rad_gap[j]/8);
						bezier[j].arc_mid = 4/3* ball[i].size* ball[i].size/ (ball[i].size- bezier[j].midPoint_excess)* Math.tan(ball[i].rad_gap[j]/8);
						bezier[j].arc2    = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[(j+1)%ball[i].collisionC].excess)* Math.tan(ball[i].rad_gap[j]/8);
						//ここから曲線状の各点の座標計算
						var gap = (ball[i].gap_number[(j+1)%ball[i].collisionC] - ball[i].gap_number[j] + ball[i].dot.length) % ball[i].dot.length
						for(k=0; k<gap/2; k++){
							var t = 2*k/gap;
							ball[i].dot[(ball[i].gap_number[j]+k)%ball[i].dot.length].x = (1-t)*(1-t)*(1-t)*ball[i].contact[j].x + 3*(1-t)*(1-t)*t*(ball[i].contact[j].x+ bezier[j].arc1* Math.cos(ball[i].contact[j].tangent)) +
													  3*(1-t)*t*t*(bezier[j].midPoint.x- bezier[j].arc_mid* Math.cos(bezier[j].midPoint_tangent)) + t*t*t*bezier[j].midPoint.x
							ball[i].dot[(ball[i].gap_number[j]+k)%ball[i].dot.length].y = (1-t)*(1-t)*(1-t)*ball[i].contact[j].y + 3*(1-t)*(1-t)*t*(ball[i].contact[j].y+ bezier[j].arc1* Math.sin(ball[i].contact[j].tangent)) +
													  3*(1-t)*t*t*(bezier[j].midPoint.y- bezier[j].arc_mid* Math.sin(bezier[j].midPoint_tangent)) + t*t*t*bezier[j].midPoint.y
						}
						for(k=gap-1; k>=gap/2; k--){
							var t = (k-gap/2)*2/(gap);
							ball[i].dot[(ball[i].gap_number[j]+k)%ball[i].dot.length].x = (1-t)*(1-t)*(1-t)*bezier[j].midPoint.x + 3*(1-t)*(1-t)*t*(bezier[j].midPoint.x+ bezier[j].arc_mid* Math.cos(bezier[j].midPoint_tangent)) +
													  3*(1-t)*t*t*( ball[i].contact[(j+1)%ball[i].collisionC].x- bezier[j].arc2* Math.cos(ball[i].contact[(j+1)%ball[i].collisionC].tangent)) + t*t*t*ball[i].contact[(j+1)%ball[i].collisionC].x
							ball[i].dot[(ball[i].gap_number[j]+k)%ball[i].dot.length].y = (1-t)*(1-t)*(1-t)*bezier[j].midPoint.y + 3*(1-t)*(1-t)*t*(bezier[j].midPoint.y+ bezier[j].arc_mid* Math.sin(bezier[j].midPoint_tangent)) +
													  3*(1-t)*t*t*( ball[i].contact[(j+1)%ball[i].collisionC].y- bezier[j].arc2* Math.sin(ball[i].contact[(j+1)%ball[i].collisionC].tangent)) + t*t*t*ball[i].contact[(j+1)%ball[i].collisionC].y
						}
					}
					
					//歪円と壁の衝突判定をもう一度行う----------------------------------------------------------------------------------------------
					for(j=0; j<OBJECT_MAX_COUNT; j++){
						if(ball[i].touchArea[j].num != 0){
							object[j].collision02(ball[i], j)
						}
					}
					//もし新しい衝突判定が生まれたなら
					if(ball[i].collisionCC>0){
						//新しくできた接点のめり込みぐらいから、中心座標が受けるべき力の大きさ、方向を計算する
						var power = new Point();
						for(j=ball[i].collisionC; j<=ball[i].collisionC+ball[i].collisionCC; j++){
							if(ball[i].contact[j].excess<0) continue;
							power.x += ball[i].contact[j].excess* ball[i].contact[j].excess* -Math.cos(ball[i].contact[j].rad);
							power.y += ball[i].contact[j].excess* ball[i].contact[j].excess* -Math.sin(ball[i].contact[j].rad);
							ball[i].contact[j].excess = ball[i].size - ball[i].position.distance(ball[i].contact[j]).length();
						}
						ball[i].position.x += power.x/ ball[i].size*2;
						ball[i].position.y += power.y/ ball[i].size*2;
						//新しくできた接点を既存の接点の間に差し込んでいく
						for(j=0; j<ball[i].collisionCC; j++){
							for(k=0; k<ball[i].collisionCC+j+1; k++){
								if(ball[i].contact[ball[i].collisionC+j].rad < ball[i].contact[k].rad){
									var temp;
									temp = ball[i].contact[ball[i].collisionC+j];
									for(l=ball[i].collisionC+j; l>k; l--){
										ball[i].contact[l] = ball[i].contact[l-1];
									}
									ball[i].contact[k] = temp;
									break;
								}
							}
						}
						
						//それぞれの接点間の角度を改めて計算する。あと曲線の変わり目がどこにあるのか計算する
						for(j=0; j<ball[i].collisionC+ ball[i].collisionCC; j++){
							ball[i].rad_gap[j] = (ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].rad - ball[i].contact[j].rad + 2*Math.PI) % (2*Math.PI);
							ball[i].gap_number[j] = (Math.round(ball[i].contact[j].rad* 12/ Math.PI) + ball[i].dot.length) % ball[i].dot.length;
						}
						
						//歪円と角で当り判定である場合、歪円の接点における傾きを求める必要がある
						for(j=0; j<ball[i].collisionC+ ball[i].collisionCC; j++){
							if(ball[i].contact[j].tangent == "NaN"){
								
							}
						}
						//ベジエ曲線で歪みを表現していく
						ctx.beginPath();
						ctx.moveTo(ball[i].contact[0].x, ball[i].contact[0].y);
						bezier = new Array(ball[i].collisionC+ ball[i].collisionCC);
						for(j=0; j<ball[i].collisionC+ball[i].collisionCC; j++){
							bezier[j] = {};
							bezier[j].arc1 = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[j].excess)* Math.tan(ball[i].rad_gap[j]/4);
							bezier[j].arc2 = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].excess)* Math.tan(ball[i].rad_gap[j]/4);
							//各接点間の中点を求める
							bezier[j].midPoint = new Point();
							var x1 = ball[i].contact[j].x;
							var x2 = ball[i].contact[j].x + bezier[j].arc1* Math.cos(ball[i].contact[j].tangent);
							var x3 = ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].x- bezier[j].arc2* Math.cos(ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].tangent);
							var x4 = ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].x;
							var y1 = ball[i].contact[j].y;
							var y2 = ball[i].contact[j].y + bezier[j].arc1* Math.sin(ball[i].contact[j].tangent);
							var y3 = ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].y- bezier[j].arc2* Math.sin(ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].tangent);
							var y4 = ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].y;
							
							bezier[j].midPoint.x = 1/8* x1+ 3/8* x2+ 3/8* x3 + 1/8* x4
							bezier[j].midPoint.y = 1/8* y1+ 3/8* y2+ 3/8* y3 + 1/8* y4;
							bezier[j].midPoint_tangent = Math.atan2(y1+y2-y3-y4, x1+x2-x3-x4) + Math.PI;
							bezier[j].midPoint_excess = ball[i].size - ball[i].position.distance(bezier[j].midPoint).length();
							bezier[j].arc1    = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[j].excess)* Math.tan(ball[i].rad_gap[j]/8);
							bezier[j].arc_mid = 4/3* ball[i].size* ball[i].size/ (ball[i].size- bezier[j].midPoint_excess)* Math.tan(ball[i].rad_gap[j]/8);
							bezier[j].arc2    = 4/3* ball[i].size* ball[i].size/ (ball[i].size- ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].excess)* Math.tan(ball[i].rad_gap[j]/8);
						}
					}
					//そうでないなら前のまま書く
					for(j=0; j<ball[i].collisionC+ ball[i].collisionCC; j++){
						//ベジエで曲線を描いていく
						ctx.bezierCurveTo(ball[i].contact[j].x+ bezier[j].arc1* Math.cos(ball[i].contact[j].tangent), ball[i].contact[j].y+ bezier[j].arc1* Math.sin(ball[i].contact[j].tangent),
										  bezier[j].midPoint.x- bezier[j].arc_mid* Math.cos(bezier[j].midPoint_tangent), bezier[j].midPoint.y- bezier[j].arc_mid* Math.sin(bezier[j].midPoint_tangent),
										  bezier[j].midPoint.x, bezier[j].midPoint.y);
						
						ctx.bezierCurveTo(bezier[j].midPoint.x+ bezier[j].arc_mid* Math.cos(bezier[j].midPoint_tangent), bezier[j].midPoint.y+ bezier[j].arc_mid* Math.sin(bezier[j].midPoint_tangent),
										  ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].x- bezier[j].arc2* Math.cos(ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].tangent), ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].y- bezier[j].arc2* Math.sin(ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].tangent),
										  ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].x, ball[i].contact[(j+1)%(ball[i].collisionC+ ball[i].collisionCC)].y);
					}
					
					ctx.closePath();
					switch(ball[i].color){
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
					ctx.fill();
					ball[i].distortionF = true;
					for(j=0; j<ball[i].collisionC+ ball[i].collisionCC; j++){
					ctx.beginPath();
					ctx.arc(bezier[j].midPoint.x, bezier[j].midPoint.y, 2, 0, 2*Math.PI, true);
					ctx.fillStyle = GRAY;
					ctx.fill()
					}
				}
			}
		}

		//ジャンプフラグの確認を行う
		for(j=0; j<ball[0].collisionC+ball[0].collisionCC; j++){
			var j_rad = (ball[0].contact[j].tangent+ 2*Math.PI)% (2*Math.PI);
			if(j_rad >= 3/4* Math.PI && j_rad <= 5/4* Math.PI) ball[0].jumpF = true;
		}

		//球の描写
		for(i=0; i<BALL_MAX_COUNT; i++){
			if(ball[i].alive　&& !ball[i].distortionF){
				switch(ball[i].color){
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
				ctx.beginPath();
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, 2*Math.PI, true);
				ctx.fill()
			}
		}
		for(i=0; i<BALL_MAX_COUNT; i++){
			if(ball[i].alive){
				ctx.beginPath()
				ctx.arc(ball[i].position.x, ball[i].position.y, 2, 0, 2* Math.PI, true);
				ctx.fillStyle = GRAY;
				ctx.fill();
			}
		}
		//自球の各点の描写
		if(lCounter){
			ctx.beginPath();
			/*var px = ball[0].dot[lCounter%ball[i].dot.length].x;
			var py = ball[0].dot[lCounter%ball[i].dot.length].y;
			ctx.arc(px, py, 4, 0, Math.PI* 2, true);*/
			ctx.arc(ball[0].position.x, ball[0].position.y, ball[0].size, 0, 2*Math.PI, true)
			ctx.fillStyle = GRAY;
			ctx.fill();
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
		if(lineLF && (ball[0].size + 19 < length)){
 		DOTTED_LINE_COLOR = BLUE;
			ball[0].strokeDottedLine();
		}

		if(lineRF && (ball[0].size + 19 < length)){
 		DOTTED_LINE_COLOR = RED;
			ball[0].strokeDottedLine();
		}

		if(pauseF){
			ctx.beginPath();
			ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2, true);
			ctx.fillStyle = "rgba(  0,   0, 000, 0.5)";
			ctx.fill();
			
			ctx.fillStyle = DARK_RED;
			ctx.font = "60px 'MSゴシック'"
			ctx.fillText("PAUSE", screenCanvas.width / 2 - 94, screenCanvas.height / 3);
		}



console.log(ball[0], ball[0].collisionC)




		//その他の設定----------------------------------------------------------------------------------------------------
		//キーコード初期化
		//kc = null;

		//HTMLを更新
		info.innerHTML = "PLAYER WEIGHT: " + ball[0].weight +
				 "<br>PLAYER SIZE &nbsp;&nbsp;&nbsp;&nbsp;:" + ball[0].size +
				 "<br>移動　WASD <br>青玉発射 左クリック　赤玉発射　右クリック" +
				 "<br>発射角度調整　SHIFT<br>デバッグ用TFGH, L, C,"




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
	keyCode[kc] = true;
	if(keyCode[27]) run = false;
};

var keyUp = function(e){
	keyCode[e.keyCode] = false;
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
	keyCode.length = 0;
};