package com.translate.dao;

import java.util.List;

import com.translate.po.db.Sentense_res;


public interface Sentense_resDao {

	Sentense_res selectByid(Integer id);

	List<Sentense_res> selectList(Sentense_res sentense_res);

	int insert(Sentense_res sentense_res);

	int updateByid(Sentense_res sentense_res);

}
