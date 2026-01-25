import { useState } from "react";
import Navbar from "./Components/Navbar";
import { nanoid } from "nanoid";
import ShowTodos from "./Components/ShowTodos";
import Completed from "./Components/Completed";

import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setnewTodo] = useState("");
  const [Completed1, setCompleted] = useState(false);

  const handle = (e) => {
    setnewTodo(e.target.value);
  };

  const AddTodo = () => {
    setTodo([...todo, { id: nanoid(), text: newTodo, isCompleted: false }]);
    setnewTodo("");
  };

  const turn = () => {
    setCompleted(() => !Completed1);
  };

  return (
    <>
      <Navbar />
      <div className="container max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl border border-gray-200 hover:shadow-blue-200 transition-shadow duration-300">
        <div className="add todo flex gap-4 p-4 justify-center items-center mt-6">
          <input
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
            placeholder="Enter Todo"
            type="text"
            value={newTodo}
            onChange={handle}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={AddTodo}
            disabled={newTodo.length < 3}
          >
            ADD
          </button>
        </div>
        <button
          className="bg-amber-500/90 hover:bg-amber-500 text-white font-medium py-2 px-6 rounded-full border border-amber-400/50 shadow-lg backdrop-blur-sm focus:ring-4 focus:ring-amber-300 my-2"
          onClick={turn}
        >
          Check the Completed Tasks
        </button>
        {Completed1 ? (
          <Completed todo={todo} />
        ) : (
          <ShowTodos todo={todo} setTodo={setTodo} setnewTodo={setnewTodo} />
        )}
      </div>
    </>
  );
}

export default App;
