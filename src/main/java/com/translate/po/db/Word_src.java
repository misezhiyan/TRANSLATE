package com.translate.po.db;

import java.util.Date;
import java.util.List;



/**
 * @discription 单词翻译--原文
 * @author kimmy
 * @date 2018-10-29 08:38:12
 */
public class Word_src {

	
	// 
	private Integer id;
	// 原文
	private String src;
	// 创建人
	private Integer createBy;
	// 创建时间
	private Date createDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		id = id;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		src = src;
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
