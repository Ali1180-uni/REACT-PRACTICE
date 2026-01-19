import { useState } from 'react'
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  function inc () {
    setCount(count+1);
  } 
  let Myname = "My Name is ALi and this is my React App Practice"
  return (
    <div>
      <Navbar home = "Home" about = "About" contact = "Contact"/>
      <h1>Tasbeeh Count: {count}</h1>
      <button onClick={inc}>MashaAllah Bro!!</button>
      <button onClick={()=>{setCount(0)}}>Reset</button>
      <Footer Info = {Myname}/>
    </div>
  );
}

export default App
