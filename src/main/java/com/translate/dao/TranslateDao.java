package com.translate.dao;

import java.util.List;
import java.util.Map;

import com.translate.po.frame.Sentense;

public interface TranslateDao {

	List<String> translateSentense(String sentense);

	int isOld(String wordT);

	int saveTranslateWord(Map<String, String> params_saveTranslateWord);

	List<String> translate(String wordT);

	List<Map<String, String>> localSntenseTranslate(Sentense sentense);

}
