<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<c:import url="/jsp/base/base.jsp"></c:import>
<script type="text/javascript" src="${jsRoot }/common/jquery-3.3.1/jquery-3.3.1.min.js"></script>
</head>
<body>
	<br>
	<br>
	<button onclick='downloadfile_post()'>点击下载</button>
	<a href='https://dz.80txt.com/13001/三寸人间.zip'>三寸人间下载</a>

	<br>
	<button onclick='download1("itdouzi.txt", "使用js下载www.itdouzi.com")'>下载1</button>
	<button onclick='download2("itdouzi.txt", "使用js下载www.itdouzi.com")'>下载2</button>
</body>
<c:import url="/jsp/base/base.jsp"></c:import>
<script type="text/javascript">
	//下载文件
	function downloadfile_post() {

		var downloadURL = $('#webRoot').val() + '/file/fileDownLoad.do?content=' + 'this is a test content测试中文' + '&fileName=' + '翻译逻辑.txt';

		var request = new XMLHttpRequest();
		request.open("POST", downloadURL);
		request.responseType = "blob"; // 返回类型blob
		request.onload = function() {
			if (this.status === 200) {
				var name = request.getResponseHeader("Content-disposition");
				name = decodeURI(name);
				var filename = name.substring(20, name.length);
				var blob = this.response;
				var reader = new FileReader();
				reader.readAsDataURL(blob);
				reader.onload = function(e) {
					var a = document.createElement('a');
					a.download = filename;
					a.href = e.target.result;
					$("body").append(a);
					a.click();
					$(a).remove();
				}
			}
		}
		request.send();
	}
</script>

<script type="text/javascript" src="${jsRoot }/common/jquery-3.3.1/jquery-3.3.1.min.js"></script>
<!-- 下载1 -->
<script type="text/javascript">
	function fake_click(obj) {
		var ev = document.createEvent("MouseEvents");
		ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		obj.dispatchEvent(ev);
	}
	function download1(name, data) {
		alert(name);
		var urlObject = window.URL || window.webkitURL || window;
		var downloadData = new Blob([ data ]);
		var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
		save_link.href = urlObject.createObjectURL(downloadData);
		save_link.download = name;
		fake_click(save_link);
	}
</script>
<!-- 下载2 -->
<script type="text/javascript">
	function download2(strRemoteURL, strLocalURL) {
		window.open($(webRoot).val() + "/file/fileDownLoad.do");
	}
</script>
</html>