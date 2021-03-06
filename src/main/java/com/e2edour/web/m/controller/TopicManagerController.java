package com.e2edour.web.m.controller;


import com.e2edour.app.facade.TopicsFacade;
import com.e2edour.app.facade.bean.CheckedTopicsBO;
import com.e2edour.app.facade.bean.UncheckedTopicsBO;
import com.e2edour.app.facade.response.CommonResponse;
import com.e2edour.common.bean.Constants;
import com.e2edour.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.e2edour.common.bean.Page;


/**
 * 贴子管理
 *
 * @author King
 */
@Controller
@RequestMapping("topicsManager/")
public class TopicManagerController {

    private final static String prefix = "topicsManager/";

    @Autowired
    private TopicsFacade topicsFacade;

    private Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping(value = {"uncheckedTopicsManager/" + Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String uncheckedTopicsManagerPagePre() {
        return prefix + "unchecked_topics_manager";
    }

    /**
     * 查询未审核贴子
     *
     * @return
     */
    @RequestMapping(value = {"uncheckedTopicsManager/" + Constants.queryForPage}, method = {RequestMethod.POST})
    @ResponseBody
    public Page<UncheckedTopicsBO> uncheckedTopicsManagerQueryForPage(Page<?> page, UncheckedTopicsBO uncheckedTopicsBO) {
        Page<UncheckedTopicsBO> result = null;
        try {
            result = topicsFacade.queryUncheckedTopicsForPage(page, uncheckedTopicsBO);
        } catch (Exception e) {
            logger.error(LoggerUtil.getErrorMsg(e));
        }
        return result;
    }

    /**
     * 审核未审核贴子
     *
     * @return
     */
    @RequestMapping(value = {"uncheckedTopicsManager/"+Constants.verify}, method = {RequestMethod.POST})
    @ResponseBody
    public String uncheckedTopicsManagerVerify(String[] ids, String status) {
       if(topicsFacade.verifyUncheckedTopics(ids, status)){
           return Constants.SUCCESS_CODE;
       }
        return Constants.ERROR_CODE;
    }




    @RequestMapping(value = {"checkedTopicsManager/" + Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String checkedTopicsManagerPagePre() {
        return prefix + "checked_topics_manager";
    }

    /**
     * 查询审核贴子
     *
     * @return
     */
    @RequestMapping(value = {"checkedTopicsManager/" + Constants.queryForPage}, method = {RequestMethod.POST})
    @ResponseBody
    public Page<CheckedTopicsBO> checkedTopicsManagerQueryForPage(Page<?> page, CheckedTopicsBO checkedTopicsBO) {
        Page<CheckedTopicsBO> result = null;
        try {
            result = topicsFacade.queryCheckedTopicsForPage(page, checkedTopicsBO);
        } catch (Exception e) {
            logger.error(LoggerUtil.getErrorMsg(e));
        }
        return result;
    }

    /**
     * 审核审核贴子
     *
     * @return
     */
    @RequestMapping(value = {"checkedTopicsManager/"+Constants.deleteData}, method = {RequestMethod.POST,RequestMethod.GET})
    @ResponseBody
    public String checkedTopicsManagerDeleteData(String[] ids) {
         if(topicsFacade.deleteCheckedTopics(ids)){
             return Constants.SUCCESS_CODE;
         }
        return Constants.ERROR_CODE;
    }
}
