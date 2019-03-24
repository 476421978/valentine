var fish2Obj = function(){
	this.x;
	this.y;
	this.angle;
//	this.babyEye = new Image();
//	this.babyBody = new Image();
//	this.babyTail = new Image();
	
	this.babyTailTimer = 0;//时间记时器
	this.babyTailCount = 0;//
	
	this.babyEyeTimer = 0;//时间记时器
	this.babyEyeCount = 0;//
	this.babyEyeInterval = 1000;//当前图片需要持续多少时间
	
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
	
}

fish2Obj.prototype.num = 1;

fish2Obj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
//	this.babyEye.src="img/babyEye0.png"
//	this.babyBody.src="img/babyFade0.png"
//	this.babyTail.src="img/babyTail0.png"
}

fish2Obj.prototype.draw=function(){
	//lerp x,y
	this.x = lerpDistance(fish.x,this.x,0.98);
	this.y = lerpDistance(fish.y,this.y,0.98);
	
	//delta angle
	//Math.atan2(y,x)；反正切
	//让小鱼的角度一直趋向于大鱼的角度[同大鱼趋向于鼠标]
	var deltaX = fish.x - this.x;
	var deltaY = fish.y - this.y;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI , PI
	
	this.angle = lerpAngle(beta,this.angle,0.6);
	
	// baby tail count 鱼尾巴摆动
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount = (this.babyTailCount+1) % 8;
		this.babyTailTimer %= 50;
	}
	
	//眨眼睛
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		if(this.babyEyeCount==0){
			this.babyEyeInterval = Math.random()*1500 + 2000;//[2000,3500)
		}
		else{
			this.babyEyeInterval = 200;
		}
	}
	
	//身体变色
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount++;
		this.babyBodyTimer %= 300;//清空时间
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			data.gameOver = true;
		}
	}
	
	ctx1.save();
		ctx1.translate(this.x,this.y);//平移 把圆点移动到this.x,this.y
		ctx1.rotate(this.angle)//方法转换画布的用户坐标系统。
		//先画在下面
		var count = this.babyTailCount;
		ctx1.drawImage(babyTail[count],-babyTail[count].width * 0.5 + 25, -babyTail[count].height * 0.5);
		var count3 = this.babyBodyCount;
		ctx1.drawImage(babyBody[count3],-babyBody[count3].width*0.5,-babyBody[count3].height*0.5);
		var count2 = this.babyEyeCount;
		ctx1.drawImage(babyEye[count2],-babyEye[count2].width*0.5,-babyEye[count2].height*0.5);
	ctx1.restore();

}

