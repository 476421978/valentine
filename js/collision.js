//鱼吃果实
function collision(){
	if(!data.gameOver){
		for (var i = 0; i < fruit.num; i++) {	
		if(fruit.alive[i]){
			var distance = calLength2(fruit.x[i],fruit.y[i],fish.x,fish.y);
			if(distance<900){
					fruit.dead(i);						
					data.fruitNum++;
					fish.bigBodyCount++;
					if(fish.bigBodyCount>7){
						fish.bigBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue"){
						data.double = 2;
					}		
					wave.born(fruit.x[i],fruit.y[i]);
				}		
			}
		}
	}
	
}


//大鱼喂小鱼
function collision2(){
	if(data.fruitNum>0 && !data.gameOver){
		var distance = calLength2(fish.x,fish.y,fish2.x,fish2.y);
		if(distance<300){		
			fish2.babyBodyCount = 0;
			fish.bigBodyCount=0;
			data.addScroe();
			
			halo.born(fish2.x,fish2.y);
		}
	}	
}

//计算两点之间的距离
function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}
