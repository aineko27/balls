var Box = function(tlx, tly, wid, hei, str, fc, fs, bc){
	this.tl = new Point(tlx, tly);
	this.tr = new Point(tlx+wid, tly);
	this.br = new Point(tlx+wid, tly+hei);
	this.bl = new Point(tlx, tly+hei);
	
	this.wid = this.tr.x- this.tl.x;
	this.hei = this.bl.y- this.tl.y;
	this.str = str;
	this.fc = fc;
	this.fs = fs;
	this.bc = bc;
	this.isAlive = true;
	this.isActive = false;
	this.canDetect = true;
	this.hasFramework = false;
}

Box.prototype.initialize = function(){
	this.tl = new Point();
	this.tr = new Point();
	this.br = new Point();
	this.bl = new Point();
	
	this.str = "";
	this.sc = "black";
	this.bc = "white";
	this.isAlive = false;
	this.isActive = false;
}

Box.prototype.gainFramework = function(frameWidth, frameColor, framePosition, frameworkLineJoin){
	this.hasFramework = true;
	this.frameworkWidth = frameWidth;
	this.frameworkColor = frameColor;
	this.frameworkPosition = framePosition;
	this.frameworkLineJoin = frameworkLineJoin;
}

Box.prototype.loseFramework = function(){
	this.hasFramework = false;
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
		ctx.fill();
		ctx.fill();
	}
	if(this.isSelected==true){
		// drawFramework(this.tl.x, this.tl.y, this.br.x, this.br.y, 5*sr, "red");
	}
	if(this.hasFramework==true){
		ctx.beginPath();
		ctx.lineJoin = this.frameworkLineJoin;
		ctx.lineWidth = this.frameworkWidth*sr;
		if(this.frameworkPosition=="inner"){
			ctx.moveTo(this.tl.x*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, this.tl.y*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
			ctx.lineTo(this.br.x*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, this.tl.y*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
			ctx.lineTo(this.br.x*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, this.br.y*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
			ctx.lineTo(this.tl.x*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, this.br.y*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
			ctx.closePath();
		}
		else if(this.frameworkPosition=="outer"){
			ctx.moveTo(this.tl.x*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, this.tl.y*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
			ctx.lineTo(this.br.x*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, this.tl.y*sr+ scrHei0- ctx.lineWidth*0.95/2*sr);
			ctx.lineTo(this.br.x*sr+ scrWid0+ ctx.lineWidth*0.95/2*sr, this.br.y*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
			ctx.lineTo(this.tl.x*sr+ scrWid0- ctx.lineWidth*0.95/2*sr, this.br.y*sr+ scrHei0+ ctx.lineWidth*0.95/2*sr);
			ctx.closePath();
		}
		else{
			ctx.moveTo(this.tl.x*sr+ scrWid0, this.tl.y*sr+ scrHei0);
			ctx.lineTo(this.br.x*sr+ scrWid0, this.tl.y*sr+ scrHei0);
			ctx.lineTo(this.br.x*sr+ scrWid0, this.br.y*sr+ scrHei0);
			ctx.lineTo(this.tl.x*sr+ scrWid0, this.br.y*sr+ scrHei0);
			ctx.closePath();
		}
		ctx.strokeStyle = color[this.frameworkColor];
		ctx.stroke();
	}
	if(this.str=="<01"){
		ctx.beginPath();
		ctx.moveTo((this.tl.x+ this.wid*0.16)*sr+ scrWid0, (this.tl.y+ this.hei*0.50)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.78)*sr+ scrWid0, (this.tl.y+ this.hei*0.18)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.78)*sr+ scrWid0, (this.tl.y+ this.hei*0.82)*sr+ scrHei0);
		ctx.closePath();
		ctx.fillStyle = "darkred";
		ctx.fill();
	}
	else if(this.str==">01"){
		ctx.beginPath();
		ctx.moveTo((this.tl.x+ this.wid*0.84)*sr+ scrWid0, (this.tl.y+ this.hei*0.50)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.22)*sr+ scrWid0, (this.tl.y+ this.hei*0.18)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.22)*sr+ scrWid0, (this.tl.y+ this.hei*0.82)*sr+ scrHei0);
		ctx.closePath();
		ctx.fillStyle = "darkred";
		ctx.fill();
	}
	else if(this.str=="<02"){
		ctx.beginPath();
		ctx.moveTo((this.tl.x+ this.wid*0.16)*sr+ scrWid0, (this.tl.y+ this.hei*0.50)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.78)*sr+ scrWid0, (this.tl.y+ this.hei*0.18)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.78)*sr+ scrWid0, (this.tl.y+ this.hei*0.82)*sr+ scrHei0);
		ctx.closePath();
		ctx.fillStyle = "darkred";
		ctx.fill();
	}
	else if(this.str==">02"){
		ctx.beginPath();
		ctx.moveTo((this.tl.x+ this.wid*0.84)*sr+ scrWid0, (this.tl.y+ this.hei*0.50)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.22)*sr+ scrWid0, (this.tl.y+ this.hei*0.18)*sr+ scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.22)*sr+ scrWid0, (this.tl.y+ this.hei*0.82)*sr+ scrHei0);
		ctx.closePath();
		ctx.fillStyle = "darkred";
		ctx.fill();
	}
	else{
		ctx.fillStyle = color[this.fc];
		ctx.font = (this.fs*sr)+ "px 'MSゴシック'";
		ctx.textAlign = "center";
		ctx.fillText(this.str, (this.tl.x+this.br.x)/2*sr+ scrWid0, (this.tl.y+this.br.y+this.fs*2/3)/2*sr+ scrHei0);
	}
}

