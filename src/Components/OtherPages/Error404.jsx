import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
      <div className='container-fluid'>
          <div className='row justify-content-center align-items-center vh-100'>
          <div className="col text-center">
          <h3 className='text-danger'>Page Not Found</h3>
          <Link to="/" className="btn bg-custom mx-auto  mt-5 px-4" >Back to Login</Link>
          </div>
        
          </div>
    </div> 
  )
}

export default Error404