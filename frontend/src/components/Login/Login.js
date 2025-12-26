import React, { useState } from 'react'
import axios from 'axios';

function Login() {

const[email,setEmail] = useState('');
const[password,setPassword] = useState('');

const onSubmit = async(e) =>{
    e.preventDefault();
    const loginDetails = {email,password};

    try{
        const response = await axios.post("http://localhost:8080/login", loginDetails);
        if(response.data.id){
            localStorage.setItem('userId', response.data.id);
            alert("Login Successful");
            window.location.href="/userprofile";
        }else{
            alert("Invalid Credentials");
        }
        }catch(err){
            alert("Invalid Credentials");
            window.location.href="/login";
        }
    
}
  return (
    <div>
      <form onSubmit={(e)=>onSubmit(e)}>
      

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e) =>setEmail(e.target.value)} value={email} required /><br/><br/><br/>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={(e) =>setPassword(e.target.value)} value={password} required /><br/><br/><br/>

        <button type="submit">Login</button>
    </form>
    </div>
  )
}

export default Login
