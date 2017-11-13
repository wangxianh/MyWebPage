$(document).ready(function(){
	var planes=[];  //创建一个空的飞机数组
	var bullets=[];  //创建一个空的子弹数组
	var tank={"offx":0};  //创建一个坦克对象，属性offx代表x轴的偏移量
    var contWidth=$(".content").width();  //返回框元素宽度
    var contHeight=$(".content").height();
    var tankWidth=$(".tank").width(); //返回坦克的宽度 
    var tankHeight=$(".tank").height();  //返回坦克的高度
    var planeObj=$("<div class=\"plane\"></div>");
    //var bulletObj=$("<div class=\"bullet\"></div>");
    //var bulletObj=null;
    //var planeObj=null;
	//键盘响应事件
	$(document).keydown(function(event){
		if(event.keyCode=="37"){ //left
			tank.offx-=tankWidth/2;
			if(tank.offx<0){
				tank.offx=0;
			}
			$(".tank").animate({
				left:"+"+tank.offx+"px"},10);
		}
		if(event.keyCode=="39"){   //right
			tank.offx+=tankWidth/2;
			if(tank.offx>(contWidth-tankWidth)){
				tank.offx=contWidth-tankWidth;
			}
			$(".tank").animate({
				left:"+"+tank.offx+"px"},10);
		}
	});

	//飞机下降事件
	var planeEvent=function(){
		var offtop=$(".content").offset().top;  //内容框距离顶部的偏移位置
		var randomx=(contWidth-tankWidth)*Math.random();
		var plane={
		"x":randomx,
		"y":offtop
		};
		planes.push(plane);
		//var planeObj=$("<div class=\"plane\"></div>");
		$(".content").append(planeObj);
		planeObj.addClass("plane");
		var planeHeight=$(".plane").height();
		planeObj.css({
			position:"absolute",
			left:randomx,
			top:0		
		});
		/*var p=planes.pop();
		for(var b in bullets){
			if(Math.abs(bullets[b].x-p.x)<150){
				setTimeout(function(){planeObj.remove();},1000);  //
			}
		}*/
		planeObj.animate({
			top:"+"+(contHeight-planeHeight) + "px"
		},8000,function(){
			planes.pop();
			planeObj.remove();
			//planeObj=null;			
		});
		setTimeout(planeEvent,5000);	
	}
	planeEvent();

	//鼠标点击事件发射子弹
	$(".content").click(function(){
		var bulletObj=$("<div class=\"bullet\"></div>");
		$(".content").append(bulletObj);
		bulletObj.addClass("bullet");
		var bulletWidth=$(".bullet").width();
		var px=$(".tank").position().left+(tankWidth-bulletWidth)/2;
		var bullet={
			"x":px,
			"y":tankHeight
		};  //子弹的初始位置
		bullets.push(bullet);
		bulletObj.css({
			position:"absolute",
			left:px,
			bottom:tankHeight
		});
		//var b=bullets.pop();  //获取当前子弹
		
		/*for(var p in planes){
			if(Math.abs(planes[p].x-b.x)<15){
				setTimeout(function(){bulletObj.remove();},1000);  //
			}
		}*/
		peng(bulletObj,planeObj);
		var speed=2000+4000*Math.random();//子弹移动速度
		var contOff=$(".content").offset().top;
		bulletObj.animate({
			top:"-" + contOff + "px"
		},speed,function(){
			bullets.pop();
			bulletObj.remove();
			//bulletObj=null;			
		});
		
		
		//碰撞
	  /* for(var b in bullets){
		 for(var p in planes){
			if((p.x-b.x<10)||(p.x-b.x)>-10){
				$(".content").empty();
			}
		}
	   }*/
	});

	function peng(bulletObj,planeObj)
	{
		var t=bulletObj.position().top;
		var p=planeObj.position().top;
		if(Math.abs(planeObj.position().top-bulletObj.position().top)<150&&
			Math.abs(planeObj.position().left-bulletObj.position().left)<150)
		{
			bulletObj.hide();
			planeObj.hide();
			bulletObj.remove();
			planeObj.remove();
		}
	}

});