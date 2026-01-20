/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import "./App.css";

function App() {
  const [value, setvalue] = useState([{name: "", phone: ""}])
  const handleForm = (e) =>{
    setvalue({...value, [e.target.name]:e.target.value});
  }

  return (
    <div>
      <button onClick={()=>{
        alert("Name");
      }}>Ali Here</button>
      <div><input type="text" name="name" value={value.name} onChange={handleForm}/></div>
      <div><input type="number" name="email" value={value.phone} onChange={handleForm} /></div>
    </div>
  );
}

export default App;
