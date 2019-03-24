var fishObj = function()
{
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
//	this.bigBody = new Image();
//	this.bigTail = new Image();
	
	this.bigTialTimer = 0;//记数器
	this.bigTialCount = 0;//记录第几张图
	
	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval=1000;//眨眼间的间隔
	
	this.bigBodyCount = 0;
	
}

fishObj.prototype.num = 1;

fishObj.prototype.init=function()
{
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	this.bigEye.src="img/bigEye0.png"
//	this.bigBody.src="img/bigSwim0.png"
//	this.bigTail.src="img/babyTail0.png"
}

fishObj.prototype.draw=function()
{
	//lerp x,y
	//跟随鼠标移动 趋向性移动
	this.x = lerpDistance(mx,this.x,0.97)
	this.y = lerpDistance(my,this.y,0.97)
	
	//delta angle
	//Math.atan2(y,x)；反正切
	//让大鱼的角度一直趋向于鼠标的角度
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI , PI
	
	this.angle = lerpAngle(beta,this.angle,0.9);
	
	//尾巴图片
	this.bigTialTimer += deltaTime;//尾巴摇摆的时间间隔
	if(this.bigTialTimer>50){
		this.bigTialCount = (this.bigTialCount+1)%8
		this.bigTialTimer %=50;
	}
	
	//眨眼间
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer>this.bigEyeInterval){
		this.bigEyeTimer %= this.bigEyeTimer;
		this.bigEyeCount = (this.bigEyeCount+1)%2;//[0,1]之间不断循环
		
		if(this.bigEyeCount==0){
			this.bigEyeInterval = Math.random() * 1500 + 2000;//[1500,3500)
		}else{
			this.bigEyeInterval = 200;
		}
	}
	
	ctx1.save();
	ctx1.translate(this.x,this.y);//平移 把圆点移动到this.x,this.y
	ctx1.rotate(this.angle)//方法转换画布的用户坐标系统。
	var count = this.bigTialCount;
	var count2 = this.bigEyeCount;
	var count3 = this.bigBodyCount;

	if(data.score==1){//橙色
		ctx1.drawImage(bigBodyOrange[count3],-bigBodyOrange[count3].width*0.5,-bigBodyOrange[count3].height*0.5);
	}else{
		ctx1.drawImage(bigBodyBlue[count3],-bigBodyBlue[count3].width*0.5,-bigBodyBlue[count3].height*0.5);
	}
	ctx1.drawImage(bigEye[count2],-bigEye[count2].width*0.5,-bigEye[count2].height*0.5);//原点
	ctx1.drawImage(bigTail[count],-bigTail[count].width*0.5+30,-bigTail[count].height*0.5);

	ctx1.restore();
}

//大鱼跟随鼠标移动算法
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
//	console.log(aim + delta * ratio)
	return aim + delta * ratio;
}
//让大鱼的角度一直趋向于鼠标的角度算法
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

