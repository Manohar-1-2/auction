import React from 'react'
import './heroSeaction.css'
export const HeroSeection = () => {
  return (
    <div className='heroWrapper'>
        <div className="heroRight">
            <div className="imgCont">
              <img src="../src/assets/auctionimg3-removebg.png" alt="" />
            </div>
        </div>
        <div className="heroLeft">
          <p className='heading'>
            Buy <br/>
            Sell Products <br/>
            Online
          </p>
        </div>
    </div>
  )
}
