import "./nav.css";
import Card from "./Card";

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
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
