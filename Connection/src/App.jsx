import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = useCallback(() => {
    setCount((prev)=>{
      let newCount = prev+1;
      console.log("Data Submit " + newCount);
      return newCount;
    });
  },[]);

  return (
    <>
      <div className="GetData min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login Here
          </h1>

          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-4"
          >
            <input
              placeholder="Username"
              {...register("username", {
                required: true,
                maxLength: 10,
                minLength: 3,
              })}
              type="text"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.username && (
              <div className="text-red-500 text-sm">
                There is Some Error in Username
              </div>
            )}

            <input
              placeholder="Password"
              {...register("password", {
                required: true,
                maxLength: 10,
                minLength: 3,
              })}
              type="password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
