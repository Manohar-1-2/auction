import React from 'react'
import "./loginpage.css"
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'

export const LoginPage = ({setIslogin,setLogedUser}) => {
  const [password,setPassword]=useState("")
  const [userName,setUserName]=useState("")
  const navigate = useNavigate();
  const handleLogin= async (e)=>{
    e.preventDefault()
    const ascessTok=await fetch(`http://localhost:3002/login`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({username:userName,password:password})
    })
    const {acessTok,username,role}= await ascessTok.json()
    localStorage.setItem('accessToken', acessTok)
    console.log(acessTok)
    setIslogin(true)
    setLogedUser({username,role})
    navigate("/userpage")
  }
  return (
    <div className='loginWrapper'>
      <div className="logincontainer">
        <div className="headingDiv">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleLogin}>
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
            <Link to={"/signup"} className='paraa'>Don't have an Account click<br></br> to register</Link>
          <div className="butDiv">
            <button className="sub">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
