// 菜单列表
// 原文菜单列表
this.sourceMenuList = this.sourceMenuList || [ {
	'text' : '编辑',
	'fun' : showHideMask_operate,
}, {
	'text' : '主菜单2',
	'fun' : testMenu2,
} ]
// 译文菜单列表
this.translatedMenuList = this.translatedMenuList || [ {
	'text' : '编辑译文',
	'fun' : showHideMask_operate,
}, {
	'text' : '主菜单2',
	'fun' : testMenu2,
} ]

// 漂浮窗==文件列表右键菜单
this.fileListMenuList = this.fileListMenuList || [ {
	'text' : '重新加载原文(单篇文章)',
	'fun' : reLoadOnSourceOneContent,
}, {
	'text' : '关闭翻译界面',
	'fun' : testMenu2,
} ]

// function createOneKindMenu(menuList) {
// // 菜单容器
// var menuContainer = $('#menuContainer');
// // 创建菜单面板
// var menuspinner = menuspinner || rightMenu.createMenu(menuList);
// // 放入容器
// $(menuContainer).append($(menuspinner));
//
// return menuspinner;
// }

// 展示编辑蒙版操作层
function showHideMask_operate(sourceParams) {
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
	alert(sentenseSize);

	// 调用蒙版, 编辑原文
	hidemask.showHideMask($('[hidemask]'), operatebox);
}
function testMenu2() {
	alert('testMenu2');
}