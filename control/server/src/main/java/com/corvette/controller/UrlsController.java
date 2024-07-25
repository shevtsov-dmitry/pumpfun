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

    @GetMapping("/list")
    public Map<String, String> listUrls() {
//        return service.listUrls();
        return null;
    }

    @GetMapping("/get/{website}")
    public String getUrl(@PathVariable String website) {
//        return service.getUrl(website);
        return null;
    }

    @PutMapping("/change")
    public String changeUrl(@RequestParam String to, @RequestParam String url) {
//        return service.changeUrl(to, url);
        return null;
    }

    @PostMapping("/add/mainWebsite/{name}")
    public ResponseEntity addMainWebsite(@PathVariable String name) {
       return service.addMainWebsite(name);
    }


    @PostMapping("/add")
    public String addUrl(@RequestParam String primarySiteDomain,
                         @RequestParam String socialMediaName,
                         @RequestParam String socialMediaLink) {
        return service.addUrl(primarySiteDomain, socialMediaName, socialMediaLink);
    }

}
