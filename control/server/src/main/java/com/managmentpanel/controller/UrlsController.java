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
    public ResponseEntity addNewString(@RequestParam String website_name, @RequestParam String url) {
        return service.addUrl(website_name.trim(), url);
    }

    @PatchMapping("/change")
    public ResponseEntity changeUrl(@RequestParam String website_name, @RequestParam String url) {
        return service.changeUrl(website_name, url);
    }

    @GetMapping("/list")
    public Map<String, String> listUrls() {
        return service.listUrls();
    }

    @DeleteMapping("/delete/{website_name}")
    public ResponseEntity deleteWebsite(@PathVariable String website_name) {
        return service.deleteWebsite(website_name);
    }

}
