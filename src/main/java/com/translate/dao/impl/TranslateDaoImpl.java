package com.translate.dao.impl;

import java.util.List;
import java.util.Map;

import com.translate.dao.TranslateDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.frame.Sentense;

public class TranslateDaoImpl implements TranslateDao {

	private QueryDao queryDao;
	private UpdateDao updateDao;

	public QueryDao getQueryDao() {
		return queryDao;
	}

	public void setQueryDao(QueryDao queryDao) {
		this.queryDao = queryDao;
	}

	public UpdateDao getUpdateDao() {
		return updateDao;
	}

	public void setUpdateDao(UpdateDao updateDao) {
		this.updateDao = updateDao;
	}

	@Override
	public List<String> translateSentense(String sentense) {

		return queryDao.selectList("com.translate.po.db.mapper.translateMapper.translateSentense", sentense);
	}

	@Override
	public int isOld(String wordT) {

		return queryDao.selectOne("com.translate.po.db.mapper.translateMapper.isOld", wordT);
	}

	@Override
	public int saveTranslateWord(Map<String, String> params_saveTranslateWord) {

		return updateDao.insert("com.translate.po.db.mapper.translateMapper.saveTranslateWord", params_saveTranslateWord);
	}

	@Override
	public List<String> translate(String wordT) {

		return queryDao.selectList("com.translate.po.db.mapper.translateMapper.translate", wordT);
	}

	@Override
	public List<Map<String, String>> localSntenseTranslate(Sentense sentense) {

		return queryDao.selectList("com.translate.po.db.mapper.translateMapper.localSntenseTranslate", sentense);
	}

}
