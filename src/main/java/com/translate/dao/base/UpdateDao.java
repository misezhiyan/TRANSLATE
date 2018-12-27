package com.translate.dao.base;

public interface UpdateDao {

	public <T> int insert(String statement, T t);

	public <T> int update(String statement, T t);

}
