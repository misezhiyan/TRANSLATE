package com.translate.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class CrossOriginFilter2 implements Filter {

	@Override
	public void destroy() {

		System.out.println("CrossOriginFilter destroy");
	}

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

		System.out.println("filter doFilter before");


		HttpServletResponse response = (HttpServletResponse) servletResponse;

		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		filterChain.doFilter(servletRequest, servletResponse);

		System.out.println("filter doFilter after");
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

		System.out.println("filter init");
	}

}
