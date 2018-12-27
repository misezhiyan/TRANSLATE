var RightMenuBusinessManager = (function($, win) {
	// 构造方法
	var RightMenuBusinessManager = RightMenuBusinessManager || function() {

		return new RightMenuBusinessManager.fn.init();
	}

	// 定义菜单方法
	var menuFunction = {
		// 展示编辑蒙版操作层
		showHideMask_operate : function(sourceParams) {
			// 查找要编辑段落
			var sourceJson = JSON.parse(sourceParams);
			var contentid = sourceJson.contentId;
			var phaseSequence = sourceJson.phaseSequence;
			var contentElement = $('#file_content_div').find('[contentid=' + contentid + ']').find('[ui=translateoperator]').find('[phaseSequence=' + phaseSequence + ']');

			// 原文
			var sourceElement = $(contentElement).find('[transelate=source]');
			var sourceContent = $(sourceElement).html();

			// 翻译操作层
			var operatebox = $('[operatebox=translate]');
			$(operatebox).show();
			// 翻译操作
			// $(operatebox).find('[operateContainer=translate]').html(sourceContent);

			var sentenseJsonArr;
			// 段落分句
			var webRoot = $('#webRoot').val();
			$.ajax({
				url : webRoot + '/translate/phaseSplitToSentenseListAjax.do',
				type : 'POST',
				dataType : 'json',
				data : {
					'phase' : sourceContent
				},
				async : false,
				cache : false,
				// contentType : false,
				// contentType:"application/json"
				// processData : false, // true 序列化
				success : function(data) {
					sentenseJsonArr = data;
				},
				error : function(returndata) {
				}
			});

			var sentenseSize = sentenseJsonArr.length;

			// 调用蒙版, 编辑原文
			hidemask.showHideMask($('[hidemask]'), operatebox);
		},
		testMenu2 : function() {
			alert('testMenu2');
		},
		reLoadOnSourceOneContent : function() {
			alert('reLoadOnSourceOneContent');
		}
	}

	// 定义菜单
	// 菜单列表
	var rightMenuList = {
		// 原文菜单列表
		sourceMenuList : [ {
			'text' : '编辑',
			'fun' : menuFunction.showHideMask_operate,
		}, {
			'text' : '主菜单2',
			'fun' : menuFunction.testMenu2,
		} ],
		// 译文菜单列表
		translatedMenuList : [ {
			'text' : '编辑译文',
			'fun' : menuFunction.showHideMask_operate,
		}, {
			'text' : '主菜单2',
			'fun' : menuFunction.testMenu2,
		} ],

		// 漂浮窗==文件列表右键菜单
		fileListMenuList : [ {
			'text' : '重新加载原文(单篇文章)',
			'fun' : menuFunction.reLoadOnSourceOneContent,
		}, {
			'text' : '关闭翻译界面',
			'fun' : menuFunction.testMenu2,
		} ]
	}

	// 初始化菜单
	function initMenu(rightMenuBusinessManager) {

		// 原文菜单面板
		rightMenuBusinessManager.sourceMenu = rightMenuBusinessManager.sourceMenu || rightMenu.createMenu(rightMenuList.sourceMenuList);
		// 译文菜单面板
		rightMenuBusinessManager.translatedMenu = rightMenuBusinessManager.translatedMenu || rightMenu.createMenu(rightMenuList.translatedMenuList);
		// 文件列表右键菜单面板
		rightMenuBusinessManager.fileListMenu = rightMenuBusinessManager.fileListMenu || rightMenu.createMenu(rightMenuList.fileListMenuList);

	}

	RightMenuBusinessManager.fn = RightMenuBusinessManager.prototype = {
		constructor : RightMenuBusinessManager,

		init : function() {

			// 初始化菜单
			initMenu(this);
		}
	}

	RightMenuBusinessManager.fn.init.prototype = RightMenuBusinessManager.fn;

	return RightMenuBusinessManager;
})($, window);