<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<link rel="stylesheet" href="${cssRoot }/rightmenu/rightmenu.css" type="text/css">
<script type="text/javascript" src="${jsRoot }/common/jquery.tmpl.min.js"></script>
<!-- 
<script type="text/javascript" src="${jsRoot }/rightmenu/RightMenuBusiness.js"></script>
 -->
<script type="text/javascript" src="${jsRoot }/rightmenu/RightMenu.js"></script>
<script type="text/javascript" src="${jsRoot }/rightmenu/RightMenuBusinessManager.js"></script>

<div menuspinner style='display: none'></div>

<script type="text/javascript">
	document.oncontextmenu = function() {
		return false;
	}
</script>
<script type="text/javascript">
	// 右键菜单基础功能类
	var rightMenu = rightMenu || RightMenu();
	// 右键菜单业务类
	var rightMenuBusinessManager = rightMenuBusinessManager || RightMenuBusinessManager();
</script>
<!-- 
<script type="text/javascript">
	var fileListMenu = rightMenuBusinessManager.fileListMenu;
	$('[menuspinner]').html(fileListMenu);
	$('[menuspinner]').find('.menu').show();
</script>
 -->