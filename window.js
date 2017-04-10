var Box = function(tlx, tly, brx, bry, str, fc, fs, bc, type){
	this.tl = new Point(tlx, tly);
	this.tr = new Point(brx, tly);
	this.br = new Point(brx, bry);
	this.bl = new Point(tlx, bry);
	
	this.srt = str;
	this.fc = fc;
	this.fs = fs;
	this.bc = bc;
	this.type = type;
}

Box.prototype.initialize = function(){
	this.tl = new Point();
	this.tr = new Point();
	this.br = new Point();
	this.bl = new Point();
	
	this.srt = "";
	this.sc = "black";
	this.bc = "white";
	this.type = 0;
}

Box.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(tlx*sr+ scrWid0, tly*sr+ scrHei0);
	ctx.lineTo(brx*sr+ scrWid0, tly*sr+ scrHei0);
	ctx.lineTo(brx*sr+ scrWid0, bry*sr+ scrHei0);
	ctx.lineTo(tlx*sr+ scrWid0, bry*sr+ scrHei0);
	ctx.closePath();
	ctx.fillStyle = color[bc];
	ctx.fill();
	ctx.fillStyle = color["brown"];
	ctx.font = (fs*sr)+ "px 'MSゴシック'";
	ctx.textAlign = "center";
	ctx.fillText(str, (tlx+brx)/2*sr+ scrWid0, (tly+bry+fs*2/3)/2*sr+ scrHei0);
}

