import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center max-w-5xl mx-auto">
        <p className="text-2xl">Sorry! Nothing found. Try from <Link className='underline' to="/">Home?</Link></p>
      </div>
    </>
  )
}

export default NotFound