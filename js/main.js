var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;
var fruit;
var fish;
var fish2;
var data;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody=[];

var bigTail = [];
var bigEye = [];
var bigBodyBlue = [];
var bigBodyOrange = [];


//执行
document.body.onload=game;

var wave;
var halo;
var dust;
var dust_pic = [];

function game(){
	init();
	lastTime = Date.now();
	gameloop();
}

//初始化
function init(){
	can1 = document.getElementById('canvas1');//fishes,dust,UI,circle
	//getContext() 方法返回一个用于在画布上绘图的环境。
	ctx1 = can1.getContext('2d');
	can2= document.getElementById('canvas2');//background, ane , fruits
	ctx2 = can2.getContext('2d');
	
	//鼠标移动 获取坐标
	can1.onmousemove=function(e){
		if(!data.gameOver){
			if(e.offsetX || e.layerX){
			mx = e.offsetX;
			my = e.offsetY;
			}
		}	
	} 
	
	bgPic.src="img/background.jpg"
	
	canWidth = can2.width;
	canHeight = can2.height;
	
	console.log(canHeight)
	
	ane = new aneObj();//海葵
	ane.init();
	
	fruit = new fruitObj();//果实
	fruit.init();
	
	fish = new fishObj();//大鱼
	fish.init();
	
	fish2 = new fish2Obj();//小鱼
	fish2.init();
	
	data = new dataObj();
	
	wave = new waveObject();
	wave.init();
	
	halo = new haloObj();
	halo.init();
	
	mx = 0;
	my = 0;
	
	//鱼尾巴
	for (var i = 0; i <8; i++) {
		babyTail[i] = new Image();
		bigTail[i] = new Image();
		
		babyTail[i].src="img/bigTail"+i+".png";
		bigTail[i].src="img/bigTail"+i+".png";
	}
	
	//鱼眼睛
	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		bigEye[i] = new Image();	
		
		babyEye[i].src="img/babyEye" + i + ".png";
		bigEye[i].src="img/bigEye" + i + ".png";
	}
	
	//小鱼身体变化
	for (var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src="img/babyFade" + i + ".png"
	}
	
	//大鱼身体变化
	for (var i = 0; i <8; i++) {
		bigBodyBlue[i] = new Image();
		bigBodyOrange[i] = new Image();
		
		bigBodyBlue[i].src = "img/bigSwimBlue" + i + ".png";
		bigBodyOrange[i].src = "img/bigSwim" + i + ".png";
	}
	
	dust = new dustObj();//漂浮物
	dust.init();
	for (var i = 0; i < 7; i++) {
		dust_pic[i] = new Image();
		dust_pic[i].src="img/dust" + i + ".png";
	}
	
}

function gameloop(){
	window.requestAnimationFrame(gameloop);//循环
	var now = Date.now();
	deltaTime = now - lastTime;//两帧之间间隔时间
	lastTime = now;
	
	if(deltaTime>40) deltaTime=40;
	
	drawBackground();
	
	ane.draw();
	
	fruitMoniter();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth,canHeight);//方法清空给定矩形内的指定像素。
	fish.draw();
	fish2.draw();
	collision();
	collision2();
	
	data.draw();
	
	wave.draw();
	halo.draw();
	dust.draw();
}





