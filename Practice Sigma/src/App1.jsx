/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState(0);
  function inc () {
    setCount(count+1);
  }
  const vin = () => {
    setColor(color+1);
  }
  
  useEffect(() => {
    document.title = `Tasbeeh Count: ${count}`;
    vin();
  }, [count])
  
  let Myname = "My Name is ALi and this is my React App Practice"
  return (
    <div>
      <Navbar home = "Home" about = "About" contact = "Contact"/>
      {/* <Navbar home = "Home" about = "About" contact = "Contact" color = {color}/> */}
      <h1>Tasbeeh Count: {count}</h1>
      <button onClick={inc}>MashaAllah Bro!!</button>
      <button onClick={()=>{setCount(0)}}>Reset</button>
      <Footer Info = {Myname}/>
    </div>
  );
}

export default App
