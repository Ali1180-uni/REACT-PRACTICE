/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import "./App.css";

function App() {
  const [data, setdata] = useState([]);

  const fetchdata = async () => {
    let a = await fetch("https://jsonplaceholder.typicode.com/comments");
    let res = await a.json();
    setdata(res);
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      <Navbar />
      <h1>Data is Shown Below</h1>
      {data.map((info) => {
        return (
          <Card
            key={info.id}
            name={info.name}
            email={info.email}
            body={info.body}
          />
        );
      })}
    </>
  );
}

export default App;
