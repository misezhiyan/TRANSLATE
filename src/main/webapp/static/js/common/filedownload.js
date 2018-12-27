var fileDownloadManager = (function($, win) {
	// 构造方法
	var fileDownloadManager = fileDownloadManager || function() {

		return new fileDownloadManager.fn.init();
	}

	fileDownloadManager.fn = fileDownloadManager.prototype = {
		constructor : fileDownloadManager,
		init : function() {
			this.download = function(url, params) {
				this.postDownloadFile(url, params);
			}
		},
		// 译文界面展示全部译文
		postDownloadFile : function(url, params) {
			var xhr = new XMLHttpRequest();
			xhr.responseType = "blob"; // 返回类型blob
			xhr.onload = function() {
				if (this.status === 200) {
					var name = xhr.getResponseHeader("Content-disposition");
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
			// //post 直接调用后台
			// request.send();

			// post添加参数
			var form = new FormData();
			for ( var param in params) {
				form.append(param, params[param]);
			}

			xhr.open("POST", url);
			xhr.send(form);
		}
	}

	fileDownloadManager.fn.init.prototype = fileDownloadManager.fn;

	return fileDownloadManager;
})($, window);
