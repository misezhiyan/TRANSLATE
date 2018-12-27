<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html>
<head>
<c:import url="/jsp/base/base.jsp"></c:import>
<script type="text/javascript" src="${jsRoot }/common/jquery-3.3.1/jquery-3.3.1.min.js"></script>
</head>
<body>
	<c:forEach begin="1" end="52">
		<br />
	</c:forEach>
	<div id='show'></div>
	<div>
		<button onclick='testScroll()'>测试高度</button>
		<button onclick='resetScroll()'>重置滚动条位置</button>
	</div>
</body>
<script type="text/javascript">
	function resetScroll() {

		if (document.documentElement && document.documentElement.scrollTop) {
			document.documentElement.scrollTop = 100;
		} else if (document.body) {
			document.body.scrollTop = 100;
		}
	}
	function testScroll() {

		// 窗口可视范围的高度
		var height = getClientHeight();
		// 窗口滚动条高度
		var theight = getScrollTop();
		// 窗口可视范围的高度
		var rheight = getScrollHeight();
		// 滚动条距离底部的高度
		var bheight = rheight - theight - height;

		document.getElementById('show').innerHTML = '此时浏览器可见区域高度为：' + height + '<br />此时文档内容实际高度为：' + rheight + '<br />此时滚动条距离顶部的高度为：' + theight + '<br />此时滚动条距离底部的高度为：' + bheight;
	}
</script>
<script type="text/javascript">
	window.onscroll = function() {
		// 窗口可视范围的高度
		var height = getClientHeight();
		// 窗口滚动条高度
		var theight = getScrollTop();
		// 窗口可视范围的高度
		var rheight = getScrollHeight();
		// 滚动条距离底部的高度
		var bheight = rheight - theight - height;

		document.getElementById('show').innerHTML = '此时浏览器可见区域高度为：' + height + '<br />此时文档内容实际高度为：' + rheight + '<br />此时滚动条距离顶部的高度为：' + theight + '<br />此时滚动条距离底部的高度为：' + bheight;
	}
</script>
<script>
	//获取窗口可视范围的高度
	function getClientHeight() {
		var clientHeight = 0;
		if (document.body.clientHeight && document.documentElement.clientHeight) {
			var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
		} else {
			var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
		}
		return clientHeight;
	}
	//获取窗口滚动条高度
	function getScrollTop() {
		var scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	}
	//获取文档内容实际高度
	function getScrollHeight() {
		return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	}
</script>
</html>