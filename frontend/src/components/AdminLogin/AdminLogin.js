import React ,{useState}from 'react'

function AdminLogin() {
const[credentials,setCredentials] = useState({
    username:"",
    password:""
});
const[error,setError] = useState('')
const{username,password} = credentials;

const onInputChange = (e) =>{
    setCredentials({
        ...credentials,[e.target.name]: e.target.value
    })
}
const onSubmit =(e) =>{
    e.preventDefault()
    if(username === 'admin' && password === '123'){
        alert("Admin Login Successful");
        // this is the path called
        window.location.href= '/userprofile'
        // setError('')
    }else{
        alert("Invalid Admin Credentials");
        
    }
}
  return (
    <div>
        <h1>This is Admin Login Page</h1>
        <form onSubmit={onSubmit}>
      

               <label for="username">UserName:</label>
        <input type="text" id="username" name="username" onChange={onInputChange} value={username} required /><br/><br/><br/>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" onChange={onInputChange} value={password} required /><br/><br/><br/>

        <button type="submit">Login</button>
        
    </form>
      
    </div>
  )
}

export default AdminLogin
