 var snowflakeURL=[
    	'http://img.mukewang.com/55adde120001d34e00410041.png',
        'http://img.mukewang.com/55adde2a0001a91d00410041.png',
        'http://img.mukewang.com/55adde5500013b2500400041.png',
        'http://img.mukewang.com/55adde62000161c100410041.png',
        'http://img.mukewang.com/55adde7f0001433000410041.png',
        'http://img.mukewang.com/55addee7000117b500400041.png'
    ]
    
    ///////
    //飘雪花 //
    ///////
    function snowflake(){
    	//雪花容器
    	var $flakeContainer = $('#snowflake');
    	//随机六张图
    	function getImagesName(){
    		return snowflakeURL[[Math.floor(Math.random()*6)]];
    	}
    	//创建一个雪花元素
    	function createSnowBox(){
    		var url = getImagesName();
    		return $('<div class="snowbox"></div>').css({
    			'width':41,
    			'height':41,
    			'position':'absolute',
    			'backgroundSize':'cover',
    			'zIndex':100000,
    			'top':'-41px',
    			'backgroundImage':'url('+url+')'
    		}).addClass('snowRoll');
    	}
   
    //开始飘花
    setInterval(function(){
    	//运动轨迹
    	var startPositionLeft = Math.random() * visualWidth - 100;
    	var startOpacity = 1;
    	var endPositionTop = visualHeight - 40;
    	var endPositionLeft = startPositionLeft - 100 + Math.random() * 500;
    	var duration = visualHeight * 10 + Math.random() * 5000;
    	
    	//随机透明度，不小于0.5
    	var randomStart = Math.random();
    	randomStart = randomStart < 0.5 ? startOpacity : randomStart;
    	
    	//创建一个雪花
    	var $flake = createSnowBox();
    	
    	//设计起点位置
    	$flake.css({
    		left:startPositionLeft,
    		opacity:randomStart
    	});
    	
    	//加入到容器
    	$flakeContainer.append($flake);
    	
    	//开始执行动画
    	$flake.transition(
    		{
    		top:endPositionTop,
    		left:endPositionLeft,
    		opacity:0.7
    		}
    		,duration,'ease-out'
    		,function()
    		{
    		$(this).remove()//结束后删除节点
    		}
    	);
    	
    },200)
    
 }