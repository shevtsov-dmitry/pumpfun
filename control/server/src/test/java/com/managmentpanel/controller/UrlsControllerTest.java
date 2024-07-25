package com.managmentpanel.controller;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

/**
 * UrlsControllerTest
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UrlsControllerTest {

    final String ENDPOINT_URL = "urls";

    @Autowired
    private MockMvc mockMvc;

    String properDomain = "mydomain.com";
    String notSupportedDomain = "домен.ком";

    @Test
    @Order(1)
    void addMainWebsiteDomains() throws Exception {
        String url = ENDPOINT_URL + "/add/main-website-domain/" + properDomain;
        mockMvc.perform(post(url))
                .andExpect(status().isOk());
    }

    @Order(2)
    void deleteMainWebsiteDomains() throws Exception {
        String url = ENDPOINT_URL + "/remove/main-website-domain/" + properDomain;
        mockMvc.perform(delete(url))
                .andExpect(status().isOk());
    }
}
