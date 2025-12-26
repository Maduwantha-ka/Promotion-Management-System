package com.tryonics.promotion.Controller;

import com.tryonics.promotion.Exception.PromotionNotFoundException;
import com.tryonics.promotion.Model.PromotionModel;
import com.tryonics.promotion.Repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")

//Insert part

public class PromotionController {
    @Autowired
    private PromotionRepository promotionRepository;

        //normal data passing part
    @PostMapping("/promotion")
    public PromotionModel newPromotionModel(@RequestBody PromotionModel newPromotionModel){
        return promotionRepository.save(newPromotionModel);
    }

    @PostMapping("/promotion/itemImg")
    public String itemImage(@RequestParam("file")MultipartFile file){
        String folder ="src/main/uploads/";
        String itemImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(folder);
            if (!uploadDir.exists()){
                uploadDir.mkdir();
            }
            file.transferTo(Paths.get(folder+itemImage));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + itemImage;
        }
        return itemImage;
    }
    // display method
    @GetMapping("/promotion")
    List<PromotionModel> getAllItems(){return promotionRepository.findAll();}

    // display by id
    @GetMapping("/promotion/{id}")
    PromotionModel getItemId (@PathVariable Long id){
        return promotionRepository.findById(id).orElseThrow(()->new PromotionNotFoundException(id));
    }

    //Image display part
    private final String UPLOAD_DIR = "src/main/uploads";

    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename){
        File file = new File(UPLOAD_DIR +filename);
        if (!file.exists()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new FileSystemResource(file));
    }
    // update method
    @PutMapping("/promotion/{id}")
    public PromotionModel updatePromotion(
            @RequestPart(value = "promotionDetails")String promotionDetails,
            @RequestPart(value = "file",required = false) MultipartFile file,
            @PathVariable Long id
    ){
        System.out.println("Promotion Details:" +promotionDetails);
        if (file != null){
            System.out.println("File received"+file.getOriginalFilename());
        } else {
            System.out.println("no file uploaded");
        }
        ObjectMapper mapper = new ObjectMapper();
        PromotionModel newPromotion;
        try{
            newPromotion = mapper.readValue(promotionDetails,PromotionModel.class);
        }catch (Exception e){
            throw  new RuntimeException("Error parsing promotion details",e);
        }
        return promotionRepository.findById(id).map(existingPromotion -> {
            existingPromotion.setName(newPromotion.getName());
            existingPromotion.setStartDate(newPromotion.getStartDate());
            existingPromotion.setEndDate(newPromotion.getEndDate());

            if (file != null && !file.isEmpty()){
                String folder = "src/main/uploads/";
                String itemImage = file.getOriginalFilename();
                try{
                    file.transferTo(Paths.get(folder+itemImage));
                    existingPromotion.setImage((itemImage));
                } catch (IOException e) {
                    throw new RuntimeException("Error saving uploaded file",e);
                }
            }
            return promotionRepository.save(existingPromotion);
        }).orElseThrow(() -> new PromotionNotFoundException(id));
    }

    //Delete part
    @DeleteMapping("/promotion/{id}")
    String deleteItem(@PathVariable Long id) {
        PromotionModel promotionItem = promotionRepository.findById(id)
                .orElseThrow(() -> new PromotionNotFoundException(id));
        String itemImage = promotionItem.getImage();
        if (itemImage != null && !itemImage.isEmpty()) {
            File imageFile = new File("src/main/uploads" + itemImage);
            if (imageFile.exists()) {
                if (imageFile.delete()) {
                    System.out.println("Image deleted");
                } else {
                    System.out.println("Failed image deleted");
                }
            }
        }
        promotionRepository.deleteById(id);
        return "data with id"+id+"and image deleted";
    }
}
