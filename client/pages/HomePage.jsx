import React from 'react'
import { NavBar } from '../componets/navbar/NavBar'
import { HeroSeection } from '../componets/HeroSeaction/HeroSeection'
import { UserPage } from './userPage/UserPage'
import "./homepage.css"
import { Outlet, Route, Routes } from 'react-router-dom'
import { RegPage } from './regpage/RegPage'
import { MyAuctionPage } from './myAutionspage/MyAuctionPage'
import { useNavigate } from 'react-router-dom'
export const HomePage = ({islogin,logedUser,setIslogin}) => {
  const nav=useNavigate()
  return (
    <div>
        <div className="contpage">
        <NavBar islogin={islogin} setIsLogin={setIslogin} logedUser={logedUser}/>
        
        <Outlet/>
        </div>  
    </div>
  )
}
