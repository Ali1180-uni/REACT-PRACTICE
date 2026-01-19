import "./main.css"

function navbar(props) {
  return <div className="navbar">
    <div className="nav">
            <p>{props.home}</p>
            {/* <p>NavBar Re-Render times {props.color}</p> */}
            <p>{props.about}</p>
            <p>{props.contact}</p>
            <span>Sign Up</span>
    </div>
  </div>;
}

export default navbar
