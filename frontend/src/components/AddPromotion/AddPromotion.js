import React,{useEffect,useState} from 'react'
import{useNavigate} from 'react-router-dom'
import axios from 'axios';    

function AddPromotion() {
  const navigate=useNavigate();
  const [promotion , setPromotion] = useState({
    name:'',
    startDate:'',
    endDate:'',
    itemImage:''
  });

  const{name,startDate,endDate}=promotion;

  const onInputChange = (e) =>{
    if (e.target.name ==='itemImage') {
      setPromotion({...promotion,itemImage:e.target.files[0]});
    } else {
      setPromotion({...promotion,[e.target.name]:e.target.value});
    }
  }
  const onsubmit= async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", promotion.itemImage);
    let imageName = "";

    try{
      const response = await axios.post("http://localhost:8080/promotion/itemImg", formData,{
        headers:{
          'content-Type':'multipart/form-data'
        },
        });
      imageName = response.data;
    } catch(error){
      alert("error uploading image");
      return;
    }
    const updatePromotion = {...promotion, itemImage: imageName};
    await axios.post("http://localhost:8080/promotion", updatePromotion);
    alert("Promotion Added Successfully");
    // navigate to display promotion page
    window.location.href="/displaypromotion";
  }
  return (
    <div>
    <p className='Topic'>Add Promotions</p>
    <div className='form_group'>
      <div className='form-sub-group'>
       <form id='promotionID' onSubmit={(e) => onsubmit(e)}>
        
    
        
          <label for='name'>Name:</label>
          <input type='text' id='name' name='name' onChange={(e)=>onInputChange(e)} value={name} required /><br/><br/><br/>
        
        
          <label for='startDate'>Start Date:</label>
          <input type='Date' id='startDate' name='startDate' onChange={(e)=>onInputChange(e)} value={startDate} required /><br/><br/><br/>
        
        
          <label for='endDate'>End Date:</label>
          <input type='Date' id='endDate' name='endDate' onChange={(e)=>onInputChange(e)} value={endDate} required /><br/><br/><br/>
        
       
          <label for='itemImage'>Item Image:</label>
          <input type='file' id='itemImage' name='itemImage' accept='image/*' onChange={(e)=>onInputChange(e)} /><br/><br/><br/>
        
        <button type='submit' className='addButton'>Add Promotion</button>
       </form>
      </div>

    </div>
    </div>
  )
}

export default AddPromotion
