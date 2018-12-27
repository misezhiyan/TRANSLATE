var ContentMap = (function($, win) {

	var ContentMap = function() {

		return new ContentMap.fn.init();
	}

	ContentMap.fn = ContentMap.prototype = {
		constructor : ContentMap,
		init : function() {
			// 文章map容器
			this.contentMap = this.contentMap || new Map();
			// 文章id_list
			this.contentIdList = this.contentIdList || new Array();
			// 添加文章
			// this.addContent = function(content) {
			// this.addContentFull(content);
			// };
		},
		// 文章加入map
		addContentJsonArr : function(fileJsonArr) {

			var currentArray = new Array();

			for (var i = 0; i < fileJsonArr.length; i++) {
				var fileJson = fileJsonArr[i];
				// 匹配文章
				var content = Content();
				content.contentid = Math.random().toString().substr(2, 11) + Date.now().toString().substr(10, 3);
				var fileContent = fileJson.fileContent;
				content.content = this.matchHtmlContent(fileContent);
				content.fileName = fileJson.fileName;

				// 添加到 map 中
				this.contentMap.set(content.contentid, content);
				// 添加到文章ID列表, 排序时使用
				this.contentIdList.push(content.contentid);

				// 返回数据
				currentArray.push(content);
			}

			return currentArray;
		},
		// 通过id获取文章
		getContentById : function(contentId) {

			var content = this.contentMap.get(contentId);
			return content;
		},
		// java转html页面时, 特殊符号转换
		matchHtmlContent : function(fileContent) {

			while (fileContent.indexOf('\r\n') > 0) {
				fileContent = fileContent.replace('\r\n', '<br>');
			}
			return fileContent;
		}
	}

	ContentMap.fn.init.prototype = ContentMap.fn;

	return ContentMap;
})($, window);
