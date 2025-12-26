package com.tryonics.promotion.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;


@Entity
public class PromotionModel {
    @Id
    @GeneratedValue

    private Long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private String itemImage;

    public PromotionModel(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getImage() {
        return itemImage;
    }

    public void setImage(String itemImage) {
        this.itemImage = itemImage;
    }

    public PromotionModel(Long id, String name, Date startDate, Date endDate, String itemImage) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.itemImage = itemImage;
    }
}
