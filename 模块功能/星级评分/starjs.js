/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-10 11:10:36
 * @version $Id$
 */
$(document).ready(function(){
	var ratingItems=$(".ratingItems");
	//鼠标移动到图标上时背景图片变化
	var flag=false;
	ratingItems.on({
		mouseover:function(){
			var index=$(this).index();
			var i;
			for(i=0;i<=index;i++){
				ratingItems.eq(i).css("background","url(img/star2.png) no-repeat");
			}
		},
		click:function(){
			flag=true;
			var index=$(this).index();
			var i;
			for(i=0;i<=4;i++){
				ratingItems.eq(i).css("background","url(img/star1.png) no-repeat");
			}
			for(i=0;i<=index;i++){
				ratingItems.eq(i).css("background","url(img/star2.png) no-repeat");
			}
		},
		mouseout:function(){
			if(!flag){
				var index=$(this).index();
				var i;
				for(i=0;i<=index;i++){
					ratingItems.eq(i).css("background","url(img/star1.png) no-repeat");
				}
			}
			
		}
	});

});
