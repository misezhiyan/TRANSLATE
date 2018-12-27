<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="${cssRoot }/hidemask/hidemask.css">

<script type="text/javascript" src="${jsRoot }/hidemask/HideMask.js"></script>

<div hidemaskcontainer>
	<!-- 
	<div>
		<button id="openHideMask">打开蒙版</button>
	</div>
 	-->
	<div operatebox="translate">
		<div style="display: none">翻译界面操作层</div>
		<div operateContainer="sourceSplitToSentense" style="margin-top: 25px; display: none" contenteditable="true">
			<div>分句操作</div>
		</div>
		<div operateContainer="translate" style="margin-top: 25px;">
			<div style="display: none">翻译操作</div>
		</div>
		<button closeHideMask>关闭</button>
	</div>

	<div hidemask>
		<div style="display: none">蒙版</div>
	</div>
</div>

<script>
	var hidemask = hidemask || HideMask();
	$('#openHideMask').click(function() {

		hidemask.showHideMask($('[hidemask]'), $('[operatebox]'));
	})
	$('[closeHideMask]').click(function() {
		hidemask.removeHideMask($('[hidemask]'), $('[operatebox]'));
	})
</script>
