package com.managmentpanel.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class MainWebsite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String domainName;

    public MainWebsite() {

    }

    public MainWebsite(String domainName) {
        this.domainName = domainName;
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

    @Override
    public String toString() {
        return "MainWebsite{" +
                "id=" + id +
                ", domainName='" + domainName + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MainWebsite that = (MainWebsite) o;
        return Objects.equals(id, that.id) && Objects.equals(domainName, that.domainName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, domainName);
    }
}
