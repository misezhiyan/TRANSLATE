<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 文件容器 -->
<script type="text/javascript" src="${jsRoot }/content/Content.js"></script>
<script type="text/javascript" src="${jsRoot }/content/ContentMap.js"></script>
<!-- 界面控制器 -->
<script type="text/javascript" src="${jsRoot }/displayUI/UIManager.js"></script>
<script type="text/javascript" src="${jsRoot }/displayUI/UIHead.js"></script>

<!-- 文章容器渲染 -->
<link rel="stylesheet" type="text/css" href="${cssRoot }/displayUI/ContentContainer.css">

<div id="file_content_div" class='file_content_container'>
	<!-- 界面头 -->
	<jsp:include page="uiHead.jsp" flush="true" />
	<!-- 原文展示界面 -->
	<jsp:include page="sourceUI.jsp" flush="true" />
	<!-- 翻译操作界面 -->
	<jsp:include page="translateoperatorUI.jsp" flush="true" />
</div>

<script type="text/javascript">
	//初始化界面控制器
	var uiManager = uiManager || UIManager();
	//加载文章
	function loadOn() {
		if ($('#file_content_div').is(':hidden'))
			$('#file_content_div').show();

		// 获取文件内容  formId
		var fileInput = $('#rel_div').find('input[type=file]');
		if('' == fileInput.val()){
			alert('请选择文件');
			return;
		}
		
		var fileJsonArr = uiManager.loadOnAjax(fileInput);
		// 加入源列表, 并获得文章 ID 及内容
		var currentArray = uiManager.addContentJsonList(fileJsonArr);
		// 展示到文章列表
		var aticleDisplayElement = $('[fileInputList]').find('.small_area');
		uiManager.addUsingContentList(currentArray, aticleDisplayElement, fileInput);
		// 展示到原文展示界面
		uiManager.displayInUI(currentArray, $('#file_content_div'));
		
		//置空文件input
		fileInput.val('');
	}
	//重新加载原文--单篇文章
	function reLoadOnSourceOneContent(contentId) {
		//容器
		var fileInputListContainer = $('[fileInputList]');
		//获取文章
		var content = uiManager.reLoadOnSourceOneContent(contentId);
		var contentElement = $('#file_content_div').find('[contentid=' + contentId + ']');
		//源文界面
		var sourceElement = contentElement.find('[ui=source]');
		sourceElement.html(content.content);
		//译文界面
		var translateoperatorElement = contentElement.find('[ui=translateoperator]');
		sourceElement.remove();
		//触发头文件点击
		var contentHead = $('#file_content_div').find('[uihead]').find('[contenthead=' + contentId + ']');
		contentHead.click();
	}
	//重新加载原文--单次提交
	function reLoadOnSourceOneSubmit() {
		//容器
		var fileInputListContainer = $('[fileInputList]');
		//遍历单次
		fileInputListContainer.find('div').each(function() {
			//$(this).find('input[type=file][sbmclick]');
		})
	}
	//重新加载文件
	function reLoadOnFileOneFile() {

	}
	//重新加载文件
	function reLoadOnFileOneSubmit() {

	}
</script>
