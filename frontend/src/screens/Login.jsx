import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {FaHouseUser, FaSignInAlt, FaRegUser} from 'react-icons/fa'
import { useLoginMutation } from '../slices/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Login =  () => {
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [login, {isLoading, isError}] = useLoginMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.auth);
  

  useEffect(() =>{
    if(user.userInfo?.name){
      
      navigate("/profile", { replace: false });
      // toast.success('Already logged in!', {
      //   toastId: 'loggedin1',
      // })
    }
  },[navigate, user]);

  
  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}))
      
      navigate('/profile');
      toast.success('Login successful', {
        toastId: 'login1',
      })
    }catch(err){
      toast.error(err?.data?.message)
    }
    
  }
  return (
    <>
      <div className="max-w-xl mx-auto bg-slate-500 px-4 py-10 mt-10 rounded">
        <h1 className=' text-3xl font-bold mb-6 text-white flex gap-2 items-center justify-center '><FaRegUser /> Login</h1>
        <form className='max-w-80 mx-auto' onSubmit={submitHandler}>
          <div className="flex justify-start gap-2 text-white flex-col mb-3">
            <label htmlFor="email">Email:</label>
            <input className='px-4 py-2 rounded text-black' id="email" type="email" placeholder='email....' value={email} onChange = {(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="flex justify-start gap-2 text-white flex-col">
            <label htmlFor="password">Password:</label>
            <input className='px-4 py-2 rounded text-black' id="password" type="password" placeholder='Password....' value={password} onChange = {(e)=>{setPassword(e.target.value)}} />
          </div>

          <button type='submit' className='px-7 py-3 bg-red-400 text-white mx-auto mt-3 hover:bg-gray-600 rounded'>Login!</button>

        </form>
        <p className='text-center mt-4 text-white text-xs'>Don't have an account? <Link className='underline' to="/register">Sign Up</Link></p>
      </div>
    </>
  )
}

export default Login