// import { useState, useCallback } from "react";
// import Navbar from "./Components/Navbar"
// import "./App.css";
import { useState } from "react";
import figlet from "figlet";
import standardFont from "figlet/importable-fonts/Standard.js";

figlet.parseFont("Standard", standardFont);

function App() {
const [count, setCount] = useState("");
function checkFiglet(){
  figlet.text(count, { font: "Standard" }, function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
  setCount(data);
});
}
function changedata(e){
  setCount(e.target.value)
}
  // const [count, setCount] = useState(0);
  // const [adjective, setAdjective] = useState("good");

  // const getAdjective = () => {
  //   return "another" + count
  // }

  // const getAdjective = useCallback(() => {
  //   return "another" + count;
  // }, [count]);

  return (
    <>
    <input type="text" onChange={changedata}  />
    <h1 className="name" style={{ whiteSpace: "pre", fontFamily: "monospace" }}>{count}</h1>
    <button onClick={checkFiglet}>Submit</button>





      {/* <h1>Vite + React</h1>
      <Navbar adjective={"good"} getAdjective={getAdjective} />
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
      </div> */}
    </>
  );
}

export default App;
