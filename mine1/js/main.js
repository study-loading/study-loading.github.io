(function(){
	var saolei = function(){
		this.list = new Array();
		this.num = 50;
	};

	saolei.prototype = {
		init: function(){
			//初始化数据
			for(var i=0; i<15; i++){
				this.list[i] = new Array();
				for(var j=0; j<25; j++){
					this.list[i][j] = 0;
				}
			}
			$('#last').text(this.num);
			this.createView();
			this.createRandomNumber();
			this.addEvent();
		},
		createView: function(){
			var html = "";
			for(var i=0; i<15; i++){
				for(var j=0; j<25; j++){
					html += '<div class="cell" id="number-' + i + '-' + j + '"></div>';
				}
			}
			$('.container').append(html);
		},
		addEvent: function(){
			var self = this;
			$('.container').delegate(".cell","mousedown",function(e){
				var number = $(this).attr("id").split("-");
				var i = parseInt(number[1]);
				var j = parseInt(number[2]);
				var e = e || window.event;
				if(e.button == 0){
					if($(this).hasClass("tip")){
						$(this).removeClass("tip");
						self.updateNumber(1);
					}
					if(self.list[i][j] > 8){
						self.gameOver("game over!");
					}else if(self.list[i][j] == 0){
						if(self.canShow(i, j)){
							$(this).attr("status", true);
							$(this).css("background-color", self.drawBgColor(self.list[i][j]));
							self.showAroundNumber(i, j);
						}
					}else{
						self.showNumber(i, j);
						self.updateNumber(0);
					}
				}else if(e.button == 2){
					self.drawFlag(i, j);
				}
			});
			$('#newgame').click(function(){
				self.newGame();
			});
		},
		showNumber: function(i, j){
			if(this.canShow(i, j)){
				var $cell = $('#number-' + i + '-' + j);
				var num = this.list[i][j];
				var bgcolor = this.drawBgColor(num);
				var color = this.drawColor(num);
				$cell.removeClass("tip");
				$cell.text(this.list[i][j]);
				$cell.attr("status", true);
				$cell.css({
					"background-color": bgcolor,
					"color": color
				});
			}
		},
		showAroundNumber: function(i, j){
			var number = this.getAroundNmuber(i, j);
			for(var i=0; i<number.length; i++){
			 	if(number[i] != 0){
			 		var m = number[i][0];
			 		var n = number[i][1];
			 		if(this.canShow(m, n)){
			 			var $currentZero = $('#number-' + m + '-' + n);
			 			if(!$currentZero.hasClass("tip")){
			 				var result = this.list[m][n];
					 		if(result == 0){
					 			$currentZero.attr("status", true);
								$currentZero.css("background-color", this.drawBgColor(result));
					 			this.showAroundNumber(m, n);
					 		}else{
					 			this.showNumber(m, n);
					 		}
			 			}
			 		}
			 	}
			}
		},
		getAroundNmuber: function(i, j){
			var around = new Array();
			around.push([i-1,j-1]);
			around.push([i-1,j]);
			around.push([i-1,j+1]);
			around.push([i,j-1]);
			around.push([i,j+1]);
			around.push([i+1,j-1]);
			around.push([i+1,j]);
			around.push([i+1,j+1]);
			for(var i=0; i<around.length; i++){
				if(around[i][0] < 0 || around[i][0] > 14){
					around[i] = 0;
				}else if(around[i][1] < 0 || around[i][1] > 24){
					around[i] = 0;
				}
			}
			return around;
		},
		createRandomNumber: function(){
			for(var m=0; m<this.num; m++){
				var i = "";
				var j = "";
				do{
					i = Math.floor(Math.random() * 15);
					j = Math.floor(Math.random() * 25);
				}while(this.list[i][j] != 0)
				this.list[i][j] = 10;
				$cell = $('#number-' + i + '-' + j);
				$cell.addClass("landmine");
				var number = this.getAroundNmuber(i,j);
				for(var i=0; i<number.length; i++){
					if(number[i] != 0){
						this.list[number[i][0]][number[i][1]]++;
					}
				}
			}
		},
		drawBgColor: function(number){
			switch(number){
				case 0: return "#ede0c8"; break;
				case 1: return "#f2b179"; break;
				case 2: return "#f59563"; break;
				case 3: return "#f67c5f"; break;
				case 4: return "#f65e3b"; break;
				case 5: return "#edcf72"; break;
				case 6: return "#edcc61"; break;
				case 7: return "#9c0"; break;
				case 8: return "#33b5e5"; break;

				default: break;
			}
		},
		drawColor: function(number){
			if(number == 1){
				return "#444";
			}else{
				return "#fff";
			}
		},
		drawFlag: function(i, j){
			var $cell = $('#number-' + i + '-' + j);
			if(!$cell.attr("status")){
				if($cell.hasClass("tip")){
					$cell.removeClass("tip");
					this.updateNumber(1);
				}else{
					$cell.addClass("tip");
					this.updateNumber(-1);
				}
			}
		},
		updateNumber: function(num){
			var last = parseInt($('#last').text()) + num;
			$('#last').text(last);
			if(last == 0){
				/*var number = 0;
				for(var i=0; i<$('.cell').length; i++){
					var $temp = $('.cell').get(i);
					if($temp.attr("status")){
						number++;
					}
				}
				if(number == $('.cell').length - this.num){
					this.gameOver("congratulate!");
				}*/
				var number = 0;
				for(var i=0; i<15; i++){
					for(var j=0; j<25; j++){
						$temp = $('#number-' + i + '-' + j);
						if($temp.attr("status")){
							number++;
						}
					}
				}
				if(number == $('.cell').length - this.num){
					this.gameOver("congratulate!");
				}
			}
			/*var last = this.num - $('.tip').length;
			$('#last').text(last);*/
		},
		gameOver: function(text){
			$('.landmine').addClass("boom");
			$('.mask').show();
			$('#over').text(text)
			.animate({
				fontSize: "60px",
				opacity: 0.7
			},1000);
		},
		newGame: function(){
			//初始化数据
			for(var i=0; i<15; i++){
				this.list[i] = new Array();
				for(var j=0; j<25; j++){
					this.list[i][j] = 0;
				}
			}
			this.initView();
			this.createRandomNumber();
		},
		initView: function(){
			$(".cell").css("background-color", "#bbb")
					.text("")
					.attr("status", null)
					.removeClass("tip boom landmine");
			$('#last').text(this.num);
			$(".mask").animate({left: "100%"},1000,function(){
				$('.mask').css("left", "0").hide();
				$('#over').css({
					fontSize: "0px",
					opacity: 0
				});
			});
		},
		canShow: function(i, j){
			var $cell = $('#number-' + i + '-' + j);
			if(!$cell.attr("status")){
				return true;
			}else{
				return false;
			}
		}
	};
	window.saolei = saolei;
})();