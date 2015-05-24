window.onload = function(){
	dataInt = {
		"data":[
			{"src":"11.jpg"},
			{"src":"12.jpg"},
			{"src":"13.jpg"},
			{"src":"14.jpg"},
			{"src":"15.jpg"},
			{"src":"16.jpg"},
			{"src":"17.jpg"},
			{"src":"18.jpg"},
			{"src":"19.jpg"},
			{"src":"20.jpg"},
			{"src":"21.jpg"},
			{"src":"22.jpg"},
			{"src":"23.jpg"},
			{"src":"24.jpg"},
			{"src":"25.jpg"},
			{"src":"01.jpg"},
			{"src":"02.jpg"},
			{"src":"03.jpg"},
			{"src":"04.jpg"},
			{"src":"05.jpg"},
			{"src":"06.jpg"},
			{"src":"07.jpg"},
			{"src":"08.jpg"}
		]
	}
	waterFull('main','box');
	var index = 0;

	var flag = true;
	var timer = null;
	var top = document.getElementById("top");
	//var scrollTop = 0;

	window.onscroll = function(){
		if(checkScrollSlide()){
			/*var main = document.getElementById('main');
			for(var i=0; i<dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = 'box';
				main.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "./images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			*/
			var main = document.getElementById('main');
			var oBox = document.createElement('div');
			oBox.className = 'box';
			main.appendChild(oBox);
			var oPic = document.createElement('div');
			oPic.className = 'pic';
			oBox.appendChild(oPic);
			var oImg = document.createElement('img');
			oImg.src = "./images/" + dataInt.data[index].src;
			oPic.appendChild(oImg);
			if(index < dataInt.data.length){
				index++;
			}
			if(index == dataInt.data.length){
				index = 0;
			}
			waterFull('main','box');
		}

		//移动滚动条
		if(!flag){
			clearInterval(timer);
		}
		flag = false;
		//获取窗口可视区域高度
		var pageHeight = window.innerHeight;
		if(typeof pageHeight != "number"){
			if(document.compatMode == "CSS1Compat"){
				pageHeight = document.documentElement.clientHeight;
			}else{
				pageHeight = document.body.clientHeight;
			}
		}
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop < pageHeight){
			top.style.display = "none";
		}else{
			top.style.display = "block";
		}
	}

	//回到顶部
	top.onclick = function(){
			timer = setInterval(function(){
			//获取滚动条滑动的距离
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(scrollTop == 0){
				clearInterval(timer);
				return;
			}
			flag = true;
			//console.log(scrollTop);
			var speed = Math.ceil(scrollTop/5);
			document.documentElement.scrollTop = document.body.scrollTop = scrollTop - speed;

		},30);
	}
}


function waterFull(parent,child){
	var box = document.getElementsByClassName(child);
	var main = document.getElementById(parent);
	var width = box[0].offsetWidth;
	var cols = Math.floor(window.innerWidth/width);
	main.style.width = cols * width + 'px';
	var list = [];
	for(var i=0; i<box.length; i++){
		if(i<cols){
			list.push(box[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,list);  //?????
			var index = getMinhIndex(list,minH);
			box[i].style.position = 'absolute';
			box[i].style.top = minH;
			box[i].style.left = width * index + 'px';
			//box[i].style.left = list[index].offsetWidth;
			list[index] += box[i].offsetHeight;
		}
	}
}
function getMinhIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
}

function checkScrollSlide(){
	var main = document.getElementById('main');
	var box = document.getElementsByClassName('box');
	var lastBoxH = box[box.length - 1].offsetTop + Math.floor(box[box.length - 1].offsetHeight/2);
	var scrollTop = document.body.scrollTop;
	var height = window.innerHeight;
	return (lastBoxH < scrollTop + height)? true : false;
}