Box.prototype.detect = function(){
	if(leftDown1==true && leftDown2==false){
		if(mouseIsInside(tlx, tly, brx, bry)==true){
			if(str=="RESUME"){
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(str=="BACK" || str=="PLAY"){
				initilalizeAllObject();
				nowWindow = "stageSelect";
				pauseFlag = false;
				leftDown = false;
				return;
			}
			else if(str=="EXTRA"){
				initilalizeAllObject();
				nowWindow = "extraStageSelect";
				pauseFlag = false;
				leftDown = false;
			}
			else if(str=="RETRY"){
				stage[nowStage]();
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(str=="TITLE"){
				initilalizeAllObject();
				nowWindow = "title";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(str=="OPTION"){
				initilalizeAllObject();
				nowWindow = "option";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(str=="<-"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.max(0, stageSelectPageNum-1);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.max(0, extraStageSelectPageNum-1);
				}
				return;
			}
			else if(str=="->"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.min(STAGE_SELCET_PAGE_MAX_COUNT, stageSelectPageNum+1);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.min(EXTRA_STAGE_SELCET_PAGE_MAX_COUNT, extraStageSelectPageNum+1);
				}
				return;
			}
			else if(str.slice(0,-2)=="STAGE"){
				if(stage[str.slice(-2)*1]==undefined) return;
				stage[str.slice(-2)*1]();
				leftDown1 = false;
				return;
			}
		}
	}
}

var initilalizeAllObject = function(){
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
}

var drawStatusWindow = function(){
	//ステータス画面の描写を行う=======================================================================================
	//まずは画面のクリア
	ctx.clearRect(0+ scrWid0, (scrHei1+5)*sr+ scrHei0, screenCanvas.width, screenCanvas.height)
	ctx.clearRect((scrWid1+15)*sr+ scrWid0, 0+ scrWid0, screenCanvas.width, screenCanvas.height)
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
}

var drawMenuWindow = function(){
	setBox(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 33);
	setBox(300, 50, 1300, 750, "", 04, 0, 00);
	setFramework(300, 50, 1300, 750, 18, "brown");
	setString(scrWid1/2, scrHei1/3, "PAUSE", 180, "px 'MSゴシック'", 04);
	setBox(375, 350, 625, 480, "RETRY", "brown", 60, 04);
	setBox(675, 350, 925, 480, "RESUME", "brown", 60, 04);
	setBox(975, 350, 1225, 480, "BACK", "brown", 60, 04);
	ctx.font = (45*sr)+ "px 'MSゴシック'";
	ctx.fillText("STAGE:X", 500*sr+ scrWid0, 600*sr+ scrHei0);
	setBox(850, 550, 1200, 620, "HOW TO PLAY", "brown", 45, 04);
}


var drawStageSelectWindow = function(i){
	setBox(0, 0, scrWid1, 100, "STAGE SELECT", 04, 75, 33);
	setString(scrWid1/2, 170, "PAGE["+ (i+1)+ "/"+ (STAGE_SELCET_PAGE_MAX_COUNT+1)+ "]", 60, 07);
	setBox(0, 110, 140, scrHei1+ scrHei2-30, "<-", 04, 75, 33);
	setBox(scrWid1- 140, 110, scrWid1, scrHei1+ scrHei2-30, "->", 04, 75, 33);
	setBox(170, 200, 570, 470, "STAGE"+("00"+(6*i+1)).slice(-2), 04, 50, 03);
	setBox(600, 200,1000, 470, "STAGE"+("00"+(6*i+2)).slice(-2), 04, 50, 03);
	setBox(1030,200,1430, 470, "STAGE"+("00"+(6*i+3)).slice(-2), 04, 50, 03);
	setBox(170, 500, 570, 770, "STAGE"+("00"+(6*i+4)).slice(-2), 04, 50, 03);
	setBox(600, 500,1000, 770, "STAGE"+("00"+(6*i+5)).slice(-2), 04, 50, 03);
	setBox(1030,500,1430, 770, "STAGE"+("00"+(6*i+6)).slice(-2), 04, 50, 03);
	setBox(500, 790, 1100, 870, "TITLE", 04, 50, 03);
}

var drawExtraStageSelectWindow = function(i){
	setBox(0, 0, scrWid1, 100, "EXTRA STAGE", 04, 75, 33);
	setString(scrWid1/2, 170, "PAGE["+ (i+1)+ "/"+ (EXTRA_STAGE_SELCET_PAGE_MAX_COUNT+1)+ "]", 60, 07);
	setBox(0, 110, 140, scrHei1+ scrHei2-30, "<-", 04, 75, 33);
	setBox(scrWid1- 140, 110, scrWid1, scrHei1+ scrHei2-30, "->", 04, 75, 33);
	setBox(170, 200, 570, 470, "EXTRA"+("00"+(6*i+1)).slice(-2), 04, 50, 03);
	setBox(600, 200,1000, 470, "EXTRA"+("00"+(6*i+2)).slice(-2), 04, 50, 03);
	setBox(1030,200,1430, 470, "EXTRA"+("00"+(6*i+3)).slice(-2), 04, 50, 03);
	setBox(170, 500, 570, 770, "EXTRA"+("00"+(6*i+4)).slice(-2), 04, 50, 03);
	setBox(600, 500,1000, 770, "EXTRA"+("00"+(6*i+5)).slice(-2), 04, 50, 03);
	setBox(1030,500,1430, 770, "EXTRA"+("00"+(6*i+6)).slice(-2), 04, 50, 03);
	setBox(500, 790, 1100, 870, "TITLE", 04, 50, 03);
}

var drawTitleWindow = function(){
	setString(scrWid1/2, 250, "TITLE WINDOW", 80, 07);
	setBox(500, 450, 1100, 520, "PLAY", 04, 60, 33);
	setBox(500, 550, 1100, 620, "OPTION", 04, 60, 33);
	setBox(500, 650, 1100, 720, "QUIT", 04, 60, 33);
	if(keyCode1[65]==true){
		setBox(500, 750, 1100, 820, "EXTRA", 04, 60, 33);
	}
	else{
		setBox(500, 750, 1100, 820, "///////", 04, 60, 33);
	}
	
}

var drawOptionWindow = function(){
	setBox(000, 30, 1600, 150, " OPTION ", 01, 80, 33);
	ctx.beginPath();
	ctx.moveTo(scrWid1/2*sr+ scrWid0, 180*sr+ scrHei0);
	ctx.lineTo(scrWid1/2*sr+ scrWid0, 765*sr+ scrHei0);
	ctx.lineWidth = 8;
	ctx.lineCap = "round";
	ctx.stroke();
	setString(scrWid1/4, 210, "VISIAL", 50, 07);
	setString(200, 310, "test01", 40, 07);
	setBox(360, 270, 480, 330, "1A", 04, 40, 33);
	setBox(500, 270, 620, 330, "1B", 04, 40, 33);
	setBox(640, 270, 760, 330, "1C", 04, 40, 33);
	setString(200, 410, "test02", 40, 07);
	setBox(360, 370, 480, 430, "2A", 04, 40, 33);
	setBox(500, 370, 620, 430, "2B", 04, 40, 33);
	setBox(640, 370, 760, 430, "2C", 04, 40, 33);
	setString(200, 510, "test03", 40, 07);
	setBox(360, 470, 480, 530, "3A", 04, 40, 33);
	setBox(500, 470, 620, 530, "3B", 04, 40, 33);
	setBox(640, 470, 760, 530, "3C", 04, 40, 33);
	setString(200, 610, "test04", 40, 07);
	setBox(360, 570, 480, 630, "4A", 04, 40, 33);
	setBox(500, 570, 620, 630, "4B", 04, 40, 33);
	setBox(640, 570, 760, 630, "4C", 04, 40, 33);
	setString(scrWid1*3/4, 210, "SOUND", 50, 07);
	setString(200, 710, "test05", 40, 07);
	setBox(360, 670, 480, 730, "5A", 04, 40, 33);
	setBox(500, 670, 620, 730, "5B", 04, 40, 33);
	setBox(640, 670, 760, 730, "5C", 04, 40, 33);
	
	setString(scrWid1*3/4, 210, "SOUND", 50, 07);
	
	
	setBox(20, 790, 520, 870, "RESET", 04, 50, 03);
	setBox(550, 790, 1050, 870, "APPLY", 04, 50, 03);
	setBox(1080, 790, 1580, 870, "TITLE", 04, 50, 03);
}

var setBox = function(tlx, tly, brx, bry, str, fc, fs, bc){
	ctx.beginPath();
	ctx.moveTo(tlx*sr+ scrWid0, tly*sr+ scrHei0);
	ctx.lineTo(brx*sr+ scrWid0, tly*sr+ scrHei0);
	ctx.lineTo(brx*sr+ scrWid0, bry*sr+ scrHei0);
	ctx.lineTo(tlx*sr+ scrWid0, bry*sr+ scrHei0);
	ctx.closePath();
	ctx.fillStyle = color[bc];
	ctx.fill();
	ctx.fillStyle = color["brown"];
	ctx.font = (fs*sr)+ "px 'MSゴシック'";
	ctx.textAlign = "center";
	ctx.fillText(str, (tlx+brx)/2*sr+ scrWid0, (tly+bry+fs*2/3)/2*sr+ scrHei0);
	if(leftDown1==true && leftDown2==false){
		if(mouseIsInside(tlx, tly, brx, bry)==true){
			if(str=="RESUME"){
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(str=="BACK" || str=="PLAY"){
				initilalizeAllObject();
				nowWindow = "stageSelect";
				pauseFlag = false;
				leftDown = false;
				return;
			}
			else if(str=="EXTRA"){
				initilalizeAllObject();
				nowWindow = "extraStageSelect";
				pauseFlag = false;
				leftDown = false;
			}
			else if(str=="RETRY"){
				stage[nowStage]();
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(str=="TITLE"){
				initilalizeAllObject();
				nowWindow = "title";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(str=="OPTION"){
				initilalizeAllObject();
				nowWindow = "option";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(str=="<-"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.max(0, stageSelectPageNum-1);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.max(0, extraStageSelectPageNum-1);
				}
				return;
			}
			else if(str=="->"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.min(STAGE_SELCET_PAGE_MAX_COUNT, stageSelectPageNum+1);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.min(EXTRA_STAGE_SELCET_PAGE_MAX_COUNT, extraStageSelectPageNum+1);
				}
				return;
			}
			else if(str.slice(0,-2)=="STAGE"){
				if(stage[str.slice(-2)*1]==undefined) return;
				stage[str.slice(-2)*1]();
				leftDown1 = false;
				return;
			}
		}
	}
}

var drawBox = function(){
	ctx.beginPath();
	ctx.moveTo(tlx*sr+ scrWid0, tly*sr+ scrHei0);
	ctx.lineTo(brx*sr+ scrWid0, tly*sr+ scrHei0);
	ctx.lineTo(brx*sr+ scrWid0, bry*sr+ scrHei0);
	ctx.lineTo(tlx*sr+ scrWid0, bry*sr+ scrHei0);
	ctx.closePath();
	ctx.fillStyle = color[bc];
	ctx.fill();
	ctx.fillStyle = color["brown"];
	ctx.font = (fs*sr)+ "px 'MSゴシック'";
	ctx.textAlign = "center";
	ctx.fillText(str, (tlx+brx)/2*sr+ scrWid0, (tly+bry+fs*2/3)/2*sr+ scrHei0);
}

var setFramework = function(tlx, tly, brx, bry, lw, lc){
	ctx.lineWidth = lw;
	ctx.beginPath();
	ctx.moveTo(tlx*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, tly*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
	ctx.lineTo(brx*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, tly*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
	ctx.lineTo(brx*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, bry*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
	ctx.lineTo(tlx*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, bry*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
	ctx.closePath();
	ctx.lineCap = "butt";
	ctx.strokeStyle = color[lc];
	ctx.stroke();
}

var setString = function(x, y, str, fs, fc){
	ctx.fillStyle = color[fc];
	ctx.font = (fs*sr)+ "px 'MSゴシック'";
	ctx.textAlign = "center";
	ctx.fillText(str, x*sr+ scrWid0, y*sr+ scrHei0);
}

var mouseIsInside = function(tlx, tly, brx, bry){
	if(checkSide(mouse, new Point(tlx, tly), new Point(brx, tly))=="right" &&
	   checkSide(mouse, new Point(brx, tly), new Point(brx, bry))=="right" &&
	   checkSide(mouse, new Point(brx, bry), new Point(tlx, bry))=="right" &&
	   checkSide(mouse, new Point(tlx, bry), new Point(tlx, tly))=="right"){
		return true;
	   }
	else{
		return false;
	}
}








