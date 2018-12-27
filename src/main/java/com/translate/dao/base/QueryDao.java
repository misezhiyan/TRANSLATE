package com.translate.dao.base;

import java.util.List;

public interface QueryDao {

	<T> T selectOne(String statement);

	<T, E> T selectOne(String statement, E e);

	<T> List<T> selectList(String statement);

	<T, E> List<T> selectList(String statement, E e);

}
