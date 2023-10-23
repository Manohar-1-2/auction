import React, { useRef } from 'react'
import io from "socket.io-client"
import "./AuctionPage.css"
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
  const ref=useRef()
  useEffect(()=>{
    const blob = new Blob([details.img.data], { type: 'image/png' });
    const base64String = btoa(String.fromCharCode(...new Uint8Array(details.img.data)))
    setImg(base64String)
    const storedAccessToken = localStorage.getItem('accessToken');
    const scoket = io('http://localhost:3001', {
    auth: {
      token:  storedAccessToken,
      aucid:details._id,
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
    ref.current.style.display="none";
    scoket.emit("start")
  }

  return (
    <div className='ap'>
      <div className='conta'>
          <div className="imgbox">
              <img src={`data:image/png;base64,${img}`} alt="" />
          </div>
          <div className="contentbox">
              <p>ItemName : {details.itemName}</p>
              <p>price : {details.price}</p>
              <p>description : {details.des}</p>
          </div>
      </div>
      <div className="action">
        <CountdownTimer seconds={seconds} setSeconds={setSeconds} isActive={isActive} setIsActive={setIsActive}/>
        <p>starting bid price is {details.price}</p>
        <div className="mb">
          <div className="joinedus">
            <p>Joined users Log</p>
            {joinedUserArray.map((user)=><p key={user} style={{margin:10}}>{user} Joined Auction Room</p>)}
          </div>
          <div className="bidsp">
            <p>Bids Placed</p>
            <PlacedBids  setPlacedBidList={setPlacedBidList} placedBidList={placedBidList}/>
          </div>
        </div>
        <div className="stbbox">
          <button onClick={handleStartAuction} className='stb' ref={ref}>start</button>
        </div>
      </div>
    </div>
  )
}
