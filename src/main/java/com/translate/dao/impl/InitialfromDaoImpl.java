package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.InitialfromDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.Initialfrom;


public class InitialfromDaoImpl implements InitialfromDao {

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
	public Initialfrom selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.initialfromMapper.selectByid", id);
	}
	
	@Override
	public List<Initialfrom> selectList(Initialfrom initialfrom) {

		return queryDao.selectList("com.translate.po.mapper.initialfromMapper.selectList", initialfrom);
	}

	@Override
	public int insert(Initialfrom initialfrom) {

		return updateDao.insert("com.translate.po.mapper.initialfromMapper.insert", initialfrom);
	}

	@Override
	public int updateByid(Initialfrom initialfrom) {

		return updateDao.insert("com.translate.po.mapper.initialfromMapper.updateByid", initialfrom);
	}
	
}
