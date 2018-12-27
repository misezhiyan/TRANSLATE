var ContentTable = (function($, win) {

	var ContentTable = function(transMode, formatMode) {
		transMode_current = transMode;
		formatMode_current = formatMode;
		return new ContentTable.fn.init();
	}

	// 翻译模式
	var transMode_current = 0;
	// 格式化模式
	var formatMode_current = 0;

	// 原文css
	var class_source = "source";
	// 译文css
	var class_result = "result";

	var content = '';

	ContentTable.fn = ContentTable.prototype = {
		constructor : ContentTable,
		init : function() {
			// 获取原文
			this.fileContent = function(element) {
				this.getFileContent(element);
			};
			// 格式化
			this.format = function(needFormat) {
				this.formatContent(needFormat);
			};
			// 创建内容节点
			this.match = function() {
				this.contentArea(needMatch);
			};
			// 展示html
			this.show = function(formData, showElement) {
				this.showHtml(formData, showElement);
			}
		},
		// 展示html
		showHtml : function(formData, showElement) {
			// 获取原文
			content = this.getFileContent(formData);
			// 格式化内容
			var formatContent = this.formatContent(content);
			// 创建内容区域
			var contentArea = this.contentArea(formatContent);
			// 展示
			$(showElement).html(contentArea);
			$(showElement).find('textarea').each(function() {
				$(this).height(this.scrollHeight);
			});
			var table = $(contentArea).find('table');
			// 翻译
			this.translateSentense(table);
		},
		// 按句翻译
		translateSentense : function(table) {

			var webRoot = $('#webRoot').val();
			var objThis = this;

			$(table).find('textarea').each(function() {
				var textarea_source = $(this);
				var sentense = $(this).val();
				$.post(webRoot + "/translate/translateSentense.do", {
					sentense : sentense
				}, function(data) {
					var textarea_result = objThis.matchInput(data, class_result);
					$(textarea_result).attr("class", "result");
					// objThis.addRightClick(tr, "result");

					$(textarea_result).appendTo($(textarea_source).parent());
				})
			});
		},
		// 获取原文
		getFileContent : function(formData) {

			var webRoot = $('#webRoot').val();
			$.ajax({
				url : webRoot + '/translate/fileUploadAnalyze.do',
				type : 'POST',
				data : formData,
				async : false,
				cache : false,
				contentType : false,
				processData : false,
				success : function(data) {

					var file_content = JSON.parse(data);
					content = file_content[0].fileContent;

				},
				error : function(returndata) {
					content = returndata;
					alert(JSON.stringify(content));
				},
			});

			return content;
		},

		// 格式化
		formatContent : function(needFormat) {

			var needFormat_arr = needFormat.split('\r\n');

			var result = '';
			for (var i = 0; i < needFormat_arr.length; i++) {
				var needFormatTmp = needFormat_arr[i];
				if ('' == needFormatTmp.replace(' ', '').replace('	', ''))
					continue;
				while (needFormatTmp.indexOf('  ') != -1) {
					needFormatTmp = needFormatTmp.replace('  ', ' ');
				}
				while (needFormatTmp.indexOf('		') != -1) {
					needFormatTmp = needFormatTmp.replace('		', '	');
				}
				while (needFormatTmp.indexOf('\r\n\r\n') != -1) {
					needFormatTmp = needFormatTmp.replace('\r\n\r\n', '\r\n');
				}

				result += needFormatTmp + '\r\n';
			}

			return result;
		},
		contentArea : function(needMatch) {

			// 创建内容展示控制头
			var tableDiv = document.createElement("div");

			var tableExpend = document.createElement("a");
			var tableContract = document.createElement("a");

			$(tableExpend).appendTo($(tableDiv));
			$(tableContract).appendTo($(tableDiv));

			$(tableExpend).html("展开");
			$(tableContract).html("收起");

			$(tableExpend).click(function() {
				$('.result').show();
			})
			$(tableContract).click(function() {
				$('.result').hide();
			})

			var table = this.createTable(needMatch);
			$(table).attr('class', 'contentTable');

			$(table).appendTo($(tableDiv));

			return tableDiv;
		},
		matchTable : function(needMatch) {

			var table = this.createTable(needMatch);
			$(table).attr('class', 'contentTable');

			return table;
		},
		createTable : function(needMatch) {

			var tds = 1;

			var table = document.createElement("table");
			// $(table).css('border', '1');
			// $(table).css('cellspacing', '0');
			// $(table).css('cellpadding', '0');
			$(table).css('width', '100%');

			var content_arr = needMatch.split("\r\n");
			for (var paraphase_i = 0; paraphase_i < content_arr.length; paraphase_i++) {
				var paraphase = content_arr[paraphase_i];
				var paraphaseLength = paraphase.length;
				// var circle_count = paraphaseLength / width;
				// var circle_left = paraphaseLength % width;
				// circle_count += (circle_left == 0 ? 0 : 1);
				// for (var i = 0; i < circle_count; i++) {

				var substring = '';
				// if (i == (circle_count - 1))
				// substring = paraphase.substring(i * width, paraphaseLength);
				// else
				// substring = paraphase.substring(i * width, (i + 1) * width);
				substring = paraphase;

				var tr = this.createTr(tds, substring);
				$(tr).attr("class", "source");
				this.addRightClick(tr, "source");
				$(tr).appendTo($(table));

				// var tr2 = this.createTr(tds, substring);
				// $(tr2).height(trHight);
				// $(tr2).attr("class", "result");
				// //this.addRightClick(tr2, "result");
				// $(tr2).appendTo($(table));
				// }
			}

			return table;
		},
		createTr : function(tds, needMatch) {

			var tr = document.createElement("tr");

			for (var i = 0; i < tds; i++) {
				var td = this.createTd(needMatch);
				// $(td).width(tdWidth);
				$(td).appendTo($(tr));
			}

			return tr;
		},
		createTd : function(needMatch) {

			var td = document.createElement("td");
			var textarea = this.matchInput(needMatch, class_source);
			// $(td).html(content);
			$(textarea).appendTo($(td));

			return td;
		},
		matchInput : function(needMatch, classType) {

			var textarea = document.createElement("textarea");
			$(textarea).val(needMatch);
			$(textarea).attr('class', classType);

			return textarea;
		},
		addRightClick : function(node, type) {
			node.addEventListener("contextmenu", function(event) {
				event.preventDefault();
				if (type == 'source')
					$('#rightClick').hide();
				if (type == 'result')
					$('#rightClick').show();
			});
		}
	}

	ContentTable.fn.init.prototype = ContentTable.fn;

	return ContentTable;
})($, window);
