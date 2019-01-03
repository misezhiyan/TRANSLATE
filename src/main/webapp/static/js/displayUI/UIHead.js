var UIHead = (function($, win) {

	var UIHead = function() {
		return new UIHead.fn.init();
	}

	UIHead.fn = UIHead.prototype = {
		constructor : UIHead,
		init : function() {
			// 转换操作界面加载内容
			this.useUIHead = function(content, displayElement) {
				this.useContentUIHead(content, displayElement);
			}
			// 关联文章头元素
			this.contentHeadName = function(usingContentId) {
				return this.contentHead_name(usingContentId);
			}
			// 关闭文章头
			this.closeContentHeadById = function(contentid) {
				this.closeContentHead_byId(contentid);
			}
			// 正在使用文章头
			this.usingHeadElement = function(contentid) {
				return this.usingHead_element(contentid);
			}
			// 切换到默认文章
			this.useDefaultContent = function() {
				this.use_defaultContent();
			}
		},
		// 转换操作界面
		useContentUIHead : function(content, displayElement) {

			var contentid = content.contentid;

			// 获得头标签
			var headElement = $(displayElement).find('[contentHead=' + contentid + ']');
			if (undefined == headElement || headElement.length < 1)
				headElement = this.createUIHead(content, displayElement);

			// 更换头css
			this.headChangeCss(headElement, displayElement);
			// 点击头标签, 展示对应面板
			$(headElement).click(function() {
				// 更换头css
				// 隐藏其他
				$(displayElement).find('[contentHead]').each(function() {

					$(this).attr('class', 'uiHeadUnChoosed');
				})
				// 展示当前
				$(headElement).attr('class', 'uiHeadChoosed');

				// 总容器
				var container = $(displayElement).parent().parent();
				// 其他面板关闭
				$(container).find('[contentid]').each(function() {
					$(this).hide();
				})
				// 当前面板展示
				$(container).find('[contentid=' + contentid + ']').show();

				// 转换快捷键类型
				var currentUIElement;
				$(container).find('[contentid=' + contentid + ']').find('[ui]').each(function() {
					if ($(this).is(':visible'))
						currentUIElement = this;
				});
				if (undefined != currentUIElement) {
					var currentUIType = $(currentUIElement).attr('ui');
					if (undefined != currentUIType)
						accelerators.changeAcceleratorByUI(currentUIType);
				}
			})
		},
		// 更换css
		headChangeCss : function(headElement, displayElement) {
			// 隐藏其他
			$(displayElement).find('[contentHead]').each(function() {

				$(this).attr('class', 'uiHeadUnChoosed');
			})
			// 展示当前
			$(headElement).attr('class', 'uiHeadChoosed');
		},
		// 创建ui头
		createUIHead : function(content, displayElement) {

			var contentid = content.contentid;
			var fileContent = content.content;
			var fileName = content.fileName;

			var headDiv = document.createElement('div');

			// 对应到文章
			$(headDiv).attr('contentHead', contentid);
			$(headDiv).html(fileName);

			// 添加事件
			this.preHappening(headDiv);

			$(headDiv).appendTo($(displayElement));

			return headDiv;
		},
		preHappening : function(tdElement) {
			$(tdElement).mouseover(function() {
				$(this).addClass('mouseOn');
			})
			$(tdElement).mouseout(function() {
				$(this).removeClass('mouseOn');
			})
		},
		// 关联文章头元素
		contentHead_name : function(usingContentId) {
			return $('[uihead]').find('[contenthead=' + usingContentId + ']').html();
		},
		// 关闭文章头元素
		closeContentHead_byId : function(contentid) {
			var contentHead = $('[uihead]').find('[contenthead=' + contentid + ']');
			$(contentHead).remove();
		},
		// 获取正在使用文章头
		usingHead_element : function() {
			var contentHeadElement = $('[uihead]').find('.uiHeadChoosed');
			return contentHeadElement;
		},
		// 切换到默认文章
		use_defaultContent : function() {
			alert(2);
			var contentCount = $('[uihead]').find('[contenthead]').length;
			alert(contentCount);
			if (contentCount > 0)
				$('[uihead]').find('[contenthead]')[0].click();
		}
	}

	UIHead.fn.init.prototype = UIHead.fn;

	return UIHead;
})($, window);
