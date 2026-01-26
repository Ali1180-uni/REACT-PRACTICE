import { useState } from "react";
import "./App.css";

function App() {
  let [Count, setCount] = useState(0)
  return <div>
          <button className="btn" onClick={() => setCount(Count + 1)}>
        Click: {Count}
      </button>
  </div>
  
}

export default App;
