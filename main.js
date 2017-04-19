//global===============================================================================

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
var vector = new Point();
var radNum = 0;
var leftDown1 = false;
var rightDown1 = false;
var leftUp1 = false;
var rightUp1 = false;
var pauseFlag = false;
var clearFlag = true;
var jumpFlag1;
var jumpFlag2;
var jumpFrame = 0;
var creatFlag = false;
var nowWindow = "title";
var lastWindow = "title";
var nowStage = 0;
var debugFlag = "save";
var stageSelectPageNum = 0;
var extraStageSelectPageNum = 0;
var lockedStageNum = 3;
var lockedExtraStageNum = 0;
var volume01Cnt = 5;
var volume02Cnt = 5;
var saveCode ="\n";
var sizeRate = 1;


var lCounter = 0;
var test = new Array();

//const=================================================================================

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
var STAGE_SELCET_PAGE_MAX_COUNT = 4;
var EXTRA_STAGE_SELCET_PAGE_MAX_COUNT = 2;
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
color[33] = "rgba( 90,  90,  90, 0.4)";
color["darkblue"] = "darkblue";
color["blue"] = "blue";
color["red"] = "red";
color["darkred"] = "darkred";
color["lightred"] = "rgba(228, 212, 161, 0.7)";
color["green"] = "green";
color["puregreen"] = "rgba(  0, 210,  0, 1.0)";
color["white"] = "white";
color["black"] = "black";
color["yellow"] = "yellow";
color["brown"] = "brown";
color["gray"] = "gray";
color["carmine"] = "rgba(204,   0,   0, 0.7)";
color["lightblue"] = "rgba(188, 200, 219, 0.7)";
color["lightorange"] = "rgba(229,  69,  0, 0.7)";
color["transparent"] = "rgba(255, 255, 255, 0)";
color["aquamarine"] = "rgba(105, 153, 174, 0.7)";
color["test"] = "rgba( 85,  85,  85, 0.6)";
color["tttt"] = "rgba(  0, 230,   0, 1.0)";

var appliedOption = new Array();
appliedOption[01] = "01A";
appliedOption[02] = "02A";
appliedOption[03] = "03A";
appliedOption[04] = "04A";
appliedOption[05] = "05A";
appliedOption[11] = "11A";
appliedOption[12] = "12A";
appliedOption[13] = "13A";

var selectedOption = new Array();
selectedOption[01] = "01A";
selectedOption[02] = "02A";
selectedOption[03] = "03A";
selectedOption[04] = "04A";
selectedOption[05] = "05A";
selectedOption[11] = "11A";
selectedOption[12] = "12A";
selectedOption[13] = "13A";

var stageImage = new Array(new Image);
stageImage[01] = new Image();
stageImage[01].src = "stage01.png";
stageImage[02] = new Image();
stageImage[02].src = "stage01.png";
stageImage[03] = new Image();
stageImage[03].src = "stage01.png";
stageImage[04] = new Image();
stageImage[04].src = "stage01.png";
stageImage[05] = new Image();
stageImage[05].src = "stage01.png";
stageImage[06] = new Image();
stageImage[06].src = "stage01.png";

var extraStageImage = new Array(new Image);
extraStageImage[01] = new Image();
extraStageImage[01].src = "stage01.png";
extraStageImage[02] = new Image();
extraStageImage[02].src = "stage01.png";
extraStageImage[03] = new Image();
extraStageImage[03].src = "stage01.png";
extraStageImage[04] = new Image();
extraStageImage[04].src = "stage01.png";
extraStageImage[05] = new Image();
extraStageImage[05].src = "stage01.png";
extraStageImage[06] = new Image();
extraStageImage[06].src = "stage01.png";

//==main========================================================================

