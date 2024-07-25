package com.managmentpanel.controller;

import com.managmentpanel.service.UrlsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/urls")
public class UrlsController {

    private final UrlsService service;

    public UrlsController(UrlsService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public String addNewString(@RequestParam String website_name, @RequestParam String url) {
        return service.addUrl(website_name, url);
    }

    @PatchMapping("/change")
    public String changeUrl(@RequestParam String website_name, @RequestParam String url) {
        return service.changeUrl(website_name, url);
    }

    @GetMapping("/list")
    public Map<String, String> listUrls() {
        return service.listUrls();
    }

}
