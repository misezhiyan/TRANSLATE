package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.ConfigDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.Config;


public class ConfigDaoImpl implements ConfigDao {

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
	public Config selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.configMapper.selectByid", id);
	}
	
	@Override
	public List<Config> selectList(Config config) {

		return queryDao.selectList("com.translate.po.mapper.configMapper.selectList", config);
	}

	@Override
	public int insert(Config config) {

		return updateDao.insert("com.translate.po.mapper.configMapper.insert", config);
	}

	@Override
	public int updateByid(Config config) {

		return updateDao.insert("com.translate.po.mapper.configMapper.updateByid", config);
	}
	
}
