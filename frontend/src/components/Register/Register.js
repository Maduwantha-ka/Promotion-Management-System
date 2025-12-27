import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Register() {

    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:"", 
        email:"", 
        password:"", 
        phone:""
    });
    const{name,email,password,phone} = user;

    const onInputChange = async (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user);
        alert("Registration Successful");
        window.location.href= "/userprofile";
        // window.location.reload();
    }
  return (
    <div>
        <h1>This is user Profile Creation Page</h1>
    <form onSubmit={(e)=>onSubmit(e)}>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" onChange={(e) =>onInputChange(e)} value={name} required /><br/><br/><br/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e) =>onInputChange(e)} value={email} required /><br/><br/><br/>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={(e) =>onInputChange(e)} value={password} required /><br/><br/><br/>

        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" onChange={(e) =>onInputChange(e)} value={phone} required /><br/><br/><br/>

        <button type="submit">Add User Profile</button>
    </form>
    </div>
  )
}

export default Register
