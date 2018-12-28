var RightMenu = (function($, win) {
	// 构造方法
	var RightMenu = RightMenu || function() {

		return new RightMenu.fn.init();
	}

	// jquery 绑定右键菜单相关方法
	function initShowRightMenu() {

		// 业务逻辑 == 绑定jquery使用方法
		// 1.元素定义为菜单
		// 2.菜单失去焦点,关闭菜单
		// 3.在 当前对象 上右键展示菜单 menu_JQElement(JQuery对象)

		// 1.元素定义为菜单
		$.fn.defineAsMenu = function(canCatchFocus) {

			// 1.设置class为默认菜单属性
			// 2.菜单绑定可获取焦点,ifCan 选择是否可获取

			// 1.设置class
			this.addClass('menu');
			// 2.菜单绑定可获取焦点
			var tabindex = this.attr('tabindex');
			// 可获取
			if (undefined == tabindex && canCatchFocus)
				this.attr('tabindex', 0);
			// 不可获取
			if (undefined != tabindex && !canCatchFocus)
				this.removeAttr('tabindex');
		}
		// 2.菜单失去焦点,关闭菜单
		$.fn.hideMenuAfterLoseFocus = function() {
			this.blur(function() {
				if (this.is(':visible'))
					this.hide();
			})
		}
		// 3.在 当前对象 上右键展示菜单 menu_JQElement(JQuery对象)
		$.fn.bindrightmenu = function(menuSpinnerElementJQ, menuElement, bindElementFlag, ifScrollHide, ifWindowResizeHide, ifKeepClass) {

			// 菜单面板重置
			menuSpinnerElementJQ.html();
			menuSpinnerElementJQ.append(menuElement);

			// 转为 dom 对象
			// var menuSpinner = menuSpinnerElementJQ[0];
			// 设置该元素的 按下鼠标右键右键的 处理函数
			this[0].onmouseup = function(aevent) {

				if (window.event)
					aevent = window.event; // 解决兼容性
				if (aevent.button == 2) { // 当事件属性button的值为2时，表用户按下了右键

					// // 保持class
					// var className;
					// var className_parent;
					// if (undefined == ifKeepClass || ifKeepClass) {
					// className = $(this).attr('class');
					// className_parent = $(this).parent().attr('class');
					// }

					// 指定绑定元素
					menuSpinnerElementJQ.attr('bindElementFlag', bindElementFlag);

					// 默认点击右键事件处理函数
					// 将菜单相对 鼠标定位
					menuSpinnerElementJQ.css("position", "absolute");
					menuSpinnerElementJQ.css("top", aevent.clientY + $(document).scrollTop());
					menuSpinnerElementJQ.css("left", aevent.clientX + $(document).scrollLeft());

					menuSpinnerElementJQ.show();
					this.blur();
					menuSpinnerElementJQ.focus();
					// aevent.returnValue = false; // 对IE 中断 默认点击右键事件处理函数
					// aevent.preventDefault(); // 对标准DOM 中断
					// console.log(this);
					// console.log(getEventListeners);
					// console.log(getEventListeners(this).mouseover);
					// // 保持class
					// if (undefined == ifKeepClass || ifKeepClass) {
					// $(this).addClass(className);
					// $(this).parent().attr(className_parent);
					// }

					// 滚动页面关闭菜单(默认值:true)
					if (ifScrollHide)
						$(document).scroll(function() {
							if (menuSpinnerElementJQ.is(':visible'))
								menuSpinnerElementJQ.hide();
						});
					// 窗口大小变化关闭菜单(默认值:true)
					if (undefined == ifWindowResizeHide || ifWindowResizeHide)
						window.onresize = function() {
							if (menuSpinnerElementJQ.is(':visible'))
								menuSpinnerElementJQ.hide();
						}
				}
			}
		}
	}

	RightMenu.fn = RightMenu.prototype = {
		constructor : RightMenu,

		init : function() {
			// jquery绑定右键功能
			initShowRightMenu();

			// 层级
			this.level;
			// 创建右键菜单
			this.createMenu = function(menuList) {
				// 右键菜单面板
				return this.createMenuSpinner(menuList);
			}
		},
		// 创建右键菜单面板
		createMenuSpinner : function(menuList) {
			// 初始化层级
			this.level = 0;
			// 创建菜单面板
			var rightMenuListSpinner = document.createElement('div');
			// 菜单面板属性
			$(rightMenuListSpinner).addClass('menu');
			$(rightMenuListSpinner).attr('level', this.level);

			for (var i = 0; i < menuList.length; i++) {
				var menu = menuList[i];
				var menuElement = this.menuElement(menu);

				$(menuElement).appendTo($(rightMenuListSpinner));
			}

			return rightMenuListSpinner;
		},
		// 单个右键菜单
		menuElement : function(menu) {

			// 单个菜单面板
			var rightMenuSpinner = document.createElement('div');
			$(rightMenuSpinner).attr('width', '100%');

			// 面板内容
			var text = menu.text;
			// 子菜单列表, 如果有加载子菜单, 没有, 触发点击功能方法
			var subMenuList = menu.subMenuList;
			// 功能方法
			var fun = menu.fun;

			// 子菜单列表, 如果有加载子菜单,
			if (undefined != subMenuList && subMenuList.length > 0) {
				// 子菜单面板
				var subMenuListSpinner = this.createSubMenuListSpinner(subMenuList);
				$(rightMenuSpinner).append(text);
				$(rightMenuSpinner).append(subMenuListSpinner);

				// 鼠标悬浮
				rightMenuSpinner.onmouseover = function() {
					$(this).addClass('menu_row_over');
					$(subMenuListSpinner).show();
				}
				// 鼠标移除
				rightMenuSpinner.onmouseout = function() {
					$(this).removeClass('menu_row_over');
					$(subMenuListSpinner).hide();
				}

				// 如果没有, 触发点击功能方法
			} else {

				if (undefined == fun || '' == fun) {
					alert(text + ':未绑定方法');
					return;
				} else {
					$(rightMenuSpinner).text(text);
					$(rightMenuSpinner).on('click', function() {

						var menuSpinner = $(this).parent().parent();
						$(menuSpinner).hide();
						var bindElementFlag = $(menuSpinner).attr('bindElementFlag');
						fun(bindElementFlag);
						$(menuSpinner).removeAttr('bindElementFlag');
					});
				}
				// 鼠标悬浮
				rightMenuSpinner.onmouseover = function() {
					$(this).addClass('menu_row_over');
					// event.stopPropagation(); // 阻止事件冒泡
				}
				// 鼠标移除
				rightMenuSpinner.onmouseout = function() {
					$(this).removeClass('menu_row_over');
					// event.stopPropagation(); // 阻止事件冒泡
				}
			}

			// div赋值焦点, 用于关闭菜单
			$(rightMenuSpinner).attr('tabIndex', '0');
			$(rightMenuSpinner).focus();

			return rightMenuSpinner;
		},
		// 子菜单面板
		createSubMenuListSpinner : function(subMenuList) {
			// 层级
			this.level++;

			// 子菜单面板
			var subMenuListSpinner = document.createElement('div');
			// 初始化
			$(subMenuListSpinner).addClass('menu');
			$(subMenuListSpinner).attr('level', this.level);
			$(subMenuListSpinner).hide();

			// 创建单个菜单
			for (var i = 0; i < subMenuList.length; i++) {
				// alert(this.level);
				var subMenu = subMenuList[i];
				var subMenuSpinner = this.menuElement(subMenu);
				$(subMenuListSpinner).append($(subMenuSpinner));
			}

			// 下一个层级与当前层级一致
			this.level--;

			return subMenuListSpinner;
		}
	}

	RightMenu.fn.init.prototype = RightMenu.fn;

	return RightMenu;
})($, window);
