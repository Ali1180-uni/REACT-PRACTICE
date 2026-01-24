import React from 'react'

const Completed = ({todo}) => {
 return <div>
      {todo.map((items) => {
        return (
          <div
            className="ShowTodos flex gap-4 items-center justify-center p-3 m-2 bg-white rounded-lg shadow-md max-w-lg mx-auto"
            key={items.id}
          >
            <p
              className="flex-1 text-lg"
              style={{
                textDecoration: items.isCompleted ? "line-through" : "none",
              }}
            >
              {!(items.isCompleted) && items.text}
            </p>
          </div>
        );
      })}
    </div>
}

export default Completed
