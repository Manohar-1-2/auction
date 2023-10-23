import React, { useEffect, useState } from 'react'
import "./autioncard.css"
export const AuctionCard = ({details,buttontext,handle,handlestart,t,handleJoinAuc}) => {
    const [img,setImg]=useState("")
    useEffect(()=>{
        const blob = new Blob([details.img.data], { type: 'image/png' });
        const base64String = btoa(String.fromCharCode(...new Uint8Array(details.img.data)))
        setImg(base64String)
    },[])
  return (
    
    <div className='cont'>
        <p>auction card</p>
        <div className="imgbox">
            <img src={`data:image/png;base64,${img}`} alt="" />
        </div>
        <div className="contentbox">
            <p>ItemName : {details.itemName}</p>
            <p>price : {details.price}</p>
            <p>description : {details.des}</p>
            {details.status?<p>Status: {details.status}</p>:<></>}
            <p>JoinedUsers :</p>
            <div className="usersjoined">
                {details.joinedUser.length!=0?<table className='tab'>
                    <th className='tabh'>UserName</th>
                    {details.joinedUser.map((e)=>(<tr key={e}><td className='tabd'>{e}</td></tr>))}
                </table>:<p>No one joined in this Auction yet</p>}
            </div>
        </div>
        {details.status!="completed"?<button className="start" onClick={()=>{handle(details)}}>{buttontext}</button>:<></>}
            
    </div>
  )
}
