$(function() {
	// 上传input
	var fileInputArr = $('input[type=file]');
	$(fileInputArr).each(function() {
		// 获取参数
		var title = $(this).attr('title');
		var sbmtitle = $(this).attr('sbmtitle');
		// 上传路径
		var sbmclick = $(this).attr('sbmclick');
		// 获取css
		var width = $(this).attr('width');

		// 放入div
		var div = document.createElement('div');

		// 转换css
		$(div).css('width', width);

		// 选择文件按钮
		var btnopenfile = document.createElement('button');
		$(btnopenfile).text(title);
		$(btnopenfile).css('style', 'position: relative');
		var fileInput = $(this);
		$(btnopenfile).click(function(){
			fileInput.click();
		})

		// 点击上传按钮
		var btnsubmit = document.createElement('button');
		$(btnsubmit).text(sbmtitle);
		$(btnsubmit).css('style', 'position: absolute');
		$(btnsubmit).click(function(){
			var sbmclick_func = eval(sbmclick);
			//new sbmclick_func();
			sbmclick_func();
		})

		// 节点位置更迭
		$(this).before($(div));
		$(this).appendTo($(div));

		$(btnopenfile).appendTo($(div));
		$(btnsubmit).appendTo($(div));

		// $(this).css('display', 'inline-block')
	})
})