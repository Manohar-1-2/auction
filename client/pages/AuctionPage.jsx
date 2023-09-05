import React from 'react'
import io from "socket.io-client"
import { useEffect } from 'react'
import { useState } from 'react'
import CountdownTimer from '../componets/CountdownTimer'
import BidForm from '../componets/BidForm'
import { PlacedBids } from '../componets/PlacedBids'
const scoket=io.connect("http://localhost:3001")

export const AuctionPage = () => {
    
  const [seconds, setSeconds] = useState(60); // Initial countdown time in seconds
  const [isActive, setIsActive] = useState(false);

  const [bid, setBid] = useState('');
  const [startingBid, setStaringBid] = useState('');
  const [currentPlacedBid, setCurrentPlacedBid] = useState('');
  const [placedBidList,setPlacedBidList]=useState([])

  const handleBid = (event) => {
    event.preventDefault();
    if(bid<=currentPlacedBid){
      alert("placed higher bid amount than current Amount")
    }
    else{
      scoket.emit("bid",bid)
      setBid('')
    }

     
  };
  const handleStartAuction=()=>{
    scoket.emit("start")
  }
  const timerStartEvent= async ()=>{
    scoket.on("startTimer",()=>{
      console.log("timer started")
      setIsActive(true)
    })
  }
  const auctionStartEvent= async ()=>{
    scoket.on("startAuction",(startingAmount)=>{
      console.log("timer started")
      setIsActive(true)
      setStaringBid(startingAmount)
      setCurrentPlacedBid(startingAmount)
    })
  }
  const placedBidR=()=>{
    scoket.on("placedBid",(id,bidAmount)=>{
      setPlacedBidList((prevBids)=>[...prevBids,[id,bidAmount]])
      setCurrentPlacedBid(bidAmount)
    })
  }
  const timerResetEvent= async ()=>{
    scoket.on("resetTimer",()=>{
      console.log("timer reseted")
      setSeconds(60)
    })
  }

  const auctionEndEvent=()=>{
    scoket.on("auctionEnd",(winner)=>{
      alert(`Auction Ended winner is ${winner}`)
    })
  }
  
  useEffect(()=>{
    auctionStartEvent()
    timerResetEvent()
    auctionEndEvent()
  },[scoket])


  return (
    <div>
        <button onClick={handleStartAuction}>Start Auction</button>
      <BidForm handleBid={handleBid} setBid={setBid} bid={bid}/>
      <CountdownTimer seconds={seconds} setSeconds={setSeconds} isActive={isActive} setIsActive={setIsActive}/>
      {isActive?<p>starting bid price is {startingBid}</p>:<p></p>}
      <PlacedBids placedBidR={placedBidR} setPlacedBidList={setPlacedBidList} scoket={scoket} placedBidList={placedBidList}/>

    </div>
  )
}
