// -global ------------------------------------------------------------------------------------------------------------------------

var screenCanvas;
var run = true;
var fps = 1000 / 30;
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

// -const -------------------------------------------------------------------------------------------------------------------------

var BALL_MAX_COUNT = 1023;
var OBJECT_MAX_COUNT = 15;
var PLAYER_COLOR  　　= "rgba(  0, 255,   0, 0.85)";//緑
var BALL_COLOR_01 　　= "rgba(  0,   0, 255, 0.60)";//青
var BALL_COLOR_02　　 = "rgba(255,   0,   0, 0.60)";//赤
var WALL_COLOR    　　= "rgba( 85,  85,  85, 0.75)";//グレー
var DOTTED_LINE_COLOR = "rgba(255, 140,   0, 0.80)";//オレンジ
var TEXT_COLOR_RED    = "rgba(200,   0, 100, 0.80)";//暗赤



// -main --------------------------------------------------------------------------------------------------------------------------

//ページ読み込み時に起動するfunciton
window.onload = function(){

	//ローカル変数の定義
	var i, j;
	var p = new Point();
	var v = new Point();
	vector = new Point();



	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = 512;
	screenCanvas.height = 512;


	//2dコンテキスト
	ctx = screenCanvas.getContext("2d");


	//右クリックの禁止
	screenCanvas.addEventListener("contextmenu", function(e){
		e.preventDefault();
	 }, false);

	//イベントの登録
	screenCanvas.addEventListener("mousemove", mouseMove, true);
	screenCanvas.addEventListener("mousedown", mouseDown, true);
	screenCanvas.addEventListener("mouseup", mouseUp, true);
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
				if(keyCode[65]) ball[0].velocity.x = -3;
				if(keyCode[87]) ball[0].velocity.y =  5;
				if(keyCode[68]) ball[0].velocity.x =  3;
				if(keyCode[83]) ball[0].velocity.x *= 0.95;
			}


			if(!keyCode[65] && !keyCode[68]) ball[0].velocity.x *= 0.85

			//デバッグモード
			/*if(keyCode[80]){
				var wallP = new Array(2);
				if(prepLF){
					for(i = 0; i <= 3; i++){
						if(!wallP[i]){
							wallP[i] = new Point();
							wallP[i].x = mouse.x;
							wallP[i].y = mouse.y;
						}
						if(wallP[i].x){
							for(j = 1; j < OBJECT_MAX_COUNT; j++){
								if(!object[j].alive){
								object[j].set(wallP[0].x, wallP[0].y, wallP[0].x + 20, wallP[0].y + 20, 0)
								}
							}
						}
					}
				}
			}*/
			


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
						var c = Math.floor(Math.random() * 2) + 1;
						ball[i].set(p, s, v, c);
						creatF = false;
						break;
					}
				}
			}

