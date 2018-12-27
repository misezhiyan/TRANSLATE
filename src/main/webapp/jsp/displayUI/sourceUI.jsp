<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!-- 原文界面 -->
<script type="text/javascript" src="${jsRoot }/displayUI/SourceUI.js"></script>
<!-- 
<div ui="source">原文展示面板</div>
 -->
<script type="text/javascript">
	$(function() {
		$("#loadOn").click(function() {
			loadOn();
		});
	})
</script>
