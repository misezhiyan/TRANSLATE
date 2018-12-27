<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<script type="text/javascript" src="${jsRoot }/corsur.js"></script>


<input type="text" id="testInput2" value="点击事件测试区域, this is a test" style="width: 200px" />
</br>
<input type="text" id="testInput" value="点击事件测试区域, this is a test" style="width: 200px" />
</br>
<textarea id="testArea" style="height: 50px; width: 300px; resize: none;">
this is a testArea!
</textarea>
</br>
<div id="multiclick" style="height: 200px; width: 200px; position: absolute; background-color: #1E90FF"></div>

<script type="text/javascript">
	var multiclick = document.getElementById('multiclick');

	var clickTime;//事件
	var clickNumber;//次数
	multiclick.onmousedown = function(aevent) { //设置该元素的 按下鼠标右键右键的 处理函数
		if (window.event)
			aevent = window.event; //解决兼容性
		if (aevent.button == 0) { //当事件属性button的值为2时，表用户按下了右键; 0:左键
			//当前时间
			var currentTime = new Date();
			//首次点击
			if (clickTime == undefined) {
				clickTime = new Date();
				clickNumber = 1;
				oneClick();
				return;
			}
			//点击间隔
			var timeBelong = currentTime.getTime() - clickTime.getTime();
			//单击
			if (timeBelong > 1000) {
				clickNumber = 1;
				clickTime = new Date();
				oneClick();
				return;
			}
			//多次点击
			clickNumber++;
			clickTime = new Date();
			if (clickNumber == 2) {
				doubleClick();
				return;
			}
			if (clickNumber == 3) {
				clickNumber = 0;
				treeBleClick();
				return;
			}

		}
	};

	$('#testInput').focus(function() {
		//alert('focus 生效');
		//$(this).select(1,4);
		//console.log('focus 生效');
		//this.setSelectionRange(1, 4, 'forward');
		$(this).css('background-color', 'blue');

		console.log($(this).getCursorPosition());

	});
	$('#testInput').blur(function() {
		$(this).css('background-color', '');
	});
	function oneClick() {

		var testInput = document.getElementById('testInput');
		$(testInput).focus();
		//testInput.focus;
		//testInput.setSelectionRange(1, 4, 'forward');

		//$(testInput).select();
	}
	function doubleClick() {
		//alert('oneClick');
	}
	function treeBleClick() {
		//alert('oneClick');
	}
</script>
<script type="text/javascript">
	function cursorPosition_sure(cursorPosition, content, type) {
		var length = content.length;

		if (cursorPosition < length) {
			if ('START' == type) {
				var cha = content.substring(cursorPosition - 1, cursorPosition);
				while (' ' != cha && cursorPosition > 0) {
					cursorPosition--;
					cha = content.substring(cursorPosition - 1, cursorPosition);
				}
				return cursorPosition;
			}
			if ('END' == type) {
				var cha = content.substring(cursorPosition, cursorPosition + 1);
				while (' ' != cha && cursorPosition < length) {
					cursorPosition++;
					cha = content.substring(cursorPosition, cursorPosition + 1);
				}
				return cursorPosition;
			}
		} else {
			if ('START' == type && cursorPosition > 0) {
				var cha = content.substring(cursorPosition - 1, cursorPosition);
				while (' ' != cha) {
					cursorPosition--;
					cha = content.substring(cursorPosition - 1, cursorPosition);
				}
				return cursorPosition;
			}
			if ('END' == type) {
				return cursorPosition;
			}
		}
	};
	$(function() {
		$('#testArea').click(function() {
			//内容
			var content = $(this).val();
			//光标位置
			var cursorPosition = $(this).getCursorPosition();

			var position_start = cursorPosition_sure(cursorPosition, content, 'START');
			var position_end = cursorPosition_sure(cursorPosition, content, 'END');

			this.setSelectionRange(position_start, position_end);
			//选中内容
			var choosed = element.value.substring(element.selectionStart, element.selectionEnd);
		})
	});
</script>
