var Content = (function($, win) {

	var Content = function() {
		return new Content.fn.init();
	}

	// 唯一标记
	var contentid = '';
	// 文章原文内容
	var content = '';
	// 文章对应的文件名称
	var fileName = '';

	Content.fn = Content.prototype = {
		constructor : Content,
		init : function() {
			// 测试
			this.test = function() {
				this.testMap();
			};
		},
		// 测试
		testMap : function(formData) {
			alert(1);
			var map = new Map();
			map.set('1', '测试');
			alert(map.get('1'));
		}
	}

	Content.fn.init.prototype = Content.fn;

	return Content;
})($, window);
