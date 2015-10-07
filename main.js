// -global ------------------------------------------------------------------------------------------------------------------------

var screenCanvas;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var counter;
var creatF = false;
var prepF = false;
var fireF = false;
var ck;




// -const -------------------------------------------------------------------------------------------------------------------------

var BALL_MAX_COUNT = 1024;
var PLAYER_COLOR  　　= "rgba(  0, 255,   0, 0.85)";//緑
var BALL_COLOR_01 　　= "rgba(  0,   0, 255, 0.60)";//青
var BALL_COLOR_02　　 = "rgba(255,   0,   0, 0.60)";//赤
var WALL_COLOR    　　= "rgba( 85,  85,  85, 0.75)";//グレー
var DOTTED_LINE_COLOR = "rgba(255, 140,   0, 0.80)";//オレンジ




// -main --------------------------------------------------------------------------------------------------------------------------

//ページ読み込み時に起動するfunciton
window.onload = function(){

	//ローカル変数の定義
	var i, j;
	var p = new Point();
	var v = new Point();


	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = 256;
	screenCanvas.height = 256;


	//2dコンテキスト
	ctx = screenCanvas.getContext("2d");


	//イベントの登録
	screenCanvas.addEventListener("mousemove", mouseMove, false);
	screenCanvas.addEventListener("mousedown", mouseDown, false);
	window.addEventListener("mouseup", mouseUp, false);
	window.addEventListener("keydown", keyDown, false);

	//エレメント登録
	info = document.getElementById("info");


	//球初期化
	var ball= new Array(BALL_MAX_COUNT);
	for(i = 0; i < BALL_MAX_COUNT; i++){
		ball[i] = new Character;
	}


	//自機初期化
	p.x = screenCanvas.width / 2;
	p.y = screenCanvas.height / 2 -15;
	v.x = 0;
	v.y = 0;
	ball[0].set(p, 10, v);

	//レンダリング処理を呼び出す-----------------------------------------------------------------------------------------------

	(function(){
		//カcウンターの値を増やす
		counter ++;





		//入力による変更---------------------------------------------------------------------------------------------------

		if(ck){
			console.log("入力されたキーコードは " + ck)

			if(ck === 67) creatF = true;

		//キーコード初期化
		ck = null;
		}





		//フラグ管理-------------------------------------------------------------------------------------------------------

		//他機生成
		if(creatF){
			for(i = 0; i < BALL_MAX_COUNT; i++){
				if(!ball[i].alive){
					p.x = mouse.x;
					p.y = mouse.y;
					v.x = 0;
					v.y = 0;
					var s = Math.floor(Math.random() * 4) + 6;
					var c = Math.floor(Math.random() * 2) + 1;
					ball[i].set(p, s, v, c);
					creatF = false;
					break;
				}
			}
		}



		//球発射
		if(fireF){
			console.log(1);
			prepF = false;
			fireF = false;
		}



		//物体の動きを制御-------------------------------------------------------------------------------------------------

		//自由落下
		for(i = 0; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && !ball[i].absorption){
				ball[i].fall();
			}
		}

		//速度を位置情報に変換
		for(i = 0; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && !ball[i].absorption){
				ball[i].move();
			}
		}

		//地面との衝突
		for(i = 0; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && !ball[i].absorption){
				if(ball[i].position.y >= 243 - ball[i].size){
					//反発係数の設定とめり込んだ値を計算
					var e = 0.6;
					var excess = ball[i].position.y - (243 - ball[i].size);

					ball[i].velocity.y += Math.sqrt(2 * 0.3 * e * excess) + 0.52 ;
					ball[i].position.y = 243 - ball[i].size;
					ball[i].velocity.y *= -e;
				}
			}
		}

		//壁との衝突
		for(i = 0; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && !ball[i].absorption){
				if(ball[i].position.x <= ball[i].size){
					ball[i].position.x = ball[i].size;
					ball[i].velocity.x *= -0.9;
				}
				else if(ball[i].position.x >= 256 - ball[i].size){
					ball[i].position.x = 256 - ball[i].size;
					ball[i].velocity.x *= -0.9;
				}
			}
		}

		//ボール同士の衝突
		for(i = 0; i < BALL_MAX_COUNT; i++){
			for(j = i + 1; j < BALL_MAX_COUNT; j++){
				if(ball[i].alive && !ball[i].absorption && ball[j].alive && !ball[j].absorption){
					p = ball[j].position.distance(ball[i].position);
					if( (p.length() < ball[j].size + ball[i].size) && (ball[i].color + ball[j].color === 3 || !i && ball[0].size < ball[j].size + 1) ){
						//ボールのめり込んだ位置関係を元に戻す
						ball[j].positionCorrect(ball[i]);
						//速度ベクトルを重心方向と垂直な方向に分離し、衝突後の速度を求める
						ball[j].collisionCalculate(ball[i]);
					}
					else if( p.length() < ball[j].size + ball[i].size - 2 && ball[i].color + ball[j].color !== 3){
						if(!i && ball[0].size < ball[j].size + 1){
							break;
						}
						//ボール同士を結合する
						ball[j].absorptionCalculate(ball[i]);
						
					}
				}
			}
		}





		//画面の描画を行う-------------------------------------------------------------------------------------------------


		//スクリーンクリア
		ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

		//背景の描画-------------------------------------------------

		//地面の描画
		ctx.beginPath();
		ctx.fillStyle = WALL_COLOR;
		ctx.fillRect(0, 243, screenCanvas.width, 10);

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
			if(ball[i].alive && !ball[i].absorption && ball[i].color ===1){
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
			}
		}
		ctx.fillStyle = BALL_COLOR_01;
		ctx.fill();

		//赤丸の描画
		ctx.beginPath();
		for(i = 1; i < BALL_MAX_COUNT; i++){
			if(ball[i].alive && !ball[i].absorption && ball[i].color === 2){
				ctx.arc(ball[i].position.x, ball[i].position.y, ball[i].size, 0, Math.PI * 2, true);
				ctx.closePath();
			}
		}
		ctx.fillStyle = BALL_COLOR_02;
		ctx.fill();

		//点線の描画
		if(prepF){
			ball[0].strokeDottedLine(mouse);
		}

		//HTMLを更新
		info.innerHTML = "PLAYER SIZE: " + Math.floor(ball[0].weight) + "      小数点表示で " + ball[0].size;



		//フラグにより再起呼び出し-----------------------------------------------------------------------------------------
		if(run){setTimeout(arguments.callee, fps);}
	})();
};




// -event--------------------------------------------------------------------------------------------------------------------------

var mouseMove = function(event){
	//マウスカーソルの座標の更新
	mouse.x = event.clientX - screenCanvas.offsetLeft;
	mouse.y = event.clientY - screenCanvas.offsetTop;
}

var keyDown = function(event){
	//キーコードを取得
	ck = event.keyCode;

	//Escキーが押されていたらフラグを降ろす
	if(ck === 27)run = false;
}

var mouseDown = function(event){
	prepF = true;
console.log(fireF)
}

var mouseUp = function(event){
	fireF = true;
}
