import React from 'react'
import "./regpage.css"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const RegPage = () => {
  const [itName,setItName]=useState("")
  const [price,setPrice]=useState("")
  const [des,setDes]=useState("")
  const [file,setFile]=useState("")
  const navigate = useNavigate();

  const formdata=new FormData()
  const handlefile =(e)=>{
    const file=e.target.files[0]
    formdata.append("file",file)
  }

  const handleSub= async(e)=>{
    e.preventDefault()
    const storedAccessToken = localStorage.getItem('accessToken');
    const details={itName,price,des}
    formdata.append("file",file)
    formdata.append("itemname",itName)
    formdata.append("price",price)
    formdata.append("des",des)


    const res=await fetch("http://localhost:3002/posts",{
      method: 'POST',
      headers: { Authorization: `Bearer ${storedAccessToken}`},
      body:formdata
    })

    console.log(res.status)
    if(res.status==200){
      alert("Auction Sucessfully Registered ")
      navigate("/userpage")
    }
  }

  return (
    <div className='Page'>

        <div className="Opt">
            <div className="head"><p>Register Auction</p></div>
            <div className='bd'>
              <form onSubmit={handleSub} className='form'>
                <label htmlFor="itemname">Enter Item Name</label>
                <input type="text" className="itemname" onChange={(e)=>setItName(e.target.value)} required />
                <label htmlFor="price">Starting Bid Price: </label>
                <input type="text" className="price" onChange={(e)=>setPrice(e.target.value)}  />
                <label htmlFor="des">Description</label>
                <textarea name="des" id="" cols="20" rows="8" className='textarea' onChange={(e)=>setDes(e.target.value)} ></textarea>
                <label htmlFor="file" >Upload Item Image</label>
                <input type="file" onChange={handlefile}  />
                <div className="sub"><button className='b'  type='submit'>Register</button></div>
              </form>
            </div>
            
            
        </div>
    </div>
  )
}
