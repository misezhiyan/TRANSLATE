package com.translate.dao;

import java.util.List;

import com.translate.po.db.Word_src;


public interface Word_srcDao {

	Word_src selectByid(Integer id);

	List<Word_src> selectList(Word_src word_src);

	int insert(Word_src word_src);

	int updateByid(Word_src word_src);

}
