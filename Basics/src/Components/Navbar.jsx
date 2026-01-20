import React from 'react'
import './nav.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <span><button>Signup</button></span>
      </ul>
    </div>
  )
}

export default Navbar
