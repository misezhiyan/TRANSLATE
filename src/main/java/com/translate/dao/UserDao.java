package com.translate.dao;

import java.util.List;

import com.translate.po.db.User;


public interface UserDao {

	User selectByid(Integer id);

	List<User> selectList(User user);

	int insert(User user);

	int updateByid(User user);

}
