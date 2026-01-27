/* eslint-disable no-unused-vars */
import { useState} from "react";
import Navbar from "./Components/Navbar";
import { counterContext } from "./Context/counter";
import "./App.css";

function App() {
  let [Count, setCount] = useState(0);
  return (
    <div>
      <counterContext.Provider value={{Count, setCount}}>
      <Navbar />
      <button className="btn" onClick={() => setCount(Count + 1)}>
        Click: {Count}
      </button>
      </counterContext.Provider>
    </div>
  );
}

export default App;
