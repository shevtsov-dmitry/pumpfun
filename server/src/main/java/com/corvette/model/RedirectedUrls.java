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
}
