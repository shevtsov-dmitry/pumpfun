package com.managmentpanel.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.managmentpanel.model.Url;
import com.managmentpanel.repository.UrlsRepo;

@Service
public class UrlsService {

    @Autowired
    private UrlsRepo repo;

    public ResponseEntity addUrl(String website_name, String url) {
        try {
            repo.save(new Url(website_name, url));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity changeUrl(String website_name, String url) {
        try {
            repo.updateByWebsiteAndUrl(website_name, url);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Map<String, String> listUrls() {
        try {
            final Map<String, String> map = new HashMap<>();
            List<Url> foundUrls = repo.findAll();
            foundUrls.forEach(url -> map.put(url.getWebsite(), url.getUrl()));
            return map;

        } catch (Exception e) {
            return new HashMap<>(Map.of("ERROR", "ERROR"));
        }
    }

    public ResponseEntity deleteWebsite(String website) {
        try {
            repo.deleteByWebsite(website);
            return new ResponseEntity(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
