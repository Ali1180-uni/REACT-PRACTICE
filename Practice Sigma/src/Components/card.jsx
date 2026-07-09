function Card(props) {
  return <div>
    <h1 className="card-title">{props.title}</h1>
    <p className="card-text">{props.text}</p>
    <button className="btn btn-primary">{props.buttonText}</button>
    <ul>
        {props.list.map((item, index)=>(
            <li key={index}>{item}</li>
        ))}
    </ul>
  </div>;
}

export default Card;
