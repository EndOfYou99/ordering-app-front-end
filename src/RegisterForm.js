import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [weight, setWeight] = useState(0);
  const navigate =useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
  
    const newUser = {
      username,
      password,
      birthDate,
      country,
      weight
    };
  
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (response.ok) {
          // Handle success, e.g., show a success message or redirect to another page
          console.log("User registered successfully");
          alert("User registered successfully");
        } else {
          // Handle error, e.g., show an error message
          throw new Error("Registration failed");
          alert("Registration failed");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Registration failed: " + error);
      });
  
    // Reset the form after successful registration
    setUsername("");
    setPassword("");
    setBirthDate("");
    setCountry("");
    setWeight(0);
  };

  const handleLoginRedirect = () => {
    navigate('/');
  };
  

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={handleLoginRedirect}>Log in</button>
    </div>
  );
};

export default RegisterForm;
