import React from 'react'
import { useEffect,useRef } from 'react'
export const PlacedBids = ({placedBidR,placedBidList,setPlacedBidList,scoket}) => {
    const effectRan=useRef(false)

    useEffect(()=>{
        if(effectRan.current===false){
            placedBidR()
            return(()=>{effectRan.current=true})
        }
    },[scoket])
    return (
        <div>
            {placedBidList.map((e)=>(<p>{`${e[0]}  ${e[1]} `}</p>))}
        </div>
  )
}
