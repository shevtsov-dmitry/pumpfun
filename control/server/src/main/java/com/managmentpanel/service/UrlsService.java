package com.managmentpanel.service;

import com.managmentpanel.model.MainWebsite;
import com.managmentpanel.repository.MainWebsiteRepo;
import com.managmentpanel.repository.RedirectedUrlRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Service
public class UrlsService {

    @Autowired
    private MainWebsiteRepo mainWebsiteRepo;
    @Autowired
    private RedirectedUrlRepo redirectedUrlRepo;

    // public ResponseEntity<String> addUrl(String primarySiteDomain, String
    // socialMediaName, String socialMediaLink) {
    // primarySiteDomain = decode(primarySiteDomain);
    // socialMediaName = decode(socialMediaName);
    // socialMediaLink = decode(socialMediaLink);
    // final MainWebsite mainWebsite =
    // mainWebsiteRepo.findFirstByDomainName(primarySiteDomain);
    // if (mainWebsite == null) {
    // return new ResponseEntity<>("Can't find \"%s\" main website
    // database%n".formatted(primarySiteDomain),
    // HttpStatus.NOT_FOUND);
    // }
    // RedirectedUrlsUtils urlsUtils = new RedirectedUrlsUtils(mainWebsite,
    // socialMediaName, socialMediaLink);
    // ResponseEntity<String> socialMediaName1 = save(socialMediaName,
    // socialMediaLink, mainWebsite);
    //
    // RedirectedUrl url = redirectedUrlRepo.findFirstByName(socialMediaName);
    // if (url.getName() == null) {
    // redirectedUrlRepo.save(new RedirectedUrl(mainWebsite, socialMediaName,
    // socialMediaLink));
    // return ResponseEntity.ok("saved website name: %s url:
    // %s\n".formatted(socialMediaName, socialMediaLink));
    // }
    // return null;
    // if (socialMediaName1 != null)
    // return socialMediaName1;
    // return update(socialMediaName, socialMediaLink, mainWebsite);
    // }

    private class RedirectedUrlsUtils {
        private final MainWebsite mainWebsite;
        private final String socialMediaName;
        private final String socialMediaLink;

        private RedirectedUrlsUtils(MainWebsite mainWebsite, String socialMediaName, String socialMediaLink) {
            this.mainWebsite = mainWebsite;
            this.socialMediaName = socialMediaName;
            this.socialMediaLink = socialMediaLink;
        }

        public ResponseEntity<String> update() {
            try {
                redirectedUrlRepo.updateUrl(socialMediaName, socialMediaLink, mainWebsite);
                return ResponseEntity
                        .ok("updated website name: %s url: %s\n".formatted(socialMediaName, socialMediaLink));
            } catch (HttpServerErrorException.InternalServerError serverError) {
                return new ResponseEntity<>("Could update values in the server.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public String decode(String reqStr) {
        return URLDecoder.decode(reqStr, StandardCharsets.UTF_8);
    }

    public ResponseEntity addMainWebsiteDomain(String name) {
        return mainWebsiteRepo.save(new MainWebsite(name)) != null ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
