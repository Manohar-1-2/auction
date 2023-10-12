
import './App.css'
import io from "socket.io-client"
import { useEffect } from 'react'
import { useState } from 'react'
import CountdownTimer from '../componets/CountdownTimer'
import BidForm from '../componets/BidForm'
import { PlacedBids } from '../componets/PlacedBids'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {HomePage} from '../pages/HomePage'
import { AuctionPage } from '../pages/AuctionPage'
import { LoginPage } from '../pages/loginpage/LoginPage'
import { RegPage } from '../pages/regpage/RegPage'
import { NavBar } from '../componets/navbar/NavBar'
import { MyAuctionPage } from '../pages/myAutionspage/MyAuctionPage'
import { UserPage } from '../pages/userPage/UserPage'
import { HeroSeection } from '../componets/HeroSeaction/HeroSeection'
import { AllAuctions } from '../pages/allauctions/AllAuctions'
import { RegAuc } from '../pages/registeredAuc/RegAuc'
import { AuctionUserPage } from '../pages/auctionUserPage/auctionUserPage'
function App() {

  const [islogin,setIslogin]=useState(false)
  const [logedUser,setLogedUser]=useState("")
  const [currAc,setCurrAc]=useState("")
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage islogin={islogin} logedUser={logedUser} setIslogin={setIslogin}/>}>
            <Route index   element={<HeroSeection/>}/>
            <Route path='userpage'>
              <Route index element={<UserPage  logedUser={logedUser}/>}/>
              <Route path={"reg"} element={<RegPage/>}/>
              <Route path='allauctions' element={<AllAuctions logedUser={logedUser}/>}/>
              <Route path='myauctions'>
                <Route index element={<MyAuctionPage setCurrAc={setCurrAc}/>}/>
              </Route>
              <Route path='joininAuc' element={<RegAuc/>}/>
            </Route>
            <Route path={'login'} element={<LoginPage setIslogin={setIslogin} setLogedUser={setLogedUser}/>} />
          </Route> 
          <Route path={'auction'} element={<AuctionPage details={currAc}/>}/>
          <Route path={'auctionUser'} element={<AuctionUserPage/>}/>  
          
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
