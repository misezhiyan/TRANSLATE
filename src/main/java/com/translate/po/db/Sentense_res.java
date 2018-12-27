package com.translate.po.db;

import java.util.Date;
import java.util.List;



/**
 * @discription 句子翻译
 * @author kimmy
 * @date 2018-10-29 08:38:12
 */
public class Sentense_res {

	
	// 
	private Integer id;
	// 原文ID
	private Integer src;
	// 译文
	private String result;
	// 翻译语言-从
	private Integer from;
	// 翻译语言-到
	private Integer to;
	// 初始化来源
	private Integer initFrom;
	// 所属人
	private Integer belongTo;
	// 修改时间
	private Integer updateBy;
	// 修改人
	private Date updateDate;
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

	public Integer getSrc() {
		return src;
	}

	public void setSrc(Integer src) {
		src = src;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		result = result;
	}

	public Integer getFrom() {
		return from;
	}

	public void setFrom(Integer from) {
		from = from;
	}

	public Integer getTo() {
		return to;
	}

	public void setTo(Integer to) {
		to = to;
	}

	public Integer getInitFrom() {
		return initFrom;
	}

	public void setInitFrom(Integer initFrom) {
		initFrom = initFrom;
	}

	public Integer getBelongTo() {
		return belongTo;
	}

	public void setBelongTo(Integer belongTo) {
		belongTo = belongTo;
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
