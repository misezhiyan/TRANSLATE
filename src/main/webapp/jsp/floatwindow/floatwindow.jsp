<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" type="text/css" href="${cssRoot }/translate_content.css" />
<link rel="stylesheet" type="text/css" href="${cssRoot }/floatwindow/float_div.css">

<div id="rel_div" style="width: 250px; z-index: 100px; position: absolute; right: 20px; float: right; background: #eea;">
	<div class="float_title">功能漂浮窗</div>
	<div class="float_area">
		<div>
			<div class="small_title">文件上传域</div>
			<div class="small_area">
				添加新文件:
				<input type="file" name="file" width="100%" title="多选文件" sbmtitle="加载" sbmclick=loadOn multiple="multiple">
			</div>
		</div>
		<div fileInputList>
			<div class="small_title">文件列表</div>
			<div class="small_area"></div>
		</div>
		<div>
			<div class="small_title">配置</div>
			<div class="small_area">
				<div>翻译模式</div>
				<div>
					<input type="radio" name="transMode" value="0" checked>
					读取文件同时翻译
					<br>
					<input type="radio" name="transMode" value="1">
					手动翻译
				</div>
				<div>格式化模式</div>
				<div>
					<input type="radio" name="formatMode" value="0" checked>
					比对 模式
					<br>
					<input type="radio" name="formatMode" value="1">
					原文格式化 模式
					<br>
					<input type="radio" name="formatMode" value="2">
					译文格式化 模式
					<div></div>
				</div>
			</div>
		</div>
		<div>
			<div class="small_title">测试</div>
			<div class="small_area">
				<input type="button" onclick="test()" value="测试">
			</div>
		</div>
	</div>
</div>
<!-- 测试方法 -->
<script type="text/javascript">
	function test() {
		alert('测试');
	}
</script>
<!-- 漂浮窗跟随页面 -->
<script type="text/javascript">
	function follow() {
		$("#rel_div").css("top", $(document).scrollTop() + 20);
	};
	window.setInterval(follow, 10);
</script>
<!-- 功能区域 -->
<script type="text/javascript">
	$(function() {
		$(".small_title").click(function() {
			var small_div = $(this).parent();
			var small_area = $(small_div).find(".small_area")[0];
			if ($(small_area).is(':hidden'))
				$(small_area).show();
			else
				$(small_area).hide();
		});

		$(".small_area").hide();
	});
</script>

<!-- 配置使用 -->
<script type="text/javascript">
	//翻译模式
	var transMode = $("input:checked[name='transMode']").val();
	//格式化模式
	var formatMode = $("input:checked[name='formatMode']").val();
	//var contentTable = ContentTable(transMode, contentTable);
</script>
<!-- 文件上传 -->
<link rel="stylesheet" type="text/css" href="${cssRoot }/fileupload/fileupload.css" />
<script type="text/javascript" src="${jsRoot }/common/fileupload.js"></script>
<!-- 
<script type="text/javascript">
	$(function() {
		$('#uploadForm').find('input[type=file]').each(function() {
			this.onchange = function(){
				var content = '';
				$(this.files).each(function() {
					if (!!this) {
						//读取本地文件，以gbk编码方式输出
						var reader = new FileReader();
						reader.readAsText(this, "gbk");
						reader.onload = function() {
							//读取完毕后输出结果
							content += this.result;
							content += '<br><br>';
						};
						reader.onloadend = function() {
							//$("#output").html(content);
							//content = '';
							alert(this.result);
						}
					}
				})
			}
		})
		
	});
</script>
 -->
<!-- 

				var length = this.files.length;
				for(var i = 0;i<length;i++){
					alert(this.files[i]);
					alert(this.files[i].name);
				}
 -->