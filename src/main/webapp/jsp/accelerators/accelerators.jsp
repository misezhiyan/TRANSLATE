<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>


<!-- 翻译操作界面 -->
<script type="text/javascript" src="${jsRoot }/accelerators/Accelerators.js"></script>



<script type="text/javascript">
	//快捷键控制器
	var accelerators = accelerators || Accelerators();
	//加载完成, 启用外层快捷键
	accelerators.useAcceleratorCommon();
</script>