package com.translate.dao.base.impl;

import org.mybatis.spring.SqlSessionTemplate;

import com.translate.dao.base.UpdateDao;

public class UpdateDaoImpl implements UpdateDao {
	private SqlSessionTemplate sqlSessionTemplate;

	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}

	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}

	@Override
	public <T> int insert(String statement, T t) {

		return sqlSessionTemplate.insert(statement, t);
	}

	@Override
	public <T> int update(String statement, T t) {

		return sqlSessionTemplate.update(statement, t);
	}

}
