import { useState } from "react";
import Navbar from "./Components/Navbar";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setnewTodo] = useState("");

  const handle = (e) => {
    setnewTodo(e.target.value);
  };

  const AddTodo = () => {
    setTodo([...todo, { id: nanoid(), text: newTodo, isCompleted: false }]);
    setnewTodo("");
  };

  // const editTodo = (id) => {

  // };

  // // const deleteTodo = (id) => {
  // //   setTodo(id.todo !== items);

  // // };

  return (
    <>
      <Navbar />
      <div className="add todo flex gap-4 p-4 justify-center items-center mt-6">
        <input
          className="border-2 border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500"
          placeholder="Enter Todo"
          type="text"
          value={newTodo}
          onChange={handle}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed" onClick={AddTodo} disabled = {newTodo.length < 3}>ADD</button>
      </div>
      {todo.map((items) => {
        return (
          <div className="ShowTodos flex gap-4 items-center justify-center p-3 m-2 bg-white rounded-lg shadow-md max-w-lg mx-auto" key={items.id}>
            <input
              className="w-5 h-5 cursor-pointer accent-blue-500"
              type="checkbox"
              checked={items.isCompleted}
              onChange={() => {
                setTodo(
                  todo.map((t) =>
                    items.id === t.id
                      ? { ...t, isCompleted: !t.isCompleted }
                      : t,
                  ),
                );
              }}
            />
            <p
              className="flex-1 text-lg"
              style={{
                textDecoration: items.isCompleted ? "line-through" : "none",
              }}
            >
              {items.text}
            </p>
            {/* <button onClick={editTodo}>Edit</button>
            <button onClick={deleteTodo}>Delete</button> */}
          </div>
        );
      })}
    </>
  );
}

export default App;
