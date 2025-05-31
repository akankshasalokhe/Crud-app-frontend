import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full flex justify-between h-15 items-center bg-gray-200 px-5'>
        <div className='w-[10%] h-full flex items-center '>
            <h1 className='font-bold'>LOGO</h1>
        </div>
        <div className='w-[50%] h-full'>
            <ul className=' w-full h-full flex gap-6  items-center list-none'>
                <NavLink to='/' className='text-lg font-semibold cursor-pointer'>All Products</NavLink>  
                <NavLink to='/addProducts' className='text-lg font-semibold cursor-pointer'>Add Products</NavLink>   
 
            </ul>
        </div>

    </div>
  )
}

export default Navbar