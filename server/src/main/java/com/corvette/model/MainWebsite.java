package com.corvette.model;

import jakarta.persistence.*;

import java.lang.annotation.Target;

@Entity
public class MainWebsite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String domainName;

    public MainWebsite() {

    }

    public String getDomainName() {
        return domainName;
    }

    public void setDomainName(String domainName) {
        this.domainName = domainName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
