package com.e2edour.web.m.listener;


import java.util.ResourceBundle;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ResourceInitListener
        implements ServletContextListener {
    private static String theme = "success";

    public void contextDestroyed(ServletContextEvent event) {
    }

    public void contextInitialized(ServletContextEvent event) {
        String staticFileRoot = event.getServletContext().getContextPath();
        event.getServletContext().setAttribute("staticFileRoot", staticFileRoot);
        //ResourceBundle resource = ResourceBundle.getBundle("properties/application");
        //String imagePath = resource.getString("imagPath");
        /*try {
            theme = resource.getString("theme");
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        //event.getServletContext().setAttribute("imagePath", imagePath);
        //event.getServletContext().setAttribute("_theme", theme);
    }
}
