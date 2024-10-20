import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
function Auth() {
  return (
    <>
     <Navbar/>
     <Login/>
     <Register/>
    </>
   
  )
}

const Login = () => {

  const [username, SetUsername] = useState("")
  const [password, SetPassword] = useState("")
  const[_, setCookie] = useCookies(["acess_token"])
  const navigate = useNavigate();

  function GetUsername(e){
    SetUsername(e.target.value)
  }
  function GetPassword(e){
    SetPassword(e.target.value)
  }

  async function PostLogin(e){
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {username, password})
      SetUsername("");
      SetPassword("")
      setCookie("access_token", response.data.token)
      window.localStorage.setItem("UserID", response.data.userID)
      if(response.data.userID){
        navigate("/")
      }
      else{
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className='login-wrapper'>
      <form className='login-form'>
        <h2>Login</h2>
        <input className='username' onChange={GetUsername} />
        <input className='password' onChange={GetPassword}/> 
        <button className='submit-button' onClick={PostLogin}>Login</button>
      </form>
    </div>
  )
}


const Register = () => {
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");

  function GetUsername(e){
    SetUsername(e.target.value)
  }

  function GetPassword(e){
    SetPassword(e.target.value)
  }

  async function PostRegister(e){
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {username, password})
      alert(response.data.message)
      SetUsername("")
      SetPassword("")
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div className='register-wrapper'>
      <form className='register-form'>
        <h2>Register</h2>
        <input className='username' onChange={GetUsername} value={username} />
        <input className='password' onChange={GetPassword} value={password}/> 
        <button className='submit-button' onClick={PostRegister}>Register</button>
      </form>
    </div>
  )
}

export default Auth
