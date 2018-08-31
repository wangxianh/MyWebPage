/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-11-06 16:12:49
 * @version $Id$
 */
;(function($){
	var PlayImages=function(tab){
		var _this_=this;  //保存this的值
		this.tab=tab;
		this.images=tab.find(".tabImage ul li");
		this.tabItems=tab.find(".tabBar ul li");
		this.setting={
			"effect":"mouseover",
			"playWay":"default",
			"invoke":2,
			"auto":1000
		}		
		$.extend(this.setting,this.getSetting());

		
		this.tabItems.on(this.setting.effect,function(){
			_this_.triggerEffect($(this));
			
		});
		
		//图片自动播放
		if(this.setting.auto){
			this.loop=0;
			this.timer=null;
			this.playAuto();
			this.images.hover(function(){//鼠标放置图片上时停止自动播放
				window.clearInterval(_this_.timer);
			},function(){
				_this_.playAuto();  //鼠标离开时自动播放
			});
		}
		
		//默认显示第几张图片
		if(this.setting.invoke>=2){
			this.triggerEffect(this.tabItems.eq(this.setting.invoke-1));
		}

	};


	PlayImages.prototype={
		getSetting:function(){
			var setting=this.tab.attr("data-setting");
			if(setting&&setting!=""){
				return $.parseJSON(setting);
			}else{
				return {};
			};
		},
		triggerEffect:function(current){
			var index=current.index();
			var change=this.setting.playWay;
			this.tabItems.eq(index).addClass("actived").siblings()
			.removeClass("actived");
			if(change==="fade"){
				this.images.eq(index).fadeIn()
			.siblings().fadeOut();
			}else if(change==="default"){
				this.images.eq(index).addClass("current")
			.siblings().removeClass("current");
			}
			//loop和index值同步,确保点击鼠标之后，自动播放从点击的下一张图片开始
			if(this.setting.auto){
				this.loop=index;
			}				
		},
		playAuto:function(){
			//this.tab.trigger(triggerEffect,"click");
			var self=this;
			//self.loop=this.tabItems.index();
			this.timer=window.setInterval(function(){
				self.loop++;
				if(self.loop>=4){
				self.loop=0;
				}
				self.tabItems.eq(self.loop).trigger(self.setting.effect);
			},self.setting.auto);
		}
	};

	PlayImages.init=function(tab){
		var _this_=this;
		tab.each(function(){
			new _this_($(this));
		});
	}
	window["PlayImages"]=PlayImages;
})(jQuery);
