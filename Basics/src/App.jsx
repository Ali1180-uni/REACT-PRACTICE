import { useState, useCallback } from "react";
import Navbar from "./Components/Navbar"
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [adjective, setAdjective] = useState("good");

  // const getAdjective = () => {
  //   return "another" + count
  // }

  const getAdjective = useCallback(() => {
    return "another" + count;
  }, [count]);

  return (
    <>
      <h1>Vite + React</h1>
      <Navbar adjective={"good"} getAdjective={getAdjective} />
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
