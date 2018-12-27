package com.translate.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import com.alibaba.fastjson.JSONObject;
import com.translate.po.frame.Sentense;
import com.translate.service.TranslateService;
import com.translate.util.common.StringUtil;

public class TranslateController extends MultiActionController {

	private TranslateService translateService;

	public TranslateService getTranslateService() {
		return translateService;
	}

	public void setTranslateService(TranslateService translateService) {
		this.translateService = translateService;
	}

	public ModelAndView test(HttpServletRequest request, HttpServletResponse response) {

		return new ModelAndView("test");
	}

	/**
	 * @discription ajax 获取文件或者文件夹中文件的内容
	 * @author kimmy
	 * @date 2018年11月7日 下午2:17:19
	 */
	public ModelAndView ajaxFileContent(HttpServletRequest httpRequest, HttpServletResponse response) throws IllegalStateException, IOException {

		// 文件内容
		List<JSONObject> contentList = new ArrayList<JSONObject>();
		if (httpRequest instanceof MultipartHttpServletRequest) {

			MultipartHttpServletRequest request = (MultipartHttpServletRequest) httpRequest;
			// 一个input 传多个文件
			List<MultipartFile> fileList = request.getFiles("file");

			// Integer size = fileList.size();
			// System.out.println(size);

			// 读取文件编码
			String characterEncoding = request.getCharacterEncoding();
			characterEncoding = "GBK";
			for (MultipartFile file : fileList) {

				String content = "";
				InputStream inputStream = file.getInputStream();

				String line; // 用来保存每行读取的内容
				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, characterEncoding));
				line = reader.readLine(); // 读取第一行
				while (line != null) { // 如果 line 为空说明读完了

					content += line + "\r\n";

					line = reader.readLine(); // 读取下一行
				}
				reader.close();
				inputStream.close();

				// 文件名称
				String originalFilename = file.getOriginalFilename();

				// 内容封装
				JSONObject fileJson = new JSONObject();
				fileJson.put("fileName", originalFilename);
				fileJson.put("fileContent", content);

				contentList.add(fileJson);
			}
		}
		response.getWriter().write(contentList.toString());
		return null;
	}

	// 初始化文章---初始化陌生词
	public void contentInitial(HttpServletRequest request, HttpServletResponse response) throws IllegalStateException, IOException {

		// jsonObject.toJSONStringWithDateFormat(resultList, "yyyy-MM-dd HH:mm:ss");
		// response.getWriter().write(result);
	}

	// 按句获取翻译内容
	public void translateSentense(HttpServletRequest request, HttpServletResponse response) throws Exception {

		String sentense = request.getParameter("sentense");

		// String result = "[]";
		String result = "测试翻译结果";
		if (!StringUtil.isEmpty(sentense)) {
			// 句子直接匹配
			List<String> resultList = translateService.translateSentense(sentense);

			// 1.句子翻译已存在 == 直接翻译
			// 2.句子翻译不存在 == 句子拆分单词, 找出生词, 初始化生词, 拼接翻译
			if (StringUtil.isEmpty(resultList)) {

				resultList = translateService.translateSentenseInit(sentense);
			}
			JSONObject jsonObject = new JSONObject();
			result = jsonObject.toJSONStringWithDateFormat(resultList, "yyyy-MM-dd HH:mm:ss");

		}

		response.getWriter().write(result);
	}

	// 段落翻译
	public void ajaxPhaseTranslate(HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();

		// 原文
		String phase = request.getParameter("phase");
		// 译文
		List<Sentense> setenseList = translateService.ajaxPhaseTranslate(phase);
		if (!StringUtil.isEmpty(setenseList)) {

			resultMap.put("setenseList", setenseList);
			resultMap.put("status", "1");// 获取成功
		} else {

			resultMap.put("status", "0");// 获取失败
		}

		JSONObject jsonObject = new JSONObject();
		String result = jsonObject.toJSONStringWithDateFormat(resultMap, "yyyy-MM-dd HH:mm:ss");

		response.getWriter().write(result);
	}

	// 段落分句
	public void phaseSplitToSentenseListAjax(HttpServletRequest request, HttpServletResponse response) throws IOException {

		// 段落
		String phase = request.getParameter("phase");
		// 句子
		List<Sentense> setenseList = translateService.phaseSplitToSentenseListAjax(phase);

		JSONObject jsonObject = new JSONObject();
		String result = jsonObject.toJSONStringWithDateFormat(setenseList, "yyyy-MM-dd HH:mm:ss");

		response.getWriter().write(result);
	}
}
