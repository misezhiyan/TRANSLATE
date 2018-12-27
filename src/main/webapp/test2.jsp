<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<c:import url="/jsp/base/base.jsp"></c:import>
<script type="text/javascript" src="${jsRoot }/common/jquery-3.3.1/jquery-3.3.1.min.js"></script>
</head>

<body>
	<input value='测试焦点' />
	<input value='测试焦点2' />
	<input value='测试焦点3' />
	<div id='test4' tabindex=0>测试焦点4</div>
	<div id='test5' tabindex=0>测试焦点5</div>
	<div id='menu' tabindex=0 style='background-color: blue; display: none; height: 60px; width: 30px'>模拟菜单</div>
	<button onclick='testDivFocus()'>测试div焦点</button>
</body>
<script type="text/javascript" src="${jsRoot }/rightmenu/RightMenu.js"></script>
<script type="text/javascript">
	//快捷键控制器
	var rightMenu = rightMenu || RightMenu();
	//加载完成, 启用外层快捷键
	//rightMenu.
</script>
<script type="text/javascript">
	function testDivFocus() {
		$('#test5').focus();
	}
</script>
<script type="text/javascript">
	$('#test4').blur(function() {
		loseFocus('test4');
	})
	$('#test4').focus(function() {
		onFocus('test4');
	})
	$('#test5').blur(function() {
		loseFocus();
	})
	$('#test5').focus(function() {
		onFocus();
	})

	function loseFocus(name) {
		console.log(name + ': 失去焦点');
	}
	function onFocus(name) {
		console.log(name + ': 得到焦点');
	}
</script>
<script type="text/javascript">
	$('#test4').showrightmenu($('#menu'));
	$('#menu').focus(function() {
		console.log('菜单: 得到焦点');
		$(this).show();
		console.log(document.activeElement);
	})
	$('#menu').blur(function() {
		console.log('菜单: 失去焦点');
		$(this).hide();
		console.log(document.activeElement);
	})
</script>
</html>