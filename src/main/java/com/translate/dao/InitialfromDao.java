package com.translate.dao;

import java.util.List;

import com.translate.po.db.Initialfrom;


public interface InitialfromDao {

	Initialfrom selectByid(Integer id);

	List<Initialfrom> selectList(Initialfrom initialfrom);

	int insert(Initialfrom initialfrom);

	int updateByid(Initialfrom initialfrom);

}
