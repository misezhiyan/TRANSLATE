<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript" src="${jsRoot }/punctuation.js"></script>

<div id="punctuation" style="height: 200px; width: 200px; position: absolute; background-color: #E10900">${jsRoot }/punctuation.js</div>

<script type="text/javascript">
	function testPunctu() {
		var isPunctu = isPuntuation(',');
		alert(isPunctu);
	}
</script>
