package com.tryonics.promotion.Repository;

import com.tryonics.promotion.Model.PromotionModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<PromotionModel,Long> {
}
