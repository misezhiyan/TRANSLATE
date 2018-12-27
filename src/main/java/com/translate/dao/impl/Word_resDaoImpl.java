package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.Word_resDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.Word_res;


public class Word_resDaoImpl implements Word_resDao {

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
	public Word_res selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.word_resMapper.selectByid", id);
	}
	
	@Override
	public List<Word_res> selectList(Word_res word_res) {

		return queryDao.selectList("com.translate.po.mapper.word_resMapper.selectList", word_res);
	}

	@Override
	public int insert(Word_res word_res) {

		return updateDao.insert("com.translate.po.mapper.word_resMapper.insert", word_res);
	}

	@Override
	public int updateByid(Word_res word_res) {

		return updateDao.insert("com.translate.po.mapper.word_resMapper.updateByid", word_res);
	}
	
}
