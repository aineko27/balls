//
var stageSelectWindow = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=0; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}

	ctx.font = "60px 'MSゴシック'"
	ctx.fillText("STAGE SELECT", scrWid1/ 2- 165, scrHei1/ 3);
	
	clearFlag = true;
	nowWindow = "stageSelect"
}
var titleWindow = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=0; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}
	

	clearFlag = true;
	nowWindow = "title"
}

//stage

var stage = new Array();

stage[00] = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=1; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}
	ball[0].set(new Point(scrWid1/2, scrHei1/2- 15), 15, new Point(), 0)
	
	wall[00].set(  20, scrHei1-15, scrWid1-40, 20, 0, 0, 3, 0);
	wall[01].set(0,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[02].set( scrWid1-20,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[03].set( 700, 100,  50,  50, 0, 0, 3, 0);
	//star
	star[00].set(new Point(700, 400), 0);
	star[01].set(new Point(400, 100), 1);
	star[02].set(new Point(200, 200), 2);
	//converter
	converter[00].set(new Point(500, 200), 3);
	nowWindow = "stage";
	clearFlag = false;
	nowStage = 0;
};

stage[01] = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=1; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}
	wall[00].set(  20, scrHei1-15, scrWid1-20, 20, 0, 0, 3, 0);
	wall[01].set(0,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[02].set( scrWid1,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[03].set( 400,   0,  50, 450, 0, 0, 3, 0);
	// wall[01].set(-20,   0, 320, scrHei1-15, 0, 0, 3, 0);
	wall[02].set( 780,   0, 20, 437, 0, 0, 3, 0);
	wall[04].set( 780, 437,  20,  60, 0, 0, 3, 0);
	wall[06].set( 600, 160, 150,  40, 0, 0, 3, 0);
	wall[07].set( 600,   0,  25, 160, 0, 0, 1, 0);
	wall[08].set( 720, 200,  30,  50, 0, 0, 3, 0);
	wall[09].set( 720, 250,  60,  30, 0, 0, 3, 0);
	wall[11].set( 755, 240,  20,  10, 0, 0, 2, 0);
	//star
	star[00].set(new Point(Math.random()*600+100, Math.random()*20+100), 0);
	star[01].set(new Point(Math.random()*600+100, Math.random()*20+100), 1);
	star[02].set(new Point(Math.random()*600+100, Math.random()*20+100), 2);
	nowWindow = "stage";
	clearFlag = false;
	nowStage = 1;
};

stage[02] = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=1; i<ball.length; i++){
		ball[i].initialize();
	}
	console.log(star.length)
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}
	//チュートリアル用ステージ
	ball[0].set(new Point(100, 50), ball[0].size, P0, 0);
	ball[1].set(new Point(285, 120), 43, P0, 1);
	ball[2].set(new Point(650, 135), 15, P0, 2);
	ball[3].set(new Point(700, 135), 15, P0, 1);
	ball[4].set(new Point(750, 135), 15, P0, 2);
	ball[5].set(new Point(240, 480), 22, P0, 1);
	ball[6].set(new Point(220, 420), 22, P0, 2);

	wall[00].set(  20, scrHei1-15, scrWid1-20, 20, 0, 0, 3, 0);
	wall[01].set(0,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[02].set( scrWid1,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[03].set(   0, 140, 220,  10, 0, 0, 3, 0);
	wall[04].set(   0, 150, 760,  30, 0, 0, 3, 0);
	wall[05].set( 200,   0, 150,  80, 0, 0, 3, 0);
	wall[06].set( 350,   0,  40, 100, 0, 0, 3, 0);
	wall[07].set( 600,   0, 200, 110, 0, 0, 3, 0);
	wall[08].set( 280, 467, 200,  30, 0, 0, 3, 0);
	wall[09].set( 280, 400, 200,  67, 0, 0, 2, 0);
	wall[10].set( 280, 310, 200,  90, 0, 0, 3, 0);
	wall[11].set( 180, 350,  20, 147, 0, 0, 3, 0);
	wall[12].set( 680, 447, 120,  50, 0, 0, 3, 0);
	wall[13].set( 720, 397,  80,  50, 0, 0, 3, 0);
	wall[14].set( 760, 347,  40,  50, 0, 0, 3, 0);
	wall[15].set( 280, 280, 420,  30, 0, 0, 3, 0);
	wall[16].set( 180, 180,  20, 120, 0, 0, 3, 0);
	wall[17].set( 200, 280,  80,  20, 0, 0, 0, 0);
	//star
	star[00].set(new Point(Math.random()*600+100, Math.random()*20+100), 0);
	star[01].set(new Point(Math.random()*600+100, Math.random()*20+100), 1);
	star[02].set(new Point(Math.random()*600+100, Math.random()*20+100), 2);
	f1 = false;
	nowWindow = "stage";
	clearFlag = false;
	nowStage = 2;
};

stage[03] = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=1; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}
	

	wall[00].set(  20, scrHei1-15, scrWid1-20, 20, 0, 0, 3, 0);
	wall[01].set(0,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[02].set( scrWid1,-20, 20, scrHei1+25, 0, 0, 3, 0);
	//wall[03].set( 200, 350, 200,  30,      0, 0, 3, 2, 600,  4, 10,  0);
	wall[04].set( 400, 350, 200,  30,      0, 0, 2, 0, NaN);
	wall[05].set( 600, 350, 150,  30,      0, 0, 1, 0, NaN);
	wall[06].set( 750, 350,  20,  30,      0, 0, 3, 0, NaN);
	wall[07].set( 770, 360,  30,  50,      0, 0, 3, 2, 600,  9,  20,    0);
	wall[08].set( 700, 100,  30,  30, PI_2/2, 0, 3, 1, NaN,  3);
	wall[09].set( 200, 100,  50,  50,      0, 0, 3, 4, 250,  9, NaN, NaN);
	wall[10].set( 100, 100,  50,  50,      0, 0, 3, 4, 250,  9, NaN, NaN);
	
	wall[03].set( 200, 367, 200,  80,      0, 0, 3, 3,16000,  5,  50, -50);
	wall[05].set( 600, 367, 150,  30,      0, 0, 3, 3, 4500,  3,  50, -50);
	wall[04].set( 400, 350, 200,  30,      0, 0, 3, 4, 6000,  4, 0.5,-0.5);
	wall[04].set( 400, 350, 200,  30,      0, 0, 3, 4, 6000,  4, NaN, NaN);
	wall[04].set( 400, 350, 200,  30,      0, 0, 3, 4, 6000,  4, 40,-40);
	//wall[04].set( 500, 250,  30, 200,      0, 0, 3, 4, 6000,  4, NaN, NaN);
	//wall[04].set( 415, 335, 200,  30,      0, 0, 3, 4, 6000,  4, NaN, NaN);
	//star
	star[00].set(new Point(Math.random()*600+100, Math.random()*20+100), 0);
	star[01].set(new Point(Math.random()*600+100, Math.random()*20+100), 1);
	star[02].set(new Point(Math.random()*600+100, Math.random()*20+100), 2);
	nowWindow = "stage";
	clearFlag = false;
	nowStage = 3;
};

