import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="nav flex justify-center bg-blue-500 items-center py-4 shadow-lg">
        <ul className='flex gap-6 font-bold text-white'>
            <li className='text-2xl'>Hi There!!!</li>
            <li className='hover:text-blue-200 cursor-pointer'>Todos</li>
            <li className='hover:text-blue-200 cursor-pointer'>Your Completed Tasks</li>
            <li className='hover:text-blue-200 cursor-pointer'>Tools</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
