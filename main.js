﻿// -global ------------------------------------------------------------------------------------------------------------------------

var screenCanvas;
var run = true;
var fps = 1000 / 60;
var counter = 0;
var mouse = new Point();
var ctx;
var keyCode1 = new Array();
var keyCode2 = new Array();
var length;
var radian;
var radNum = 0;
var leftDown = false;
var rightDown = false;
var leftUp = false;
var rightUp = false;
var pauseFlag = false;
var clearFlag = false;
var jumpFlag1;
var jumpFlag2;
var jumpFrame = 0;
var creatFlag = false;
var nowStage = 0;
var debugFlag = "save";
var saveCode ="\n";
var sizeRate = 1;

var lCounter = 0;
var test = new Array();

// -const ----------------------------------=========------------------------------------------------------

var cos = Math.cos;
var sin = Math.sin;
var tan = Math.tan;
var sqrt = Math.sqrt;
var PI = Math.PI;
var PI2 = Math.PI*2;
var PI_2 = Math.PI/2;
var PI_4 = Math.PI/4;
var SQRT2 = 1.41421356237;
var BALL_MAX_COUNT = 512;
var WALL_MAX_COUNT = 31;
var STAR_MAX_COUNT = 3;
var CONVERTER_MAX_COUNT = 10;
var CONFETTI_MAX_COUNT = 180;
var PAPERTAPE_MAX_COUNT = 8;
var maxVel = 30;
var coefficientRestitution01 = 0.6;
var coefficientRestitution02 = 0.9;
var color = new Array();
var P0 = new Point();
color[00] = "rgba(  0, 255,   0, 0.75)";//緑
color[01]　= "rgba(  0,   0, 255, 0.75)";//青
color[02] = "rgba(255,   0,   0, 0.75)";//赤
color[03]　= "rgba( 85,  85,  85, 0.80)";//グレー
color[04] = "rgba(255, 255, 255, 1.00)";//白
color[05] = "rgba(255, 140,   0, 0.80)";//オレンジ
color[06] = "rgba(200,   0, 100, 0.80)";//暗赤
color[07] = "rgba(000, 000, 000, 1.00)";//黒
color[09] = "rgba(000, 000, 000, 0.00)";//透明
color[10] = "rgba( 60, 255,  60, 0.30)";//薄緑
color[11]　= "rgba( 60,  60, 255, 0.30)";//薄青
color[12] = "rgba(255,  60,  60, 0.30)";//薄赤
color[13]　= "rgba(115, 115, 115, 0.30)";//薄グレー
color[14] = "rgba(255, 255, 255, 0.30)";//白
color[15] = "rgba(255, 140,   0, 0.80)";//薄オレンジ
color[16] = "rgba(200,   0, 100, 0.80)";//薄暗赤
color[17] = "rgba(000, 000, 000, 0.30)";//黒
color[20] = "rgba(  0, 140,   0, 0.85)";//濃緑
color[21] = "rgba(  0,   0, 140, 0.85)";//濃青
color[22] = "rgba(140,   0,   0, 0.85)";//濃赤
color[23] = "rgba( 20,  20,  20, 0.85)";//濃灰
color[24] = "rgba(255, 255, 255, 1.00)";//濃白
color[25] = "rgba(255, 140,   0, 0.80)";//濃オレンジ
color[26] = "rgba(200,   0, 100, 0.80)";//濃暗赤
color[27] = "rgba(000, 000, 000, 1.00)";//濃黒
color[30] = "rgba(  0, 255,   0, "      //緑
color[31] = "rgba(  0,   0, 255, "      //青
color[32] = "rgba(255,   0,   0, "      //赤



// -main -------------------------------===----------------------------------------------------------------

//ページ読み込み時に起動するfunciton
window.onload = function(){

	//ローカル変数の定義
	var p = new Point();
	vector = new Point();
	var i; var j; var k; var l;


	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = window.innerWidth;
	screenCanvas.height = window.innerHeight;
	scrWid0 = 10;
	scrWid1 = 1600;
	scrHei0 = 0;
	scrHei1 = 700;
	scrHei2 = 200;
	var canvasCenter = new Point();
	canvasCenter.x = scrWid1/2;
	canvasCenter.y = scrHei1/2;


	//2dコンテキスト
	ctx = screenCanvas.getContext("2d");


	//右クリックの禁止とドラッグの禁止
	window.addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);
