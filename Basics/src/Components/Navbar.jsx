
import { Link } from "react-router-dom";
import "./nav.css";
import Card from "./Card";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <span>
          <button>Signup</button>
        </span>
      </div>
      <div>
        <Card name={"Ali"} email={"Khalid"} body={"About noting is happening and why it is happening"}/>
      </div>
    </div>
  );
};

export default Navbar;
