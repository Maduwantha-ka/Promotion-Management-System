import React from 'react';
import {Route, Routes} from 'react-router';
import Home from './components/Home/Home';
import AddPromotion from './components/AddPromotion/AddPromotion';
import DisplayPromotion from './components/DisplayPromotion/DisplayPromotion';
import UpdatePromotion from'./components/UpdatePromotions/UpdatePromotionss';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import UserProfile from './components/UserProfile/UserProfile';
import UpdateUserProfile from './components/UpdateUserProfile/UpdateUserProfile';


  

function App() {
  return (
  <div>
<React.Fragment>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/addpromotion" element={<AddPromotion/>}/>
      <Route path="/displaypromotion" element={<DisplayPromotion/>}/>
      <Route path="/updatepromotion/:id" element={<UpdatePromotion />}/>
      {/* User Creation management */}
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/userprofile" element={<UserProfile />}/>
      <Route path="/updateprofile/:id" element={<UpdateUserProfile />}/>

      
    </Routes>
</React.Fragment>
  </div>);
  
}

export default App;