window.onscroll = function( e ) {
scrollTo( windowScrollX, windowScrollY );
};

	//イベントの登録
	window.addEventListener("mousemove", mouseMove, true);
	window.addEventListener("mousedown", mouseDown, true);
	window.addEventListener("mouseup", mouseUp, true);
	window.addEventListener("keydown", keyDown, true);
	window.addEventListener("keyup", keyUp, true);


	//エレメント登録
	info = document.getElementById("info");


	//球初期化
	var ball = new Array(BALL_MAX_COUNT);
	for(i=0; i<ball.length; i++){
		ball[i] = new Character;
		ball[i].num = i;
	};
	dotLen = ball[0].dot.length;

	//壁初期化
	var wall = new Array(WALL_MAX_COUNT);
	for(i=0; i<wall.length; i++){
		wall[i] = new Wall;
		wall[i].num = i;
	};
	
	//星初期化
	var star = new Array(STAR_MAX_COUNT);
	for(i=0; i<star.length; i++){
		star[i] = new Star;
		star[i].num = i;
	}

	//変換器初期化
	var converter = new Array(CONVERTER_MAX_COUNT);
	for(i=0; i<converter.length; i++){
		converter[i] = new Converter;
		converter[i].num = i;
	}
	
	//紙吹雪初期化
	var confetti = new Array(CONFETTI_MAX_COUNT);
	for(i=0; i<confetti.length; i++){
		confetti[i] = new Confetti;
		confetti[i].num = i;
	}
	
	//紙テープ初期化
	var paperTape = new Array(PAPERTAPE_MAX_COUNT);
	for(i=0; i<paperTape.length; i++){
		paperTape[i] = new PaperTape;
	}
	
	console.log(converter)

	//自機初期化
	p.x = scrWid1/2;
	p.y = scrHei1/2-　15;
	ball[0].set(p, 15, P0, 0);
	
	//初期ステージ読み込み
	stage00(ball, wall, star, converter);
