var Box = function(tlx, tly, wid, hei, str, fc, fs, bc){
	this.tl = new Point(tlx, tly);
	this.tr = new Point(tlx+wid, tly);
	this.br = new Point(tlx+wid, tly+hei);
	this.bl = new Point(tlx, tly+hei);
	
	this.str = str;
	this.fc = fc;
	this.fs = fs;
	this.bc = bc;
	// this.type = type;
	this.isAlive = true;
	this.isActive = false;
}

Box.prototype.initialize = function(){
	this.tl = new Point();
	this.tr = new Point();
	this.br = new Point();
	this.bl = new Point();
	
	this.srt = "";
	this.sc = "black";
	this.bc = "white";
	// this.type = 0;
	this.isAlive = false;
	this.isActive = false;
}

Box.prototype.draw = function(){
	ctx.beginPath();
	ctx.moveTo(this.tl.x*sr+ scrWid0, this.tl.y*sr+ scrHei0);
	ctx.lineTo(this.br.x*sr+ scrWid0, this.tl.y*sr+ scrHei0);
	ctx.lineTo(this.br.x*sr+ scrWid0, this.br.y*sr+ scrHei0);
	ctx.lineTo(this.tl.x*sr+ scrWid0, this.br.y*sr+ scrHei0);
	ctx.closePath();
	ctx.fillStyle = color[this.bc];
	ctx.fill();
	if(this.isActive==true){
		ctx.fill()
	}
	ctx.fillStyle = color[this.fc];
	ctx.font = (this.fs*sr)+ "px 'MSゴシック'";
	ctx.textAlign = "center";
	ctx.fillText(this.str, (this.tl.x+this.br.x)/2*sr+ scrWid0, (this.tl.y+this.br.y+this.fs*2/3)/2*sr+ scrHei0);
}

