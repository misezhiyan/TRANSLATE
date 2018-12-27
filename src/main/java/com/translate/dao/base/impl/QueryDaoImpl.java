package com.translate.dao.base.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;

import com.translate.dao.base.QueryDao;

public class QueryDaoImpl implements QueryDao {
	private SqlSessionTemplate sqlSessionTemplate;

	public SqlSessionTemplate getSqlSessionTemplate() {
		return sqlSessionTemplate;
	}

	public void setSqlSessionTemplate(SqlSessionTemplate sqlSessionTemplate) {
		this.sqlSessionTemplate = sqlSessionTemplate;
	}

	@Override
	public <T> T selectOne(String statement) {

		return sqlSessionTemplate.selectOne(statement);
	}

	@Override
	public <T, E> T selectOne(String statement, E e) {

		return sqlSessionTemplate.selectOne(statement, e);
	}

	@Override
	public <T> List<T> selectList(String statement) {

		return sqlSessionTemplate.selectList(statement);
	}

	@Override
	public <T, E> List<T> selectList(String statement, E e) {

		return sqlSessionTemplate.selectList(statement, e);
	}

}
