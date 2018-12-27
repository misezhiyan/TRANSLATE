package com.translate.dao.impl;

import java.util.List;

import com.translate.dao.UserDao;
import com.translate.dao.base.QueryDao;
import com.translate.dao.base.UpdateDao;
import com.translate.po.db.User;


public class UserDaoImpl implements UserDao {

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
	public User selectByid(Integer id) {
	
		return queryDao.selectOne("com.translate.po.mapper.userMapper.selectByid", id);
	}
	
	@Override
	public List<User> selectList(User user) {

		return queryDao.selectList("com.translate.po.mapper.userMapper.selectList", user);
	}

	@Override
	public int insert(User user) {

		return updateDao.insert("com.translate.po.mapper.userMapper.insert", user);
	}

	@Override
	public int updateByid(User user) {

		return updateDao.insert("com.translate.po.mapper.userMapper.updateByid", user);
	}
	
}
