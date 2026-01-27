import React from 'react'
import About from './Router Practice/About'
import './card.css'

const Card = ({name, email, body}) => {
  return (
    <div className='card'>
      <h3>{name}</h3>
      <h2>{email}</h2>
      <p>{body}</p>
      <About/>
    </div>
  )
}

export default Card
