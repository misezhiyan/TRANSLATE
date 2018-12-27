<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%
	String webRoot = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
	String jspRoot = webRoot + "/jsp";
	String jsRoot = webRoot + "/static/js";
	String cssRoot = webRoot + "/static/css";
	request.setAttribute("webRoot", webRoot);
	request.setAttribute("jsRoot", jsRoot);
	request.setAttribute("cssRoot", cssRoot);
%>
<input type="hidden" id='webRoot' value='${webRoot}'>
<input type="hidden" id='jsRoot' value='${jsRoot}'>