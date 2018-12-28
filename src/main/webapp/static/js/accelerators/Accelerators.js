var Accelerators = (function($, win) {
	// 构造方法
	var Accelerators = Accelerators || function() {

		// 此外还有一个keypress事件和keydown事件类似，但不能混用。keydown与keypress的区别是：
		// 1 只有字符按键才能触发keypress事件，
		// 任何按键都能触发keydown事件，比如：F1-F12、方向键、等只能用keydown。
		// 2 keydown返回的是键盘的代码,
		// keypress返回的是ASCII字符，以字符a为例，keydown返回65，而keypress返回97。
		// 如果要检测Ctrl、Shift等组合键判断这些对象是不是true：e.shiftKey、e.ctrlKey
		return new Accelerators.fn.init();
	}

	Accelerators.fn = Accelerators.prototype = {
		constructor : Accelerators,
		init : function() {
			// 使用快捷键组合--外层
			this.useAcceleratorCommon = function() {
				// 使用快捷键组合--外层
				return this.useAccelerator_common();
			}
			// 禁用快捷键
			this.banAccelerators = function() {
				this.banAccelerators_All();
			}
			// 使用快捷键组合--蒙版快捷键组合
			this.useAcceleratorsMidemask = function() {
				// 使用快捷键组合--蒙版快捷键组合
				return this.useAccelerators_hidemask();
			}
			// 禁用蒙版快捷键
			this.banAcceleratorsHideMask = function() {
				this.banAccelerators_hidemask();
			}
			// 通过界面类型切换快捷键
			this.changeAcceleratorByUI = function(uiType) {
				this.changeAccelerator_UI(uiType);
			}
		},
		// 外层快捷键
		useAccelerator_common : function() {
			var acceleratorsManager = this;
			$(document).off("keydown").keydown(function(e) {

				// F1 菜单, 面板 隐藏
				if (e.which == 112) {
					if ($('#rel_div').is(':visible'))
						$('#rel_div').hide();
					else
						$('#rel_div').show();
					event.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}

				// ctrl + "Enter" 或 F3 菜单, 切换操作类型
				if ((e.ctrlKey && e.which == 13) || e.which == 114) {
					var usingUI = uiManager.changeUI();
					acceleratorsManager.changeAcceleratorByUI(usingUI);
					event.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
					event.keyCode = 0;
				}

				// ctrl + "向左箭头" 或者 shift + F4 切换当前操作文章到上一篇文章
				if ((e.ctrlKey && e.which == 37) || (e.shiftKey && e.which == 115)) {
					var lastContentId = uiManager.changeOperatingContentLast();
					if (lastContentId != undefined) {
						var uiType = uiManager.contentUIType(lastContentId);
						// 切换操作类型界面
						acceleratorsManager.changeAcceleratorByUI(uiType);
					}
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}
				// ctrl + "向右箭头" F4 切换当前操作文章到下一篇文章
				if ((e.ctrlKey && e.which == 39) || e.which == 115) {
					var nextContentId = uiManager.changeOperatingContentNext();
					var uiType = uiManager.contentUIType(nextContentId);
					// 切换操作类型界面
					acceleratorsManager.changeAcceleratorByUI(uiType);
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}

				// esc 隐藏界面
				if (e.which == 27) {
					var rel_div = $('#rel_div')[0];
					if ($('#rel_div').is(':visible'))
						$(rel_div).hide();
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}
				// F10使用测试方法
				if (e.which == 121) {
					test();
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}

				// ctrl + "S" 保存正在操作文章
				// if (e.ctrlKey && e.which == 83) {
				// alert(1);
				// e.stopPropagation();// 阻止事件冒泡
				// event.returnValue = false;// 禁用浏览器默认快捷键功能
				// }
			});
		},
		// 使用蒙版快捷键
		useAccelerators_hidemask : function() {

			var hidemask = this;
			// 禁用原有快捷键
			this.banAccelerators_All();
			// 添加蒙版快捷键
			$(document).off("keydown").keydown(function(e) {
				if (e.which == 27) {
					// 操作板关闭
					$('[operatingbox]').hide();
					// 蒙板关闭
					$('[hidemask]').hide();
					// 切换快捷键
					hidemask.banAccelerators_hidemask();

					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}
			})
		},
		// 禁用全部快捷键
		banAccelerators_All : function() {
			$(document).off("keydown").keydown(function(e) {
				// alert('禁用全部快捷键');
				// alert(e.which);
				// 禁用ESC
				if (e.which == 27) {
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}
				// 禁用译文展开隐藏
				if ((e.ctrlKey && e.which == 107) || (e.ctrlKey && e.which == 109)) {
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
				}
				// 禁用 F1 ~ F11
				if (e.which == 112 || e.which == 113 || e.which == 114 || e.which == 115 || e.which == 116 || e.which == 117 || e.which == 118 || e.which == 119 || e.which == 120 || e.which == 121 || e.which == 122) {
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
					event.keyCode = 0;
				}
				// 禁用 ctrl + 'S' 保存当前操作文章
				if (e.ctrlKey && e.which == 83) {
					e.stopPropagation();// 阻止事件冒泡
					event.returnValue = false;// 禁用浏览器默认快捷键功能
					event.keyCode = 0;
				}
			})
		},
		// 禁用蒙版快捷键
		banAccelerators_hidemask : function() {
			// 全部禁用
			this.banAccelerators_All();
			// 使用外层快捷键
			this.useAccelerator_common();
		},
		// 通过界面类型切换快捷键
		changeAccelerator_UI : function(uiType) {

			// 全部禁用
			this.banAccelerators_All();
			// 转入元素内部使用
			var acceleratorsManager = this;
			// 原文界面, 使用外层快捷键
			if ('source' == uiType) {
				acceleratorsManager.useAccelerator_common();
				// 翻译操作界面, 定义快捷键
			} else if ('translateoperator' == uiType) {

				$(document).off("keydown").keydown(function(e) {

					// F1 菜单, 面板 隐藏
					if (e.which == 112) {
						if ($('#rel_div').is(':visible'))
							$('#rel_div').hide();
						else
							$('#rel_div').show();
						event.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}

					// F2 菜单, 切换段落排版
					if (e.which == 113) {
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}
					// ctrl + "Enter" 或 F3 菜单, 切换操作类型
					if ((e.ctrlKey && e.which == 13) || e.which == 114) {
						var usingUI = uiManager.changeUI();
						// 切换操作类型界面
						acceleratorsManager.changeAcceleratorByUI(usingUI);
						event.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
						event.keyCode = 0;
					}
					// ctrl + "向左箭头" 或者 F4 切换当前操作文章到上一篇文章
					if ((e.ctrlKey && e.which == 37) || (e.shiftKey && e.which == 115)) {
						var lastContentId = uiManager.changeOperatingContentLast();
						var uiType = uiManager.contentUIType(lastContentId);
						// 切换操作类型界面
						acceleratorsManager.changeAcceleratorByUI(uiType);
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}
					// ctrl + "向右箭头" F4 切换当前操作文章到下一篇文章
					if ((e.ctrlKey && e.which == 39) || e.which == 115) {
						var nextContentId = uiManager.changeOperatingContentNext();
						var uiType = uiManager.contentUIType(nextContentId);
						// 切换操作类型界面
						acceleratorsManager.changeAcceleratorByUI(uiType);
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}

					// ctrl + "向上箭头" 向上切换编辑段落
					if (e.ctrlKey && e.which == 38) {
						var choosedPhaseElement = uiManager.changeCurrentPhaseLast();
						if (choosedPhaseElement != undefined)
							windowposition.resetScrollTop(choosedPhaseElement);
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}

					// ctrl + "向下箭头" 向下切换编辑段落
					if (e.ctrlKey && e.which == 40) {
						var choosedPhaseElement = uiManager.changeCurrentPhaseNext();
						if (choosedPhaseElement != undefined)
							windowposition.resetScrollTop(choosedPhaseElement);
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}

					// ctrl + "+" 展开译文
					if (e.ctrlKey && e.which == 107) {
						uiManager.showTranslateAll();
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}
					// ctrl + "-" 隐藏译文
					if (e.ctrlKey && e.which == 109) {
						uiManager.hideTranslateAll();
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}
					// // ctrl + "ENTER" 切换操作界面类型
					// if (e.ctrlKey && e.which == 13) {
					// uiManager.changePhaseComposition();
					// e.stopPropagation();// 阻止事件冒泡
					// event.returnValue = false;// 禁用浏览器默认快捷键功能
					// }
					// ctrl + "S" 保存正在操作文章
					if (e.ctrlKey && e.which == 83) {
						uiManager.saveCurrentContent();
						e.stopPropagation();// 阻止事件冒泡
						event.returnValue = false;// 禁用浏览器默认快捷键功能
					}
				})

			}
		}
	}

	Accelerators.fn.init.prototype = Accelerators.fn;

	return Accelerators;
})($, window);
