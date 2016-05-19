package com.e2edour.web.m.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.e2edour.app.facade.response.Menus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.e2edour.app.facade.LoginFacade;
import com.e2edour.app.facade.bean.OperatorBO;
import com.e2edour.app.facade.response.MenusRes;
import com.e2edour.web.m.common.WebConstants;

@Controller
@RequestMapping({ "/" })
public class IndexController {
	
	@Autowired
	private LoginFacade loginFacade;
	
	
	@RequestMapping(method = { RequestMethod.GET })
	public String loginPre(Model model) {
		return "login";
	}
	@RequestMapping(value="login",method = { RequestMethod.POST,RequestMethod.GET})
	public String login(OperatorBO bo,Model model,HttpSession session) {
		OperatorBO operator = (OperatorBO) session.getAttribute(WebConstants.OPERATOR);
		if(null==operator){
			OperatorBO result = loginFacade.login(bo);
			if(null!=result){
				MenusRes firstMenusRes = loginFacade.getFirstMenu();
				session.setAttribute(WebConstants.OPERATOR, result);

				List<Map<Object, Object>> data = new ArrayList<Map<Object, Object>>();
				for(Menus menu:firstMenusRes.getMenus()){
					MenusRes menus = loginFacade.getChildMens(menu.getMenuId());
					data.addAll(menus.getChildMenus());
				}
				session.setAttribute("data",data);
				//获取菜单列表
				return "index";
			}else{
				model.addAttribute("showError", true);
				model.addAttribute("errorMsg", "用户名或者密码错误");
				return "login";
			}
		}else{
			return "index";
		}
	}
	
//	@RequestMapping(value="getLeftMenus",method = { RequestMethod.POST })
//	@ResponseBody
//	public Map<String,Object> getLeftMenus(String firstMenuId) {
//		//得到一级菜单
//		///////
//		MenusRes firstMenusRes = loginFacade.getChildMens(firstMenuId);
//		Map<String,Object> result = new HashMap<String, Object>();
//		result.put("data", firstMenusRes.getChildMenus());
//		return result;
//	}
	@RequestMapping(value="getLeftMenus",method = { RequestMethod.POST })
	//@ResponseBody
	public String getLeftMenus(String firstMenuId,Model model) {
		//得到一级菜单
		///////
		MenusRes firstMenusRes = loginFacade.getChildMens(firstMenuId);
		//Map<String,Object> result = new HashMap<String, Object>();
		//result.put("data", firstMenusRes.getChildMenus());
		//return result;
		model.addAttribute("data",firstMenusRes.getChildMenus());
		return "left";
	}
}