/*
大鱼吃果实圆圈
*/
var waveObject = function(){
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive=[];
}

waveObject.prototype.num=10;

waveObject.prototype.init=function(){
	for (var i = 0; i < this.num; i++) {
		this.r[i] = 0;
		this.alive[i]=false;
	}
}

waveObject.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white";
	for (var i = 0; i < this.num; i++) {
		if(this.alive[i])
		{
			this.r[i] += deltaTime * 0.04 ;
			if(this.r[i]>50)
			{
				//让圆圈半径大于50时消失
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50;/*0-1*/
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI * 2);/*Math.PI * 2一圈*/
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}

waveObject.prototype.born=function(x,y){
	for (var i = 0; i < this.num; i++) {
		if(!this.alive[i]){//大鱼吃掉果实时调用
			this.alive[i] = true;
//			console.log("出生");
			this.r[i] = 20;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}
