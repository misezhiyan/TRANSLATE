package com.translate.util.function;

import java.net.URLEncoder;
import java.util.Random;

import org.apache.commons.codec.digest.DigestUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.translate.util.common.StringUtil;

public class BaiDuTranselate {

	private String url = "http://api.fanyi.baidu.com/api/trans/vip/translate";

	private String appid = "20180103000111543";
	private String p = "hKhTn4umupyJxY61Beny";

	private String from = "zh";
	private String to = "en";

	private String src;
	private String dst;

	private String getDst() {
		return dst;
	}

	/****************************
	 * 下方业务方法
	 ***************************/
	// 翻译结果
	public void setDst(String result) {

		JSONObject json = JSONObject.parseObject(result);

		JSONArray resultArr = json.getJSONArray("trans_result");

		String dst = "";
		for (int i = 0; i < resultArr.size(); i++) {

			JSONObject resultJson = resultArr.getJSONObject(i);
			// String src = resultJson.getString("src");
			dst += resultJson.getString("dst");
			dst += "\r\n";
		}

		this.dst = dst;
	}

	// 初始化配置
	public void Init(String from, String to, String src) {

		Init(null, from, to, src);
	}

	public void Init(String url, String from, String to, String src) {
		Init(url, null, null, from, to, src);
	}

	public void Init(String url, String appid, String p, String from, String to, String src) {

		from = formmatLanguage(from);
		to = formmatLanguage(to);

		this.url = StringUtil.isEmpty(url) ? this.url : url;
		this.appid = StringUtil.isEmpty(appid) ? this.appid : appid;
		this.p = StringUtil.isEmpty(p) ? this.p : p;
		this.from = StringUtil.isEmpty(from) ? this.from : from;
		this.to = StringUtil.isEmpty(to) ? this.to : to;

		src = formmatSRC(src);

		this.src = StringUtil.isEmpty(src) ? this.src : src;
		// this.res = res;
	}

	private String formmatLanguage(String language) {

		String unformmat = language;
		switch (unformmat.toUpperCase()) {
		case "ENGLISH":
			language = "en";
			break;
		case "CHINESE":
			language = "zh";
			break;
		}

		return language;
	}

	// 格式化请求翻译文本
	private String formmatSRC(String src) {

		return src;
	}

	// 拼接请求url
	public String readyUrl() throws Exception {

		Random random = new Random();
		int salt_int = random.nextInt();
		String salt = String.valueOf(salt_int);

		String sign_source = appid + src + salt_int + p;
		String sign = DigestUtils.md5Hex(sign_source);

		src = URLEncoder.encode(src, "UTF-8");
		String translate_url = url + "?" + "q=" + src + "&from=" + from + "&to=" + to + "&appid=" + appid + "&salt=" + salt + "&sign=" + sign;
		return translate_url;
	}

	// 获取翻译结果
	public String result() {

		return getDst();
	}

}