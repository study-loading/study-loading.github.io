$(function(){

	$(".next").click(function(){
		move(1);
	});
	$(".prev").click(function(){
		move(-1);
	});

	function move(page){
		slider.nextPic = page;
		clearInterval(slider.timer);
		slider.timer = null;
		slider.init();
	}

	var slider = {

		width: $(".slide li").width(),
		length: $(".slide").width()/$(".slide li").width(),
		index: 0,
		nextPic: 0,
		state: true,
		circleIndex: 0,
		timer: 0,
		changeLength: 1,

		getIndex: function(){
			var left = 	parseInt($(".slide").css("left"));
			this.index = -left/this.width;
			return this;
		},

		scrollAuto: function(){
			var self = this;
			this.nextPic = 1;
			this.timer = setInterval(function(){
				self.init();
			},5000);
		},

		createCircle: function(){

			var self = this;

			var $ul = $('<ul class="circle"></ul>');
			for(var i=0; i<this.length; i++){
				var $li = $("<li></li>");
				$ul.append($li);
			}
			$ul.find("li").eq(0).addClass("highlight");
			$(".slider").append($ul);

			$(".circle li").each(function(index){
				$(this).click(function(){
					clearInterval(self.timer);
					self.timer = null;
					self.getIndex();

					/*var temp = index - self.index;
					if(temp > 0){
						self.changeLength = self.index + temp - (self.length - 1);
					}else if(temp < 0){
						self.changeLength = self.index + temp;
					}
					self.nextPic = temp;*/

					var temp = index - self.circleIndex;
					if(temp > 0){
						self.changeLength = self.index + temp - (self.length - 1);
						self.changeLength = self.changeLength > 0 ? self.changeLength : 0;
					}
					if(temp < 0){
						self.changeLength = self.index + temp;
						self.changeLength = self.changeLength < 0 ? self.changeLength : 0;
					}
					
					self.nextPic = temp;
					self.init();
				});
			});
		},

		circle: function(){

			this.getIndex();

			/*if(this.nextPic > 0){
				this.circleIndex += this.nextPic;
				if(this.circleIndex > this.length - 1){
					this.circleIndex -= this.length;
				}
			}else if(this.nextPic < 0){
				this.circleIndex += this.nextPic;
				if(this.circleIndex < 0){
					this.circleIndex += this.length;
				}
			}*/
			if(this.nextPic > 0){
				this.circleIndex += this.nextPic;
				this.circleIndex %= this.length;
			}else if(this.nextPic < 0){
				this.circleIndex -= (-this.nextPic);
				if(this.circleIndex < 0){
					this.circleIndex += this.length;
				}
			}
			

			$(".circle li").removeClass("highlight");
			$(".circle li").eq(this.circleIndex).addClass("highlight");
			return this;
		},

		move: function(){
			var self = this;

			if(this.changeLength > 1 || this.index == this.length - 1 && this.nextPic == 1){
				for(var i=0; i<this.changeLength; i++){
					this.index--;
					$(".slide li").eq(0).appendTo($(".slide"));
					$(".slide").css("left", -this.index * this.width + "px");
				}
			}
			if(this.changeLength < -1 || this.index == 0 && this.nextPic == -1){
				for(var i=0; i<Math.abs(this.changeLength); i++){
					this.index++;
					$(".slide li").eq(this.length - 1).prependTo($(".slide"));
					$(".slide").css("left", -this.index * this.width + "px");
				}
			}

			$(".slide").animate({left: -(this.index + this.nextPic)*this.width + "px"},500,function(){
				self.state = true;
				self.changeLength = 1;
				if(!self.timer){
					self.scrollAuto();
				}
			});
			return this;
		},

		init: function(){
			if(this.state){
				this.state = false;
				this.circle().move();
			}
		}
	};
	slider.createCircle();
	slider.scrollAuto();
});