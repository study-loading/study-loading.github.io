requirejs.config({
	paths: {
		jquery: 'jquery-1.12.0.min'
	}
});
requirejs(['jquery', 'landmine'], function ($, landmine){
	var saolei = new landmine.saolei({
		num: 60,
		cellWidth: 30,
		cols: 30,
		rows: 15
	});
	saolei.creatView().addEvent().initData();
});
/*requirejs(['jquery', 'test'], function ($, test){
	test();
});*/