Box.prototype.detect = function(){
	if(this.isSelected==true){
		this.frameworkWidth = 4*sr;
		this.frameworkColor = 02;
		this.frameworkLineJoin = "bevel"
		this.frameworkPositon = "outer";
	}
	
	if(leftDown1==true && leftDown2==false && this.canDetect==true){
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
				return;
			}
			else if(this.str=="YES"){
				for(var i in appliedOption){
					box[appliedOption[i]].isActive = false;
					box[selectedOption[i]].isActive = true;
					appliedOption[i] = selectedOption[i]
				}
				initilalizeAllObject();
				setOptionWindowBox(appliedOption);
				return;
			}
			else if(this.str=="NO"){
				initilalizeAllObject();
				setOptionWindowBox(selectedOption);
				return;
			}
			else if(this.str=="APPLY"){
				for(var i in appliedOption){
					if(appliedOption[i]!=selectedOption[i]){
						addApplyAlertBox();
					}
				}
				return;
			}
			else if(this.str=="OPTION"){
				initilalizeAllObject();
				nowWindow = "option";
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(this.str=="01A" || this.str=="01B" || this.str=="01C"){
				box[selectedOption[01]].isSelected = false;
				box[selectedOption[01]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[01] = this.str;
				return;
			}
			else if(this.str=="02A" || this.str=="02B" || this.str=="02C"){
				box[selectedOption[02]].isSelected = false;
				box[selectedOption[02]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[02] = this.str;
				return;
			}
			else if(this.str=="03A" || this.str=="03B" || this.str=="03C"){
				box[selectedOption[03]].isSelected = false;
				box[selectedOption[03]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[03] = this.str;
				return;
			}
			else if(this.str=="04A" || this.str=="04B" || this.str=="04C"){
				box[selectedOption[04]].isSelected = false;
				box[selectedOption[04]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[04] = this.str;
				return;
			}
			else if(this.str=="05A" || this.str=="05B" || this.str=="05C"){
				box[selectedOption[05]].isSelected = false;
				box[selectedOption[05]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[05] = this.str;
				return;
			}
			else if(this.str=="11A" || this.str=="11B" || this.str=="11C"){
				box[selectedOption[11]].isSelected = false;
				box[selectedOption[11]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[11] = this.str;
				return;
			}
			else if(this.str=="12A" || this.str=="12B" || this.str=="12C"){
				box[selectedOption[12]].isSelected = false;
				box[selectedOption[12]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[12] = this.str;
				return;
			}
			else if(this.str=="13A" || this.str=="13B" || this.str=="13C"){
				box[selectedOption[13]].isSelected = false;
				box[selectedOption[13]].loseFramework();
				this.isSelected = true;
				this.gainFramework(4, 02, "outer", "bevel");
				selectedOption[13] = this.str;
				return;
			}
			else if(this.str=="DEFAULT"){
				for(var i in appliedOption){
					box[selectedOption[i]].isSelected = false;
					box[selectedOption[i]].loseFramework();
					selectedOption[i] = ("00"+i+"A").slice(-3);
					box[selectedOption[i]].isSelected = true;
					box[selectedOption[i]].gainFramework(4, 02, "outer", "bevel");
				}
				return;
			}
			else if(this.str=="<01"){
				volume01Cnt = Math.max(0, volume01Cnt-1);
				return;
			}
			else if(this.str==">01"){
				volume01Cnt = Math.min(10, volume01Cnt+1);
				return;
			}
			else if(this.str=="<02"){
				volume02Cnt = Math.max(0, volume02Cnt-1);
				return;
			}
			else if(this.str==">02"){
				volume02Cnt = Math.min(10, volume02Cnt+1);
				return;
			}
			else if(this.str=="<-"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.max(0, stageSelectPageNum-1);
					setStageSelectWindowBox(stageSelectPageNum);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.max(0, extraStageSelectPageNum-1);
					setExtraStageSelectWindowBox(extraStageSelectPageNum);
				}
				return;
			}
			else if(this.str=="->"){
				if(nowWindow=="stageSelect"){
					stageSelectPageNum = Math.min(STAGE_SELCET_PAGE_MAX_COUNT, stageSelectPageNum+1);
					setStageSelectWindowBox(stageSelectPageNum);
				}
				else if(nowWindow=="extraStageSelect"){
					extraStageSelectPageNum = Math.min(EXTRA_STAGE_SELCET_PAGE_MAX_COUNT, extraStageSelectPageNum+1);
					setExtraStageSelectWindowBox(extraStageSelectPageNum);
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
	box["PLAY"] = new Box(500, 450, 600, 70, "PLAY", "brown", 60, 33);
	box["PLAY"].gainFramework(3, 02, "outer", "bevel");
	box["OPTION"] = new Box(500, 550, 600, 70, "OPTION", "brown", 60, 33);
	box["OPTION"].gainFramework(3, 02, "outer", "bevel");
	box["QUIT"] = new Box(500, 650, 600, 70, "QUIT", "brown", 60, 33);
	box["QUIT"].gainFramework(3, 02, "outer", "bevel");
	box["EXTRA"] = new Box(500, 750, 600, 70, "///////", "brown", 60, 33);
	box["EXTRA"].gainFramework(3, 02, "outer", "bevel");
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
	box["STAGE_A"].gainFramework(8, 02, "outer", "bevel");
	box["STAGE_B"].gainFramework(8, 02, "outer", "bevel");
	box["STAGE_C"].gainFramework(8, 02, "outer", "bevel");
	box["STAGE_D"].gainFramework(8, 02, "outer", "bevel");
	box["STAGE_E"].gainFramework(8, 02, "outer", "bevel");
	box["STAGE_F"].gainFramework(8, 02, "outer", "bevel");
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

var setOptionWindowBox = function(selectedOptionTemp){
	box[" OPTION "] = new Box(000, 30, 1600, 120, " OPTION ", 01, 80, 33);
	
	box["VISUAL"] = new Box(scrWid1/4, 195, 0, 0, "VISUAL", 07, 50, "transparent");
	box["test01"] = new Box(200, 300, 0, 0, "test01", 07, 40, "transparent");
	box["01A"] = new Box(360, 270, 120, 60, "01A", 07, 40, 33);
	box["01B"] = new Box(500, 270, 120, 60, "01B", 07, 40, 33);
	box["01C"] = new Box(640, 270, 120, 60, "01C", 07, 40, 33);
	box["test02"] = new Box(200, 400, 0, 0, "test02", 07, 40, "transparent");
	box["02A"] = new Box(360, 370, 120, 60, "02A", 07, 40, 33);
	box["02B"] = new Box(500, 370, 120, 60, "02B", 07, 40, 33);
	box["02C"] = new Box(640, 370, 120, 60, "02C", 07, 40, 33);
	box["test03"] = new Box(200, 500, 0, 0, "test03", 07, 40, "transparent");
	box["03A"] = new Box(360, 470, 120, 60, "03A", 07, 40, 33);
	box["03B"] = new Box(500, 470, 120, 60, "03B", 07, 40, 33);
	box["03C"] = new Box(640, 470, 120, 60, "03C", 07, 40, 33);
	box["test04"] = new Box(200, 600, 0, 0, "test04", 07, 40, "transparent");
	box["04A"] = new Box(360, 570, 120, 60, "04A", 07, 40, 33);
	box["04B"] = new Box(500, 570, 120, 60, "04B", 07, 40, 33);
	box["04C"] = new Box(640, 570, 120, 60, "04C", 07, 40, 33);
	box["test05"] = new Box(200, 700, 0, 0, "test05", 07, 40, "transparent");
	box["05A"] = new Box(360, 670, 120, 60, "05A", 07, 40, 33);
	box["05B"] = new Box(500, 670, 120, 60, "05B", 07, 40, 33);
	box["05C"] = new Box(640, 670, 120, 60, "05C", 07, 40, 33);
	
	box["SOUND"] = new Box(scrWid1*3/4, 195, 0, 0, "SOUND", 07, 50, "transparent");
	box["VOLUME01"] = new Box(950, 300, 0, 0, "VOLUME01", 07, 40, "transparent");
	box["<01"] = new Box(1100, 270, 45, 60, "<01", 07, 40, 33);
	box[">01"] = new Box(1490, 270, 45, 60, ">01", 07, 40, 33);
	box["VOLUME02"] = new Box(950, 400, 0, 0, "VOLUME02", 07, 40, "transparent");
	box["<02"] = new Box(1100, 370, 45, 60, "<02", 07, 40, 33);
	box[">02"] = new Box(1490, 370, 45, 60, ">02", 07, 40, 33);
	box["test11"] = new Box(950, 500, 0, 0, "test11", 07, 40, "transparent");
	box["11A"] = new Box(1110, 470, 120, 60, "11A", 07, 40, 33);
	box["11B"] = new Box(1250, 470, 120, 60, "11B", 07, 40, 33);
	box["11C"] = new Box(1390, 470, 120, 60, "11C", 07, 40, 33);
	box["test12"] = new Box(950, 600, 0, 0, "test12", 07, 40, "transparent");
	box["12A"] = new Box(1110, 570, 120, 60, "12A", 07, 40, 33);
	box["12B"] = new Box(1250, 570, 120, 60, "12B", 07, 40, 33);
	box["12C"] = new Box(1390, 570, 120, 60, "12C", 07, 40, 33);
	box["test13"] = new Box(950, 700, 0, 0, "test13", 07, 40, "transparent");
	box["13A"] = new Box(1110, 670, 120, 60, "13A", 07, 40, 33);
	box["13B"] = new Box(1250, 670, 120, 60, "13B", 07, 40, 33);
	box["13C"] = new Box(1390, 670, 120, 60, "13C", 07, 40, 33);
	
	for(var i in appliedOption){
		box[appliedOption[i]].isActive = true;
		box[appliedOption[i]].isSelected = true;
		box[appliedOption[i]].gainFramework(4, 02, "outer", "bevel");
	}
	
	box["DEFAULT"] = new Box(  20, 790, 500, 80, "DEFAULT", 01, 50, 03);
	box["APPLY"] = new Box( 550, 790, 500, 80, "APPLY", 01, 50, 03);
	box["TITLE"] = new Box(1080, 790, 500, 80, "TITLE", 01, 50, 03);
}

var addApplyAlertBox = function(){
	for(var i in box){
		box[i].canDetect = false;
	}
	box["BLANK1"] = new Box(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 33);
	box["BACKCOLOR1"] = new Box(318, 68, 964, 664, "", 04, 0, 00);
	box["APPLYALERT"] = new Box(400, 300, 800, 100, "ARE YOU SURE TO APPLY?", 07, 70, "transparent");
	box["YES"] = new Box(450, 560, 250, 120, "YES", 07, 80, 33);
	box["NO"] = new Box(900, 560, 250, 120, "NO", 07, 80, 33);
}

var setMenuWindowBox = function(){
	box["BLANK1"] = new Box(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 33);
	box["BLANK2"] = new Box(318, 68, 964, 664, "", 04, 0, 00);
	box["BLANK2"].gainFramework(16, 02, "outer", "bevel");
	box["PAUSE"] = new Box(scrWid1/2, scrHei1/4, 0, 0, "PAUSE", "brown", 180, "transparent");
	box["RETRY"] = new Box(375, 350, 250, 130, "RETRY", "brown", 60, 04);
	box["RETRY"].gainFramework(3, 02, "outer", "bevel");
	box["RESUME"] = new Box(675, 350, 250, 130, "RESUME", "brown", 60, 04);
	box["RESUME"].gainFramework(3, 02, "outer", "bevel");
	box["BACK"] = new Box(975, 350, 250, 130, "BACK", "brown", 60, 04);
	box["BACK"].gainFramework(3, 02, "outer", "bevel");
	box["STAGE:X"] = new Box(600, 585, 0, 0, "STAGE:"+nowStage, "brown", 55, "transparent");
	box["HOW TO PLAY"] = new Box(850, 550, 350, 70, "HOW TO PLAY", "brown", 45, 04);
	box["HOW TO PLAY"].gainFramework(3, 02, "outer", "bevel");
}

var drawOptionWindow = function(){
	ctx.beginPath();
	ctx.moveTo(scrWid1/2*sr+ scrWid0, 180*sr+ scrHei0);
	ctx.lineTo(scrWid1/2*sr+ scrWid0, 765*sr+ scrHei0);
	ctx.lineWidth = 8;
	ctx.lineCap = "round";
	ctx.stroke();
	drawFramework(1160, 270, 1475, 330, 5, "brown");
	drawFramework(1160, 370, 1475, 430, 5, "brown");
	ctx.beginPath();
	for(var i=0; i<volume01Cnt; i++){
		ctx.moveTo((1170+ i*30)* sr+ scrWid0, 300* sr+ scrHei0);
		ctx.lineTo((1165+ (i+1)*30)* sr+ scrWid0, 300* sr+ scrHei0);
	}
	for(var i=0; i<volume02Cnt; i++){
		ctx.moveTo((1170+ i*30)* sr+ scrWid0, 400* sr+ scrHei0);
		ctx.lineTo((1165+ (i+1)*30)* sr+ scrWid0, 400* sr+ scrHei0);
	}
	ctx.lineWidth = 42*sr;
	ctx.lineCap = "butt";
	ctx.strokeStyle = "brown"
	ctx.stroke();
}

var drawMenuWindow = function(){
	// drawFramework(300, 50, 1300, 750, 18, "brown");
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

var drawFramework = function(tlx, tly, brx, bry, lw, lc){
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








