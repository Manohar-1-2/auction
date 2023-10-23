import React from 'react'
import { useEffect,useRef } from 'react'
export const PlacedBids = ({placedBidList}) => {
    return (
        <div className='placedBid'>
            {placedBidList.map((e)=>(<p style={{margin:10}}>{`${e[0]} placed bid : ${e[1]} `}</p>))}
        </div>
  )
}
