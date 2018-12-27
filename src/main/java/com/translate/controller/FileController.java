package com.translate.controller;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.translate.util.common.StringUtil;

/**
 * @discription 文件下载
 * @author kimmy
 * @date 2018年12月20日 上午9:40:52
 */
public class FileController extends MultiActionController {

	public void fileDownLoad(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {

		// 内容
		String content = request.getParameter("content");
		// 文件名
		String fileName = request.getParameter("fileName");
		Integer index = fileName.lastIndexOf(".");
		if (index != -1)
			fileName = fileName.substring(0, index);
		String filename = fileName + ".transelate";

		InputStream fis = new ByteArrayInputStream(content.getBytes());

		String encode = request.getCharacterEncoding();
		encode = StringUtil.isEmpty(encode) ? "GBK" : encode;

		try {

			byte[] buffer = readInputStream(fis);
			if (null != buffer && buffer.length > 0) {
				// 清空response
				response.reset();
				// 设置response的Header
				response.setCharacterEncoding("UTF-8");
				response.setContentType("application/octet-stream");

				String ContentDisposition = "attachment;filename=" + URLEncoder.encode(filename, "UTF-8");
				response.addHeader("Content-Disposition", ContentDisposition);
				response.addHeader("Content-Length", "" + buffer.length);

				OutputStream toClient = response.getOutputStream();
				toClient.write(buffer);
				toClient.flush();
				toClient.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		//
		// String url = "C:\\Users\\Administrator\\Desktop\\pic\\safeCodeImg.png";
		//
		// // 取得文件的后缀名。
		// File file = new File(url);
		// String filename = "safeCodeImg1.png";
		// InputStream fis;
		// try {
		// fis = new FileInputStream(file);
		//
		// byte[] buffer = readInputStream(fis);
		// if (null != buffer && buffer.length > 0) {
		// // 清空response
		// response.reset();
		// // 设置response的Header
		// response.addHeader("Content-Disposition", "attachment;filename=" + new String((filename).getBytes("GBK"), "ISO8859_1"));
		// response.addHeader("Content-Length", "" + buffer.length);
		// OutputStream toClient = response.getOutputStream();
		// response.setContentType("application/octet-stream");
		// toClient.write(buffer);
		// toClient.flush();
		// toClient.close();
		// }
		// } catch (Exception e) {
		// e.printStackTrace();
		// }

	}

	private byte[] readInputStream(InputStream fis) throws IOException {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int len = 0;
		while ((len = fis.read(buffer)) != -1) {
			outStream.write(buffer, 0, len);
		}
		fis.close();
		return outStream.toByteArray();
	}

}
