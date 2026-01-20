import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Card from "./Components/Card";
import "./App.css";

function App() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        setdata(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <h1>Data is Shown Below</h1>
      {data.map(info => {
        return (
          <Card key={info.id} name={info.name} email={info.email} body={info.body} />
        )
      })}
    </>
  );
}

export default App;
