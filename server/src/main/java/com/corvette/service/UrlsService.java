package com.corvette.service;

import com.corvette.model.MainWebsite;
import com.corvette.repository.MainWebsiteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Service
public class UrlsService {

    @Autowired
    private MainWebsiteRepo mainWebsiteRepo;

    public String addUrl(String primarySiteDomain, String socialMediaName, String socialMediaLink) {
        primarySiteDomain = decode(primarySiteDomain);
        socialMediaName = decode(socialMediaName);
        socialMediaLink = decode(socialMediaLink);
        if (mainWebsiteRepo.findFirstByDomainName(primarySiteDomain) != null) {
            System.out.printf("%s already exists.\n", primarySiteDomain);
        }
        MainWebsite mainWebsite = mainWebsiteRepo.save(new MainWebsite(primarySiteDomain));

        return "";
    }

    public String decode(String reqStr) {
        return URLDecoder.decode(reqStr, StandardCharsets.UTF_8);
    }
}
