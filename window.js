var box = function(){
	this.tl = new Point();
	this.tr = new Point();
	this.br = new Point();
	this.bl = new Point();
	
	this.srt = "";
	this.sc = "black";
	this.bc = "white";
	this.type = 0;
}

box.prototype.set = function(tlx, tly, brx, bry, str, fc, fs, bc, type){
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

box.prototype.draw = function(){
	ctx.moveTo(this.tl.x, this.tl.y);
	ctx.lineTo(this.tr.x, this.tr.y);
	ctx.lineTo(this.br.x, this.br.y);
	ctx.lineTo(this.bl.x, this.bl.y);
	ctx.closePath();
	ctx.fillStyle = this.fc;
	ctx.fill()
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


drawStageSelectWindow = function(i){
	setString(scrWid1/2, 170, "PAGE["+ (i+1)+ "/"+ (STAGE_SELCET_PAGE_MAX_COUNT+1)+ "]", 60, 07);
	setBox(0, 0, scrWid1, 100, "STAGE SELECT", 04, 75, 33);
	setBox(0, 110, 140, scrHei1+ scrHei2-30, "<-", 04, 75, 33);
	setBox(scrWid1- 140, 110, scrWid1, scrHei1+ scrHei2-30, "->", 04, 75, 33);
	setBox(170, 200, 570, 470, "STAGE"+("00"+(6*i+1)).slice(-2), 04, 50, 03);
	setBox(600, 200,1000, 470, "STAGE"+("00"+(6*i+2)).slice(-2), 04, 50, 03);
	setBox(1030,200,1430, 470, "STAGE"+("00"+(6*i+3)).slice(-2), 04, 50, 03);
	setBox(170, 500, 570, 770, "STAGE"+("00"+(6*i+4)).slice(-2), 04, 50, 03);
	setBox(600, 500,1000, 770, "STAGE"+("00"+(6*i+5)).slice(-2), 04, 50, 03);
	setBox(1030,500,1430, 770, "STAGE"+("00"+(6*i+6)).slice(-2), 04, 50, 03);
	setBox(500, 790, 1100, 870, "MENU", 04, 50, 03);
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
			else if(str=="BACK"){
				stageSelectWindow();
				pauseFlag = false;
				leftDown = false;
				return;
			}
			else if(str=="RETRY"){
				stage[nowStage]();
				pauseFlag = false;
				leftDown1 = false;
				return;
			}
			else if(str=="<-"){
				stageSelectPageNum = Math.max(0, stageSelectPageNum-1);
				return;
			}
			else if(str=="->"){
				stageSelectPageNum = Math.min(STAGE_SELCET_PAGE_MAX_COUNT, stageSelectPageNum+1);
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








