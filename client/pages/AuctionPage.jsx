import React from 'react'
import io from "socket.io-client"
import { useEffect } from 'react'
import { useState } from 'react'
import CountdownTimer from '../componets/CountdownTimer'
import BidForm from '../componets/BidForm'
import { PlacedBids } from '../componets/PlacedBids'
import { AuctionCard } from '../componets/Auctioncard/AuctionCard'
//const scoket=io.connect("http://localhost:3001")

export const AuctionPage = ({details}) => {
  const [scoket,setScoket]=useState()
  const [seconds, setSeconds] = useState(60); // Initial countdown time in seconds
  const [isActive, setIsActive] = useState(false);
  const [img,setImg]=useState();
  const [bid, setBid] = useState('');
  const [startingBid, setStaringBid] = useState('');
  const [currentPlacedBid, setCurrentPlacedBid] = useState('');
  const [placedBidList,setPlacedBidList]=useState([])
  const [joinedUserArray,setJoinedUserArray]=useState([])
  
  useEffect(()=>{
    const storedAccessToken = localStorage.getItem('accessToken');
    const scoket = io('http://localhost:3001', {
    auth: {
      token:  storedAccessToken,
    },
  });
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

  return (
    <div>
    <div className='cont'>
        <div className="imgbox">
            <img src={`data:image/png;base64,${img}`} alt="" />
        </div>
        <div className="contentbox">
            <p>ItemName : {details.itemName}</p>
            <p>price : {details.price}</p>
            <p>description : {details.des}</p>
        </div>
    </div>
      {joinedUserArray.map((user)=><p key={user}>{user}</p>)}
      <CountdownTimer seconds={seconds} setSeconds={setSeconds} isActive={isActive} setIsActive={setIsActive}/>
      {isActive?<p>starting bid price is {startingBid}</p>:<p></p>}
      <PlacedBids  setPlacedBidList={setPlacedBidList} placedBidList={placedBidList}/>
      <button onClick={handleStartAuction}>start</button>
    </div>
  )
}
