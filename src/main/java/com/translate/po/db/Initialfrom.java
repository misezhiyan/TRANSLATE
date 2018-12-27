package com.translate.po.db;

import java.util.Date;
import java.util.List;



/**
 * @discription 初始化来源
 * @author kimmy
 * @date 2018-10-29 08:38:12
 */
public class Initialfrom {

	
	// 
	private Integer id;
	// 初始化路径
	private String url;
	// 初始化名称
	private String name;
	// 修改人
	private Integer updateBy;
	// 修改日期
	private Date updateDate;
	// 创建人
	private Integer createBy;
	// 创建日期
	private Date createDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		url = url;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		name = name;
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



}
