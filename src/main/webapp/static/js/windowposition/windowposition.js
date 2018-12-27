var windowPosition = (function($, win) {
	// 构造方法
	var windowPosition = windowPosition || function() {

		return new windowPosition.fn.init();
	}

	windowPosition.fn = windowPosition.prototype = {
		constructor : windowPosition,
		init : function() {
			// 获取窗口可视范围的高度
			this.getClientHeight = function(uiType) {
				this.getClient_height(uiType);
			}
			// 获取窗口滚动条高度
			this.getScrollTop = function(uiType) {
				this.getScroll_top(uiType);
			}
			// 获取文档内容实际高度
			this.getScrollHeight = function(uiType) {
				this.getScroll_height(uiType);
			}
			// 重置滚动条距离顶部高度
			this.resetScrollTop = function(element_JQ) {
				this.resetScroll_top(element_JQ);
			}
		},
		// 重置滚动条距离顶部高度
		resetScroll_top : function(element_JQ) {

			var clientHight = this.getClient_height();
			var scrollTop = this.getScroll_top();
			var getScrollHeight = this.getScroll_height();

			var elementTop = element_JQ.offset().top;
			var topNeed = elementTop - 35;
			document.documentElement.scrollTop = topNeed;
			if (document.documentElement && document.documentElement.scrollTop) {
			} else if (document.body) {
				document.body.scrollTop = topNeed;
			}
		},
		// 获取窗口可视范围的高度
		getClient_height : function() {
			var clientHeight = 0;
			if (document.body.clientHeight && document.documentElement.clientHeight) {
				var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
			} else {
				var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
			}
			return clientHeight;
		},
		// 获取窗口滚动条高度
		getScroll_top : function() {
			var scrollTop = 0;
			if (document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if (document.body) {
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		},
		// 获取文档内容实际高度
		getScroll_height : function() {
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		}
	}

	windowPosition.fn.init.prototype = windowPosition.fn;

	return windowPosition;
})($, window);
