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
          Welcome {logedUser.username}
        </p>
        <div className="opt">
          {logedUser.role=="admin"?
            <>
              <Link className='b' to={"reg"}>
                Create Auction
              </Link>
              <Link className='b' to={"myauctions"}>
                My Auctions
              </Link>
            </>
            :<>
              <Link className='b' to={"allauctions"}>
               Register for Auction
              </Link>
              <Link className='b' to={"joininAuc"}>
                Join Auction
              </Link>
            </>
          }
          

         
        </div>
    </div>
  )
}
