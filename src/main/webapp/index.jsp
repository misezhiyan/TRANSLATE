<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<c:import url="/jsp/base/base.jsp"></c:import>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>index</title>
<script type="text/javascript" src="${jsRoot }/common/jquery-3.3.1/jquery-3.3.1.min.js"></script>
</head>
<body>
	<br>
	<br>
	<!-- 漂浮窗 -->
	<c:import url="/jsp/floatwindow/floatwindow.jsp"></c:import>
	<!-- 快捷键 -->
	<c:import url="/jsp/accelerators/accelerators.jsp"></c:import>
	<!-- 界面蒙版
	-->
	<c:import url="/jsp/hidemask/hidemask.jsp"></c:import>

	<!-- post文件下载功能 -->
	<c:import url="/jsp/filedownload/filedownload.jsp"></c:import>
	
	<!-- 右键菜单 -->
	<c:import url="/jsp/rightmenu/rightMenu.jsp"></c:import>

	<!-- 操作界面-->
	<c:import url="/jsp/displayUI/file_content.jsp"></c:import>
	

	<!-- 多次点击事件 
	<c:import url="/jsp/threeclick/threeClick.jsp"></c:import>
	-->
	<!-- 标点符号测试区 
	<c:import url="/jsp/punctuation/punctuation.jsp"></c:import>
	-->

	<c:forEach var="i" begin="1" end="20" step="1">
		<br>
	</c:forEach>


</body>
</html>