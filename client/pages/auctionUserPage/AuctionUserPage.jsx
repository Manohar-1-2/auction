import React, { useEffect } from 'react'
import { useTimer } from 'react-timer-hook';
import { useState } from 'react';
import CountdownTimer from '../../componets/CountdownTimer'
import { PlacedBids } from '../../componets/PlacedBids';
import BidForm from '../../componets/BidForm';
import io from "socket.io-client"

import "./AuctionUserPage.css"
export const AuctionUserPage = () => {
  const [joinedUserArray,setJoinedUserArray]=useState([])

const [scoket,setScoket]=useState()
const [seconds, setSeconds] = useState(60); // Initial countdown time in seconds
const [isActive, setIsActive] = useState(false);
const [img,setImg]=useState();
const [bid, setBid] = useState(0);
const [startingBid, setStaringBid] = useState('');
const [currentPlacedBid, setCurrentPlacedBid] = useState(0);
const [placedBidList,setPlacedBidList]=useState([])

useEffect(()=>{
  const storedAccessToken = localStorage.getItem('accessToken');
  const scoket = io('http://localhost:3001', {
  auth: {
    token:  storedAccessToken,
  },
});
scoket.emit("join")
scoket.on("joined",(newjoined)=>{
  
  setJoinedUserArray(newjoined)
})

scoket.on("placedBid",(id,bidAmount)=>{
  setPlacedBidList((prevBids)=>[...prevBids,[id,bidAmount]])
  setCurrentPlacedBid(bidAmount)
})
scoket.on("startTimer",()=>{
  console.log("timer started")
  setIsActive(true)
})
scoket.on("startAuction",(startingAmount)=>{
  console.log("timer started")
  setIsActive(true)
  setStaringBid(startingAmount)
  setCurrentPlacedBid(startingAmount)
})

scoket.on("resetTimer",()=>{
  console.log("timer reseted")
  setSeconds(60)
})
scoket.on("auctionEnd",(winner)=>{
  alert(`Auction Ended winner is ${winner}`)
})
setScoket(scoket)
return () => {
  scoket.disconnect();
};
},[])




  const handleJoin=async()=>{

  }
  const handleBid = () => {
    console.log(bid)
    if(bid<=currentPlacedBid){
      alert("placed higher bid amount than current Amount")
    }
    else{
      scoket.emit("bid",bid)
      setBid(0)
    }
  };


  return (
    <div className='main'>
      <div className="lcont">
          icon
      </div>
      <div className="rcont">
      <CountdownTimer seconds={seconds} setSeconds={setSeconds} isActive={isActive} setIsActive={setIsActive}/>
            <div className="joinedU">
              {joinedUserArray.map((user)=><p key={user}>{user}</p>)}
            </div>
           
            <div className="bidbox">
              <input
                    className='inpBox'
                    type="text"
                    onChange={(e)=>{setBid(e.target.value)}}
                  />
              <button onClick={()=>handleBid()}>placebid</button>
            </div>
           
            <p>starting bid price is {startingBid}</p>
            <PlacedBids setPlacedBidList={setPlacedBidList}  placedBidList={placedBidList}/>
            
      </div>
    </div>
  )
}