stage[04] = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=1; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}

	wall[00].set(  20, scrHei1-15, scrWid1-20, 20, 0, 0, 3, 0);
	wall[01].set(0,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[02].set( scrWid1,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[03].set(   0, 150, 380, 100, 0, 0, 3, 0);
	wall[04].set( 415, 150, 600, 100, 0, 0, 3, 0);
	//wall[03].set( 200, 350, 400,  30, 0, 0, 3, 0);
	//wall[04].set( 400, 350, 200,  30, 0, 0, 2, 0);
	//wall[04].set( 400, 470, 100,  30, 0, 0, 3, 0);
	//star
	star[00].set(new Point(Math.random()*600+100, Math.random()*20+100), 0);
	star[01].set(new Point(Math.random()*600+100, Math.random()*20+100), 1);
	star[02].set(new Point(Math.random()*600+100, Math.random()*20+100), 2);
	nowWindow = "stage";
	clearFlag = false;
	nowStage = 4;
};

stage[05] = function(){
	for(var i=0; i<wall.length; i++){
		wall[i].initialize();
	}
	for(var i=1; i<ball.length; i++){
		ball[i].initialize();
	}
	for(var i=0; i<star.length; i++){
		star[i].isAlive = false;
		star[i].condition = "invisible"
	}
	for(var i=0; i<converter.length; i++){
		converter[i].isAlive = false;
	}
	

	wall[00].set(  20, scrHei1-15, scrWid1-20, 20, 0, 0, 3, 0);
	wall[01].set(0,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[02].set( scrWid1,-20, 20, scrHei1+25, 0, 0, 3, 0);
	wall[03].set( 200, 350, 200,  30, 0, 0, 3, 0);
	wall[04].set( 400, 350, 200,  30, 0, 0, 2, 0);
	wall[05].set( 600, 350, 200,  30, 0, 0, 1, 0);
	// wall[06].set( 200, 380, 400,  30, 0, 0, 3, 0);
	//wall[07].set( 400, 380,  30, 117, 0, 0, 3, 0);
	//star
	star[00].set(new Point(Math.random()*600+100, Math.random()*20+100), 0);
	star[01].set(new Point(Math.random()*600+100, Math.random()*20+100), 1);
	star[02].set(new Point(Math.random()*600+100, Math.random()*20+100), 2);
	nowWindow = "stage";
	clearFlag = false;
	nowStage = 5;
};



