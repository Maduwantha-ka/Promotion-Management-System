import React from 'react'

function Home() {
  return (
    <div>
      <button onClick={()=>(window.location.href='/addpromotion')}>Add Promotion</button>
      <button onClick={()=>(window.location.href='/displaypromotion')}>Display Promotion</button>
      <button onClick={()=>(window.location.href='/register')}>Register</button>
      <button onClick={()=>(window.location.href='/login')}>Login</button>
    </div>
  )
}

export default Home
