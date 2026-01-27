import React, { useContext } from 'react'
import { counterContext } from '../../Context/counter'

const About = () => {
  const { Count, setCount } = useContext(counterContext)
  return (
    <div>
      <h2>About Page</h2>
      <p>Counter Value: {Count}</p>
      <button onClick={() => setCount(Count + 1)}>Increment from About</button>
    </div>
  )
}

export default About
