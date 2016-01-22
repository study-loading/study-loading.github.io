define(['jquery'], function ($){
	var saolei = function(obj){
		this.list = new Array();
		this.DEFAULTS = {
			num: 50,
			cellWidth: 25,
			cols: 25,
			rows: 15
		};
		this.config = $.extend({}, this.DEFAULTS, obj);
	};
	saolei.prototype = {
		initData: function(){
			for(var i=0; i<this.config.rows; i++){
				this.list[i] = new Array();
				for(var j=0; j<this.config.cols; j++){
					this.list[i][j] = 0;
				}
			}
			$('#last').text(this.config.num);
			this.createRandomNumber()
			return this;
		},
		creatView: function(){
			var html = "";
			for(var i=0; i<this.config.rows; i++){
				for(var j=0; j<this.config.cols; j++){
					html += '<div class="cell" id="number-' + i + '-' + j + '"></div>';
				}
			}
			$('.warp').append(html);
			$('.cell').css({
				"width": this.config.cellWidth,
				"height": this.config.cellWidth,
			});
			$('.warp').css({
				"width": (this.config.cellWidth + 4) * this.config.cols,
				"height": (this.config.cellWidth + 4) * this.config.rows
			});
			return this;
		},
		addEvent: function(){
			var self = this;
			$('.warp').delegate(".cell","mousedown",function(e){
				var number = $(this).attr("id").match(/\d+/g);
				var i = parseInt(number[0]);
				var j = parseInt(number[1]);
				var e = e || window.event;
				if(e.button == 0){
					if($(this).hasClass("tip")){
						$(this).removeClass("tip");
						self.updateNumber(1);
					}
					if(self.list[i][j] > 8){
						self.gameOver(false);
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
			return this;
		},
		showNumber: function(i, j){
			if(this.canShow(i, j)){
				var $cell = $('#number-' + i + '-' + j);
				var num = this.list[i][j];
				var bgcolor = this.drawBgColor(num);
				var color = this.drawColor(num);
				$cell.text(this.list[i][j]);
				$cell.attr("status", true);
				$cell.css({
					"background-color": bgcolor,
					"color": color
				});
			}
			return this;
		},
		showAroundNumber: function(i, j){
			var number = this.getAroundNmuber(i, j);
			var self = this;
			for(var i=0; i<number.length; i++){
			 	if(number[i] != 0){
			 		var m = number[i][0];
			 		var n = number[i][1];
			 		if(this.canShow(m, n)){
			 			var $currentZero = $('#number-' + m + '-' + n);
		 				var result = this.list[m][n];
			 			if($currentZero.hasClass('tip')){
			 				$currentZero.removeClass('tip');
			 				this.updateNumber(1);
			 			}
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
			return this;
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
				if(around[i][0] < 0 || around[i][0] > this.config.rows - 1){
					around[i] = 0;
				}else if(around[i][1] < 0 || around[i][1] > this.config.cols - 1){
					around[i] = 0;
				}
			}
			return around;
		},
		createRandomNumber: function(){
			var i = "";
			var j = "";
			var number = [];
			for(var m=0; m<this.config.num; m++){
				do{
					i = Math.floor(Math.random() * this.config.rows);
					j = Math.floor(Math.random() * this.config.cols);
				}while(this.list[i][j] != 0)
				this.list[i][j] = 10;
				$('#number-' + i + '-' + j).addClass("landmine");
				number = this.getAroundNmuber(i,j);
				for(var i=0; i<number.length; i++){
					if(number[i] != 0){
						this.list[number[i][0]][number[i][1]]++;
					}
				}
			}
			return this;
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
			return this;
		},
		drawColor: function(number){
			if(number == 1){
				return "#444";
			}else{
				return "#fff";
			}
			return this;
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
			return this;
		},
		updateNumber: function(num){
			var last = parseInt($('#last').text()) + num;
			var over = 0;
			$('#last').text(last);
			if(last == 0){
				var $landmine = $('.landmine');
				for(var i=0; i < $landmine.length; i++){
					if($($landmine.get(i)).hasClass('tip')){
						over++;
					}
				}
				if(over == this.config.num){
					this.gameOver(true);
				}
			}
			return this;
		},
		gameOver: function(iswin){
			if(iswin){
				var text = "别说话，带我飞！";
			}else{
				var text = "小学生别玩游戏！";
			}
			$('.landmine').addClass("boom");
			$('.mask').show();
			$('#over').text(text)
			.animate({
				"fontSize": "60px",
				"opacity": "0.7"
			},1000);
		},
		newGame: function(){
			this.initView().initData();
			return this;
		},
		initView: function(){
			$(".cell").css("background-color", "#bbb")
					.text("")
					.attr("status", null)
					.removeClass("tip boom landmine");
			$(".mask").animate({left: "100%"},1000,function(){
				$('.mask').css("left", "0").hide();
				$('#over').css({
					fontSize: "0px",
					opacity: 0
				});
			});
			return this;
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
	return {
		saolei: saolei
	};
});