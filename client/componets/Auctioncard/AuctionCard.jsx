import React, { useEffect, useState } from 'react'
import "./autioncard.css"
export const AuctionCard = ({details,buttontext,handlejoin,handlestart,t}) => {
    const [img,setImg]=useState("")
    useEffect(()=>{
        const blob = new Blob([details.img.data], { type: 'image/png' });
        const base64String = btoa(String.fromCharCode(...new Uint8Array(details.img.data)))
        setImg(base64String)
    },[])
  return (
    
    <div className='cont'>
        <div className="imgbox">
            <img src={`data:image/png;base64,${img}`} alt="" />
        </div>
        <div className="contentbox">
            <p>ItemName : {details.itemName}</p>
            <p>price : {details.price}</p>
            <p>description : {details.des}</p>
            <p>JoinedUsers :</p>

            <div className="usersjoined">
                {details.joinedUser.length!=0?<table className='tab'>
                    <th className='tabh'>UserName</th>
                    {details.joinedUser.map((e)=>(<tr key={e}><td className='tabd'>{e}</td></tr>))}
                </table>:<p>No one joined in this Auction yet</p>}
           
            </div>
        </div>
        
        {!t?<button className="start" onClick={()=>{handlejoin(details)}}>{buttontext}</button>:
        <button className="start" onClick={()=>{handlestart(details)}}>{buttontext}</button>}
    </div>
  )
}
