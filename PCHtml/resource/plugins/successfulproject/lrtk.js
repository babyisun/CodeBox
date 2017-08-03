// JavaScript Document
$(document).ready(function(e) {
	/***不需要自动滚动，去掉即可***/
	time = window.setInterval(function(){
		$('.og_next').click();	
	},10000);
	/***不需要自动滚动，去掉即可***/
	//linum = $('.mainlist li').length;//图片数量
	//linum =10;
	w = linum * 1180;//ul宽度
	
	$('.piclist').css('width', w + 'px');//ul宽度
	$('.swaplist').html($('.mainlist').html());//复制内容
	
	$('.og_next').click(function(){
		
		if($('.swaplist,.mainlist').is(':animated')){
			$('.swaplist,.mainlist').stop(true,true);
		}
		
		if($('.mainlist li').length>2){//多于4张图片
			ml = parseInt($('.mainlist').css('left'));//默认图片ul位置
			sl = parseInt($('.swaplist').css('left'));//交换图片ul位置
			if(ml<=0 && ml>w*-1){//默认图片显示时
				$('.swaplist').css({left: '1180px'});//交换图片放在显示区域右侧
				$('.mainlist').animate({left: ml - 1180 + 'px'},'slow');//默认图片滚动				
				if(ml==(w-1180)*-1){//默认图片最后一屏时
					$('.swaplist').animate({left: '0px'},'slow');//交换图片滚动
				}
			}else{//交换图片显示时
				$('.mainlist').css({left: '1180px'})//默认图片放在显示区域右
				$('.swaplist').animate({left: sl - 1180 + 'px'},'slow');//交换图片滚动
				if(sl==(w-1180)*-1){//交换图片最后一屏时
					$('.mainlist').animate({left: '0px'},'slow');//默认图片滚动
				}
			}
		}
	})
	$('.og_prev').click(function(){
		
		if($('.swaplist,.mainlist').is(':animated')){
			$('.swaplist,.mainlist').stop(true,true);
		}
		
		if($('.mainlist li').length>2){
			ml = parseInt($('.mainlist').css('left'));
			sl = parseInt($('.swaplist').css('left'));
			if(ml<=0 && ml>w*-1){
				$('.swaplist').css({left: w * -1 + 'px'});
				$('.mainlist').animate({left: ml + 1180 + 'px'},'slow');				
				if(ml==0){
					$('.swaplist').animate({left: (w - 1180) * -1 + 'px'},'slow');
				}
			}else{
				$('.mainlist').css({left: -2360 + 'px'});
				$('.swaplist').animate({left:  (sl + 1180)+ 'px'},'slow');
				if(sl==0){
					$('.mainlist').animate({left: '-1180px'},'slow');
				}
			}
		}
	})    
});

//滚动2
$(document).ready(function(e) {
	/***不需要自动滚动，去掉即可***/
	time = window.setInterval(function(){
		$('.og_next2').click();	
	},10000);
	w2 = linum2 * 1180;//ul宽度
	
	$('.piclist2').css('width', w2 + 'px');//ul宽度
	$('.swaplist2').html($('.mainlist2').html());//复制内容
	
	$('.og_next2').click(function(){
		
		if($('.swaplist2,.mainlist2').is(':animated')){
			$('.swaplist2,.mainlist2').stop(true,true);
		}
		
		if($('.mainlist2 li').length>2){//多于4张图片
			ml = parseInt($('.mainlist2').css('left'));//默认图片ul位置
			sl = parseInt($('.swaplist2').css('left'));//交换图片ul位置
			if(ml<=0 && ml>w2*-1){//默认图片显示时
				$('.swaplist2').css({left: '1180px'});//交换图片放在显示区域右侧
				$('.mainlist2').animate({left: ml - 1180 + 'px'},'slow');//默认图片滚动				
				if(ml==(w2-1180)*-1){//默认图片最后一屏时
					$('.swaplist2').animate({left: '0px'},'slow');//交换图片滚动
				}
			}else{//交换图片显示时
				$('.mainlist2').css({left: '1180px'})//默认图片放在显示区域右
				$('.swaplist2').animate({left: sl - 1180 + 'px'},'slow');//交换图片滚动
				if(sl==(w2-1180)*-1){//交换图片最后一屏时
					$('.mainlist2').animate({left: '0px'},'slow');//默认图片滚动
				}
			}
		}
	})
	$('.og_prev2').click(function(){
		
		if($('.swaplist2,.mainlist2').is(':animated')){
			$('.swaplist2,.mainlist2').stop(true,true);
		}
		
		if($('.mainlist2 li').length>2){
			ml = parseInt($('.mainlist2').css('left'));
			sl = parseInt($('.swaplist2').css('left'));
			if(ml<=0 && ml>w2*-1){
				$('.swaplist2').css({left: w2 * -1 + 'px'});
				$('.mainlist2').animate({left: ml + 1180 + 'px'},'slow');				
				if(ml==0){
					$('.swaplist2').animate({left: (w2 - 1180) * -1 + 'px'},'slow');
				}
			}else{
				/*$('.mainlist2').css({left: (w2 - 1180) * -1 + 'px'});
				$('.swaplist2').animate({left: sl + 1180 + 'px'},'slow');
				if(sl==0){
					$('.mainlist2').animate({left: '0px'},'slow');
				}*/
				
				$('.mainlist2').css({left: -2360 + 'px'});
				$('.swaplist2').animate({left:  (sl + 1180)+ 'px'},'slow');
				if(sl==0){
					$('.mainlist2').animate({left: '-1180px'},'slow');
				}
			}
		}
	})    
});
$(document).ready(function(){
	$('.og_prev2,.og_next2').hover(function(){
			$(this).fadeTo('fast',1);
		},function(){
			$(this).fadeTo('fast',0.7);
	})

})

