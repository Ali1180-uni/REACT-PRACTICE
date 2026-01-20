import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(false);
  const [todo, setTodo] = useState([
    {
      id: 1,
      name: "Ali",
      class: "BSSE",
    },
    {
      id: 2,
      name: "Alia",
      class: "BSSE",
    },
    {
      id: 3,
      name: "Aliza",
      class: "BSSE",
    },
  ]);

  useEffect(() => {
    setValue(count > 5);
  }, [count]);

  return (
    <>
      <h1>Count is: {count}</h1>
      {count > 5 ? <h4>More than 5</h4> : <h4>Less Than 5</h4>}
      <span>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Add
        </button>
      </span>
      <span>
        <button
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Minus
        </button>
      </span>
      {value && todo.map(data=>{
        return ( <div key={data.id}>
            <p>Name is : {data.name}</p>
            <p>Class is : {data.class}</p>
            </div>
        )
      })}
    </>
  );
}

export default App;
