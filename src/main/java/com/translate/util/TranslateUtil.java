package com.translate.util;

import com.translate.util.common.HttpUtil;
import com.translate.util.function.BaiDuTranselate;

public class TranslateUtil {

	public static void main(String[] args) throws Exception {

		// String q = "我爱我媳妇";
		// String q = "Good Morning/Afternoon/Evening!(根据实际情况修改)";
		// String q = "Good Morning/Afternoon/Evening!";
		String q = "hello world !\r\n" + "my love, say good morning!";

		// String translateResult = translate(q, "en", "zh");
		BaiDuTranselate baiDuTranselate = new BaiDuTranselate();
		baiDuTranselate.Init("en", "zh", q);
		String translateResult = baiduTranslate(baiDuTranselate);
		System.out.println(translateResult);
		System.out.println(baiDuTranselate.result());

	}

	public static String baiduTranslate(String from, String to, String content) throws Exception {

		BaiDuTranselate baiDuTranselate = new BaiDuTranselate();
		baiDuTranselate.Init(from, to, content);
		String translateResult = baiduTranslate(baiDuTranselate);

		return translateResult;
	}

	public static String baiduTranslate(BaiDuTranselate baiDuTranselate) throws Exception {

		String translate_url = baiDuTranselate.readyUrl();
		String result = HttpUtil.postWithCookie(translate_url);
		baiDuTranselate.setDst(result);

		return result;
	}

}