Box.prototype.detect = function(){
	if(leftDown1==true && leftDown2==false){
		if(mouseIsInside(this.tl.x, this.tl.y, this.br.x, this.br.y)==true){
			if(this.str=="RESUME"){
				for(var i in box){
					box[i].isAlive = false;
				}
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(this.str=="BACK" || this.str=="PLAY"){
				initilalizeAllObject();
				nowWindow = "stageSelect";
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(this.str=="EXTRA"){
				initilalizeAllObject();
				nowWindow = "extraStageSelect";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(this.str=="RETRY"){
				initilalizeAllObject();
				stage[nowStage]();
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(this.str=="TITLE"){
				initilalizeAllObject();
				nowWindow = "title";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(this.str=="OPTION"){
				initilalizeAllObject();
				nowWindow = "option";
				pauseFlag = false;
				leftDown1 = false;
			}
			else if(this.str=="1A" || this.str=="1B" || this.str=="1C"){
				box["1A"].isActive = false;
				box["1B"].isActive = false;
				box["1C"].isActive = false;
				this.isActive = true;
				option01 = this.str;
			}
			else if(this.str=="2A" || this.str=="2B" || this.str=="2C"){
				box["2A"].isActive = false;
				box["2B"].isActive = false;
				box["2C"].isActive = false;
				this.isActive = true;
				option02 = this.str;
			}
			else if(this.str=="3A" || this.str=="3B" || this.str=="3C"){
				box["3A"].isActive = false;
				box["3B"].isActive = false;
				box["3C"].isActive = false;
				this.isActive = true;
				option03 = this.str;
			}
			else if(this.str=="4A" || this.str=="4B" || this.str=="4C"){
				box["4A"].isActive = false;
				box["4B"].isActive = false;
				box["4C"].isActive = false;
				this.isActive = true;
				option04 = this.str;
			}
			else if(this.str=="5A" || this.str=="5B" || this.str=="5C"){
				box["5A"].isActive = false;
				box["5B"].isActive = false;
				box["5C"].isActive = false;
				this.isActive = true;
				option05 = this.str;
			}
			else if(this.str=="DEFAULT"){
				box["1A"].isActive = false;
				box["1B"].isActive = false;
				box["1C"].isActive = false;
				box["2A"].isActive = false;
				box["2B"].isActive = false;
				box["2C"].isActive = false;
				box["3A"].isActive = false;
				box["3B"].isActive = false;
				box["3C"].isActive = false;
				box["4A"].isActive = false;
				box["4B"].isActive = false;
				box["4C"].isActive = false;
				box["5A"].isActive = false;
				box["5B"].isActive = false;
				box["5C"].isActive = false;
				box["1A"].isActive = true;
				box["2A"].isActive = true;
				box["3A"].isActive = true;
				box["4A"].isActive = true;
				box["5A"].isActive = true;
				option01 = "1A";
				option02 = "2A";
				option03 = "3A";
				option04 = "4A";
				option05 = "5A";
			}
			else if(this.str=="<-"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.max(0, stageSelectPageNum-1);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.max(0, extraStageSelectPageNum-1);
				}
				return;
			}
			else if(this.str=="->"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.min(STAGE_SELCET_PAGE_MAX_COUNT, stageSelectPageNum+1);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.min(EXTRA_STAGE_SELCET_PAGE_MAX_COUNT, extraStageSelectPageNum+1);
				}
				return;
			}
			else if(this.str.slice(0,-2)=="STAGE"){
				if(stage[this.str.slice(-2)*1]==undefined) return;
				initilalizeAllObject();
				stage[this.str.slice(-2)*1]();
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
	for(var i in box){
		box[i].isAlive = false;
	}
	clearFlag = true;
}

var setTitleWindowBox = function(){
	box["TITLE_WINDOW"] = new Box(scrWid1/2, 250, 0, 0, "TITLE WINDOW", 07, 80, "transparent");
	box["PLAY"] = new Box(500, 450, 600, 70, "PLAY", "brown", 60, 33)
	box["OPTION"] = new Box(500, 550, 600, 70, "OPTION", "brown", 60, 33)
	box["QUIT"] = new Box(500, 650, 600, 70, "QUIT", "brown", 60, 33)
	box["EXTRA"] = new Box(500, 750, 600, 70, "///////", "brown", 60, 33);
}

var setStageSelectWindowBox = function(i){
	box["STAGE SELECT"] = new Box(0, 0, scrWid1, 100, "STAGE SELECT", "brown", 75, 33);
	box["PAGE"] = new Box(scrWid1/2, 150, 0, 0, "PAGE["+ (i+1)+ "/"+ (STAGE_SELCET_PAGE_MAX_COUNT+1)+ "]", 07, 60, "transparent");
	box["<-"] = new Box(0, 110, 140, scrHei1+ scrHei2-140, "<-", 04, 95, 33);
	box["->"] = new Box(scrWid1- 140, 110, 140, scrHei1+ scrHei2-140, "->", 04, 95, 33);
	box["STAGE_A"] = new Box(170, 200, 400, 270, "STAGE"+("00"+(6*i+1)).slice(-2), 04, 60, 03);
	box["STAGE_B"] = new Box(600, 200, 400, 270, "STAGE"+("00"+(6*i+2)).slice(-2), 04, 60, 03);
	box["STAGE_C"] = new Box(1030,200, 400, 270, "STAGE"+("00"+(6*i+3)).slice(-2), 04, 60, 03);
	box["STAGE_D"] = new Box(170, 500, 400, 270, "STAGE"+("00"+(6*i+4)).slice(-2), 04, 60, 03);
	box["STAGE_E"] = new Box(600, 500, 400, 270, "STAGE"+("00"+(6*i+5)).slice(-2), 04, 60, 03);
	box["STAGE_F"] = new Box(1030,500, 400, 270, "STAGE"+("00"+(6*i+6)).slice(-2), 04, 60, 03);
	box["TITLE"] = new Box(500, 790, 600, 80, "TITLE", "brown", 50, 03);
}

var setExtraStageSelectWindowBox = function(i){
	box["EXTRASTAGE"] = new Box(0, 0, scrWid1, 100, "EXTRA STAGE", 04, 75, 33);
	box["PAGE"] = new Box(scrWid1/2, 150, 0, 0, "PAGE["+ (i+1)+ "/"+ (EXTRA_STAGE_SELCET_PAGE_MAX_COUNT+1)+ "]", 07, 60, "transparent")
	box["<-"] = new Box(0, 110, 140, scrHei1+ scrHei2-140, "<-", 04, 75, 33);
	box["->"] = new Box(scrWid1- 140, 110, 140, scrHei1+ scrHei2-140, "->", 04, 75, 33);
	box["EXTRASTAGE_A"] = new Box(170, 200, 400, 270, "EXTRA"+("00"+(6*i+1)).slice(-2), 04, 60, 03);
	box["EXTRASTAGE_B"] = new Box(600, 200, 400, 270, "EXTRA"+("00"+(6*i+2)).slice(-2), 04, 60, 03);
	box["EXTRASTAGE_C"] = new Box(1030,200, 400, 270, "EXTRA"+("00"+(6*i+3)).slice(-2), 04, 60, 03);
	box["EXTRASTAGE_D"] = new Box(170, 500, 400, 270, "EXTRA"+("00"+(6*i+4)).slice(-2), 04, 60, 03);
	box["EXTRASTAGE_E"] = new Box(600, 500, 400, 270, "EXTRA"+("00"+(6*i+5)).slice(-2), 04, 60, 03);
	box["EXTRASTAGE_F"] = new Box(1030,500, 400, 270, "EXTRA"+("00"+(6*i+6)).slice(-2), 04, 60, 03);
	box["TITLE"] = new Box(500, 790, 600, 80, "TITLE", "brown", 50, 03);
}

var setOptionWindowBox = function(){
	box[" OPTION "] = new Box(000, 30, 1600, 120, " OPTION ", 01, 80, 33);
	
	box["VISIAL"] = new Box(scrWid1/4, 195, 0, 0, "VISIAL", 07, 50, "transparent");
	box["test01"] = new Box(200, 300, 0, 0, "test01", 07, 40, "transparent");
	box["1A"] = new Box(360, 270, 120, 60, "1A", 07, 40, 33);
	box["1B"] = new Box(500, 270, 120, 60, "1B", 07, 40, 33);
	box["1C"] = new Box(640, 270, 120, 60, "1C", 07, 40, 33);
	box["test02"] = new Box(200, 400, 0, 0, "test02", 07, 40, "transparent");
	box["2A"] = new Box(360, 370, 120, 60, "2A", 07, 40, 33);
	box["2B"] = new Box(500, 370, 120, 60, "2B", 07, 40, 33);
	box["2C"] = new Box(640, 370, 120, 60, "2C", 07, 40, 33);
	box["test03"] = new Box(200, 500, 0, 0, "test03", 07, 40, "transparent");
	box["3A"] = new Box(360, 470, 120, 60, "3A", 07, 40, 33);
	box["3B"] = new Box(500, 470, 120, 60, "3B", 07, 40, 33);
	box["3C"] = new Box(640, 470, 120, 60, "3C", 07, 40, 33);
	box["test04"] = new Box(200, 600, 0, 0, "test04", 07, 40, "transparent");
	box["4A"] = new Box(360, 570, 120, 60, "4A", 07, 40, 33);
	box["4B"] = new Box(500, 570, 120, 60, "4B", 07, 40, 33);
	box["4C"] = new Box(640, 570, 120, 60, "4C", 07, 40, 33);
	box["test05"] = new Box(200, 700, 0, 0, "test05", 07, 40, "transparent");
	box["5A"] = new Box(360, 670, 120, 60, "5A", 07, 40, 33);
	box["5B"] = new Box(500, 670, 120, 60, "5B", 07, 40, 33);
	box["5C"] = new Box(640, 670, 120, 60, "5C", 07, 40, 33);
	box[option01].isActive = true;
	box[option02].isActive = true;
	box[option03].isActive = true;
	box[option04].isActive = true;
	box[option05].isActive = true;
	
	box["SOUND"] = new Box(scrWid1*3/4, 195, 0, 0, "SOUND", 07, 50, "transparent");
	
	
	box["DEFAULT"] = new Box(  20, 790, 500, 80, "DEFAULT", 01, 50, 03);
	box["APPLY"] = new Box( 550, 790, 500, 80, "APPLY", 01, 50, 03);
	box["TITLE"] = new Box(1080, 790, 500, 80, "TITLE", 01, 50, 03);
}

var setMenuWindowBox = function(){
	box["blank1"] = new Box(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 33);
	box["blank2"] = new Box(318, 68, 964, 664, "", 04, 0, 00);
	setFramework(300, 50, 1300, 750, 18, "brown");
	box["PAUSE"] = new Box(scrWid1/2, scrHei1/4, 0, 0, "PAUSE", "brown", 180, "transparent")
	box["RETRY"] = new Box(375, 350, 250, 130, "RETRY", "brown", 60, 04);
	box["RESUME"] = new Box(675, 350, 250, 130, "RESUME", "brown", 60, 04);
	box["BACK"] = new Box(975, 350, 250, 130, "BACK", "brown", 60, 04);
	box["STAGE:X"] = new Box(600, 585, 0, 0, "STAGE:"+nowStage, "brown", 55, "transparent");
	box["HOW TO PLAY"] = new Box(850, 550, 350, 70, "HOW TO PLAY", "brown", 45, 04);
}

var drawOptionWindow = function(){
	ctx.beginPath();
	ctx.moveTo(scrWid1/2*sr+ scrWid0, 180*sr+ scrHei0);
	ctx.lineTo(scrWid1/2*sr+ scrWid0, 765*sr+ scrHei0);
	ctx.lineWidth = 8;
	ctx.lineCap = "round";
	ctx.stroke();
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

/* var setBox = function(tlx, tly, brx, bry, str, fc, fs, bc){
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
				for(var i in box){
					box[i].isAlive = false;
				}
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
 */
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








