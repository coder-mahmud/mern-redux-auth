import React from 'react'
import Spinner from '../assets/spinner.svg'

const Loader = () => {
  return (
    <div className='fixed w-full h-full left-0 top-0 bg-slate-300 opacity-70 backdrop-blur-md flex items-center justify-center'><img className='w-24 ' src={Spinner} alt="spinner" /></div>
  )
}

export default Loader