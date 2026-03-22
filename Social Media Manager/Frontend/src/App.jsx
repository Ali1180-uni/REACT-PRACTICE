import { useState } from 'react'

function App() {

  const[count, setCount] = useState(0)
  return (
    <>
    <h1>Ali Here</h1>
    <button onClick={()=>{setCount(count+1)}}>Working {count}</button>
    </>
  )
}

export default App
