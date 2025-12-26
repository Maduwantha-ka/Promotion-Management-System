import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DisplayPromotion() {
    const [promotion, setPromotion] = useState([]);
    const {id} = useParams();
    useEffect(()=> {
        loadPromotion();
    },[])
    const loadPromotion = async () => {
        const result = await axios.get("http://localhost:8080/promotion");
        setPromotion(result.data);
    }  
    const UpdateNavigate =(id)=>{
        window.location.href = `/updatepromotion/${id}`
    }
    const deleteItem = async(id)=>{
        const confirmationMessage = window.confirm(
            "Are you sure you want to delete this promotion?"
        )
        if (confirmationMessage) {
            try{
                await axios.delete(`http://localhost:8080/promotion/${id}`)
                loadPromotion();
                alert("Promotion deleted successfully");
            }catch(error){
                alert("Error Deleting Item")
        }
    }
}
  return (
    <div>
      <h1>Promotion Item</h1>
      <table>
        <thead>
            <tr>
                <th>Promotion Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Promotion Image</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {promotion.map((promotion,index)=>(
                <tr key={index}>
                    <td>{promotion.name}</td>
                    <td>{promotion.startDate}</td>
                    <td>{promotion.endDate}</td>
                    <td>
                        <img src={`http://localhost:8080/uploads/${promotion.itemImage}`}
                        alt={promotion.name}
                        width="50" height="50"
                        />
                    </td>
                        
                    <td>
                        <button onClick={()=>UpdateNavigate(promotion.id)}>update</button>
                        <button onClick={()=>deleteItem(promotion.id)}>Delete</button>
                    </td>
                    
                </tr>  
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DisplayPromotion
