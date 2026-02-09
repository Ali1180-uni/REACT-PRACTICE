import { useSelector, useDispatch } from "react-redux";
import { decrement, increment} from "../Redux/Counter/CounterSlice.js";
import Navbar from "../Component/Navbar.jsx";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar count={count} />
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Count is {count}</h1>
        <div className="flex gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg text-xl"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-xl"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
