package com.translate.po.db;

import java.util.Date;
import java.util.List;



/**
 * @discription 配置
 * @author kimmy
 * @date 2018-10-29 08:38:12
 */
public class Config {

	
	// 
	private Integer id;
	// 配置类型
	private String kind;
	// 配置类型码
	private String kindcode;
	// 配置名称
	private String name;
	// 配置码
	private String code;
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

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		kind = kind;
	}

	public String getKindcode() {
		return kindcode;
	}

	public void setKindcode(String kindcode) {
		kindcode = kindcode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		code = code;
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