//レンダリング処理を呼び出す-----------------------------------------------------------------------------------------------
//loadCode();
(function(){
	
	//カウンターの値をインクリメントする
	counter++;
	screenCanvas.width = window.innerWidth;
	screenCanvas.height = window.innerHeight;
	
	//デバッグ用に押されているキーコードを保存する
	if(keyCode1[32] && !keyCode2[32]) pauseFlag = !pauseFlag;
	saveCode += '"' + counter + '"'
	
	for(i=0; i<keyCode1.length; i++){
		if(keyCode1[i] == true) saveCode += '+",' + i + '"';
	}
	
	saveCode += '+"' + '\\n"+' + "\n";
	
	
	if(!pauseFlag){

		//入力による変更-------------------------------------------------------------------------------------------
		
		if(keyCode1[67]) creatFlag = 1;
		if(keyCode1[88] && !keyCode2[88]) creatFlag = 1;
		if(keyCode1[86]) creatFlag = 2;
		if(keyCode1[66] && !keyCode2[66]) creatFlag = 2;
		if(keyCode1[65]) ball[0].vel.x += -0.3;
		if(ball[0].vel.x < -4) ball[0].vel.x = -4;
		jumpFlag1 = false;
		if(keyCode1[87]&& jumpFlag2) jumpFlag1 = true;
		if(!keyCode1[87]) jumpFlag2 = true;
		if(keyCode1[68]) ball[0].vel.x +=  0.3;
		if(ball[0].vel.x >  4) ball[0].vel.x =  4;
		if(keyCode1[83]) ball[0].vel.x =  0;
		
		if(keyCode1[70]) ball[0].vel.x = -3;
		if(keyCode1[84]) ball[0].vel.y = -3;
		if(keyCode1[72]) ball[0].vel.x =  3;

		if(keyCode1[39]) ball[0].pos.x += 0.3;
		if(keyCode1[37]) ball[0].pos.x -= 0.3;

		if(keyCode1[85]) fps = 2000 / 1 ;
		if(keyCode1[73]) fps = 1000 / 2 ;
		if(keyCode1[79]) fps = 1000 / 10;
		if(keyCode1[80]) fps = 1000 / 60;
		if(keyCode1[192]) fps /= 1.5;
		if(keyCode1[76]) lCounter++
		
		if(keyCode1[81]) {
			ball[0].pos = mouse.add(P0);
			ball[0].vel = P0.add(P0);
		}
		if(keyCode1[90] && !keyCode2[90]){
			ball[0].size = 35;
			ball[0].weight = 1225;
		}

		if(!keyCode1[65] && !keyCode1[68]) ball[0].vel.x *= 0.85;
		
		//ステージ読み込み================================================================================================
		if(keyCode1[48]) stage00(ball, wall, star, converter);
		if(keyCode1[49]) stage01(ball, wall, star, converter);
		if(keyCode1[50]) stage02(ball, wall, star, converter);
		if(keyCode1[51]) stage03(ball, wall, star, converter);
		if(keyCode1[52]) stage04(ball, wall, star, converter);
		if(keyCode1[53]) stage05(ball, wall, star, converter);
		
		//ステージごとのフラグ管理
		//ステージ1について
		if(nowStage == 1){
			if(ball[0].pos.x > scrWid1) stage02(ball, wall, star, converter);
			for(i=0; i<ball.length; i++){
				if(ball[i].pos.x > 755 && ball[i].pos.y>220 && ball[i].pos.y < 260) wall[4].isAlive = false;
			}
		}


		//フラグ管理-----------------------------------------------------------------------------------------------

		//他機生成
		if(creatFlag && (counter%4==0 || fps != 1000/60)){
			for(i=1; i<ball.length; i++){
				if(!ball[i].isVisible){
					p = mouse.add(P0);
					var s = 10;//Math.floor(Math.random() * 4) + 6;
					ball[i].set(p, s, P0, creatFlag);
					creatFlag = false;
					break;
				}
			}
		}
		//クリック時の反応について
		if(leftDown && leftUp && ball[0].isAlive){
			for(i=1; i<ball.length; i++){
				if(!ball[i].isVisible){
					ball[i].shoot(ball[0], 1);
					break;
				}
			}
			leftDown = false;
			leftUp = false;
		}
		if(rightDown && rightUp && ball[0].isAlive){
			for(i=1; i<ball.length; i++){
				if(!ball[i].isVisible){
					ball[i].shoot(ball[0], 2);
					break;
				}
			}
			rightDown = false;
			rightUp = false;
		}
		//ジャンプするか否かについて
		if(jumpFlag1 && jumpFrame+3<counter){
			var max = 0;
			var rad;
			for(i=0; i<ball[0].contactCnt01; i++){
				rad = mod(ball[0].contact[i].tangent, PI2);
				max = Math.max(-cos(rad), max);
			}
			for(i=6; i<6+ball[0].contactCnt02; i++){
				rad = mod(ball[0].contact[i].tangent, PI2);
				max = Math.max(-cos(rad), max);
			}
			if(max>0.3){
				ball[0].vel.y = -7*max;
				jumpFlag2 = false;
				jumpFrame = counter;
			}
		}
		
		//物体の情報を更新==================================================================================
		//壁の情報を反映、初期化
		for(i=0; i<ball.length; i++){
			if(ball[i].isVisible){
				//重力を反映
				ball[i].fall();
				//もし変形しているのであれば摩擦で減速する
				if(ball[i].isDistorted){
					var f = Math.min(Math.max(1.86- ball[i].arc/ball[i].size*3, 0.65), 0.98)
					ball[i].vel.x *= f;
					ball[i].vel.y *= f;
				}
				//速度を位置情報に変換
				ball[i].move();
				if(ball[i].isAlive){
					//衝突カウンターと接点、歪フラグを初期化
					ball[i].contactCnt01 = 0;
					ball[i].contactCnt02 = 0;
					ball[i].isDistort = false;
					ball[i].arc = 0;
					for(j=0; j<ball[i].contact.length; j++){
						ball[i].contactInitialize(j);
						ball[i].bezierInitialize(j);
					}
					//周りの点の情報を更新
					if(!ball[i].isDistorted){
						for(j=0; j<dotLen; j++){
							ball[i].dot[j].rel = angle(j* PI2/ dotLen).mul(ball[i].size);
							ball[i].dot[j].abs = ball[i].pos.add(ball[i].dot[j].rel);
							ball[i].dot[j].rad = atan2(ball[i].dot[j].rel);
						}
					}
					else{
						for(j=0; j<dotLen; j++){
							ball[i].dot[j].abs = ball[i].pos.add(ball[i].dot[j].rel);
							ball[i].dot[j].rad = atan2(ball[i].dot[j].rel);
						}
					}
					//歪円当り判定チャンスをtrueにしておく
					for(j=0; j<ball[i].infoWithWall.length; j++){
						ball[i].infoWithWall[j].canCollide = true;
					}
				}
			}
		}
		//壁の情報反映、初期化
		for(i=0; i<wall.length; i++){
			if(wall[i].isAlive){
				//壁の速度を位置情報に変換
				wall[i].move(ball, wall);
				for(j=0; j<wall[i].contactCnt01; j++){
					wall[i].contactInitialize(j);
				}
			}
			wall[i].contactCnt01 = 0;
		}
		
		//星の情報反映
		for(i=0; i<star.length; i++){
			if(star[i].condition=="rotation"){
				//星がその場で回転するようにする。一回転したら止まる
				star[i].rad += PI/6;
				if(star[i].rad >= PI2){
					star[i].condition = "moving"
				}
			}
			else if(star[i].condition=="moving"){
				//所定の位置まで星が移動するようにする
				star[i].pos.x = (star[i].homePos.x+ 2*star[i].pos.x)/3;
				star[i].pos.y = (star[i].homePos.y+ 2*star[i].pos.y)/3;
				if(star[i].pos.sub(star[i].homePos).norm()<0.1){
					star[i].pos = star[i].homePos.add(P0);
					star[i].condition = "scaling"
					star[i].homeFlame = counter;
				}
			}
			else if(star[i].condition=="scaling"){
				//星が拡大縮小するようになる
				star[i].div = 5.5 - 1*sin((counter- star[i].homeFlame)/15*PI2)
				if(counter- star[i].homeFlame> 23){
					star[i].condition = "home"
					star[i].div = 5.5
				}
			}
			if(star[i].isBlink==true){
				star[i].blink();
			}
		}
		
		//変換器の情報反映
		for(i=0; i<converter.length; i++){
			if(converter[i].isAlive==true){
				converter[i].counter++;
				//その時の変換器の色によってランプの数を変化させる
				if(converter[i].color==3) converter[i].rampCnt = 0;
				converter[i].color = 3;
				for(j=0; j<ball.length; j++){
					if(ball[j].isAlive==true){
						converter[i].attract(ball[j], wall);
					}
				}
			}
		}
		
		//紙吹雪の情報反映
		for(i=0; i<confetti.length; i++){
			if(confetti[i].isAlive){
				confetti[i].move();
				if(confetti[i].pos.y>scrHei1+10) confetti[i].isAlive = false;
			}
		}
		
		//紙テープの情報反映
		for(i=0; i<paperTape.length; i++){
			if(paperTape[i].isAlive){
				paperTape[i].move();
			}
		}
		
		//演出の情報反映
		if((star[0].isAlive==false)&&(star[1].isAlive==false)&&(star[2].isAlive==false)&&(clearFlag==false)){

			//紙吹雪の発射
			for(i=0; i<confetti.length/2; i++){
				confetti[i].fire(-100, scrHei1, 1, i%7, i%13);
			}for(i=Math.ceil(confetti.length/2); i<confetti.length; i++){
				confetti[i].fire(scrWid1+100, scrHei1, -1, i%7, i%13);
			}
			//紙テープの発射
			for(i=0; i<paperTape.length/2; i++){
				paperTape[i].fire(-100, scrHei1, 1);
			}
			for(i=Math.ceil(paperTape.length/2); i<paperTape.length; i++){
				paperTape[i].fire(scrWid1+100, scrHei1, -1);
			}
			for(i=0; i<confetti.length/2; i++){
				confetti[i].fire(-100, scrHei1, 1, i%7, i%13);
			}for(i=confetti.length/2; i<confetti.length; i++){
				confetti[i].fire(scrWid1+100, scrHei1, -1, i%7, i%13);

			}
			clearFlag = true;
		}
		
		//吸収判定をとる=====================================================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				//まずは星との吸収判定をとる
				for(j=0; j<star.length; j++){
					if(star[j].isAlive==true){
						star[j].detectCollision(ball[i]);
					}
				}
				for(j=i+1; j<ball.length; j++){
					if(ball[j].isAlive && ball[i].pos.sub(ball[j].pos).norm() < (ball[i].size+ball[j].size)*2){
						//ここまではお互いの球が生きていて十分に近いかの判定。ここからは2つの球の色から吸収するのか反発するのかの計算
						if(ball[i].color == ball[j].color || ((i == 0) && (ball[i].size > ball[j].size))){
							//この場合は吸収判定になる
							if(!ball[i].isDistorted && !ball[j].isDistorted){
								//ここはどちらも正円だった場合の当り判定
								ball[i].detectAbsorption01(ball[j]);
							}
							else if(ball[i].isDistorted && !ball[j].isDistorted){
								//ここは若い番号が歪円、遅い番号が正円だった場合
								ball[i].detectAbsorption02(ball[j], true);
							}
							else if(!ball[i].isDistorted && ball[j].isDistorted){
								//ここは若い番号が正円、遅い番号が歪円だった場合
								ball[j].detectAbsorption02(ball[i], false);
							}
							else{
								//ここはどちらも歪円だった場合
								ball[i].detectAbsorption03(ball[j])
							}
						}
					}
				}
			}
		}
		
		//衝突判定一回目(まずは正円同士で判定を取る)===========================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				for(j=i+1; j<ball.length; j++){
					if(ball[j].isAlive && ball[i].color != ball[j].color && !(i == 0 && ball[i].size > ball[j].size)){
						ball[i].detectCollision01(ball[j]);
					}
				}
			}
		}
		//衝突判定二回目(次に歪円を除いた場合の判定を取る)
		for(i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				//衝突判定をまとめた関数に入れてみる
				ball[i].collisionCheck(ball, wall, false);
				//ほぼ同じ位置にある接点を排除する
				ball[i].checkContact(ball, wall);
				//得られた接点の数からボールの状態を場合分けする
				//接点が無い場合
				if(ball[i].contactCnt01 == 0){
					ball[i].contactCnt01Temp = ball[i].contactCnt01;
					continue;
				}
				//接点が一つの場合
				else if(ball[i].contactCnt01 == 1){
					ball[i].positionCorrection();
					ball[i].collisionCheck(ball, wall, true);
					ball[i].checkContact(ball, wall);
					if(ball[i].contactCnt01 > 1){
						ball[i].checkDistortion(ball, wall);
						ball[i].detectDistortion01(ball, wall);
					}
				}
				//接点が二つ以上の場合
				else {
					ball[i].checkDistortion(ball, wall);
					if(ball[i].contactCnt01 == 1){
						ball[i].positionCorrection();
						ball[i].collisionCheck(ball, wall, true);
						ball[i].checkContact(ball, wall);
						if(ball[i].contactCnt01 > 1){
							ball[i].checkDistortion(ball, wall);
							ball[i].detectDistortion01(ball, wall);
						}
					}
					else{
						ball[i].detectDistortion01(ball, wall);
					}
				}
				ball[i].contactCnt01Temp = ball[i].contactCnt01;
			}
		}
		//衝突判定三回目(歪円の場合の判定を取る)==============================================================
		for(i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				if(ball[i].isDistort || ball[i].isDistorted){
					//この場合はボールは歪円
					for(j=i+1; j<ball.length; j++){
						if(ball[j].isAlive && ball[i].color != ball[j].color && !(i == 0 && ball[i].size > ball[j].size)){
							if(!ball[j].isDistort || !ball[i].isDistorted) ball[i].detectCollision02(ball[j], true);
							else　ball[i].detectCollision03(ball[j]);
						}
					}
					//次に壁との当り判定
					for(j=0; j<wall.length; j++){
						if(wall[j].isAlive && ball[i].color != wall[j].color) wall[j].detectCollision02(ball[i], ball, wall);
					}
					ball[i].checkContact(ball, wall);;
					if(ball[i].contactCnt01 > 0 && ball[i].contactCnt02 > 0){
						ball[i].detectDistortion02(ball);
					}
				}
			}
		}
		//当り判定終わり=====================================================================================

		//とられた接点から衝突の計算を行う
		for(i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				if(ball[i].contactCnt01Temp < 2 && ball[i].contactCnt01 >1){
					ball[i].checkDistortion(ball, wall);
				}
			}
		}
		for(i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				if(ball[i].contactCnt01Temp < 2 && ball[i].contactCnt01 >1){
					ball[i].detectDistortion01(ball, wall);
				}
				if(ball[i].contactCnt01Temp < 1 && ball[i].contactCnt01==1) ball[i].positionCorrection();
				ball[i].bound(ball, wall);
				ball[i].calcuDotInfo(ball[i].pos)
			}
		}
		for(i=0; i<wall.length; i++){
			if(wall[i].isAlive){
				wall[i].action(ball, wall);
			}
		}

		//物体の処理演算終わり===============================================================================
		
		if(!ball[0].isDistort || !ball[0].isDistorted){
			for(i=0; i<dotLen; i++){
				ball[0].dot[i].rel = angle(i* PI2/ dotLen).mul(ball[0].size);
				ball[0].dot[i].abs = ball[0].pos.add(ball[0].dot[i].rel);
				ball[0].dot[i].rad = atan2(ball[0].dot[i].rel);
			}
		}
		ball[0].calcuDotInfo(ball[0].pos);
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

	//画面の外遠くまで行ったかサイズがマイナスになったらボールを死んだことにする
	for(i=0; i<ball.length; i++){
		if(ball[i].isVisible){
			if(ball[i].pos.sub(canvasCenter).norm() > scrWid1
			|| ball[i].weight < 0) ball[i].initialize();
		}
	}
	//画面の描画を行う-------------------------------------------------------------------------------------------------
	//画面サイズを現在のウィンドウサイズに合わせる
	sizeRate = Math.min(window.innerWidth/ (scrWid1), window.innerHeight/ (scrHei1+ scrHei2))
	sr = sizeRate;
	scrWid0 = (window.innerWidth- scrWid1*sr)/2;
	scrHei0 = (window.innerHeight- (scrHei1+ scrHei2)*sr)/2;
		
	//スクリーンクリア
	ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height)
	// ctx.fillStyle = "gray";
	// ctx.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
	
	//背景の描画-------------------------------------------------

	//背景の描画
	for(i=0; i<wall.length; i++){
		if(wall[i].isAlive) wall[i].draw1(wall);
	}
	
	//球の描写1
	for(i=0; i<ball.length; i++){
		if(ball[i].isVisible) ball[i].draw(1, ball[0]);
	}
	
	//紙吹雪の描写
	for(i=0; i<confetti.length; i++){
		if(confetti[i].isAlive) confetti[i].draw();
	}
	
	//紙テープの描写
	for(i=0; i<paperTape.length; i++){
		if(paperTape[i].isAlive) paperTape[i].draw();
	}
	
	//星の描写
	for(i=0; i<star.length; i++){
		// star[i].homeDraw();
		// if(star[i].isAlive==true){
			// star[i].twinkle();
		// }
		// if(star[i].condition!="invisible"){
			// star[i].draw()
		// }
		// if(star[i].isBlink==true){
			// ctx.beginPath();
			// ctx.arc(star[i].pos.x, star[i].pos.y, star[i].blinkRadius1, 0, PI2, true);
			// ctx.arc(star[i].pos.x, star[i].pos.y, star[i].blinkRadius2, 0, PI2, false);
			// a1 = (star[i].blinkRadius1- 40)/12;
			// ctx.fillStyle = color[30 + star[i].color] + ((1-a1)*0.6) + ")";
			// ctx.fill();
			// ctx.beginPath();
			// ctx.arc(star[i].pos.x, star[i].pos.y, star[i].blinkRadius3, 0, PI2, true);
			// ctx.fillStyle = color[star[i].color+10];
			// ctx.fill();
		// }
	}
	
	//変換器の描写
	for(i=0; i<converter.length; i++){
		if(converter[i].isAlive==true){
			converter[i].draw2(wall);
		}
	}
	//壁の描画
	for(i=0; i<wall.length; i++){
		if(wall[i].isAlive) wall[i].draw2(wall);
	};

	
	//球の描写2
	for(i=0; i<ball.length; i++){
		if(ball[i].isVisible){
			//球そのものの描写
			ball[i].draw(2, ball[0]);
			//球の中心の描写
			if(ball[i].shootedFrame > counter-2) continue;
			ctx.beginPath()
			ctx.arc(ball[i].pos.x*sr+ scrWid0, ball[i].pos.y*sr+ scrHei0, 2*sr, 0, PI2, true);
			ctx.fillStyle = color[03];
			ctx.fill();
			//球の接点の中点の描写
			continue;
			if(ball[i].contactCnt01+ball[i].contactCnt02 < 2) continue;
			for(j=0; j<ball[i].contactCnt01+ ball[i].contactCnt02; j++){
				ctx.beginPath();
				ctx.arc(ball[i].bezier[j].midPos.x+ scrWid0, ball[i].bezier[j].midPos.y+ scrHei0, 2, 0, PI2, true);
				ctx.fillStyle = color[3];
				ctx.fill()
			}
		}
	}
	
	if(lCounter%4){
		ctx.beginPath();
		ctx.arc(ball[0].pos.x, ball[0].pos.y, ball[0].size, 0, PI2, true)
		ctx.fillStyle = color[3];
		ctx.fill()
	}
	if(lCounter%3){
		ctx.fillStyle = "BLACK";
		for(i=0; i<dotLen; i++){
			ctx.beginPath();
			ctx.arc(ball[1].dot[i].abs.x, ball[1].dot[i].abs.y, 1, 0, PI2, true)
			ctx.closePath();
			ctx.fill();
		}
	}
	// マウスの現在地の描画
	var m = ball[0].pos.add(angle(radian).mul(length+ ball[0].dot[radNum].rel.norm()));
	if(!pauseFlag) m2 = new Point(mouse.x, mouse.y);


	if(leftDown) ctx.fillStyle = color[01];
	else if(rightDown) ctx.fillStyle = color[02];
	if(length>0){
		if(leftDown != rightDown){
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
	if(ball[0].isAlive){
		if(leftDown && rightDown){
			leftDown = false;
			rightDown = false;
		}
		else if(leftDown) ball[0].strokeDottedLine(1);
		else if(rightDown) ball[0].strokeDottedLine(2);
	}
	
	//ステータス画面の描写を行う=======================================================================================
	//まずは画面のクリア
	ctx.clearRect(0+ scrWid0, (scrHei1+5)*sr+ scrHei0, screenCanvas.width, screenCanvas.height)
	ctx.clearRect((scrWid1+15)*sr+ scrWid0, 0+ scrWid0, screenCanvas.width, screenCanvas.height)
	// ctx.beginPath();
	// ctx.moveTo(0, (scrHei1+ scrHei2)*sr);
	// ctx.lineTo(scrWid1*sr, (scrHei1+ scrHei2)*sr);
	// ctx.lineWidth = 3;
	// ctx.strokeStyle = "black"
	// ctx.stroke();
	//ステータス画面を枠で囲む
	ctx.beginPath();
	ctx.strokeStyle = "rgba(255, 120, 255, 0.3)";
	ctx.lineWidth = 18;
	ctx.moveTo(ctx.lineWidth/2*sr+ scrWid0, scrHei1*sr+ ctx.lineWidth*sr+ scrHei0);
	ctx.lineTo(scrWid1*sr- ctx.lineWidth/2*sr+ scrWid0, scrHei1*sr+ ctx.lineWidth*sr+ scrHei0);
	ctx.lineTo(scrWid1*sr- ctx.lineWidth/2*sr+ scrWid0, scrHei1*sr+ scrHei2*sr- ctx.lineWidth*sr+ scrHei0);
	ctx.lineTo(ctx.lineWidth/2*sr+ scrWid0, scrHei1*sr+ scrHei2*sr- ctx.lineWidth*sr+ scrHei0);
	ctx.closePath();
	ctx.stroke();
	
	//星の描写
	for(i=0; i<star.length; i++){
		star[i].homeDraw();
		if(star[i].isAlive==true){
			star[i].twinkle();
		}
		if(star[i].condition!="invisible"){
			star[i].draw()
		}
		if(star[i].isBlink==true){
			ctx.beginPath();
			ctx.arc(star[i].pos.x*sr+ scrWid0, star[i].pos.y*sr+ scrHei0, star[i].blinkRadius1*sr, 0, PI2, true);
			ctx.arc(star[i].pos.x*sr+ scrWid0, star[i].pos.y*sr+ scrHei0, star[i].blinkRadius2*sr, 0, PI2, false);
			a1 = (star[i].blinkRadius1- 40)/12;
			ctx.fillStyle = color[30 + star[i].color] + ((1-a1)*0.6) + ")";
			ctx.fill();
			ctx.beginPath();
			ctx.arc(star[i].pos.x*sr+ scrWid0, star[i].pos.y*sr+ scrHei0, star[i].blinkRadius3*sr, 0, PI2, true);
			ctx.fillStyle = color[star[i].color+10];
			ctx.fill();
		}
	}
	//test
	ctx.fillStyle = color[07]
	ctx.font = "25px 'MSゴシック'"
	ctx.fillText("*Debug:   "+test[0]+" || "+test[1]+" || "+test[2]+" || "+test[3], (50+ scrWid0)*sr, (scrHei0+ scrHei1+ scrHei2-40)*sr);
	ctx.fillText("*Weight: "+(ball[0].weight)+"  Size: "+(ball[0].size), (600+ scrWid0)*sr, (scrHei0+ scrHei1+ scrHei2-40)*sr);
	ctx.fillText("*Mouse:   "+(mouse.x*sr+ scrWid0)+" || "+(mouse.y*sr+ scrHei0), (850+ scrWid0)*sr, (scrHei0+ scrHei1+ scrHei2-40)*sr);
	

console.log(ball[0]);
console.log(paperTape)
console.log(counter, "===================================================================================================")



	//その他の設定----------------------------------------------------------------------------------------------------
	
	//前フレームにキーを押していたかの情報
	for(i=0; i<keyCode1.length; i++){
		keyCode2[i] = keyCode1[i];
	}
	//物体との接触判定のフラグを初期化しておく
	for(i=0; i<ball.length; i++){
		if(ball[i].isAlive){
			if(ball[i].contactCnt01 > 1 && ball[i].arc > ball[i].size*0.08)ball[i].isDistorted = true;
			else ball[i].isDistorted = false;
		}
	}

	//スペースバーが押されたらポーズ/ポーズ解除　する
	if(pauseFlag && ball[0].isAlive){
		ctx.beginPath();
		ctx.arc(mouse.x*sr+ scrWid0, mouse.y*sr+ scrHei0, 6*sr, 0, PI2, true);
		// ctx.fillStyle = "rgba(  0,   0, 000, 0.5)";
		// ctx.fill();
		
		// ctx.fillStyle = color[06];
		// ctx.font = "60px 'MSゴシック'"
		// ctx.fillText("PAUSE", scrWid1/ 2- 94, scrHei1/ 3);
	}
	//スペースバーが押されたらポーズ/ポーズ解除　する
	if(pauseFlag && ball[0].isAlive){
		ctx.fillStyle = "rgba( 90,  90,  90, 0.4)";
		ctx.fillRect(0*sr+ scrWid0, 0*sr+ scrHei0, scrWid1*sr, (scrHei1+scrHei2)*sr);
		ctx.fillStyle = "rgba(  0, 255,   0, 0.7)";
		ctx.fillRect(300*sr+ scrWid0, 50*sr+ scrHei0, 1000*sr, 700*sr);
		ctx.beginPath();
		ctx.lineWidth = 18;
		ctx.lineCap = "butt";
		ctx.moveTo(300*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, 50*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
		ctx.lineTo(1300*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, 50*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
		ctx.lineTo(1300*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, 750*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
		ctx.lineTo(300*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, 750*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
		ctx.closePath();
		ctx.strokeStyle = "brown";
		ctx.stroke();
		ctx.fillStyle = color[06];
		ctx.fillStyle = "white";
		ctx.font = (180*sr)+ "px 'MSゴシック'";
		ctx.textAlign = "center";
		ctx.fillText("PAUSE", (scrWid1/2)*sr+ scrWid0, scrHei1/3*sr+ scrHei0);
		ctx.fillStyle = "white";
		ctx.fillRect(675*sr+ scrWid0, 350*sr+ scrHei0, 250*sr, 130*sr);
	}
	
	//自機が死んだら描写をストップしてリトライを促す
	if(!ball[0].isAlive){
		ctx.fillStyle = color[06];
		// run = false;
		ctx.font = "60px 'MSゴシック'"
		ctx.fillText("GAME OVER", scrWid1/ 2- 165, scrHei1/ 3);
		ctx.fillText('PRESS "F5" TO RETRY', scrWid1/ 2- 295, scrHei1/ 3*2);
	}
	
	
	//HTMLを更新
	// info.innerHTML = test[0]+ " || " + test[1]+ " || " + test[2]+ " || " + test[3]+
	 // "<br>"+ball[0].pos.y+" "+ball[0].dot[16].rel.y+"PLAYER WEIGHT: " + ball[0].weight +
	 // "<br>PLAYER SIZE &nbsp;&nbsp;&nbsp;&nbsp;:" + ball[0].size +
	 // "<br>移動　WASD <br>青玉発射 左クリック　赤玉発射　右クリック" +
	 // "<br>発射角度調整　SHIFT<br>デバッグ用TFGH, L, C, V, X, B, Q, Z, N, M, 1～9<br>" +
	 // mouse.x +" "+ mouse.y;



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
	kc = e.keyCode;
	keyCode1[kc] = false;
};

var mouseDown = function(e){
	if(e.button == 0 && !pauseFlag){
		leftDown  = true;
		leftUp = false;
	}
	else if(e.button == 2 && !pauseFlag){
		rightDown = true;
		rightUp = false;
	}
};

var mouseUp = function(e){
	if(e.button == 0){
		leftUp  = true;
		//leftDown = false;
	}
	else if(e.button == 2){
		rightUp = true;
		//rightDown = false;
	}
};
window.onblur = function (){

	// 配列をクリアする
	keyCode1.length = 0;
};