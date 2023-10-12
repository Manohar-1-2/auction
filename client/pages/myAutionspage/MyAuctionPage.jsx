import React, { useState } from 'react'
import "./myauctionpage.css"
import { useEffect } from 'react'
import { AuctionCard } from '../../componets/Auctioncard/AuctionCard'
import { useNavigate } from 'react-router-dom'

export const MyAuctionPage = ({setCurrAc}) => {
    const [itemname,setItemName]=useState("")
    const [price,setPrice]=useState("")
    const [isEmpty,setIsEmpty]=useState(false)
    const [img,setImg]=useState("")
    const [det,setDet]=useState([])
    const navigate = useNavigate();
    const storedAccessToken = localStorage.getItem('accessToken');
``
    const handleget=async ()=>{
        const res=await fetch("http://localhost:3002/getmyauc",{
            method: 'GET',
            headers: { Authorization: `Bearer ${storedAccessToken}`}
          })
          if(res.status==200){
            const details= await res.json()
            setDet(details)
          }
          else if(res.status==204){
            setIsEmpty(true)
          }

       }

    useEffect(()=>{
        handleget()
    },[])
    const handlestart=async(details)=>{
      
      const res=await fetch("http://localhost:3002/start",{
        method: 'POST',
        headers: { Authorization: `Bearer ${storedAccessToken}`,'Content-Type': 'application/json'},
        body:JSON.stringify({id:details._id})
      })
      console.log(res.ok)
      if(res.ok){
        
        navigate("/auction")
      }
      
    }
  return (
    <div className='pagebox'>
       {!isEmpty?det.map((e)=>
        <div key={e.price}>
          <AuctionCard details={e} key={e._id} buttontext={"Start Auction"} handlestart={handlestart} t={2}/>
        </div>
       ):<p>You have no auctions</p>}
      
    </div>
    
  )
}
