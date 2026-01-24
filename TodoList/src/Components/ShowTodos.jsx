import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ShowTodos = ({ todo, setTodo, setnewTodo }) => {

  const editTodo = (id) => {
    const getId = todo.find((t)=>t.id === id);
    setnewTodo(getId.text);
    deleteTodo(id);
  };

  const deleteTodo = (id) => {
    setTodo(todo.filter((t)=>t.id !== id));
  };
  return (
    <div>
      {todo.map((items) => {
        return (
          <div
            className="ShowTodos flex gap-4 items-center justify-center p-3 m-2 bg-white rounded-lg shadow-md max-w-lg mx-auto"
            key={items.id}
          >
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
            <button
              className="bg-green-500 hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded-lg"
              onClick={() => editTodo(items.id)}
            >
              Edit <EditNoteIcon />
            </button>
            <button
              className="bg-red-500 hover:bg-yellow-100 text-black font-bold py-2 px-4 rounded-lg"
              onClick={() => deleteTodo(items.id)}
            >
              Delete <DeleteIcon />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ShowTodos;
