package com.managmentpanel.repository;

import com.managmentpanel.model.MainWebsite;
import com.managmentpanel.model.RedirectedUrl;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RedirectedUrlRepo extends JpaRepository<RedirectedUrl, Integer> {
    RedirectedUrl findFirstByName(String name);

     @Modifying
     @Transactional
     @Query("UPDATE RedirectedUrl e SET e.name = :name, e.url = :url WHERE e.mainWebsite = :mainWebsite")
     void updateUrl (String name, String url, MainWebsite mainWebsite);
}
