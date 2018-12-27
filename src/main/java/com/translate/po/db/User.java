package com.translate.po.db;

import java.util.Date;
import java.util.List;



/**
 * @discription 用户
 * @author kimmy
 * @date 2018-10-29 08:38:12
 */
public class User {

	
	// 
	private Integer id;
	// 姓名
	private String name;
	// 创建人
	private Integer createBy;
	// 
	private Date createDate;
	// 修改人
	private Integer updateBy;
	// 
	private Date updateDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		name = name;
	}

	public Integer getCreateBy() {
		return createBy;
	}

	public void setCreateBy(Integer createBy) {
		createBy = createBy;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		createDate = createDate;
	}

	public Integer getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(Integer updateBy) {
		updateBy = updateBy;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		updateDate = updateDate;
	}



}
