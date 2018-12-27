var TranslateOperatorUI = (function($, win) {
	// 构造方法
	var TranslateOperatorUI = TranslateOperatorUI || function() {

		return new TranslateOperatorUI.fn.init();
	}

	TranslateOperatorUI.fn = TranslateOperatorUI.prototype = {
		constructor : TranslateOperatorUI,
		init : function() {
			// 创建面板
			this.useUI = function(content, elementDisplay) {
				// 获取面板, 如果没有面板, 创建面板
				return this.useTranslateOperatorUI(content, elementDisplay);
			}
			// 译文界面展示全部译文
			this.showTranslateOneContent = function(currentContentId) {
				this.showTranslateOneContentAll(currentContentId);
			}
			// 译文界面隐藏全部译文
			this.hideTranslateOneContent = function(currentContentId) {
				this.hideTranslateOneContentAll(currentContentId);
			}
			// 文件下载
			var filedownload = filedownload || fileDownloadManager();

			// 向上切换段落
			this.changeCurrentPhaseLast = function(currentContentId) {
				return this.changeCurrentPhase_last(currentContentId);
			}
			// 向下切换段落
			this.changeCurrentPhaseNext = function(currentContentId) {
				return this.changeCurrentPhase_next(currentContentId);
			}
			// 切换段落排版
			this.changePhaseComposition = function(currentPhaseElement) {
				this.changePhase_composition(currentPhaseElement);
			}
			// 切换段落排版到展示排版界面
			this.changePhaseCompositionDisplay = function(currentPhaseElement) {
				this.changePhaseComposition_display(currentPhaseElement);
			}
			// 生成译文文件
			this.saveCurrentContent = function(usingContentId, contentHeadName) {
				this.saveCurrent_content(usingContentId, contentHeadName);
			}
		},
		// 切换或创建界面
		useTranslateOperatorUI : function(content, elementDisplay) {

			// 获取界面
			var translateoperatorUI = $(elementDisplay).find('[ui=translateoperator]');
			if (undefined == translateoperatorUI || translateoperatorUI.length < 1)
				translateoperatorUI = this.createUI(content, elementDisplay);

			// 设置可见
			$(translateoperatorUI).show();

			return translateoperatorUI;
		},
		// 创建界面
		createUI : function(content, elementDisplay) {

			var contentid = content.contentid;
			var fileContent = content.content;
			var fileName = content.fileName;
			// 创建界面
			var translateoperatorDiv = document.createElement('div');
			// 设置界面关联属性
			$(translateoperatorDiv).attr('ui', 'translateoperator');
			// 配置内容操作相关
			var operatorInnerUI = this.createOperatorInnerUI(contentid, fileContent);
			$(translateoperatorDiv).html(operatorInnerUI);
			// $(translateoperatorDiv).css({
			// "background" : "red"
			// });

			$(translateoperatorDiv).appendTo($(elementDisplay));

			return translateoperatorDiv;
		},
		// 配置内容操作相关
		createOperatorInnerUI : function(contentid, fileContent) {

			// 文章容器
			var innerUI = document.createElement('div');

			// 文章分段
			var phaseArr = fileContent.split('<br>');
			// 段分句
			for (var i = 0; i < phaseArr.length; i++) {
				// 段落内容
				var phase = phaseArr[i];

				// 匹配段落内容
				if (!this.isBlankEmpty(phase)) {
					var phaseElement = this.matchPhase(contentid, i, phase);
					$(innerUI).append($(phaseElement));
				}
			}

			return innerUI;
		},
		// 创建段落
		matchPhase : function(contentid, phaseSequence, phase) {
			// 创建段落节点
			var phaseElement = document.createElement('div');
			$(phaseElement).attr('phaseSequence', phaseSequence);
			// 原文
			var sourceElement = document.createElement('div');
			// $(sourceElement).html(phase);
			// $(sourceElement).css({
			// "background" : "red",
			// });
			$(sourceElement).attr('transelate', 'source');

			// 译文
			var translateElement = document.createElement('div');

			$(translateElement).hide();
			$(translateElement).css({
				"background" : "blue",
			// "height" : "100px"
			});
			$(translateElement).attr('transelate', 'transelate');

			// 译文结果分配到各自容器
			this.analyzeSentenseTranslateList(phase, sourceElement, translateElement);

			// 段落展示排版
			var phaseDisplayCompositionElement = document.createElement('div');
			$(phaseDisplayCompositionElement).attr('composition', 'display');
			$(phaseDisplayCompositionElement).append(sourceElement);
			$(phaseDisplayCompositionElement).append(translateElement);
			// 段落编辑排版
			var phaseOperateCompositionElement = document.createElement('div');
			$(phaseOperateCompositionElement).attr('composition', 'operate');
			$(phaseOperateCompositionElement).hide();
			// 安放排版界面
			$(phaseElement).append(phaseOperateCompositionElement);
			$(phaseElement).append(phaseDisplayCompositionElement);

			// 段落事件
			this.addPhaseEvent(phaseElement);

			return phaseElement;
		},
		translatePhaseAjax : function(phase) {

			var resultJson = undefined;

			var webRoot = $('#webRoot').val();
			$.ajax({
				url : webRoot + '/translate/ajaxPhaseTranslate.do',
				type : 'POST',
				dataType : 'json',
				data : {
					'phase' : phase
				},
				async : false,
				cache : false,
				// contentType : false,
				// contentType:"application/json"
				// processData : false, // true 序列化
				success : function(data) {
					resultJson = data;
				},
				error : function(returndata) {
				}
			});

			return resultJson;
		},
		// 解析后台翻译结果
		analyzeSentenseTranslateList : function(phase, sourceElement, translateElement) {
			var translatePhaseJson = this.translatePhaseAjax(phase);
			if (undefined != translatePhaseJson) {
				var status = translatePhaseJson.status;
				if (status == '1') {

					var setenseList = translatePhaseJson.setenseList;
					for (var i = 0; i < setenseList.length; i++) {
						var sentense = setenseList[i];
						var sourceSentenseElement = document.createElement('div');
						var resultSentenseElement = document.createElement('div');
						$(sourceSentenseElement).html(sentense.source);
						$(resultSentenseElement).html(sentense.result[0]);

						$(sourceSentenseElement).attr('sentensesequence', i);
						$(resultSentenseElement).attr('sentensesequence', i);

						$(sourceSentenseElement).attr('style', 'display:inline-block');
						$(resultSentenseElement).attr('style', 'display:inline-block');

						$(sourceElement).append($(sourceSentenseElement));
						$(translateElement).append($(resultSentenseElement));
					}
				}
				// if (status != '1' && translatePhase == '')
				// translatePhase = '<font color="red">(未获取到译文)</font>';
			}

			// return result;
		},
		// 段落事件
		addPhaseEvent : function(phaseElement) {

			phaseElement.onmouseover = function() {
				$(this).addClass('articleListMouseOn');
			}
			phaseElement.onmouseout = function() {
				$(this).removeClass('articleListMouseOn');
			}
		},
		// 译文界面展示全部译文
		showTranslateOneContentAll : function(currentContentId) {
			$('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[transelate=transelate]').each(function() {
				$(this).show();
			})
		},
		// 译文界面隐藏全部译文
		hideTranslateOneContentAll : function(currentContentId) {
			$('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[transelate=transelate]').each(function() {
				$(this).hide();
			})
		},
		// 向上切换段落
		changeCurrentPhase_last : function(currentContentId) {

			// 当前选中段落
			var currentPhaseElement = $('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence].phaseChoosed');
			// 切换到段落展示界面类型
			this.changePhaseCompositionDisplay(currentPhaseElement);

			//	
			var choosedPhaseLength = currentPhaseElement.length;

			var resultChoosedPhaseElement_JQ;
			// 没有选中的, 选中首段
			if (choosedPhaseLength < 1) {
				resultChoosedPhaseElement_JQ = $('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence]').first();
				resultChoosedPhaseElement_JQ.addClass('phaseChoosed');
			} else {
				// 隐藏当前选中段落译文
				$(currentPhaseElement).find('[transelate=transelate]').hide();
				// 选中段落
				var choosedPhaseElementJQ = $('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence].phaseChoosed');
				var choosedPhaseElement = choosedPhaseElementJQ[0];
				// 要切换到的段落
				var shouldCoosedElement = choosedPhaseElement;
				// 非初段选中切换到上一段
				if (choosedPhaseElement.previousSibling != undefined)
					shouldCoosedElement = choosedPhaseElement.previousSibling;
				// 初段选中切换到最后一段
				else {
					while (shouldCoosedElement.nextSibling != undefined) {
						shouldCoosedElement = shouldCoosedElement.nextSibling;
					}
				}
				$(choosedPhaseElement).removeClass('phaseChoosed');
				$(shouldCoosedElement).addClass('phaseChoosed');
				resultChoosedPhaseElement_JQ = $(shouldCoosedElement);
			}
			// 展示译文
			resultChoosedPhaseElement_JQ.find('[transelate=transelate]').show();

			return resultChoosedPhaseElement_JQ;
		},
		// 向下切换段落
		changeCurrentPhase_next : function(currentContentId) {
			// 当前选中段落
			var currentPhaseElement = $('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence].phaseChoosed');
			// 切换到段落展示界面类型
			this.changePhaseCompositionDisplay(currentPhaseElement);

			//	
			var choosedPhaseLength = currentPhaseElement.length;
			var resultChoosedPhaseElement_JQ;
			// 没有选中的, 选中首段
			if (choosedPhaseLength < 1) {
				resultChoosedPhaseElement_JQ = $('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence]').first();
				resultChoosedPhaseElement_JQ.addClass('phaseChoosed');
			} else {
				// 隐藏当前选中段落译文
				$(currentPhaseElement).find('[transelate=transelate]').hide();
				// 非尾段选中切换到下一段
				var shouldChoose = false;
				$('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence]').each(function() {
					if (shouldChoose) {
						$(this).addClass('phaseChoosed');
						resultChoosedPhaseElement_JQ = $(this);
						shouldChoose = false;
						return false;
					}
					if ($(this).hasClass('phaseChoosed')) {
						$(this).removeClass('phaseChoosed');
						shouldChoose = true;
					}
				})
				// 尾段切换到第一段
				if (shouldChoose) {
					resultChoosedPhaseElement_JQ = $('[contentid=' + currentContentId + ']').find('[ui=translateoperator]').find('[phasesequence]').first();
					resultChoosedPhaseElement_JQ.addClass('phaseChoosed');
				}
			}
			// 展示译文
			resultChoosedPhaseElement_JQ.find('[transelate=transelate]').show();
			return resultChoosedPhaseElement_JQ;
		},
		changePhaseComposition_display : function(currentPhaseElement) {

			// 操作排版界面
			var operateCompositionElement = $(currentPhaseElement).find('[composition=operate]');
			var using = $(operateCompositionElement).attr('using');
			if (using != undefined)
				this.changePhase_composition(currentPhaseElement);
		},
		// 切换段落排版
		changePhase_composition : function(currentPhaseElement) {

			//

			// 展示排版界面
			var displayCompositionElement = $(currentPhaseElement).find('[composition=display]');
			// 操作排版界面
			var operateCompositionElement = $(currentPhaseElement).find('[composition=operate]');

			var using = $(operateCompositionElement).attr('using');
			if (using == undefined) {
				// 界面转操作排版界面
				$(displayCompositionElement).find('[transelate=source]').find('[sentensesequence]').each(function() {
					var sentensesequence = $(this).attr('sentensesequence');
					var transelateElement = $(displayCompositionElement).find('[transelate=transelate]').find('[sentensesequence=' + sentensesequence + ']');

					// 去掉内联
					$(this).attr('style', '');
					$(transelateElement).attr('style', '');
					// 可编辑
					$(this).attr('contenteditable', 'true');
					$(transelateElement).attr('contenteditable', 'true');
					// 添加来源
					$(this).attr('from', 'src');
					$(transelateElement).attr('from', 'dst');
					// 界面渲染
					$(this).addClass('');
					$(transelateElement).addClass('');

					$(operateCompositionElement).append($(this));
					$(operateCompositionElement).append($(transelateElement));
				});
				$(operateCompositionElement).show();
				$(operateCompositionElement).attr('using', '');
			} else {

				$(operateCompositionElement).find('[from=src]').each(function() {
					$(displayCompositionElement).find('[transelate=source]').append($(this));
					$(this).removeAttr('contenteditable');
					$(this).removeAttr('from');
					$(this).attr('style', 'display:inline-block');
				})
				$(operateCompositionElement).find('[from=dst]').each(function() {
					$(displayCompositionElement).find('[transelate=transelate]').append($(this));
					$(this).removeAttr('contenteditable');
					$(this).removeAttr('from');
					$(this).attr('style', 'display:inline-block');
				});

				$(operateCompositionElement).removeAttr('using');
			}
		},
		// 保存当前操作文章译文
		saveCurrent_content : function(usingContentId, contentHeadName) {

			var translateTextResult = '';
			$('[contentid=' + usingContentId + ']').find('[ui=translateoperator]').find('[transelate=transelate]').find('[sentensesequence]').each(function() {

				var translateText = $(this).html();
				translateTextResult += translateText;
			})
			// 下载
			// 路径
			var downloadURL = $('#webRoot').val() + '/file/fileDownLoad.do';
			// 后台参数
			var contentRelated = {
				fileName : contentHeadName,
				content : translateTextResult
			}

			// 调用
			filedownload.download(downloadURL, contentRelated);
		},
		// 是否空白值
		isBlankEmpty : function(str) {

			if (undefined == str || '' == str)
				return true;
			while (str.indexOf(' ') > -1) {
				str = str.replace(' ', '');
			}
			if (undefined == str || '' == str)
				return true;
			return false;
		}

	}

	TranslateOperatorUI.fn.init.prototype = TranslateOperatorUI.fn;

	return TranslateOperatorUI;
})($, window);
