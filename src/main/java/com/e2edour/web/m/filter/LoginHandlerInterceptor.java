package com.e2edour.web.m.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.e2edour.app.facade.bean.OperatorBO;
import com.e2edour.common.exception.NotLoginException;
import com.e2edour.web.m.common.WebConstants;

public class LoginHandlerInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest arg0,
			HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1,
			Object arg2, ModelAndView arg3) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object obj) throws Exception {
		//如果用户没有登陆,则提示登陆
		OperatorBO operator = (OperatorBO) request.getSession().getAttribute(WebConstants.OPERATOR);
		String uri = request.getRequestURI();
		if(null==operator && !StringUtils.equals("/login", uri)){
			throw new NotLoginException();
		}	
		return true;
	}
	

}
