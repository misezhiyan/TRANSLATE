package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.Sentense_resDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.Sentense_res;


public class Sentense_resDaoImpl implements Sentense_resDao {

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
	public Sentense_res selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.sentense_resMapper.selectByid", id);
	}
	
	@Override
	public List<Sentense_res> selectList(Sentense_res sentense_res) {

		return queryDao.selectList("com.translate.po.mapper.sentense_resMapper.selectList", sentense_res);
	}

	@Override
	public int insert(Sentense_res sentense_res) {

		return updateDao.insert("com.translate.po.mapper.sentense_resMapper.insert", sentense_res);
	}

	@Override
	public int updateByid(Sentense_res sentense_res) {

		return updateDao.insert("com.translate.po.mapper.sentense_resMapper.updateByid", sentense_res);
	}
	
}