//test
object[0].set( 60, 458, 100,  10, Math.PI / 15, 0);
object[1].set(100, 228,  80,  80, Math.PI / 8, 1);
object[2].set(300, 450, 190,  20, 0, 2);
object[3].set(360,  40,  30, 300, 0.1, 3);


			//点線フラグ
			if(prepLF) lineLF = true;
			if(prepRF) lineRF = true;

			//青球発射
			if(fireLF){
				for(i = 1; i < BALL_MAX_COUNT; i++){
					if(!ball[i].alive && ball[0].weight > 225){
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
					if(!ball[i].alive && ball[0].weight > 225){
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

			//自由落下
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive){
					ball[i].fall();
				}
			}

			//速度を位置情報に変換
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive){
					ball[i].move();
				}
			}

			//地面との衝突
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive){
					if(ball[i].position.y >= screenCanvas.height - 15 - ball[i].size){
						//反発係数の設定とめり込んだ値を計算
						var excess = ball[i].position.y - (screenCanvas.height - 15 - ball[i].size);

						ball[i].velocity.y += Math.sqrt(2 * 0.3 * e * excess) + 0.52 ;
						ball[i].position.y = screenCanvas.height - 15 - ball[i].size;
						ball[i].velocity.y *= -e;
					}
				}
			}

			//壁との衝突
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive){
					if(ball[i].position.x <= ball[i].size){
						ball[i].position.x = ball[i].size;
						ball[i].velocity.x *= -0.9;
					}
					else if(ball[i].position.x >= screenCanvas.width - ball[i].size){
						ball[i].position.x = screenCanvas.width - ball[i].size;
						ball[i].velocity.x *= -0.9;
					}
				}
			}

			//壁との衝突
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(ball[i].alive){
					for(j = 0; j < OBJECT_MAX_COUNT; j++){
						if(ball[i].color != object[j].color){
							object[j].collision(ball[i]);
						}
					}
				}
			};

			//ボール同士の衝突
			for(i = 0; i < BALL_MAX_COUNT; i++){
				for(j = i + 1; j < BALL_MAX_COUNT; j++){
					if(ball[i].alive && ball[j].alive){
						p = ball[j].position.distance(ball[i].position);
						if( (p.length() < ball[j].size + ball[i].size) && (ball[i].color + ball[j].color == 3|| !i && ball[0].size < ball[j].size + 1) ){
							//ボールのめり込んだ位置関係を元に戻す
							ball[j].positionCorrect(ball[i]);
							//速度ベクトルを重心方向と垂直な方向に分離し、衝突後の速度を求める
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

		//地面の描画
		ctx.beginPath();
		ctx.fillStyle = WALL_COLOR;
		ctx.fillRect(0, screenCanvas.height - 15, screenCanvas.width, 10);

		//壁の描画
		for(i = 0;i <= OBJECT_MAX_COUNT; i++){
			if(object[i].alive){
				switch (object[i].color){
				case 0:
					object[i].draw();
					ctx.fillStyle = PLAYER_COLOR;
					ctx.fill();
					break;
				case 1:
					object[i].draw();
					ctx.fillStyle = BALL_COLOR_01;
					ctx.fill();
					break;
				case 2:
					object[i].draw();
					ctx.fillStyle = BALL_COLOR_02;
					ctx.fill();
					break;
				default:
					object[i].draw();
					ctx.fillStyle = WALL_COLOR;
					ctx.fill();
					break;
				}
			}
		};

		//動体の描画-------------------------------------------------

		//自機の描画
		ctx.beginPath();
		ctx.arc(ball[0].position.x, ball[0].position.y, ball[0].size, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fillStyle = PLAYER_COLOR;
		ctx.fill();

		//他機の描画

		//青丸の描画
		ctx.beginPath();
		for(i = 1; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && ball[i].color ===1){
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
			}
		}
		ctx.fillStyle = BALL_COLOR_01;
		ctx.fill();

		//赤丸の描画
		ctx.beginPath();
		for(i = 1; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && ball[i].color === 2){
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
			}
		}
		ctx.fillStyle = BALL_COLOR_02;
		ctx.fill();

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
		ctx.fillStyle = PLAYER_COLOR;
		ctx.fill();
 
		//点線の描画
		if(lineLF && (ball[0].size + 19 < length)){
 		DOTTED_LINE_COLOR = BALL_COLOR_01;
			ball[0].strokeDottedLine();
		}

		if(lineRF && (ball[0].size + 19 < length)){
 		DOTTED_LINE_COLOR = BALL_COLOR_02;
			ball[0].strokeDottedLine();
		}

		if(pauseF){
			ctx.beginPath();
			ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2, true);
			ctx.fillStyle = "rgba(  0,   0, 000, 0.5)";
			ctx.fill();
			}

		if(pauseF){
			ctx.fillStyle = TEXT_COLOR_RED;
			ctx.font = "60px 'MSゴシック'"
			ctx.fillText("PAUSE", screenCanvas.width / 2 - 94, screenCanvas.height / 3);
		}

		//その他の設定----------------------------------------------------------------------------------------------------
		//キーコード初期化
		//kc = null;

		//HTMLを更新
		info.innerHTML = "PLAYER WEIGHT: " + ball[0].weight +
				 "<br>PLAYER SIZE &nbsp;&nbsp;&nbsp;&nbsp;:" + ball[0].size




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
