import React, { useState } from 'react'
import axios from 'axios';
import './Login.css';



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
            window.location.href="/displaypromotion";
            // window.location.href="/userprofile";
        }else{
            alert("Invalid Credentials");
        }
        }catch(err){
            alert("Invalid Credentials");
            window.location.href="/login";
        }
    
}
  return (
    <div >
      
      
      <div className='login main page' >
      <div className='formCreation'>
      <form onSubmit={(e)=>onSubmit(e)}>
      
        <h2>Login Page</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" onChange={(e) =>setEmail(e.target.value)} value={email} required /><br/><br/><br/>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={(e) =>setPassword(e.target.value)} value={password} required /><br/><br/><br/>

        <button type="submit">User Login</button>
        <h3>If you are an admin, please login here </h3>
        <button onClick={()=>(window.location.href='/adminlogin')}>Admin Login</button>
    </form>
    </div>
    </div>
    </div>
  )
}

export default Login
