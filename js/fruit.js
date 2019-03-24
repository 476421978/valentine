var fruitObj = function()
{
	this.alive = [];//boolean 状态
	this.x = [];//坐标
	this.y = [];
	this.l = [];//果实数量
	this.spd = [];//生长 漂浮 速度
	this.fruitType=[];//果实类型
	this.blue = new Image();
	this.orange = new Image();
	
	this.aneNO = [];
}

fruitObj.prototype.num = 30;
fruitObj.prototype.init=function()
{
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i]=0;
		this.y[i]=0;
		this.aneNO[i] = 0;
		this.spd[i]=Math.random() * 0.017 + 0.003; //每个果实的速度[0.003-0.02]
		this.born(i);
	}
	
	this.blue.src = "img/blue.png"
	this.orange.src = "img/fruit.png"
	
}

//绘制果实
fruitObj.prototype.draw=function(){
//	var num=0;
		for (var i = 0; i < this.num; i++)
		{
			//draw
			//find an ane, grow, fly up
			if(this.alive[i])
			{
			//判断果实类型
			if(this.fruitType[i]=="blue"){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
			//果实变大 跟随海葵移动
			if(this.l[i]<=14){
				var No = this.aneNO[i];
				this.x[i] = ane.headx[No];
				this.y[i] = ane.heady[No];
				this.l[i] += this.spd[i] * deltaTime;	
				//绘制
				ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i]-this.l[i] * 0.5,this.l[i],this.l[i]);//坐标 宽高
			}
			else{
				this.y[i] -= this.spd[i] * 7 * deltaTime;
				//绘制
				ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i]-this.l[i] * 0.5,this.l[i],this.l[i]);//坐标 宽高
			}
			//果实移出改变状态
			if(this.y[i]<15){
				this.alive[i] = false;
			}	
		}
	}
}

//生产果实
fruitObj.prototype.born = function(i){
	this.aneNO[i] = Math.floor(Math.random() * ane.num);//记录果实长在哪个海葵上
	
	this.l[i]=0;
	this.alive[i] = true;
	//随机产生不同的果实
	var ran = Math.random();
	if(ran<0.3){
		this.fruitType[i]="blue"
	}else{
		this.fruitType[i]="orange"
	}
}

//判断果实消失
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

//检测果实数量
function fruitMoniter(){
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if(fruit.alive[i]){
			num++;
		}
	}
	if(num<15){//屏幕果实数量不低于15个
		senFruit();
		return;
	}
}

function senFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if(!fruit.alive[i]){//每次产生一个
			fruit.born(i);		
			return;
		}
	}
}
