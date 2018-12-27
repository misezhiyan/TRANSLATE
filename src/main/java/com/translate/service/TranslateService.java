package com.translate.service;

import java.util.List;

import com.translate.po.frame.Sentense;

public interface TranslateService {

	List<String> translateSentense(String sentense);

	List<String> translateSentenseInit(String sentense) throws Exception;

	List<Sentense> ajaxPhaseTranslate(String phase);

	List<Sentense> phaseSplitToSentenseListAjax(String phase);

}
