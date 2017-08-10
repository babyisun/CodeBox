$(function(){
window.z = 0;

//用户名验证；
$('input').name('user').bind('focus',function(){
	$('.user_put').css('display','block').css('z-index', ''+ window.z++);
	$('.user_error').css('display','none');
	$('.user_ok').css('display','none');
}).bind('blur',function(){

	if( $(this).val() == '' ) $('.user_put').css('display','none');
	else{
		var str = $(this).val();
		str = str.replace(/\s/g , '');//输入空格时自动忽略，\s表示空格
		if( str.length < 6 ){
			$('.user_put').css('display','none');
			$('.user_error').css('display','block');
			$('.user_ok').css('display','none');
		}else{
			$('.user_ok').css('display','block');
			$('.user_put').css('display','none');
			$('.user_error').css('display','none');
		}
	}
}).bind('keyup',function(){
	if( $(this).val().replace(/\s/g , '').length >= 6 ){
		$('.user_ok').css('display','block');
		$('.user_put').css('display','none');
		$('.user_error').css('display','none');
	}else{
		$('.user_put').css('display','block');
		$('.user_error').css('display','none');
		$('.user_ok').css('display','none');
	}
});


//密码验证

$('input').name('pass').bind('focus',function(){
	$('.pass_put').css('display','block').css('z-index',''+ window.z++);
	$('.pass_error').css('display','none');
	$('.pass_ok').css('display','none');
}).bind('blur' , function(){
	if( $(this).val() == '' ){
		$('.pass_put').css('display','none');
	}else if( ! (new RegExp(/^[a-zA-Z0-9_]{6,18}$/)).test( $(this).val() ) ){
		$('.pass_put').css('display','none');
		$('.pass_error').css('display','block');
		$('.pass_ok').css('display','none');
	}else{		
		$('.pass_put').css('display','none');
		$('.pass_error').css('display','none');
		$('.safe').css('display','none');
		$('.pass_ok').css('display','block');

	}
		
}).bind('keyup',function(){
	if( (new RegExp(/^[a-zA-Z0-9_]{6,18}$/)).test( $(this).val() )){
		$('.pass_put').css('display','none');
		$('.safe').css('display','block');
		switch( safeTest($(this).val()) ){
			case 1:
				$('.s1').css('background','red');
				$('.s2').css('background','#ccc');
				$('.s3').css('background','#ccc');
				$('.word').text('低').css('color','red');
				break;
			case 2:
				$('.s1').css('background','orange');
				$('.s2').css('background','orange');
				$('.s3').css('background','#ccc');
				$('.word').text('中').css('color','orange');
				break;
			case 3:
				$('.s').css('background', 'green');
				$('.word').text('高').css('color','green');
				break;
		}
	}else{
		$('.safe').css('display','none');
		$('.pass_put').css('display','block');
	}
});


function safeTest(str){
	var strlen = str.length;
	var codeCont = 0;
	if( /\d/.test(str) ) codeCont++;
	if( /[a-zA-Z]/g.test(str) ) codeCont++;
	if( /_/g.test(str) ) codeCont++;
	if( strlen < 10 && codeCont == 1) return 1;
	else if( strlen < 10 && codeCont == 2 ) return 2;
	else return 3;

}

//确认密码验证



$('input').name('confirm_pass').bind('focus',function(){
	$('.confirm_put').css('display','block');
	$('.confirm_error').css('display','none');
	$('.confirm_ok').css('display','none');
}).bind('blur',function(){
	$('.confirm_put').css('display','none');
	if( $(this).val() == '' )
		$('.confirm_error').css('display','none');
	else{
		if( $(this).val() != $('input').name('pass').val() ){
		$('.confirm_error').css('display','block');
		}else{
		$('.confirm_error').css('display','none');
		$('.confirm_ok').css('display','block');
		}
	}
	
});

//电子邮箱验证


$('input').name('email').bind('focus',function(){

	$('.email_put').css('display','block');
	$('.email_error').css('display','none');
	$('.email_ok').css('display','none');

}).bind('blur',function(){
	window.ulIfClick = false;
	if( $(this).val() == '' ){
		$('.email_put').css('display','none');
		$('.email_error').css('display','none');
		$('.email_ok').css('display','none');
		$('.auto_complete').css('display','none');

	}else{
		if( /^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/.test($(this).val()) ){
			$('.email_put').css('display','none');
			$('.email_error').css('display','none');
			$('.email_ok').css('display','block');
		}else{
			
			$('.auto_complete li').bind('click',function(){
			
				$('input').name('email').val( $(this).text() );
				if( /^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/.test($('input').name('email').val()) ){
					$('.email_put').css('display','none');
					$('.email_error').css('display','none');
					$('.email_ok').css('display','block');
				}
				$('.auto_complete').css('display','none');
				window.ulIfClick = true;
			});
			setTimeout(function(){
				if(  !window.ulIfClick ){
					$('.auto_complete').css('display','none');
					$('.email_put').css('display','none');
					$('.email_error').css('display','block');
					$('.email_ok').css('display','none');
				}else{

				}
			},200);

		}
	}
}).bind('keyup',function(e){

	if( window.nextLi == undefined ) window.nextLi = 0;
	if( !$(this).val().match(/@/) ){
		if( $(this).val() == '' )
			$('.auto_complete').css('display','none');
		else{
			$('.auto_complete').css('display','block');
			if( e.keyCode != 13 ){
				$('.auto_complete li').css('background','#eee');
			}
		}
			
		var str = $(this).val();
		$('.auto_complete span').text(str);		
	}else{
		$('.auto_complete').css('display','none');
	}
	
	if(e.keyCode == 40 && $('.auto_complete').css('display') == 'block'){
		$('.auto_complete li').eq(window.nextLi++%4).css('background','#ff8').siblings().css('background','#eee');
		
	}
	if(e.keyCode == 13){
		window.nextLi = undefined;
		for(var i = 0; i < $('.auto_complete li').length(); i++){
			//alert( $('.auto_complete li').eq(i).css('backgroundColor') );
			if($('.auto_complete li').eq(i).css('backgroundColor') == 'rgb(255, 255, 136)'){
				$('input').name('email').val( $('.auto_complete li').eq(i).text() );
				$('.auto_complete').css('display','none');
				if( /^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/.test($(this).val()) ){
					$('.email_put').css('display','none');
					$('.email_error').css('display','none');
					$('.email_ok').css('display','block');
				}
			}
		}
	}

});



$('form').eq(0).bind('submit',function(e){
	e.preventDefault();
});




});