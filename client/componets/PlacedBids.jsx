import React from 'react'
import { useEffect,useRef } from 'react'
export const PlacedBids = ({placedBidList}) => {
    return (
        <div className='placedBid'>
            {placedBidList.map((e)=>(<p>{`${e[0]}  ${e[1]} `}</p>))}
        </div>
  )
}
