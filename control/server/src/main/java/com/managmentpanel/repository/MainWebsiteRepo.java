package com.managmentpanel.repository;

import com.managmentpanel.model.MainWebsite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainWebsiteRepo extends JpaRepository<MainWebsite, Integer> {

//     @Modifying
//     @Transactional
//     @Query("UPDATE MainWebsite e SET e.url = :url WHERE e.website = :website")
//     void updateByWebsiteAndUrl(String website, String url);

//     MainWebsite getFirstByWebsite(String website);
    MainWebsite findFirstByDomainName(String domainName);
}
