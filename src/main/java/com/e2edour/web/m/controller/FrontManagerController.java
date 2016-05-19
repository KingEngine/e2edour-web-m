package com.e2edour.web.m.controller;

import com.e2edour.app.facade.SettingManagerFacade;
import com.e2edour.app.facade.bean.NavigationBO;
import com.e2edour.app.facade.response.CommonResponse;
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
@RequestMapping("settingManger/frontManager/")
public class FrontManagerController {
    private static final String prefix = "frontManager/";
    @Autowired
    private SettingManagerFacade settingManagerFacade;

    @RequestMapping(value = {"navigationManager/" + Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String navigationManagerPagePre() {
        return prefix + "navigation_manager";
    }

    @RequestMapping(value = {"navigationManager/" + Constants.queryForPage}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Page<NavigationBO> queryNavigationForPage(Page<?> page) {
        return settingManagerFacade.queryNavigationForPage(page, new NavigationBO());
    }

    @RequestMapping(value = {"navigationManager/" + Constants.addData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse addNavigation(NavigationBO navigationBO) {
       return settingManagerFacade.addNaviagtion(navigationBO);
    }

    @RequestMapping(value = {"navigationManager/" + Constants.deleteData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse deleteNavigation(NavigationBO navigationBO) {
        return settingManagerFacade.deleteNaviagtion(navigationBO);
    }

    @RequestMapping(value = {"navigationManager/" + Constants.updateData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse updateNavigation(NavigationBO navigationBO) {
        return settingManagerFacade.updateNaviagtion(navigationBO);
    }
    @RequestMapping(value = {"navigationManager/" + Constants.queryOne}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse queryOne(NavigationBO navigationBO) {
        return settingManagerFacade.queryNavigationForOne(navigationBO);
    }
}

