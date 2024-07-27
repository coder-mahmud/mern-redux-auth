import React, { useState,useEffect } from "react";
import { useEditProfileMutation } from "../slices/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { FaLock, FaEnvelope,FaUser,FaPencilAlt,FaWindowClose    } from "react-icons/fa";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [editing, setEditing]= useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [data, {isLoading, isError, error}] =  useEditProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  
  const user = useSelector((state) => state.auth.userInfo);
  //console.log(user);

  useEffect(()=>{
    if(user){
      setName(user.name);
      setEmail(user.email);
    }else{
      toast.error("You need to login to view this page!")
      navigate('/login')
    }
    
  },[])

  const bodyData = {
    name, email, password
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if(confirmPassword !== password){
      toast.error('Password do not matched!', {
        toastId: 'pass1',
      })
      return;
    }
    if(!password && user.name === name && user.email === email){
      toast.error('You did not change anything, don\'t try to be over smart!', {
        toastId: 'edit2',
      })
      return;
    }
    const apiRes = await data(bodyData).unwrap();
    console.log(apiRes);
    dispatch(setCredentials(apiRes))
    setEditing(false)
    toast.success('Editing is successful!', {
      toastId: 'edit1',
    })
  };

  const cancelHandler = () =>{
    toast.error('Editing cancelled!', {
      toastId: 'cancel1',
    })
  }

  const toggleEdit = () =>{
    setEditing(!editing)
  }

  const content = editing ? (
    <>
      <div className="profile_edit ">
      <p className="text-3xl mb-4">Edit your profile:</p>
      <form action="" className="max-w-96" onSubmit={formSubmitHandler}>
        <div className="form_group flex flex-col gap-2 mb-5 ">
          <label htmlFor="name" className="flex flex-row gap-2 items-center"><FaUser /><span className="font-bold">Name:</span></label>
          <input type="text" id="name" className="text-black px-2 py-1 rounded-sm" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form_group flex flex-col gap-2 mb-5 ">
          <label htmlFor="email" className="flex flex-row gap-2 items-center"><FaEnvelope /><span className="font-bold">Email:</span></label>
          <input type="text" id="email" className="text-black px-2 py-1 rounded-sm" value={email} onChange = {(e) => setEmail(e.target.value)} />
        </div>
        <div className="form_group flex flex-col gap-2 mb-5 ">
          <label htmlFor="password" className="flex flex-row gap-2 items-center"><FaLock /><span className="font-bold"> Password:</span></label>
          <input type="text" id="password" className="text-black px-2 py-1 rounded-sm" value={password} onChange = {(e) => setPassword(e.target.value)} />
        </div>
        <div className="form_group flex flex-col gap-2 mb-5 ">
          <label htmlFor="confirmPassword" className="flex flex-row gap-2 items-center"><FaLock /><span className="font-bold">Confirm Password:</span></label>
          <input type="text" id="confirmPassword" className="text-black px-2 py-1 rounded-sm" value={confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form_group flex flex-col gap-2 mb-5 ">
          <button type="submit" className="bg-slate-600 text-white border-white  border-2 rounded py-1 hover:text-slate-900 hover:bg-white">Confirm Edit</button>
        </div>
      </form>
    </div>   
    
    </>
  ) : (
    <>
      <div className="flex justify-between "><h1 className="text-3xl mb-4">Welcome <span className="font-bold"> {user?.name}</span></h1> </div>
      
      <p className="text-xl">Profile Info:</p>
      <p className="tex-lg"><span className="font-bold">User ID : </span>{user?._id}</p>
      <p className="tex-lg"><span className="font-bold">Name : </span>{user?.name}</p>
      <p className="tex-lg"><span className="font-bold">Email : </span>{user?.email}</p>
    </>
  )

  return (
    <>
      <div className="relative profile_info max-w-4xl md:mx-auto my-10 bg-slate-700 p-10 rounded-lg text-white mx-4 pt-24 md:pt-10">
        <a  className="editIcon absolute right-4 top-4 h-14 w-14 md:h-24 md:w-36 cursor-pointer flex flex-col justify-center items-center rounded p-4 border-2 hover:bg-gray-500 " onClick={toggleEdit}>{ editing ? (<div onClick={cancelHandler} className="flex items-center justify-center flex-col"><FaWindowClose className="w-6 h-6" /> Cancel Editing</div>) : (<><FaPencilAlt  className="w-6 h-6" /> Edit Profile</>) }</a>
        {content}





      </div>


    </>
  );
};

export default Profile;
