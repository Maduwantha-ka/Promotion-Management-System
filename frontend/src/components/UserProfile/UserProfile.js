import axios from 'axios';
import React,{useEffect,useState} from 'react'

function UserProfile() {
    const[user,setUser] = useState(null);
    const[loading,setLoading] = useState(null);
    const[error,setError] = useState(null);

    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        if(!userId){
            setError("No user logged in");
            setLoading(false)
            return;
        }
        axios.get(`http://localhost:8080/user/${userId}`)
        .then(response =>{
            setUser(response.data);
            setLoading(false);
        })
        .catch(err =>{
            setError("Error fetching user data");
            setLoading(false);
        });
    },[]);
    const UpdateNavigate =(id)=>{
        window.location.href = `/updateprofile/${id}`
    }

    // delete Function
    const deleteAccount = async()=>{
        const confirmation = 
        window.confirm("Are you sure you want to delete your account?");
        if(confirmation){
            try{
                await axios.delete(`http://localhost:8080/user/${user.id}`);
                alert("Account deleted successfully");
                localStorage.removeItem('userId');
                window.location.href = '/register';
            }catch(error){
                alert("Error deleting account");
            }
        }
    }
    if(loading)
        return <p>Loading...</p>;
    if(error)
        return <p>{error}</p>;
    
    return (
    <div>
        <div>
            <h1>Welcome to User Profile Page</h1>
        </div>
        <div>
            <button onClick={()=>window.location.href='/register'}>Add User</button>
        </div>
        <h2>User Profile</h2>
        {user ?(
            <div>
                <p>Name:{user.name}</p>
                <p>Email:{user.email}</p>
                <p>Passowrd:{user.password}</p>
                <p>Phone:{user.phone}</p>
                 <button onClick={()=>UpdateNavigate(user.id)}>update</button>
                 <button onClick={()=>deleteAccount(user.id)}>Delete</button>
            </div>
        ):(<p>No user data available</p>
        )}
    </div>
  )
}

export default UserProfile
