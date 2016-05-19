package com.e2edour.web.m.controller;


import com.e2edour.app.facade.FetcherFacade;
import com.e2edour.app.facade.bean.FetcherIndexBO;
import com.e2edour.app.facade.response.CommonResponse;
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

    private Logger logger = LoggerFactory.getLogger(getClass());
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
        logger.info("fetcherFacade getFetcherIndexs res \n:{}",XmlUtil.toXml(resultPage));
        return resultPage;
    }

    @RequestMapping(value = {Constants.addData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse addData(FetcherIndexBO fetcherIndexBO) {
        CommonResponse response = fetcherFacade.addFetcherIndex(fetcherIndexBO);
        logger.info("fetcherFacade addFetcherIndex res : \n {}", XmlUtil.toXml(response));
        return response;
    }

    @RequestMapping(value = {Constants.deleteData}, method = {RequestMethod.GET, RequestMethod.POST})
    @ResponseBody
    public CommonResponse deleteData(FetcherIndexBO fetcherIndexBO) {
        CommonResponse response = fetcherFacade.deleteFetcherIndex(fetcherIndexBO);
        logger.info("fetcherFacade addFetcherIndex res : \n {}", XmlUtil.toXml(response));
        return response;
    }
}
