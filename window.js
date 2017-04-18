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

Box.prototype.gainImage = function(imageData, imageX, imageY, imageWid, imageHei){
	this.hasImage = true;
	this.imageData = imageData;
	if(imageX==undefined){
		this.imageX = this.tl.x;
		this.imageY = this.bl.y- 175;
		this.imageWid = this.wid;
		// this.imageHei = this.hei;
		this.imageHei = 175;
	}
	else{
		this.imageX = imageX;
		this.imageY = imageY;
		this.imageWid = imageWid;
		this.imageHei = imageHei;
	}
}

Box.prototype.draw = function(){
	
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
	
	if(this.hasImage==true){
		if(typeof(this.imageData!=undefined)){
			ctx.drawImage(this.imageData, this.imageX* sr+ scrWid0, this.imageY* sr+ scrHei0, this.imageWid*sr, this.imageHei*sr);
		}
	}
	
	if(this.isLocked==true){
		var lineWid = 15;
		var blankWid = 23.6;
		var theta = PI/6;
		for(var i=1; i<Math.floor((this.wid+ this.hei)/(lineWid+ blankWid)); i++){
		ctx.beginPath();
			var p1 = new Point();
			var p2 = new Point();
			var p3 = new Point();
			var p4 = new Point();
			p1.x = Math.min(this.tl.x+ i*(lineWid+ blankWid)- lineWid, this.tr.x);
			p1.y = Math.max(this.tl.y, this.tl.y+ (i*(lineWid+ blankWid)- lineWid- this.wid)* 1/tan(theta));
			
			p2.x = Math.min(this.tl.x+ i* (lineWid+ blankWid), this.tr.x);
			p2.y = Math.max(this.tl.y, this.tl.y+ (i*(lineWid+ blankWid)- this.wid)* 1/tan(theta));
			
			p3.x = Math.max(this.tl.x+ i* (lineWid+ blankWid)- this.hei* tan(theta), this.tl.x);
			p3.y = Math.min(this.bl.y, this.bl.y+ (i* (lineWid+ blankWid)- this.hei* tan(theta))* 1/tan(theta));
			
			p4.x = Math.max(this.tl.x+ i* (lineWid+ blankWid)- lineWid- this.hei* tan(theta), this.tl.x);
			p4.y = Math.min(this.bl.y, this.bl.y+ (i* (lineWid+ blankWid)- lineWid- this.hei* tan(theta))* 1/tan(theta));
			
			ctx.moveTo((p1.x+0.5)*sr+ scrWid0, (p1.y+0.5)*sr+ scrHei0);
			ctx.lineTo((p2.x-0.5)*sr+ scrWid0, (p2.y+0.5)*sr+ scrHei0);
			ctx.lineTo((p3.x-0.5)*sr+ scrWid0, (p3.y-0.5)*sr+ scrHei0);
			ctx.lineTo((p4.x+0.5)*sr+ scrWid0, (p4.y-0.5)*sr+ scrHei0);
			ctx.closePath();
			if(this.str.slice(0,5)=="STAGE" || this.str.slice(0,5)=="EXTRA"){
				ctx.fillStyle = "rgba(111, 132, 158, 0.6)";
			}
			else{
				ctx.fillStyle = "rgba(111, 132,  158, 1.0)";
			}
			ctx.fill();
		}
	}
	
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
	else if(this.str=="<-"){
		ctx.beginPath();
		ctx.moveTo((this.tl.x+ this.wid*0.12)*sr+ scrWid0, (this.tl.y+ this.hei*0.50)*sr + scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.82)*sr+ scrWid0, (this.tl.y+ this.hei*0.36)*sr + scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.82)*sr+ scrWid0, (this.tl.y+ this.hei*0.64)*sr + scrHei0);
		ctx.closePath();
		ctx.fillStyle = "rgba( 167, 36, 66, 1.0)";
		ctx.fill();
	}
	else if(this.str=="->"){
		ctx.beginPath();
		ctx.moveTo((this.tl.x+ this.wid*0.88)*sr+ scrWid0, (this.tl.y+ this.hei*0.50)*sr + scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.18)*sr+ scrWid0, (this.tl.y+ this.hei*0.36)*sr + scrHei0);
		ctx.lineTo((this.tl.x+ this.wid*0.18)*sr+ scrWid0, (this.tl.y+ this.hei*0.64)*sr + scrHei0);
		ctx.closePath();
		ctx.fillStyle = "rgba( 167, 36, 66, 1.0)";
		ctx.fill();
	}
	ctx.fillStyle = color[this.fc];
	ctx.font = (this.fs*sr)+ "px 'MSゴシック'";
	ctx.textAlign = "center";
	ctx.fillText(this.str, (this.tl.x+this.br.x)/2*sr+ scrWid0, (this.tl.y+this.br.y+this.fs*2/3)/2*sr+ scrHei0);
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
			else if((this.str=="BACK" && nowWindow=="stage") || this.str=="PLAY"){
				initilalizeAllObject();
				nowWindow = "stageSelect";
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if((this.str=="BACK" && nowWindow=="extraStage") || this.str=="EXTRA"){
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
				for(var i in appliedOption){
					selectedOption[i] = appliedOption[i];
				}
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
				setOptionWindowBox();
				return;
			}
			else if(this.str=="NO"){
				initilalizeAllObject();
				setOptionWindowBox();
				for(var i in selectedOption){
					box[appliedOption[i]].isSelected = false;
					box[appliedOption[i]].hasFramework = false;
					box[selectedOption[i]].isSelected = true;
					box[selectedOption[i]].hasFramework = true;
				}
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
	box["PLAY"] = new Box(500, 450, 600, 70, "PLAY", "darkblue", 60, "lightblue");
	box["PLAY"].gainFramework(3, 01, "outer", "bevel");
	box["OPTION"] = new Box(500, 550, 600, 70, "OPTION", "darkblue", 60, "lightblue");
	box["OPTION"].gainFramework(3, 01, "outer", "bevel");
	box["QUIT"] = new Box(500, 650, 600, 70, "QUIT", "darkblue", 60, "lightblue");
	box["QUIT"].gainFramework(3, 01, "outer", "bevel");
	box["EXTRA"] = new Box(500, 750, 600, 70, "", "darkblue", 60, "lightblue");
	box["EXTRA"].gainFramework(3, 01, "outer", "bevel");
	box["EXTRA"].isLocked = true;
	box["EXTRA"].canDetect = false;
	box["HIDDEN"] = new Box(500, 820, 600, 50, "press 'A' to hidden comand", "black", 20, "transparent");
}

var setStageSelectWindowBox = function(i){
	box["STAGE_SELECT"] = new Box(0, 5, scrWid1, 95, "STAGE SELECT", "brown", 75, 33);
	box["STAGE_SELECT"].gainFramework(5, "gray", "middle", "round");
	box["PAGE"] = new Box(scrWid1/2, 150, 0, 0, "PAGE: "+ (i+1)+ "/"+ (STAGE_SELCET_PAGE_MAX_COUNT+1), 07, 60, "transparent");
	box["<-"] = new Box(0, 110, 140, scrHei1+ scrHei2-140, "<-", "transparent", 95, "lightblue");
	box["->"] = new Box(scrWid1- 140, 110, 140, scrHei1+ scrHei2-140, "->", "transparent", 95, "lightblue");
	box["<-"].gainFramework(8, "gray", "middle", "round");
	box["->"].gainFramework(8, "gray", "middle", "round");
	box["STAGE_1U"] = new Box(170, 215, 400,  74, "STAGE: "+("00"+(6*i+1)).slice(-2), "darkblue", 60, "lightblue");
	box["STAGE_2U"] = new Box(600, 215, 400,  74, "STAGE: "+("00"+(6*i+2)).slice(-2), "darkblue", 60, "lightblue");
	box["STAGE_3U"] = new Box(1030,215, 400,  74, "STAGE: "+("00"+(6*i+3)).slice(-2), "darkblue", 60, "lightblue");
	box["STAGE_4U"] = new Box(170, 515, 400,  74, "STAGE: "+("00"+(6*i+4)).slice(-2), "darkblue", 60, "lightblue");
	box["STAGE_5U"] = new Box(600, 515, 400,  74, "STAGE: "+("00"+(6*i+5)).slice(-2), "darkblue", 60, "lightblue");
	box["STAGE_6U"] = new Box(1030,515, 400,  74, "STAGE: "+("00"+(6*i+6)).slice(-2), "darkblue", 60, "lightblue");
	
	box["STAGE_1D"] = new Box(170, 295, 400, 175, "STAGE"+("00"+(6*i+1)).slice(-2), "transparent", 60, "transparent");
	box["STAGE_2D"] = new Box(600, 295, 400, 175, "STAGE"+("00"+(6*i+2)).slice(-2), "transparent", 60, "transparent");
	box["STAGE_3D"] = new Box(1030,295, 400, 175, "STAGE"+("00"+(6*i+3)).slice(-2), "transparent", 60, "transparent");
	box["STAGE_4D"] = new Box(170, 595, 400, 175, "STAGE"+("00"+(6*i+4)).slice(-2), "transparent", 60, "transparent");
	box["STAGE_5D"] = new Box(600, 595, 400, 175, "STAGE"+("00"+(6*i+5)).slice(-2), "transparent", 60, "transparent");
	box["STAGE_6D"] = new Box(1030,595, 400, 175, "STAGE"+("00"+(6*i+6)).slice(-2), "transparent", 60, "transparent");
	
	box["STAGE_1U"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_2U"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_3U"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_4U"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_5U"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_6U"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_1D"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_2D"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_3D"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_4D"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_5D"].gainFramework(6, "blue", "outer", "round");
	box["STAGE_6D"].gainFramework(6, "blue", "outer", "round");
	for(var j=1; j<7; j++){
		if(stageImage[6*i+j]!=undefined){
			box["STAGE_"+j+"D"].gainImage(stageImage[6*i+1]);
		}
	}
	for(var j=1; j<7; j++){
		if(6*i+j> lockedStageNum){
			box["STAGE_"+j+"D"].isLocked = true;
			box["STAGE_"+j+"D"].canDetect = false;
			box["STAGE_"+j+"D"].bc = 13;
		}
	}
	box["TITLE"] = new Box(500, 800, 600, 70, "TITLE", "darkblue", 60, "lightblue");
	box["TITLE"].gainFramework(3, 01, "outer", "bevel");
}

var setExtraStageSelectWindowBox = function(i){
	box["EXTRA_STAGE"] = new Box(0, 5, scrWid1, 95, "EXTRA STAGE", "red", 75, "lightred");
	box["EXTRA_STAGE"].gainFramework(5, "gray", "middle", "round");
	box["PAGE"] = new Box(scrWid1/2, 150, 0, 0, "PAGE: "+ (i+1)+ "/"+ (EXTRA_STAGE_SELCET_PAGE_MAX_COUNT+1), 07, 60, "transparent")
	box["<-"] = new Box(0, 110, 140, scrHei1+ scrHei2-140, "<-", "transparent", 75, "lightred");
	box["->"] = new Box(scrWid1- 140, 110, 140, scrHei1+ scrHei2-140, "->", "transparent", 75, "lightred");
	box["<-"].gainFramework(8, "gray", "middle", "round");
	box["->"].gainFramework(8, "gray", "middle", "round");
	var str
	if(i==0){
		str = "EXTRA: A-";
	}
	else if(i==1){
		str = "EXTRA: B-";
	}
	else{
		str = "EXTRA: C-";
	}
	box["EXTRASTAGE_1U"] = new Box(170, 215, 400,  74, str+1, "darkred", 60, "lightred");
	box["EXTRASTAGE_2U"] = new Box(600, 215, 400,  74, str+2, "darkred", 60, "lightred");
	box["EXTRASTAGE_3U"] = new Box(1030,215, 400,  74, str+3, "darkred", 60, "lightred");
	box["EXTRASTAGE_4U"] = new Box(170, 515, 400,  74, str+4, "darkred", 60, "lightred");
	box["EXTRASTAGE_5U"] = new Box(600, 515, 400,  74, str+5, "darkred", 60, "lightred");
	box["EXTRASTAGE_6U"] = new Box(1030,515, 400,  74, str+6, "darkred", 60, "lightred");
	
	box["EXTRASTAGE_1D"] = new Box(170, 295, 400, 175, "EXTRASTAGE"+("00"+(6*i+1)).slice(-2), "transparent", 60, "transparent");
	box["EXTRASTAGE_2D"] = new Box(600, 295, 400, 175, "EXTRASTAGE"+("00"+(6*i+2)).slice(-2), "transparent", 60, "transparent");
	box["EXTRASTAGE_3D"] = new Box(1030,295, 400, 175, "EXTRASTAGE"+("00"+(6*i+3)).slice(-2), "transparent", 60, "transparent");
	box["EXTRASTAGE_4D"] = new Box(170, 595, 400, 175, "EXTRASTAGE"+("00"+(6*i+4)).slice(-2), "transparent", 60, "transparent");
	box["EXTRASTAGE_5D"] = new Box(600, 595, 400, 175, "EXTRASTAGE"+("00"+(6*i+5)).slice(-2), "transparent", 60, "transparent");
	box["EXTRASTAGE_6D"] = new Box(1030,595, 400, 175, "EXTRASTAGE"+("00"+(6*i+6)).slice(-2), "transparent", 60, "transparent");
	
	box["EXTRASTAGE_1U"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_2U"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_3U"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_4U"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_5U"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_6U"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_1D"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_2D"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_3D"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_4D"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_5D"].gainFramework(6, "red", "outer", "round");
	box["EXTRASTAGE_6D"].gainFramework(6, "red", "outer", "round");
	
	for(var j=1; j<7; j++){
		if(stageImage[6*i+j]!=undefined){
			box["EXTRASTAGE_"+j+"D"].gainImage(extraStageImage[6*i+1]);
		}
	}
	for(var j=1; j<7; j++){
		if(6*i+j> lockedExtraStageNum){
			box["EXTRASTAGE_"+j+"D"].isLocked = true;
			box["EXTRASTAGE_"+j+"D"].canDetect = false;
			box["EXTRASTAGE_"+j+"D"].bc = 13;
		}
	}
	
	box["TITLE"] = new Box(500, 800, 600, 70, "TITLE", "darkred", 60, "lightred");
	box["TITLE"].gainFramework(3, 02, "outer", "bevel");
}

var setOptionWindowBox = function(){
	box[" OPTION "] = new Box(000, 30, 1600, 120, " OPTION ", 01, 80, 33);
	box[" OPTION "].gainFramework(8, "gray", "outer", "round");
	
	box["VISUAL"] = new Box(scrWid1/4, 195, 0, 0, "VISUAL", 07, 50, "transparent");
	box["OPTION01"] = new Box(200, 300, 0, 0, "test01", 07, 40, "transparent");
	box["01A"] = new Box(360, 270, 120, 60, "01A", 07, 40, 33);
	box["01B"] = new Box(500, 270, 120, 60, "01B", 07, 40, 33);
	box["01C"] = new Box(640, 270, 120, 60, "01C", 07, 40, 33);
	box["OPTION02"] = new Box(200, 400, 0, 0, "test02", 07, 40, "transparent");
	box["02A"] = new Box(360, 370, 120, 60, "02A", 07, 40, 33);
	box["02B"] = new Box(500, 370, 120, 60, "02B", 07, 40, 33);
	box["02C"] = new Box(640, 370, 120, 60, "02C", 07, 40, 33);
	box["OPTION03"] = new Box(200, 500, 0, 0, "test03", 07, 40, "transparent");
	box["03A"] = new Box(360, 470, 120, 60, "03A", 07, 40, 33);
	box["03B"] = new Box(500, 470, 120, 60, "03B", 07, 40, 33);
	box["03C"] = new Box(640, 470, 120, 60, "03C", 07, 40, 33);
	box["OPTION04"] = new Box(200, 600, 0, 0, "test04", 07, 40, "transparent");
	box["04A"] = new Box(360, 570, 120, 60, "04A", 07, 40, 33);
	box["04B"] = new Box(500, 570, 120, 60, "04B", 07, 40, 33);
	box["04C"] = new Box(640, 570, 120, 60, "04C", 07, 40, 33);
	box["OPTION05"] = new Box(200, 700, 0, 0, "test05", 07, 40, "transparent");
	box["05A"] = new Box(360, 670, 120, 60, "05A", 07, 40, 33);
	box["05B"] = new Box(500, 670, 120, 60, "05B", 07, 40, 33);
	box["05C"] = new Box(640, 670, 120, 60, "05C", 07, 40, 33);
	
	box["SOUND"] = new Box(scrWid1*3/4, 195, 0, 0, "SOUND", 07, 50, "transparent");
	box["VOLUME01"] = new Box(950, 300, 0, 0, "VOLUME01", 07, 40, "transparent");
	box["<01"] = new Box(1100, 270, 45, 60, "<01", "transparent", 40, 33);
	box[">01"] = new Box(1490, 270, 45, 60, ">01", "transparent", 40, 33);
	box["VOLUME02"] = new Box(950, 400, 0, 0, "VOLUME02", 07, 40, "transparent");
	box["<02"] = new Box(1100, 370, 45, 60, "<02", "transparent", 40, 33);
	box[">02"] = new Box(1490, 370, 45, 60, ">02", "transparent", 40, 33);
	box["OPTION11"] = new Box(950, 500, 0, 0, "test11", 07, 40, "transparent");
	box["11A"] = new Box(1110, 470, 120, 60, "11A", 07, 40, 33);
	box["11B"] = new Box(1250, 470, 120, 60, "11B", 07, 40, 33);
	box["11C"] = new Box(1390, 470, 120, 60, "11C", 07, 40, 33);
	box["OPTION12"] = new Box(950, 600, 0, 0, "test12", 07, 40, "transparent");
	box["12A"] = new Box(1110, 570, 120, 60, "12A", 07, 40, 33);
	box["12B"] = new Box(1250, 570, 120, 60, "12B", 07, 40, 33);
	box["12C"] = new Box(1390, 570, 120, 60, "12C", 07, 40, 33);
	box["OPTION13"] = new Box(950, 700, 0, 0, "test13", 07, 40, "transparent");
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
	box["BLANK1"] = new Box(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 13);
	box["BACK_BOARD"] = new Box(300, 200, 1000, 520, "", 04, 0, 00);
	box["BACK_BOARD"] = new Box(300, 200, 1000, 520, "", 04, 0, 00);
	box["BACK_BOARD"].gainFramework(32, 02, "outer", "bevel");
	box["APPLYALERT"] = new Box(400, 300, 800, 100, "ARE YOU SURE TO APPLY?", 07, 70, "transparent");
	box["YES"] = new Box(450, 560, 250, 120, "YES", 07, 80, "lightblue");
	box["NO"] = new Box(900, 560, 250, 120, "NO", 07, 80, "lightblue");
	box["YES"].gainFramework(6, "black", "outer", "round");
	box["NO"].gainFramework(6, "black", "outer", "round");
}

var setMenuWindowBox = function(){
	box["BLANK"] = new Box(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 33);
	box["BACK_BOARD"] = new Box(318, 68, 964, 664, "", 04, 0, 00);
	box["BACK_BOARD"].gainFramework(24, 02, "outer", "bevel");
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








