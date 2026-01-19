/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const btnRef = useRef();
  const btnRef1 = useRef();
  function inc() {
    setCount(count + 1);
  }
  // const refCount = useRef(0);

  // useEffect(() => {
  //   refCount.current = refCount.current + 1;
  //   console.log("Component re-rendered "+ refCount.current + " times");
  // });

  let Myname = "My Name is ALi and this is my React App Practice";
  return (
    <div>
      <Navbar home="Home" about="About" contact="Contact" />
      <h1>Tasbeeh Count: {count}</h1>
      <button ref={btnRef1} onClick={inc}>MashaAllah Bro!!</button>
      <button
        ref={btnRef}
        onClick={() => {
          setCount(0);
        }}
      >
        Reset
      </button>

      <button
        onClick={() => {
          btnRef.current.style.backgroundColor = "black";
          btnRef.current.style.color = "white";
          btnRef1.current.style.fontSize = "2000px";
        }}
      >
        Change styling
      </button>
      <Footer Info={Myname} />
    </div>
  );
}

export default App;
