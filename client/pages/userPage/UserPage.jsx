import React from 'react'
import "./userpage.css"
import { Link } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import { RegPage } from '../regpage/RegPage'
import { MyAuctionPage } from '../myAutionspage/MyAuctionPage'
export const UserPage = ({logedUser}) => {
   
  return (
    
    <div className='page'>

        
        <p>
          Welcome {logedUser}
        </p>
        <div className="opt">
          <Link className='b' to={"reg"}>
            Register Auction
          </Link>
          <Link className='b' to={"myauctions"}>
            My Auctions
          </Link>
          <Link className='b' to={"allauctions"}>
            Join Auctions
          </Link>
        </div>
    </div>
  )
}
