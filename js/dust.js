var dustObj = function()
{
	this.x = [];
	this.y = [];
	this.No = [];
	this.amp=[];
	this.alpha;
}

dustObj.prototype.num=30;

dustObj.prototype.init=function(){
	for (var i = 0; i < this.num; i++) 
	{
		this.No[i] = Math.floor(Math.random()*7);//[0-7)
		this.x[i] = Math.random()*canWidth;
		this.y[i] = Math.random()*canHeight;
		this.amp[i] = 20 + Math.random() * 15;
	}
	this.alpha=0;
}

dustObj.prototype.draw=function(){
	this.alpha += deltaTime * 0.0008; //摆动速率
	var l = Math.sin(this.alpha);//-1 1  正弦函数
	for (var i = 0; i < this.num; i++) {
		var no = this.No[i];
		ctx1.drawImage(dust_pic[no],this.x[i] + this.amp[i] * l,this.y[i]);
	}

}
