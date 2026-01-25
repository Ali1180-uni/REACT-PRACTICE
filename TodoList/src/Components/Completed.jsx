const Completed = ({ todo }) => {
  return (
    <div>
      {todo
        .filter((item) => item.isCompleted)
        .map((items) => {
          return (
            <div
              className="ShowTodos flex gap-4 items-center justify-center p-3 m-2 bg-white rounded-lg shadow-md max-w-lg mx-auto"
              key={items.id}
            >
              <p className="flex-1 text-lg line-through">{items.text}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Completed;
