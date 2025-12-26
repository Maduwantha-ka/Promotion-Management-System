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
    if(loading)
        return <p>Loading...</p>;
    if(error)
        return <p>{error}</p>;
    
    return (
    <div>
        <h2>User Profile</h2>
        {user ?(
            <div>
                <p>Name:{user.name}</p>
                <p>Email:{user.email}</p>
                <p>Passowrd:{user.password}</p>
                <p>Phone:{user.phone}</p>
                 <button onClick={()=>UpdateNavigate(user.id)}>update</button>
            </div>
        ):(<p>No user data available</p>
        )}
    </div>
  )
}

export default UserProfile
