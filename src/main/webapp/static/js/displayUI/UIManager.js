var UIManager = (function($, win) {
	// 构造方法
	var UIManager = function() {

		return new UIManager.fn.init();
	}

	// 加载界面类型
	function initUIArr(uiArr) {
		uiArr.push('source');
		uiArr.push('translateoperator');
	}

	UIManager.fn = UIManager.prototype = {
		constructor : UIManager,
		init : function() {

			// 文章容器
			this.contentMap = this.contentMap || ContentMap();
			// ui标题头
			this.uiHead = this.uiHead || UIHead();
			// 界面控制器
			this.sourceUI = this.sourceUI || SourceUI();
			this.translateoperatorUI = this.translateoperatorUI || TranslateOperatorUI();
			// 界面类型
			this.uiArr = this.uiArr || new Array();
			// 加载界面类型
			initUIArr(this.uiArr);

			// 加载文章 == Content 类数组
			this.loadOnAjax = function(formData) {
				return this.loadOnContentAjax(formData);
			}
			// 文章添加到容器 == Content 类数组
			this.addContentJsonList = function(fileJsonArr) {
				return this.addContentJsonArr(fileJsonArr);
			}
			// 添加到文章列表== Content 类数组
			this.addUsingContentList = function(currentArray, elementDisplayJQ, usedFileInput) {
				this.addUsingContentArr(currentArray, elementDisplayJQ, usedFileInput);
			}
			// 切换界面, 返回界面类型
			this.changeUI = function(currentid, elementDisplay) {
				return this.changeContentUI(currentid, elementDisplay);
			}
			// 展示原文界面== Content 类数组
			this.displayInUI = function(currentArray, elementDisplay) {
				this.display('source', currentArray, elementDisplay);
			}
			// 切换当前操作文章到上一篇文章
			this.changeOperatingContentLast = function() {
				return this.changeOperatingContent_last();
			}
			// 切换当前操作文章到下一篇文章
			this.changeOperatingContentNext = function() {
				return this.changeOperatingContent_next();
			}
			// 译文界面展示全部译文
			this.showTranslateAll = function() {
				this.showTranslateContentAll();
			}
			// 译文界面隐藏全部译文
			this.hideTranslateAll = function() {
				this.hideTranslateContentAll();
			}
			// 向上切换段落
			this.changeCurrentPhaseLast = function() {
				return this.changeCurrentPhase_last();
			}
			// 向下切换段落
			this.changeCurrentPhaseNext = function() {
				return this.changeCurrentPhase_next();
			}
			// 切换段落排版
			this.changePhaseComposition = function() {
				this.changePhase_composition();
			}
			// 保存正在操作文章
			this.saveCurrentContent = function() {
				this.saveCurrent_content();
			}
			// 指定文章界面类型
			this.contentUIType = function(contentId) {
				return this.content_uiType(contentId);
			}
			// 重新加载原文--单篇文章
			this.reLoadOnSourceOneContent = function(contentId) {
				return this.reLoadOnSource_oneContent(contentId);
			}
		},
		// 加载文章 ajax
		loadOnContentAjax : function(fileInput) {

			// 生成form
			var formData = new FormData();
			// 封装文件
			var files = fileInput[0].files;
			for (var i = 0; i < files.length; i++) {
				formData.append('file', files[i]);
			}
			// 获取文件内容
			var fileJsonArr = '';
			var webRoot = $('#webRoot').val();
			$.ajax({
				url : webRoot + '/translate/ajaxFileContent.do',
				type : 'POST',
				data : formData,
				async : false,
				cache : false,
				contentType : false,
				processData : false,
				success : function(data) {
					fileJsonArr = JSON.parse(data);
				},
				error : function(returndata) {
					content = returndata;
					alert('err');
					alert(JSON.stringify(content));
				}
			});

			return fileJsonArr;
		},
		// 加载文章
		loadOnContentJs : function(form) {

			// 遍历input
			$(form).find('input[type=file]').each(function() {
				alert(this.value);
				alert(this.name);
				// 每个input 多个文件, 遍历文件
				$(this.files).each(function() {

					if (!!this) {
						// 读取文件，以gbk编码方式输出
						var reader = new FileReader();
						reader.readAsText(this, "gbk");
						// 读取文件
						reader.onload = function() {
						};
						// 读取完毕后,封装结果
						reader.onloadend = function() {
							// alert(this.result);
						}
					}
				})
			})

			return;
		},
		// 添加新文件
		addContentJsonArr : function(fileJsonArr) {
			// 添加文章到容器
			var currentArray = this.contentMap.addContentJsonArr(fileJsonArr);
			return currentArray;
		},
		addUsingContentArr : function(currentArray, elementDisplayJQ, usedFileInput) {

			var elementDisplay = elementDisplayJQ[0];

			// 单次合总div
			var articalsOneTimeDiv = document.createElement('div');

			for (var i = 0; i < currentArray.length; i++) {
				// 获取原文相关
				var content = currentArray[i];
				// div包装一个文件名,一个input
				var articalDiv = document.createElement('div');
				$(articalDiv).html(content.fileName);
				$(articalDiv).attr('articalid', content.contentid);
				// 单个文件鼠标悬浮
				articalDiv.onmouseover = function() {
					$(this).addClass('articleListOne');
				}
				articalDiv.onmouseout = function() {
					$(this).removeClass('articleListOne');
				}

				// 定义菜单
				var fileListMenu = rightMenuBusinessManager.fileListMenu;
				$(articalDiv).bindrightmenu($('[menuspinner]'), fileListMenu, '[articalid=' + content.contentid + ']', true, true);

				// 单个div添加到单次div
				$(articalDiv).appendTo($(articalsOneTimeDiv));
			}
			// usedFileInput 放到隐藏域
			var hiddenDiv = document.createElement('div');
			$(hiddenDiv).attr('display', 'none');
			// 携带数据克隆
			var usedFileInputClone = usedFileInput.clone(true);
			$(hiddenDiv).append(usedFileInputClone[0]);
			$(usedFileInputClone).hide();
			// 隐藏域添加到单次div
			$(hiddenDiv).appendTo($(articalsOneTimeDiv));
			// 展示到文件列表
			$(articalsOneTimeDiv).appendTo($(elementDisplay));
			// 单次div 鼠标悬浮
			articalsOneTimeDiv.onmouseover = function() {
				$(this).addClass('articleListMouseOn');
			}
			articalsOneTimeDiv.onmouseout = function() {
				$(this).removeClass('articleListMouseOn');
			}
		},
		// 加载内容(界面乐行, 文章对应ID, 要展示到的区域节点)
		display : function(uiType, currentArray, elementDisplay) {
			// 获取原文
			for (var i = 0; i < currentArray.length; i++) {
				// 获取原文
				var content = currentArray[i];
				this.displayOneContent(uiType, content, elementDisplay);
			}
		},
		displayOneContent : function(uiType, content, elementDisplay) {
			// 切换面板头
			this.useUIHead(content, elementDisplay);
			// 切换面板
			var body = this.useUIBody(uiType, content, elementDisplay);
		},
		changeContentUI : function() {
			// 文章容器
			var contentContainer = $('#file_content_div');
			// 获取使用中的
			var usingContentId = this.getOperatingContentElement(contentContainer);
			return this.changeContentUIById(usingContentId, contentContainer);
		},
		// 切换操作界面
		changeContentUIById : function(currentid, elementDisplay) {
			// 获取文章界面
			var contentArea = $(elementDisplay).find('[contentid=' + currentid + ']');
			// 如果该界面正常展示, 切换到下一个界面
			var nextUI = '';
			// 是否到了展示元素了
			for (var i = 0; i < this.uiArr.length; i++) {
				var ui = this.uiArr[i];
				var contentUI = $(contentArea).find('[ui=' + ui + ']');
				var isAvilable = $(contentUI).is(':visible');

				if (isAvilable) {
					if (i == (this.uiArr.length - 1))
						nextUI = this.uiArr[0];
					else
						nextUI = this.uiArr[i + 1];

					// 切换界面
					$(contentUI).hide();
					var content = this.getContentById(currentid);
					this.displayOneContent(nextUI, content, elementDisplay);
					break;
				}
			}
			return nextUI;
		},

		// 获取文章源
		getContentById : function(contentid) {

			return this.contentMap.getContentById(contentid);
		},
		// 使用UI头
		useUIHead : function(content, elementDisplay) {
			// 头div
			var headDiv = $(elementDisplay).find('[uiHead]');
			var rowDiv = $(headDiv).find('div')[0];
			// 切换面板头
			this.uiHead.useUIHead(content, rowDiv);
		},
		// 使用UI界面
		useUIBody : function(uiType, content, elementDisplay) {

			elementDisplay = elementDisplay || $('#file_content_div')[0];

			// 外层包装div
			var contentid = content.contentid;
			var contentDiv = $(elementDisplay).find('[contentid=' + contentid + ']');
			if (undefined == contentDiv || contentDiv.length < 1)
				contentDiv = this.createContentDiv(contentid, elementDisplay);

			// 隐藏其他版块
			$(elementDisplay).find('[contentid]').each(function() {
				$(this).hide();
			})
			$(contentDiv).show();

			// 切换面板界面
			if (uiType == 'source') {
				var body = this.sourceUI.useUI(content, contentDiv);
			} else if (uiType == 'translateoperator') {
				this.translateoperatorUI.useUI(content, contentDiv);
			}
		},
		// 一篇文章一个div
		createContentDiv : function(contentid, elementDisplay) {

			var contentDiv = document.createElement('div');
			$(contentDiv).attr('contentid', contentid);
			$(contentDiv).appendTo($(elementDisplay));
			return contentDiv;
		},
		// 获取处于使用状态中的文章
		getOperatingContentElement : function(contentContainer) {

			if (contentContainer == undefined) {
				contentContainer = $('#file_content_div');
			}

			var contentid;
			var usingContentUI = contentContainer.find('[contentid]').find('[ui]');
			$(usingContentUI).each(function() {

				var isAvilable = $(this).is(':visible');
				if (isAvilable) {
					contentid = $(this).parent().attr('contentid');
				}
			})
			return contentid;
		},
		// 切换当前操作文章到上一篇文章
		changeOperatingContent_last : function() {
			// 文章容器
			var contentContainer = $('#file_content_div');
			// 头div
			var headDiv = $(contentContainer).find('[uiHead]')
			// 获得下一篇文章头
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			if (undefined == usingContentId)
				return;
			var nextContentId = this.getLastContentId(usingContentId);
			// 下一篇文章
			var nextContentHead = $(headDiv).find('[contenthead=' + nextContentId + ']');
			// 点击头, 切换使用文章
			$(nextContentHead).click();

			return nextContentId;
		},
		// 切换当前操作文章到下一篇文章
		changeOperatingContent_next : function() {
			// 文章容器
			var contentContainer = $('#file_content_div');
			// 头div
			var headDiv = $(contentContainer).find('[uiHead]')
			// 获得下一篇文章头
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			if (undefined == usingContentId)
				return;
			var nextContentId = this.getNextContentId(usingContentId);
			// 下一篇文章
			var nextContentHead = $(headDiv).find('[contenthead=' + nextContentId + ']');
			// 点击头, 切换使用文章
			$(nextContentHead).click();

			return nextContentId;
		},
		// 获得上一篇文章ID
		getLastContentId : function(currentContentId) {
			var contentIdList = this.contentMap.contentIdList;

			var lastContentId;
			for (var i = 0; i < contentIdList.length; i++) {
				if (currentContentId == contentIdList[i]) {
					if (i >= 1)
						return contentIdList[i - 1];
					return contentIdList[contentIdList.length - 1];
				}
			}
			return currentContentId;
		},
		// 获得下一篇文章ID
		getNextContentId : function(currentContentId) {
			var contentIdList = this.contentMap.contentIdList;

			for (var i = 0; i < contentIdList.length; i++) {
				if (currentContentId == contentIdList[i]) {
					if (contentIdList.length - 1 == i)
						return contentIdList[0];
					return contentIdList[i + 1];
				}
			}
			return currentContentId;
		},
		// 译文界面展示全部译文
		showTranslateContentAll : function() {
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			if (undefined != usingContentId)
				this.translateoperatorUI.showTranslateOneContent(usingContentId);
		},
		// 译文界面隐藏全部译文
		hideTranslateContentAll : function() {
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			if (undefined != usingContentId)
				this.translateoperatorUI.hideTranslateOneContent(usingContentId);
		},
		// 向上切换段落
		changeCurrentPhase_last : function() {
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			if (undefined != usingContentId)
				return this.translateoperatorUI.changeCurrentPhaseLast(usingContentId);
		},
		// 向下切换段落
		changeCurrentPhase_next : function() {
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			if (undefined != usingContentId)
				return this.translateoperatorUI.changeCurrentPhaseNext(usingContentId);
		},
		// 切换段落排版
		changePhase_composition : function() {
			// 当前文章
			var usingContentId = this.getOperatingContentElement();
			// 当前段落
			var usingPhaseElement = this.getCurrentPhaseElement(usingContentId);

			this.translateoperatorUI.changePhaseComposition(usingPhaseElement);
		},
		// 当前段落
		getCurrentPhaseElement : function(usingContentId) {

			var contentContainer = $('#file_content_div');
			var usingContentUI = contentContainer.find('[contentid]').find('[ui=translateoperator]');
			var currentPhaseElement = $(usingContentUI).find('[phasesequence].phaseChoosed');

			return currentPhaseElement;
		},
		// 保存正在操作文章
		saveCurrent_content : function() {
			// 切换可编辑状态到非可编辑状态
			var usingContentId = this.getOperatingContentElement();
			var usingPhaseElement = this.getCurrentPhaseElement(usingContentId);
			this.translateoperatorUI.changePhaseCompositionDisplay(usingPhaseElement);
			// 获取正在操作文章名称
			var contentHeadName = this.uiHead.contentHeadName(usingContentId);
			// 生成译文文件
			this.translateoperatorUI.saveCurrentContent(usingContentId, contentHeadName);
		},
		// 指定文章界面类型
		content_uiType : function(contentId) {
			var contentContainer = $('#file_content_div');
			var usingUIElement = contentContainer.find('[contentid=' + contentId + ']').find('[ui]:visible');
			var usingUIType = usingUIElement.attr('ui');
			return usingUIType;
		},
		// 重新加载原文--单篇文章
		reLoadOnSource_oneContent : function(contentId) {

			// 获取文章内容
			var content = this.getContentById(contentId);
			// 清空界面
			var contentElement = $('#file_content_div').find('[contentid=' + contentId + ']');
			contentElement.html('');
			// 切换到原文面板
			this.sourceUI.useUI(content, contentElement);
		}
	}

	UIManager.fn.init.prototype = UIManager.fn;

	return UIManager;
})($, window);
