/*
	总结：
	1.左侧固定宽度和右侧自适应的布局
	左侧float，右侧的div为块状元素，左侧会浮在右侧元素上，由于文字的环绕效果，文字并不会被覆盖
	此时给右侧div一个大于左侧div的宽度的margin值，即可实现想要的效果，但是当左侧宽度改变时，就无法自适应了，
	此时可以给右侧元素定义display：table-cell，ie下inile-blcok，可以两端都自适应，但是右侧的宽度是自适应的，也就是说右侧
	内容较少时，无法占满整个宽度，如果设置了背景色，就会很难看
	2.文本垂直居中
	单行文本垂直居中：line-hieght或者verticle-align（只对具有verticle属性的元素有效，比如th，td，对span，div等无效）
	多行文本垂直居中：不设置文本父元素的高度，让文本内容把它撑开，设置上下相等的内边距即可。
	3.关于伪类
	当使用伪类时必须要有content：""；
*/
(function ($) {

	let noteObj = {
		data: [],
		init: function (data) {
			this.data = data;
			init();
		}
	}

	function addEvent(note, tip) {
		tip.addEventListener('click', function () {
			let left = $.getComputedStyle(note).left;
			if (left === '0px') {
				note.style.left = '-400px';
			}
			if (left === '-400px') {
				note.style.left = '0px';
			}
		}, false);
	}

	function init() {
		createNote(function (note, tip) {
			addEvent(note, tip);
		});	
	}

	function createNote (callback) {
		let note = document.createElement('div');
		let tip = document.createElement('div');
		let html = getInnerHTML();

		note.className = "note";
		note.id = "note";
		tip.className = 'tip';
		tip.id = 'tip';
		tip.innerHTML = '<span>笔记</span>';

		note.innerHTML = html;
		note.appendChild(tip);
		document.body.appendChild(note);

		callback(note, tip);
	}
	function parseData (data) {
		let result = [];
		for (let i = 0; i < data.length; i++) {
			let temp = '<li><span class="index">' + (i+1) + '</span><a href="#">' + data[i] + '</a></li>';
			result.push(temp);
		}
		return result.join('');
	}
	function getInnerHTML () {
		let dataList = parseData(noteObj.data);
		let innerBefore = `
			<div class="list">
				<ul class="list-info">
		`;
		let innerAfter = `
				</ul>
			</div>
		`;
		return innerBefore + dataList + innerAfter;
	}

	$.Note = noteObj;

})(window)