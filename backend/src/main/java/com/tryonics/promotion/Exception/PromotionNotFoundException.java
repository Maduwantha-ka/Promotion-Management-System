package com.tryonics.promotion.Exception;

public class PromotionNotFoundException extends RuntimeException {
    public PromotionNotFoundException(Long id){
        super("could not find id "+ id);
    }
    public PromotionNotFoundException(String message){
        super(message);
    }
}
