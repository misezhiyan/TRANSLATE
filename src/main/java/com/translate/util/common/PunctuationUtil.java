package com.translate.util.common;

import java.util.ArrayList;
import java.util.List;

import com.translate.po.frame.Sentense;
import com.translate.po.funcenum.Punctuation;

/**
 * @discription
 * @author kimmy
 * @date 2018年12月12日 下午2:03:33
 */
public class PunctuationUtil {

	// 标点符号转到指定语言类型
	public static String exchangePuctuationToLanguage(String phase, String language) {

		return Punctuation.exchangePuctuation(phase, language);
	}

	// 根据断句符号进行断句
	public static List<Sentense> splitPhaseToSentenseList(String phase) {

		// 获取断句符号
		List<String> punctuationSymbolList = Punctuation.getPunctuationsSentenseSplit_symbol("ENGLISH");

		List<Sentense> sentenseList = phaseSplitToSentenseList(phase, punctuationSymbolList);

		return sentenseList;
	}

	// 断句
	private static List<Sentense> phaseSplitToSentenseList(String phase, List<String> punctuationSymbolList) {

		List<Sentense> sentenseList = new ArrayList<Sentense>();

		String oneSentenseContent = "";
		for (int i = 0; i < phase.length(); i++) {
			char puncChar = phase.charAt(i);
			// 组合当句
			oneSentenseContent += "" + puncChar;
			// 遇到断句点
			if (punctuationSymbolList.contains("" + puncChar)) {
				Sentense sentense = new Sentense();
				sentense.setSource(oneSentenseContent);
				oneSentenseContent = "";
				sentenseList.add(sentense);
				continue;
			}
		}
		// 尾句
		if (!StringUtil.isEmpty(oneSentenseContent)) {
			Sentense sentense = new Sentense();
			sentense.setSource(oneSentenseContent);
			sentenseList.add(sentense);
		}

		return sentenseList;
	}

}
