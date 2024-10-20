import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Create.css'
import Navbar from '../components/Navbar';


function Create() {
    const [img, setImg] = useState("");
    const[name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState("");
    
    const navigate = useNavigate()

    function imgChange(e){
        setImg(e.target.value)
    }
    function nameChange(e){
        setName(e.target.value)
    }
    function urlChange(e){
        setUrl(e.target.value)
    }
    function priceChange(e){
        setPrice(e.target.value)
    }


    async function SubmitValues(e){
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:5000/create",{img, name, url, price, userID} )
            alert(response.data.message)
            navigate("/")
        } catch (error) {
            
        }
    }
    const userID = window.localStorage.getItem("UserID")
    
    
  return (
<div>
    <Navbar/>
    <div className='main-create-wrapper'>
        <form className='card-info'>
            <input className='subscribe-img' onChange={imgChange} value={img} placeholder='Imageurl'/>
            <input className='subscribe-name' onChange={nameChange} value={name} placeholder='Name'/>
            <input className='subscribe-url' onChange={urlChange} value={url} placeholder='url'/>
            <input className='subscribe-price' onChange={priceChange} value={price} placeholder='price'/> 
            <button className='card-submit' onClick={SubmitValues}>Submit</button>
        </form>
        
    </div>
   
</div>
  )
}

export default Create