//ページ読み込み時に起動するfunciton
window.onload = function(){

	//ローカル変数の定義
	var p = new Point();


	//スクリーンの初期化
	screenCanvas = document.getElementById("screen");
	screenCanvas.width = window.innerWidth-30;
	screenCanvas.height = window.innerHeight-30;
	scrWid0 = 10;
	scrWid1 = 1600;
	scrHei0 = 0;
	scrHei1 = 700;
	scrHei2 = 200;
	var canvasCenter = new Point(scrWid1/2, scrHei1/2);


	//2dコンテキスト
	ctx = screenCanvas.getContext("2d");


	//右クリックの禁止とドラッグの禁止
	window.addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);

	//イベントの登録
	window.addEventListener("mousemove", mouseMove, true);
	window.addEventListener("mousedown", mouseDown, true);
	window.addEventListener("mouseup", mouseUp, true);
	window.addEventListener("keydown", keyDown, true);
	window.addEventListener("keyup", keyUp, true);


	//エレメント登録
	info = document.getElementById("info");


	// 球初期化
	ball = initialize(Character, BALL_MAX_COUNT);
	dotLen = ball[0].dot.length;

	//壁初期化
	wall = initialize(Wall, WALL_MAX_COUNT);
	
	//星初期化
	star = initialize(Star, STAR_MAX_COUNT);

	//変換器初期化
	converter = initialize(Converter, CONVERTER_MAX_COUNT);
	
	//紙吹雪初期化
	confetti = initialize(Confetti, CONFETTI_MAX_COUNT);
	
	//紙テープ初期化
	paperTape = initialize(PaperTape, PAPERTAPE_MAX_COUNT);
	
	box = new Array();
	

	//自機初期化
	ball[0].set(new Point(scrWid1/2, scrHei1/2- 15), 15, P0, 0);
	
	//初期画面読み込み
	// stage[00]();
	setTitleWindowBox();
	
	//レンダリング処理を呼び出す-----------------------------------------------------------------------------------------------
	//loadCode();
	(function(){
		
		//カウンターの値をインクリメントする
		counter++;
		screenCanvas.width = window.innerWidth- 30;
		screenCanvas.height = window.innerHeight- 25;
		//スペースを押したらポーズするようにする
		if(keyCode1[32] && !keyCode2[32]　&& nowWindow=="stage"){
			for(var i in box){
				box[i].isAlive = false;
			}
			pauseFlag = !pauseFlag;
		}
		//デバッグ用に押されているキーコードを保存する
		saveCode += '"' + counter + '"'
		for(var i=0; i<keyCode1.length; i++){
			if(keyCode1[i] == true) saveCode += '+",' + i + '"';
		}
		
		saveCode += '+"' + '\\n"+' + "\n";
		
		jumpFlag1 = false;
		
		//ステージ読み込み================================================================================================
		if(keyCode1[48]) stage[00]();
		if(keyCode1[49]) stage[01]();
		if(keyCode1[50]) stage[02]();
		if(keyCode1[51]) stage[03]();
		if(keyCode1[52]) stage[04]();
		if(keyCode1[53]) stage[05]();
		
		
		//ポーズがかかっているかどうか
		if(!pauseFlag){

			//入力による変更-------------------------------------------------------------------------------------------
			
			if(keyCode1[67]) creatFlag = 1;
			if(keyCode1[88] && !keyCode2[88]) creatFlag = 1;
			if(keyCode1[86]) creatFlag = 2;
			if(keyCode1[66] && !keyCode2[66]) creatFlag = 2;
			if(keyCode1[65]) ball[0].vel.x += -0.3;
			if(ball[0].vel.x < -4) ball[0].vel.x = -4;
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
			if(keyCode1[192]) fps /= 1.1;
			if(keyCode1[76]) lCounter++
			if(keyCode1[82]){
				star[0].isAlive = false;
				star[1].isAlive = false;
				star[2].isAlive = false;
			}
			
			if(keyCode1[81]) {
				ball[0].pos = mouse.add(P0);
				ball[0].vel = P0.add(P0);
			}
			if(keyCode1[90] && !keyCode2[90]){
				ball[0].size = 35;
				ball[0].weight = 1225;
			}

			if(!keyCode1[65] && !keyCode1[68]) ball[0].vel.x *= 0.85;
			
			//ステージごとのフラグ管理
			//ステージ1について
			if(nowStage == 1){
				if(ball[0].pos.x > scrWid1) stage02();
				for(var i=0; i<ball.length; i++){
					if(ball[i].pos.x > 755 && ball[i].pos.y>220 && ball[i].pos.y < 260) wall[4].isAlive = false;
				}
			}
			


			//フラグ管理-----------------------------------------------------------------------------------------------

			//wを押した時にジャンプするかの判定/ジャンプ力の計算
			checkJump();
			
			//クリック時に球を打つ
			checkShoot();
			
			//他機生成#デバッグ用
			if(creatFlag && (counter%4==0 || fps != 1000/60)){
				for(var i=1; i<ball.length; i++){
					if(!ball[i].isVisible){
						ball[i].set(mouse.add(P0), 10, P0, creatFlag);
						creatFlag = false;
						break;
					}
				}
			}
			//物体の情報を更新==================================================================================
			//球の情報を反映、初期化
			updateBall();
			
			//壁の情報反映、初期化
			updateWall();
			
			//星の情報反映
			updateStar();
			
			//変換器の情報反映
			updateConverter();
			
			//紙吹雪の情報反映
			updateConfetti();
			
			//紙テープの情報反映
			updatePaperTape();
			
			//ステージクリア時に飾りつけの演出を行う
			if((star[0].isAlive==false)&&(star[1].isAlive==false)&&(star[2].isAlive==false)&&(clearFlag==false)){
				stageClearEffect();
			}
			
			//吸収判定をとる=====================================================================================
			checkAbsorption();
			
			checkCollision1();
			checkCollision2();
			checkCollision3();
			
			//当り判定終わり=====================================================================================
			calcBallInfo();

			//物体の処理演算終わり===============================================================================
			calcMouseInfo();
		
			//画面の外遠くまで行ったかサイズがマイナスになったらボールを死んだことにする
			for(var i=0; i<ball.length; i++){
				if(ball[i].isVisible){
					if(ball[i].pos.sub(canvasCenter).norm() > scrWid1
					|| ball[i].weight < 0) ball[i].initialize();
				}
			}
		}
		
		//特定の条件を満たしていたら選択肢のlockを外すようにする
		if(keyCode1[83]==true && keyCode2[83]==false){
			lockedStageNum = Math.min(lockedStageNum+1, 30);
			lockedExtraStageNum = Math.min(lockedExtraStageNum+1, 30);
			if(nowWindow=="stageSelect"){
				setStageSelectWindowBox(stageSelectPageNum);
			}
			else if(nowWindow=="extraStageSelect"){
				setExtraStageSelectWindowBox(extraStageSelectPageNum);
			}
		}
		
		//現在の画面に応じて動作を変える
		if(nowWindow=="title"){
			if(keyCode1[65]==true){
				box["EXTRA"].str = "EXTRA";
				box["EXTRA"].frameworkColor = 02;
				box["EXTRA"].fc = "red";
				box["EXTRA"].bc = "lightred";
				box["EXTRA"].isLocked = false;
				box["EXTRA"].canDetect = true;
			}
			else{
				box["EXTRA"].str = "";
				box["EXTRA"].frameworkColor = 01;
				box["EXTRA"].bc = "lightblue";
				box["EXTRA"].isLocked = true;
			}
		}
		else if(nowWindow=="stageSelect"){
			
		}
		else if(nowWindow=="option" && box["APPLY"]!=undefined){
			box["APPLY"].fc = "darkblue";
			box["APPLY"].bc = "lightblue";
			box["APPLY"].frameworkColor = 01;
			for(var i in appliedOption){
				if(appliedOption[i]!=selectedOption[i]){
					box["APPLY"].fc = "darkred";
					box["APPLY"].bc = "lightred";
					box["APPLY"].frameworkColor = 02;
					break;
				}
			}
		}
		else if(nowWindow=="extraStageSelect"){
			
		}
		
		//boxの動作
		for(var i in box){
			if(box[i].isAlive==true){
				box[i].detect();
			}
		}
		
		//画面が切り替わったときに現在の画面のboxの準備をする
		if(nowWindow!=lastWindow){
			for(var i in box){
				box[i].isAlive = false;
			}
			if(nowWindow=="title"){
				setTitleWindowBox();
			}
			
			else if(nowWindow=="stageSelect"){
				setStageSelectWindowBox(stageSelectPageNum);
			}
			else if(nowWindow=="option"){
				setOptionWindowBox();
			}
			
			else if(nowWindow=="extraStageSelect"){
				setExtraStageSelectWindowBox(extraStageSelectPageNum);
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
		
		//nowWindowに応じて描写する内容を変える
		for(var i in box){
			if(box[i].isAlive==true){
				box[i].draw();
			}
		}
		if(nowWindow=="title"){
			
		}
		else if(nowWindow=="stageSelect"){
			drawStageSelectWindow();
		}
		else if(nowWindow=="option"){
			drawOptionWindow();
		}
		else if(nowWindow=="extraStageSelect"){
			
		}
		//nowWindow=="stage"のとき
		else if(nowWindow=="stage"){
			//背景の描画-------------------------------------------------
			
			//背景の描画
			for(var i=0; i<wall.length; i++){
				if(wall[i].isAlive) wall[i].draw1(wall);
			}
			
			//球の描写1
			for(var i=0; i<ball.length; i++){
				if(ball[i].isVisible) ball[i].draw1(1, ball[0]);
			}
			
			//紙吹雪の描写
			for(var i=0; i<confetti.length; i++){
				if(confetti[i].isAlive) confetti[i].draw();
			}
			
			//紙テープの描写
			for(var i=0; i<paperTape.length; i++){
				if(paperTape[i].isAlive) paperTape[i].draw();
			}
			
			
			//変換器の描写
			for(var i=0; i<converter.length; i++){
				if(converter[i].isAlive==true){
					converter[i].draw2(wall);
				}
			}
			//壁の描画
			for(var i=0; i<wall.length; i++){
				if(wall[i].isAlive) wall[i].draw2(wall);
			};

			
			//球の描写2
			for(var i=0; i<ball.length; i++){
				ball[i].draw2();
			}
			if(lCounter%4){
				ctx.beginPath();
				ctx.arc(ball[0].pos.x, ball[0].pos.y, ball[0].size, 0, PI2, true)
				ctx.fillStyle = color[3];
				ctx.fill()
			}
			if(lCounter%3){
				ctx.fillStyle = "BLACK";
				for(var i=0; i<dotLen; i++){
					ctx.beginPath();
					ctx.arc(ball[1].dot[i].abs.x, ball[1].dot[i].abs.y, 1, 0, PI2, true)
					ctx.closePath();
					ctx.fill();
				}
			}
			
			// マウスの現在地とクリック時の点線の描画
			drawMouse();
			
			//status画面の描写
			drawStatusWindow();
			
			//星の描写
			drawStar();
			
			//status情報の書き込み
			ctx.fillStyle = color[07]
			ctx.font = "25px 'MSゴシック'"
			ctx.fillText("*Debug:   "+test[0]+" || "+test[1]+" || "+test[2]+" || "+test[3], (50+ scrWid0)*sr, (scrHei0+ scrHei1+ scrHei2-40)*sr);
			
			//自機が死んだら描写をストップしてリトライを促す
			if(!ball[0].isAlive){
				setMenuWindowBox();
				drawDot(mouse)
				ctx.fillStyle = color[06];
				ctx.font = "60px 'MSゴシック'"
				ctx.textAlign = "left";
				// ctx.fillText("GAME OVER", scrWid1/ 2- 165, scrHei1/ 3);
				// ctx.fillText('PRESS "F5" TO RETRY', scrWid1/ 2- 295, scrHei1/ 3*2);
			}
			
			if(pauseFlag && ball[0].isAlive){
				setMenuWindowBox();
			}
			
			if(pauseFlag==true){
				drawDot(mouse)
			}
		}
		
		drawMouse();

	console.log(lockedStageNum)
	// console.log(ball[0]);
	// console.log(paperTape)
	console.log(counter, "===================================================================================================")



		//その他の設定----------------------------------------------------------------------------------------------------
		
		lastWindow = nowWindow;
		
		//前フレームにキーを押していたかの情報
		for(var i=0; i<keyCode1.length; i++){
			keyCode2[i] = keyCode1[i];
		}
		//前フレームにマウスを押していたかの情報
		leftDown2 = leftDown1;
		leftUp2 = leftUp1;
		rightDown2 = rightDown1;
		rightUp2 = rightUp1;
		
		//物体との接触判定のフラグを初期化しておく
		for(var i=0; i<ball.length; i++){
			if(ball[i].isAlive){
				if(ball[i].contactCnt01 > 1 && ball[i].arc > ball[i].size*0.08)ball[i].isDistorted = true;
				else ball[i].isDistorted = false;
			}
		}

		//スペースバーが押されたらポーズ/ポーズ解除　する
		if(pauseFlag && ball[0].isAlive){
			drawMenuWindow();
			ctx.beginPath();
			ctx.arc(mouse.x*sr+ scrWid0, mouse.y*sr+ scrHei0, 6*sr, 0, PI2, true);
			ctx.fillStyle = "black";
			ctx.fill();
		}
		
		



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
	if(e.button == 0){
		leftDown1  = true;
		leftUp1 = false;
	}
	else if(e.button == 2){
		rightDown1 = true;
		rightUp1 = false;
	}
};

var mouseUp = function(e){
	if(e.button == 0){
		leftUp1  = true;
		leftDown1 = false;
	}
	else if(e.button == 2){
		rightUp1 = true;
		rightDown1 = false;
	}
};
window.onblur = function (){

	// 配列をクリアする
	keyCode1.length = 0;
};