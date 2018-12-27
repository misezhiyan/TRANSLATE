package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.Word_srcDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.Word_src;


public class Word_srcDaoImpl implements Word_srcDao {

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
	public Word_src selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.word_srcMapper.selectByid", id);
	}
	
	@Override
	public List<Word_src> selectList(Word_src word_src) {

		return queryDao.selectList("com.translate.po.mapper.word_srcMapper.selectList", word_src);
	}

	@Override
	public int insert(Word_src word_src) {

		return updateDao.insert("com.translate.po.mapper.word_srcMapper.insert", word_src);
	}

	@Override
	public int updateByid(Word_src word_src) {

		return updateDao.insert("com.translate.po.mapper.word_srcMapper.updateByid", word_src);
	}
	
}
