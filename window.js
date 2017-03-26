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

drawMenuWindow = function(){
	setBox(0, 0, scrWid1, scrHei1+scrHei2, "", 04, 0, 33);
	setBox(300, 50, 1300, 750, "", 04, 0, 00);
	setFramework(300, 50, 1300, 750, 18, "brown");
	setString(scrWid1/2, scrHei1/3, "PAUSE", 180, "px 'MSゴシック'", 04);
	setBox(375, 350, 625, 480, "BACK", "brown", 75, 04);
	setBox(675, 350, 925, 480, "TITLE", "brown", 75, 04);
	setBox(975, 350, 1225, 480, "RETRY", "brown", 75, 04);
	ctx.font = (45*sr)+ "px 'MSゴシック'";
	ctx.fillText("STAGE:X", 500*sr+ scrWid0, 600*sr+ scrHei0);
	setBox(850, 550, 1200, 620, "HOW TO PLAY", "brown", 45, 04);
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
	ctx.fillText(str, (tlx+brx)/2*sr+ scrWid0, (tly+bry+fs*2/3)/2*sr+ scrHei0);
	if(leftDown1==true){
		if(mouseIsInside(tlx, tly, brx, bry)==true){
			switch(str){
				case "BACK":
					pauseFlag = false;
					leftDown1 = false;
					break;
					
				case "TITLE":
					titleWindow();
					pauseFlag = false;
					leftDown = false;
					break;
				
				case "RETRY":
					stage[nowStage]();
					pauseFlag = false;
					leftDown1 = false;
					break
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

var setString = function(x, y, str, fs, ft, fc){
	ctx.fillStyle = color[fc];
	ctx.font = (fs*sr)+ ft;
	ctx.textAlign = "center";
	ctx.fillText("PAUSE", x*sr+ scrWid0, y*sr+ scrHei0);
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








