import React from 'react'
import './NavBar.css'
import {Link, Outlet} from 'react-router-dom'
import { LoginPage } from '../../pages/loginpage/LoginPage'
import { useNavigate } from 'react-router-dom'
export const NavBar = ({islogin,setIsLogin}) => {
  const nav=useNavigate()
  const handleLogout= async()=>{
    const storedAccessToken = localStorage.getItem('accessToken');
    const res=await fetch("http://localhost:3002/logout",{
      method: 'POST',
      headers: {  Authorization: `Bearer ${storedAccessToken}` },
    })
    if(res.ok){
      alert("Logout Sucessfull")
      localStorage.removeItem("accessToken")
      setIsLogin(false)
      nav("/")
    }
  }
  return (
    <>
    <div className='navCont'>
        <div className="navWrapper">
            <div className="logo">
                <p>Auction Project</p>
            </div>
            <div className="links">
                {islogin?
                 <Link to={"/userpage"} className='linkCont'>
                     Home
                </Link>
                :
                <Link to={"/"} className='linkCont'>
                     Home
                </Link>
                }
                <Link to={"/about"} className='linkCont'>
                     About Us
                </Link>
                <div className="linkCont"><a href="">Contact us</a></div>
             
                <div className="linkCont">
                  {islogin?
                    <div className='loginlink' onClick={handleLogout}>
                        LogOut
                    </div>:
                    <Link to={"login"} className='loginlink'>
                         Login
                    </Link>
                    }

                </div>
              
               
            </div>
        </div>
    </div>

    </>
  )
}
