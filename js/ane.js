var aneObj = function()
{
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = []; /*振幅*/
	this.alpha = 0;
}

//prototype 属性使您有能力向对象添加属性和方法。
aneObj.prototype.num=80;

aneObj.prototype.init=function()
{
	//给每个海葵赋予坐标
	for (var i = 0; i < this.num; i++)
	{
		this.rootx[i] = i * 16 + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50; //海葵高度
		this.amp[i] = Math.random() *50 +50;
		console.log(this.heady[i]);
	}
	
	
}

aneObj.prototype.draw = function()
{
	this.alpha += deltaTime * 0.0008; //摆动速率
	var l = Math.sin(this.alpha);//-1 1  正弦函数

	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap = 'round' 
	ctx2.strokeStyle= "#3b154e"
	for (var i = 0; i < this.num; i++)
	{
//		console.log(this.amp[i])
		//参考htm5 canvas手册
		//beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);		
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		/*贝塞尔曲线 控制点 结束点 */
		ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	
	}
	ctx2.restore();
}
