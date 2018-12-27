package com.translate.dao;

import java.util.List;

import com.translate.po.db.Word_res;


public interface Word_resDao {

	Word_res selectByid(Integer id);

	List<Word_res> selectList(Word_res word_res);

	int insert(Word_res word_res);

	int updateByid(Word_res word_res);

}
