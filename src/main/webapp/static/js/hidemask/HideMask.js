var HideMask = (function($, win) {
	// 构造方法
	var HideMask = function() {

		return new HideMask.fn.init();
	}

	HideMask.fn = HideMask.prototype = {
		constructor : HideMask,
		init : function() {

			// 加载蒙版
			this.showHideMask = function(hidemaskElement_JQ, operateboxElement_JQ) {
				return this.show_hidemask(hidemaskElement_JQ, operateboxElement_JQ);
			}
			// 去除蒙版和操作层
			this.removeHideMask = function(hidemaskElement_JQ, operateboxElement_JQ) {
				return this.remove_hidemask(hidemaskElement_JQ, operateboxElement_JQ);
			}
		},
		// 加载蒙版
		show_hidemask : function(hidemaskElement_JQ, operateboxElement_JQ) {
			// 使用蒙版界面快捷键
			accelerators.useAcceleratorsMidemask();

			// 显示蒙版
			hidemaskElement_JQ[0].style.display = "block";
			// 设置蒙版高度为当前页面高度
			hidemaskElement_JQ[0].style.height = document.body.clientHeight + "px";
			// 显示操作层
			operateboxElement_JQ[0].style.display = "block";

		},
		// 去除蒙版和操作层
		remove_hidemask : function(hidemaskElement_JQ, operateboxElement_JQ) {
			hidemaskElement_JQ[0].style.display = "none";
			operateboxElement_JQ[0].style.display = "none";
			// 禁用蒙版界面快捷键
			accelerators.banAcceleratorsHideMask();
		}
	}

	HideMask.fn.init.prototype = HideMask.fn;

	return HideMask;
})($, window);
