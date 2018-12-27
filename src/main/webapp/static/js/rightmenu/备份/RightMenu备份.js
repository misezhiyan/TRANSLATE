var RightMenu = (function($, win) {
	// 构造方法
	var RightMenu = RightMenu || function() {

		return new RightMenu.fn.init();
	}

	// jquery 添加右键展示菜单方法
	function initShowRightMenu() {
		// jquery 方法 == 在 当前对象 上右键展示菜单 menu_JQElement(JQuery对象)
//		$.fn.showrightmenu = function(menu_JQElement) {
//			// 转为 dom 对象
//			var menu = menu_JQElement[0];
//			// div赋值焦点, 用于关闭菜单
//			$(menu).attr('tabIndex', '0');
//
//			// 设置该元素的 按下鼠标右键右键的 处理函数
//			this[0].onmousedown = function(aevent) {
//				if (window.event)
//					aevent = window.event; // 解决兼容性
//				if (aevent.button == 2) { // 当事件属性button的值为2时，表用户按下了右键
//					document.oncontextmenu = function(aevent) {
//						if (window.event) {
//							aevent = window.event;
//							aevent.returnValue = false; // 对IE 中断 默认点击右键事件处理函数
//						} else {
//							aevent.preventDefault(); // 对标准DOM 中断
//							// 默认点击右键事件处理函数
//						}
//					};
//					// 将菜单相对 鼠标定位
//					$(menu).css("top", aevent.clientY);
//					$(menu).css("left", aevent.clientX);
//					menu.style.display = 'block';
//
//					// 给与焦点事件, 用于失去焦点关闭菜单
//					$(menu).focus();
//				}
//			};
//			
//			// 如果鼠标在菜单以外点击, 关闭菜单
//			//bindrightmenuHide(menu);
//		}
	}
	// 如果鼠标在菜单以外点击, 关闭菜单
	function bindrightmenuHide(menu) {

		if (undefined != menu) {
			// $('body')[0].onmousedown = function(aevent) {
			// $(menu).find('div').each(function() {
			// console.log(document.activeElement);
			// console.log(this);
			// alert(document.activeElement == this);
			// })
			//
			// // 判断菜单是否失去焦点
			// if (document.activeElement == menu) {
			// // 未失去焦点
			// } else {
			// menu.style.display = 'none';
			// }
			// }
		}
	}

	RightMenu.fn = RightMenu.prototype = {
		constructor : RightMenu,

		initBindRight : initShowRightMenu(),

		init : function() {
			// 层级
			this.level;
			// 创建右键菜单
			this.createMenu = function(menuList) {
				// 右键菜单面板
				return this.createMenuSpinner(menuList);
			}
		},
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
					// 当前div的宽高
//					var X_element = $(this).width();
//					var Y_element = $(this).height();
//
//					if (X_element != 0) {
//						var subLevel = $(subMenuListSpinner).attr('level');
//
//						$(subMenuListSpinner).css("top", 0);
//						$(subMenuListSpinner).css("left", subLevel * X_element);
//					}

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
				} else {
					$(rightMenuSpinner).text(text);
					$(rightMenuSpinner).click(function() {
						var menuSpinner = $(this).parent();
						$(menuSpinner).hide();
						var funcin = $(menuSpinner).attr('funcin');
						fun(funcin);
						$(menuSpinner).removeAttr('funcin');
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
