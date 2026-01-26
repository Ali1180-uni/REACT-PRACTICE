/* eslint-disable react-hooks/set-state-in-effect */
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  
  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.phone) {
      alert(`Hello ${formData.name}! Your phone: ${formData.phone}`);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleClear = () => {
    setFormData({ name: "", phone: "" });
  };

  return (
    <div className="app-container fade-in">
      {/* Header Section */}
      <h1 className="app-title">React Practice App</h1>
      <p className="app-subtitle">Learn styling by experimenting with this form ✨</p>

      {/* Form Section */}
      <div className="form-container">
        <h2 className="form-title">📝 User Information Form</h2>
        
        <div className="input-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name..."
            value={formData.name}
            onChange={handleForm}
          />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone..."
            value={formData.phone}
            onChange={handleForm}
          />
        </div>

        {/* Buttons */}
        <div className="button-row">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Form
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
