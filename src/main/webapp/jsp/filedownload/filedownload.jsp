<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script type="text/javascript" src="${jsRoot }/common/filedownload.js"></script>

<script type="text/javascript">
	var filedownload = filedownload || fileDownloadManager();
	function downloadDemo() {
		//路径
		var downloadURL = $('#webRoot').val() + '/file/fileDownLoad.do';
		//后台参数
		var contentRelated = {
			fileName : '文件名称',
			content : '文章内容'
		}
		//调用
		filedownload.download(downloadURL, contentRelated);
	}
</script>
