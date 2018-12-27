package com.translate.dao;

import java.util.List;

import com.translate.po.db.Sentense_src;


public interface Sentense_srcDao {

	Sentense_src selectByid(Integer id);

	List<Sentense_src> selectList(Sentense_src sentense_src);

	int insert(Sentense_src sentense_src);

	int updateByid(Sentense_src sentense_src);

}
