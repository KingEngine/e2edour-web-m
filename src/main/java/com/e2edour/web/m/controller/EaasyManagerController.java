package com.e2edour.web.m.controller;

import com.e2edour.app.facade.EaasyManagerFacade;
import com.e2edour.app.facade.bean.UncheckedEaasyBO;
import com.e2edour.app.facade.response.CommonResponse;
import com.e2edour.common.bean.Constants;
import com.e2edour.common.bean.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 文章管理
 * Created by King on 2015/11/26.
 */
@Controller
@RequestMapping("contentManager/eaasyManager/")
public class EaasyManagerController {

    private final static String prefix = "essayManager/";

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private EaasyManagerFacade eaasyManagerFacade;

    @RequestMapping(value = {"eaasyAdd/" + Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String eaasyAddPre() {
        return prefix + "eaasy_add";
    }

    @RequestMapping(value = {"eaasyAdd/" + Constants.addData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse eaasyAdd(UncheckedEaasyBO uncheckedEaasyBO) {
        return eaasyManagerFacade.addUncheckedEaasy(uncheckedEaasyBO);
    }

    @RequestMapping(value = {"uncheckedEaasyManager/" + Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String uncheckedEaasyManagerPre() {
        return prefix + "unchecked_eaasy_manager";
    }

    @RequestMapping(value = {"uncheckedEaasyManager/" + Constants.queryForPage}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Page<UncheckedEaasyBO> uncheckedEaasyManagerQueryForPage(Page page, UncheckedEaasyBO uncheckedEaasyBO) {
        return eaasyManagerFacade.queryUnCheckedEaasyForPage(page, uncheckedEaasyBO);
    }

    @RequestMapping(value = {"uncheckedEaasyManager/" + Constants.queryOne}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse uncheckedEaasyManagerQueryOne(UncheckedEaasyBO uncheckedEaasyBO) {
        return eaasyManagerFacade.queryUncheckedEaasyForOne(uncheckedEaasyBO);
    }

    @RequestMapping(value = {"uncheckedEaasyManager/" + Constants.verify}, method = {RequestMethod.POST, RequestMethod.GET})
    @ResponseBody
    public CommonResponse uncheckedTopicsManagerVerify(String[] ids, String status) {
        CommonResponse response = eaasyManagerFacade.verifyUncheckedEaasy(ids, status);
        return response;
    }
}
