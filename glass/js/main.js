(function () {
	var picture = document.querySelector('.picture');
	var glass = document.querySelector('.glass');
	var pictureLeft = picture.offsetLeft;
	var pictureTop = picture.offsetTop;
	var glassStyle = glass.style;
	var isBlock = false;
	picture.addEventListener('mousemove', function (e) {
		// console.log(e.pageX, e.pageY); //page 是相对于body（文档）
		// console.log(picture.offsetLeft, picture.offsetTop)
			var left = e.pageX - pictureLeft;
			var top = e.pageY - pictureTop;

			var positionLeft = left * -3.2 + 200 + 'px';
			var positionTop = top * -3.2 + 200 + 'px';

			glassStyle.left = left + 'px';
			glassStyle.top = top + 'px';
			console.log(left, top);

			glassStyle['background-position'] = positionLeft + ' ' + positionTop;

			if (left < 0 || left > 800 || top < 0 || top > 450) {
				glassStyle.display = 'none';
				isBlock = false;
			}else {
				if (isBlock === false) {
					glassStyle.display = 'block';
				}
				isBlock = true;
			}
	}, false);
})()