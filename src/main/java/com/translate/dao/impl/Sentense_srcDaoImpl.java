package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.Sentense_srcDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.Sentense_src;


public class Sentense_srcDaoImpl implements Sentense_srcDao {

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
	public Sentense_src selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.sentense_srcMapper.selectByid", id);
	}
	
	@Override
	public List<Sentense_src> selectList(Sentense_src sentense_src) {

		return queryDao.selectList("com.translate.po.mapper.sentense_srcMapper.selectList", sentense_src);
	}

	@Override
	public int insert(Sentense_src sentense_src) {

		return updateDao.insert("com.translate.po.mapper.sentense_srcMapper.insert", sentense_src);
	}

	@Override
	public int updateByid(Sentense_src sentense_src) {

		return updateDao.insert("com.translate.po.mapper.sentense_srcMapper.updateByid", sentense_src);
	}
	
}
