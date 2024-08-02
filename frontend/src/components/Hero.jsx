import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Hero = () => {
  const user = useSelector(state => state.auth);
  // console.log("User",user)
  return (<>
    { user.userInfo ? (<>
    <div className="hero max-w-7xl mx-auto px-4">
      <div className="max-w-3xl bg-slate-300 mx-auto border rounded-md mt-10 md:mt-20 p-4 md:p-16">
        <h1 className='text-xl text-center '>Welcome <span className='font-bold'>{user.userInfo.name}</span>!</h1>
        <p className='text-lg text-center'>Thanks for registering!</p>
        <p className='text-lg text-center'>I will convert this app as a todo list app with current login authentication.</p>
      </div>
    </div>    
    </>) : (<>
 <div className="hero max-w-7xl mx-auto px-4">
      <div className="max-w-3xl bg-slate-300 mx-auto border rounded-md mt-10 md:mt-20 p-4 md:p-16">
        <h1 className='text-xl text-center font-bold'>Hi, thanks for visiting!</h1>
        <p className='text-lg text-center'>This MERN(MongoDB, Express, React, NodeJS) app is using Redux Toolkit and RTK Query to manage app level states and REST API queries. On top of that, it is using Tailwind CSS. Please register and login to see it in action.</p>
        <div className="flex mx-auto gap-4 justify-center mt-4">
          <Link to="/register" className="px-8 py-2 rounded text-white flex items-center justify-center bg-neutral-700">Register</Link>
          <Link to="/login" className="px-8 py-2 rounded text-white flex items-center justify-center bg-gray-600">Login</Link>
        </div>
      </div>
    </div>   
    </>

    )  }  
  </>

  )
}

export default Hero