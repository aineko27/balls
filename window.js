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
				
				case "RETRY":
					stage00(ball, wall, star, converter);
					pauseFlag = false;
					leftDown1 = false;
					break
			}
		}
	}
	
	
	
	
	switch(str){
		case "back":
			pauseFlag = true;
			break;
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








