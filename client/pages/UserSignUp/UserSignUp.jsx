import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./usersignup.css"
export const UserSignUp = () => {
    const [password,setPassword]=useState("")
  const [userName,setUserName]=useState("")
  const [role,setRole]=useState("")
  const navigate = useNavigate();
  const handleRadioChange = (event) => {
    setRole(event.target.value);
  };
    const handleSignUp= async (e)=>{
        e.preventDefault()
        const res=await fetch(`http://localhost:3002/signup`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({username:userName,password:password,role})
        })
        if(res.ok){
            alert("User Created sucessfully")
            navigate("/login")
        }

      }
  return (
    <div className='loginWrapper'>
    <div className="logincontainer">
      <div className="headingDiv">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSignUp}>
        <div >
          <label htmlFor="userBox">User Name</label>
          <div className="userDiv">
            <input type="text" id="username" required onChange={(e)=>{setUserName(e.target.value)}} />
          </div>
        </div>
        <div>       
          <label htmlFor="userBox" id="pass">Password</label>
          <div className="passDiv">
            <input type="password" id="username" required onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
        </div>
        <div className='rb'>
          <div>
            <label htmlFor="ad">Seller</label>
            <input type="radio" name='ad' value="admin" checked={role === "admin"} onChange={handleRadioChange} />
          </div>
          <div>
            <label htmlFor="ad">Buyer</label>
            <input type="radio" name='ad' value="user" checked={role === "user"} onChange={handleRadioChange} />
          </div>
        </div>
        <div className="butDiv">
          <button className="sub">Sign up</button>
        </div>
      </form>
    </div>
  </div>
  )
}
