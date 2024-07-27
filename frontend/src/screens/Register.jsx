import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FaHouseUser, FaSignInAlt, FaRegUser} from 'react-icons/fa'
import { useRegisterMutation } from '../slices/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'


const Register =  () => {
  const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [confirmPassword, setConfirmPassword]= useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading, isError, error}] = useRegisterMutation();
  const user = useSelector(state => state.auth);
  

  useEffect(() => {
    if(user.userInfo?.name){
      toast.success("Already registered and logged in!",{
        toastId:'registered1'
      })
      navigate("/profile", { replace: false });
    }
  },[navigate]);



  const submitHandler = async(e) => {
    e.preventDefault();
    if(password ===''){
      toast.error("Password can't be empty!");
      return;
    }

    if(name ===''){
      toast.error("Name can't be empty!");
      return;
    }
    if( password === confirmPassword){
      try {
        const res = await register({name, email, password}).unwrap();
        console.log(res)
        // if(res.)
        toast.success("Registration completed successfully!");
        dispatch(setCredentials({...res}))
        navigate("/profile")        
      } catch (error) {
        console.log(error)
        if(error.data.message === "User already exists!"){
          toast.error("User already exists!");
        }else{
          toast.error("Something went wrong, Please try again!");
        }
      }


    }else{
      toast.error("Password and  Confirm Passowrd did not match!");
    }

    
  }
  return (
    <>
      <div className="max-w-xl mx-auto bg-slate-500 px-4 py-10 mt-10 rounded">
        <h1 className=' text-3xl font-bold mb-6 text-white flex gap-2 items-center justify-center '><FaRegUser /> Register</h1>
        <form className='max-w-80 mx-auto' onSubmit={submitHandler}>
          <div className="flex justify-start gap-2 text-white flex-col mb-3">
            <label htmlFor="email">Name:</label>
            <input className='px-4 py-2 rounded text-black' id="name" type="txt" placeholder='Name....' value={name} onChange = {(e)=>{setName(e.target.value)}} />
          </div>
          <div className="flex justify-start gap-2 text-white flex-col mb-3">
            <label htmlFor="email">Email:</label>
            <input className='px-4 py-2 rounded text-black' id="email" type="email" placeholder='email....' value={email} onChange = {(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="flex justify-start gap-2 text-white flex-col">
            <label htmlFor="password">Password:</label>
            <input className='px-4 py-2 rounded text-black' id="password" type="password" placeholder='Password....' value={password} onChange = {(e)=>{setPassword(e.target.value)}} />
          </div>
          <div className="flex justify-start gap-2 text-white flex-col">
            <label htmlFor="password">Confirm Password:</label>
            <input className='px-4 py-2 rounded text-black' id="password" type="password" placeholder='Confirm Password....' value={confirmPassword} onChange = {(e)=>{setConfirmPassword(e.target.value)}} />
          </div>

          <button type='submit' className='px-7 py-3 bg-red-400 text-white mx-auto mt-3 hover:bg-gray-600 rounded'>Register!</button>

        </form>
        <p className='text-center mt-4 text-white text-xs'>Already registered? <Link className='underline' to="/login">Login</Link></p>
      </div>
    </>
  )
}

export default Register