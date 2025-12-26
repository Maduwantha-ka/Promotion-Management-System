import React ,{useEffect,useState}from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdatePromotionss() {
  const {id} = useParams();
  const [fromData,setFormData] = useState({
    name:'',
    startDate:'',
    endDate:'',
    itemImage:null,
  });
  useEffect(() =>{
    const fetchPromotionData = async()=>{
      try{
        const response = await axios.get(`http://localhost:8080/promotion/${id}`);

        const promotionData = response.data;
        setFormData({
          name:promotionData.name||'',
          startDate:promotionData.startDate||'',
          endDate:promotionData.endDate||'',
          itemImage:null
        });
      }catch(err){
        console.error('error fetch data:',err)
      }
    };      
      fetchPromotionData();
    },[id] );


  const onInputChange = (e) =>{
    const {name,value,files} = e.target;
    setFormData({
      ...fromData,
      [name]:files ? files[0]:value});
   
  }

  const onsubmit = async(e) =>{
    e.preventDefault();
    const data = new FormData();
    data.append('promotionDetails',JSON.stringify({
      name:fromData.name,
      startDate:fromData.startDate,
      endDate:fromData.endDate,
    }));

    if (fromData.itemImage) {
      data.append('file', fromData.itemImage);
    }try {
      const response = await axios.put(`http://localhost:8080/promotion/${id}`, data,{headers:{
        "Content-Type":"multipart/form-data",
      },})
      alert('Promotion updated successfully');
      window.location.href = "/displaypromotion";
    } catch (error) {
      console.error('error updating data:',error);
      alert("Error updating item")
    }
    } 
    

  

  return (
    <div>
      <h1>Update promotion</h1>
      <p className='Topic'>Add Promotions</p>
    <div className='form_group'>
      <div className='form-sub-group'>
       <form id='promotionID' onSubmit={onsubmit}>
        
    
        
          <label for='name'>Name:</label>
          <input type='text' id='name' name='name' onChange={onInputChange} value={fromData.name} required /><br/><br/><br/>
        
        
          <label for='startDate'>Start Date:</label>
          <input type='Date' id='startDate' name='startDate' onChange={onInputChange} value={fromData.startDate} required /><br/><br/><br/>
        
        
          <label for='endDate'>End Date:</label>
          <input type='Date' id='endDate' name='endDate' onChange={onInputChange} value={fromData.endDate} required /><br/><br/><br/>
        
       
          <label for='itemImage'>Item Image:</label>
          <input type='file' id='itemImage' name='itemImage' accept='image/*' onChange={onInputChange} /><br/><br/><br/>
        
        <button type='submit' className='addButton'>Add Promotion</button>
       </form>
      </div>

    </div>
    </div>
  )
}

export default UpdatePromotionss
