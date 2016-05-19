package com.e2edour.web.m.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.e2edour.app.facade.bean.OperatorBO;
import com.e2edour.web.m.common.WebConstants;

public class LoginFilter implements Filter{

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
			FilterChain filterChain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response =(HttpServletResponse) servletResponse;
		//得到请求url
		String url = request.getRequestURI();
		//判断用户是否登陆,如果没有登陆则跳转到登陆页面
		if(url.indexOf("login")==-1){
			if(url.equals("/")){
				filterChain.doFilter(request,response);
				return;
			}
			OperatorBO operator = (OperatorBO) request.getSession().getAttribute(WebConstants.OPERATOR);
			if(operator==null){
				//跳转到登陆页面
				response.sendRedirect("/");
			}else{
				filterChain.doFilter(request,response);
				return;
			}
		}else{
			filterChain.doFilter(request,response);
			return;
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		
	}

	@Override
	public void destroy() {
	
		
	}
	public static void main(String[] args) {
		
		
		String url="sssslogin";
		System.out.println(url.indexOf("login"));
	}

}
