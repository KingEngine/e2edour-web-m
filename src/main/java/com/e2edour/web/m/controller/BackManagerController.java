package com.e2edour.web.m.controller;

import com.e2edour.app.facade.SettingManagerFacade;
import com.e2edour.app.facade.bean.NavigationBO;
import com.e2edour.app.facade.response.CommonResponse;
import com.e2edour.app.facade.response.Menus;
import com.e2edour.common.bean.Constants;
import com.e2edour.common.bean.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by King on 2015/11/20.
 */
@Controller
@RequestMapping("settingManger/backManager/")
public class BackManagerController {
    private static final String prefix = "backManager/";
    @Autowired
    private SettingManagerFacade settingManagerFacade;

    @RequestMapping(value = {"menusManager/" + Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String menusManagerPagePre() {
        return prefix + "menus_manager";
    }

    @RequestMapping(value = {"menusManager/" + Constants.queryForPage}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Page<Menus> queryMenusForPage(Page<?> page) {
        return settingManagerFacade.queryMenusForPage(page, new Menus());
    }

    @RequestMapping(value = {"menusManager/" + Constants.addData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse addMenu(Menus menu) {
       return settingManagerFacade.addMenu(menu);
    }

    @RequestMapping(value = {"menusManager/" + Constants.deleteData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse deleteMenu(Menus menu) {
        return settingManagerFacade.deleteMenu(menu);
    }
    @RequestMapping(value = {"menusManager/" + Constants.queryOne}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse queryMenuForOne(Menus menu) {
        return settingManagerFacade.queryMenuForOne(menu);
    }

    @RequestMapping(value = {"menusManager/" + Constants.updateData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse updateMenu(Menus menu) {
        return settingManagerFacade.updateMenu(menu);
    }

}

