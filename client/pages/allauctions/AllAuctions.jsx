import React, { useEffect, useState } from 'react'
import { AuctionCard } from '../../componets/Auctioncard/AuctionCard';
import "./allauctions.css"

export const AllAuctions = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const [details,setDetails]=useState([])
    const handleget=async ()=>{
        const res=await fetch("http://localhost:3002/auctionlist",{
            method: 'GET',
            headers: { Authorization: `Bearer ${storedAccessToken}`}
          })
          if(res.status==200){
            const details= await res.json()
            setDetails(details)
          }

       }
       const handlejoin=async (details)=>{
        console.log(details._id)
        const id=details._id
        const res=await fetch("http://localhost:3002/joinauc",{
            method: 'POST',
            headers: { Authorization: `Bearer ${storedAccessToken}`,'Content-Type': 'application/json'},
            body:JSON.stringify({id})
          })
          console.log(res.status)
          if(res.status==202){
            alert("you are alredy joined in this Auction")
          }
          else if(res.status==200){
            const details= await res.json()
            alert("sucessfully joined")
          }
       }
    useEffect(()=>{
        handleget()
    },[])
  return (
    <div className='allaucpage'>
        {details.map((details)=>(
        <div key={details.price}>
          <AuctionCard details={details} buttontext={"Join Auction"} handlejoin={handlejoin} t={false}/>
        </div>))
        }
    </div>
  )
}
