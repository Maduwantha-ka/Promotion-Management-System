import React, { useEffect ,useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  useParams } from 'react-router-dom'

function UpdateUserProfile() {
const{id}= useParams();
const[formData,setFormData] = useState({
    name:"",
    email:"",
    password:"",
    phone:""
})
const navigate = useNavigate();
useEffect(()=>{
    const fetchData = async() =>{
        try{
            const response = await axios.get(`http://localhost:8080/user/${id}`);
            const itemData = response.data;
            setFormData({
                name:itemData.name ||'',
                email:itemData.email ||'',  
                password:itemData.password ||'',
                phone:itemData.phone ||''
            });
        } catch(err){
            console.error("Error fetching user data:", err);
        }
    }
    fetchData();
},[id])
const onInputChange = (e) =>{
    const {name,value} = e.target
    setFormData({...formData,[name]:value});
}
const onSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await axios.put(`http://localhost:8080/user/${id}`,formData);
        alert("User profile updated successfully");
        window.location.href="/userprofile";
    } catch(err){
        alert("Error updating user profile" + err);
    }
}

  return (
    <div>
        <h1>Update Profile</h1>
    <form onSubmit={(e)=>onSubmit(e)}>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" onChange={onInputChange} value={formData.name} required /><br/><br/><br/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" onChange={onInputChange} value={formData.email} required /><br/><br/><br/>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={onInputChange} value={formData.password} required /><br/><br/><br/>

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" onChange={onInputChange} value={formData.phone} required /><br/><br/><br/>

        <button type="submit">Update</button>
    </form>
    </div>
  )
}

export default UpdateUserProfile
