package com.e2edour.web.m.controller;


import com.e2edour.app.facade.FetcherFacade;
import com.e2edour.app.facade.bean.FetcherIndexBO;
import com.e2edour.common.bean.Constants;
import com.e2edour.common.bean.Page;
import com.e2edour.common.utils.XmlUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by King on 2015/11/11.
 */
@Controller
@RequestMapping("fetcherIndexsManager/")
public class FetcherIndexsManagerController {

    private static final String prefix = "fetcherIndexsManager/";

    //private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private FetcherFacade fetcherFacade;

    @RequestMapping(value = {Constants.pagePre}, method = {RequestMethod.GET, RequestMethod.POST})
    public String pagePre() {
        return prefix + "fetcher_indexs_manager";
    }

    @RequestMapping(value = {Constants.queryForPage}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public Page<FetcherIndexBO> queryForPage(Page<?> page) {
        Page<FetcherIndexBO> resultPage = fetcherFacade.queryFetcherIndexsForPage(page);
        return resultPage;
    }

    @RequestMapping(value = {Constants.addData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String addData(FetcherIndexBO fetcherIndexBO) {
        if(fetcherFacade.addFetcherIndex(fetcherIndexBO)){
            return Constants.SUCCESS_CODE;
        }
        return Constants.ERROR_CODE;
    }

    @RequestMapping(value = {Constants.deleteData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String deleteData(FetcherIndexBO fetcherIndexBO) {
        if(fetcherFacade.deleteFetcherIndex(fetcherIndexBO)){
            return Constants.SUCCESS_CODE;
        }
        return Constants.ERROR_CODE;
    }

    @RequestMapping(value = {Constants.updateData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public String updateData(FetcherIndexBO fetcherIndexBO) {
        if(fetcherFacade.updateFetcherIndex(fetcherIndexBO)){
            return Constants.SUCCESS_CODE;
        }
        return Constants.ERROR_CODE;
    }
}
