package com.translate.dao;

import java.util.List;

import com.translate.po.db.Config;


public interface ConfigDao {

	Config selectByid(Integer id);

	List<Config> selectList(Config config);

	int insert(Config config);

	int updateByid(Config config);

}
