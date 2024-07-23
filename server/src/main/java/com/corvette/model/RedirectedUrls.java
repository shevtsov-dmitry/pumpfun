package com.corvette.model;

import jakarta.persistence.*;

@Entity
public class RedirectedUrls {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String url;
    @ManyToOne
    @JoinColumn(name = "main_website_id")
    private MainWebsite mainWebsite;

    public RedirectedUrls() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public MainWebsite getMainWebsite() {
        return mainWebsite;
    }

    public void setMainWebsite(MainWebsite mainWebsite) {
        this.mainWebsite = mainWebsite;
    }

}