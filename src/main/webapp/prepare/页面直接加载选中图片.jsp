<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
</head>
<body>
	请选取一个图像文件:
	<input type="file" id="file" name="file" />
	<div id="result"></div>
</body>
<script type="text/javascript">
	function ProcessFile(e) {
		var file = document.getElementById('file').files[0];
		if (file) {
			var reader = new FileReader();
			reader.onload = function(event) {
				var txt = event.target.result;//base64 文件编码
				var img = document.createElement("img");
				img.src = txt;
				document.getElementById("result").appendChild(img);
			};
		}
		reader.readAsDataURL(file);
	}
	function contentLoaded() {
		document.getElementById('file').addEventListener('change', ProcessFile, false);
	}
	window.addEventListener("DOMContentLoaded", contentLoaded, false);
</script>
</html>