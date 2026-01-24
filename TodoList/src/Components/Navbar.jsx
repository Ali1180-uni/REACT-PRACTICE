import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="nav flex justify-center bg-blue-500 items-center py-4 shadow-lg">
        <ul className='flex gap-6 font-bold text-white'>
            <li className='text-2xl transition-all hover:text-amber-950'>ToDo List - To gave a Structure to my Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
