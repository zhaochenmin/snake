$(function(){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			$('<div>').addClass('block')
			.attr('id',i+'_'+j)
			.appendTo('.screen')
		}
	}
	function start(){
		var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
		var shebiao={'0_0':true,'0_1':true,'0_2':true};
		$('#0_0,#0_1,#0_2').addClass('she');
		var dir="you";

		

		var score=$('.score p').html()

		function move(){
			var oldhead=she[she.length-1];
			var num=score;
			if(dir=="zuo"){
				var newhead={x:oldhead.x,y:oldhead.y-1};
			}
			if(dir=="shang"){
				var newhead={x:oldhead.x-1,y:oldhead.y};
			}
			if(dir=="you"){
				var newhead={x:oldhead.x,y:oldhead.y+1};
			}
			if(dir=="xia"){
				var newhead={x:oldhead.x+1,y:oldhead.y};
			}
			if(newhead.x<0||newhead.x>19||newhead.y<0||newhead.y>19){
				clearInterval(t);
				// alert("撞死了");
				return;
			}
			if(shebiao[newhead.x+"_"+newhead.y]){
				clearInterval(t);
				// alert("撞到自己了");
				return;
			}
			she.push(newhead);
			$("#"+newhead.x+"_"+newhead.y+"").addClass("she");
			
			if(newhead.x==shiwu.x&&newhead.y==shiwu.y){
				$(".food").removeClass("food");
				score++;
				$('.score p').text(score)
				$("img").detach();
				food();
				return score
			}else{
				var weiba=she.shift();
				$("#"+weiba.x+"_"+weiba.y+"").removeClass("she");
				shebiao[weiba.x+"_"+weiba.y]=null;
			}	
			shebiao[newhead.x+"_"+newhead.y]=true;
		}
		var biao={37:"zuo",38:"shang",39:"you",40:"xia"};
		var fanbiao={"zuo":37,"shang":38,"you":39,"xia":40}
		$(document).on('keydown',function(e){
			var num=e.keyCode;
			if(num==37||num==38||num==39||num==40){
				if(Math.abs(num-fanbiao[dir])===2){
					return;
				}
				dir=biao[num];
			}
		})
		var shiwu=null;
		function food(){
			do{
				var x=Math.floor(Math.random()*20);
				var y=Math.floor(Math.random()*20);
			}while(biao[x+"_"+y]);
			shiwu={x:x,y:y};
			$("#"+x+"_"+y+"").addClass("food");
			$('<img>').attr('src','img/2.jpg').css("width",19).appendTo(".food");
		}
		food();
		var speed=200
		var t=setInterval(move,speed);
	}	
	$('.start').click(function(){
		start()
	})	
})