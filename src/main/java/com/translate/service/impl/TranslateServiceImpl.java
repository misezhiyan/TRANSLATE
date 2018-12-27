package com.translate.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.translate.dao.TranslateDao;
import com.translate.po.frame.Sentense;
import com.translate.service.TranslateService;
import com.translate.util.TranslateUtil;
import com.translate.util.common.PunctuationUtil;
import com.translate.util.common.StringUtil;

public class TranslateServiceImpl implements TranslateService {

	private TranslateDao translateDao;

	public TranslateDao getTranslateDao() {

		return translateDao;
	}

	public void setTranslateDao(TranslateDao translateDao) {

		this.translateDao = translateDao;
	}

	@Override
	public List<String> translateSentense(String sentense) {

		return translateDao.translateSentense(sentense);
	}

	@Override
	public List<String> translateSentenseInit(String sentense) throws Exception {

		// 2.句子翻译不存在 == 句子拆分单词, 找出生词, 初始化生词, 拼接翻译

		String formmatSentense = formmatSentense(sentense);

		String[] wordArr = formmatSentense.split(" ");

		// 初始化生词
		for (String wordT : wordArr) {
			int count = translateDao.isOld(wordT);
			if (count > 0)
				continue;
			// 初始化生词
			// int countInit = initWord(wordT);
			initWord(wordT);
		}

		// 拼接语句翻译
		String result = "";
		for (String wordT : wordArr) {

			List<String> resultList = translateDao.translate(wordT);
			// 获取到了翻译结果
			if (!StringUtil.isEmpty(resultList)) {
				String transRes = getDefault(resultList);
				result += transRes;
			}
			// 未获取到翻译结果
			else {
				result += "<font color='red'>" + wordT + ":没有获取到翻译结果<font>";
			}

		}

		List<String> resultList = new ArrayList<String>();
		resultList.add(result);

		return resultList;
	}

	private String getDefault(List<String> resultList) {

		String result = resultList.get(0);

		return result;
	}

	// 初始化生词
	private int initWord(String word) throws Exception {

		// 读取配置, 获取初始化来源配置

		// translateDao.initialFrom(1);
		// String result = TranslateUtil.translate("en", "zh", word);

		// 保存翻译结果
		Map<String, String> params_saveTranslateWord = new HashMap<String, String>();

		int count = translateDao.saveTranslateWord(params_saveTranslateWord);

		return count;
	}

	// 格式化内容
	private String formmatSentense(String sentense) {

		String result = sentense;

		// 多余
		while (result.contains("\r\n"))
			result = result.replace("\r\n", " ");
		while (result.contains("		"))
			result = result.replace("		", " ");
		while (result.contains("  "))
			result = result.replace("  ", " ");

		// 开头
		while (result.startsWith(" "))
			result = result.substring(1);
		while (result.startsWith("	"))
			result = result.substring(1);
		while (result.startsWith("\r\n"))
			result = result.substring(2);
		// 结尾
		while (result.endsWith(" "))
			result = result.substring(0, result.length() - 1);
		while (result.endsWith("	"))
			result = result.substring(0, result.length() - 1);
		while (result.endsWith("\r\n"))
			result = result.substring(0, result.length() - 2);

		return result;
	}

	@Override
	public List<Sentense> ajaxPhaseTranslate(String phase) {

		// 1.查找本地译文
		// 2.没有本地译文, 通过百度翻译获取译文

		// 拆解段落到句子原文
		List<Sentense> sentenseList = phaseSplit(phase);

		for (Sentense sentense : sentenseList) {
			// 查找本地译文--按句
			List<Map<String, String>> localSntenseTranslate = translateDao.localSntenseTranslate(sentense);

			// 没有本地译文, 通过百度翻译获取译文
			if (StringUtil.isEmpty(localSntenseTranslate)) {
				System.out.println("百度翻译获取译文");
				List<String> baiduResult = baiduSntenseTranslate(sentense);
				sentense.setResult(baiduResult);
			} else {
				List<String> localResult = analyzeLocalResult(localSntenseTranslate);
				sentense.setResult(localResult);
			}
		}

		// 解析结果, 产生默认翻译结果

		return sentenseList;
	}

	private List<String> baiduSntenseTranslate(Sentense sentense) {

		String source = sentense.getSource();
		String baiduResult = null;
		try {
			baiduResult = TranslateUtil.baiduTranslate("ENGLISH", "CHINESE", source);
		} catch (Exception e) {
			e.printStackTrace();
		}

		baiduResult = analyzeBaiduResult(baiduResult);

		List<String> resultList = new ArrayList<String>();
		resultList.add(baiduResult);

		return resultList;
	}

	private List<String> analyzeLocalResult(List<Map<String, String>> localSntenseTranslate) {

		return new ArrayList<String>();
	}

	private String analyzeBaiduResult(String baiduResult) {

		// TODO
		// {
		// "from": "en",
		// "to": "zh",
		// "trans_result": [{
		// "src": "1.",
		// "dst": "1\u3002"
		// }
		// ]
		// }
		// {"error_code":"58001","error_msg":"INVALID_TO_PARAM"}

		JSONObject baiduResultJson = JSONObject.parseObject(baiduResult);

		String error_code = baiduResultJson.getString("error_code");
		if (!StringUtil.isEmpty(error_code)) {
			baiduResult = "<font color='red'>没有获取到翻译结果</font>";
		}

		JSONArray baiduResultJsonArray = baiduResultJson.getJSONArray("trans_result");

		String transResult = "";
		for (int i = 0; i < baiduResultJsonArray.size(); i++) {
			JSONObject iJson = baiduResultJsonArray.getJSONObject(i);
			String dst = iJson.getString("dst");
			transResult += dst + "\r\n";
		}
		transResult = transResult.substring(0, transResult.length() - 4);

		return transResult;
	}

	private List<Sentense> phaseSplit(String phase) {

		// 转换标点符号
		phase = PunctuationUtil.exchangePuctuationToLanguage(phase, "ENGLISH");
		// 根据断句标点符号断句
		List<Sentense> sentenseList = PunctuationUtil.splitPhaseToSentenseList(phase);

		return sentenseList;
	}

	@Override
	public List<Sentense> phaseSplitToSentenseListAjax(String phase) {
		return phaseSplit(phase);
	}

}
