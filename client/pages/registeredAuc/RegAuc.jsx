import React, { useState } from 'react'
import { useEffect } from 'react';
import { AuctionCard } from '../../componets/Auctioncard/AuctionCard';
import { useNavigate } from 'react-router-dom';
import "./reg.css"
export const RegAuc = ({setCurrUAc}) => {
    const [details,setDetails]=useState([]);
    const nav=useNavigate()
    const handleget=async()=>{
        const storedAccessToken = localStorage.getItem('accessToken');
        const res=await fetch("http://localhost:3002/getJoinedauc",{
            method: 'GET',
            headers: { Authorization: `Bearer ${storedAccessToken}`,'Content-Type': 'application/json'},
          })
        const det=await res.json()
        setDetails(det)
    }
    async function handleJoinAuc(details){
      setCurrUAc(details)
      const storedAccessToken = localStorage.getItem('accessToken');
      const res=await fetch("http://localhost:3002/join",{
        method: 'POST',
        headers: { Authorization: `Bearer ${storedAccessToken}`,'Content-Type': 'application/json'},
        body:JSON.stringify({id:details._id})
      })
      if(res.status==200){
        nav('/auctionUser')
      }
      else if(res.status==400){
        alert("auction is not started yet")
      }

      
    }
      useEffect(()=>{
        handleget()
    },[])
  return (
    <div className='reg'>
        {details.length!=0?details.map((det)=>(<div>
            <AuctionCard details={det} buttontext={"join"} handle={handleJoinAuc} t={3}/>
        </div>)):<p>You do not Register for any Auctions to join</p>}
    </div>
  )
}
