var SourceUI = (function($, win) {
	// 构造方法
	var SourceUI = SourceUI || function() {

		return new SourceUI.fn.init();
	}

	SourceUI.fn = SourceUI.prototype = {
		constructor : SourceUI,
		init : function() {
			// 创建面板
			this.useUI = function(content, elementDisplay) {
				// 获取面板, 如果没有面板, 创建面板
				return this.useSourceUI(content, elementDisplay);
			}
		},
		// 切换或创建界面
		useSourceUI : function(content, elementDisplay) {

			var contentid = content.contentid;
			var fileContent = content.content;
			var fileName = content.fileName;

			// 获取界面
			var sourceUI = $(elementDisplay).find('[ui=source]');
			if (undefined == sourceUI || sourceUI.length < 1)
				sourceUI = this.createUI(content, elementDisplay);

			// 设置可见
			$(sourceUI).show();

			return sourceUI;
		},
		// 创建界面
		createUI : function(content, elementDisplay) {

			var fileContent = content.content;
			// 创建界面
			var sourceDiv = document.createElement('div');
			// 设置界面关联属性
			$(sourceDiv).attr('ui', 'source');
			// 内容展示
			$(sourceDiv).html(fileContent);

			$(sourceDiv).appendTo($(elementDisplay));

			return sourceDiv;
		}

	}

	SourceUI.fn.init.prototype = SourceUI.fn;

	return SourceUI;
})($, window);
