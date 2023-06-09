import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUserInfo }) => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setJwtToken(token);
      // Perform additional logic if needed
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create the request body
    const requestBody = {
      username: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.jwt;
        const user = data.user;

        setJwtToken(token); // Save JWT to state
        setUserInfo(user); // Save user info to state
        saveTokenToLocalStorage(token); // Save JWT to local storage

        // Perform role-based redirection
        if (user.authorities.some((authority) => authority.authority === 'ADMIN')) {
          navigate('/adminConsole');
        } else {
          navigate('/userConsole');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const saveTokenToLocalStorage = (token) => {
    try {
      localStorage.setItem('jwt', token);
    } catch (error) {
      console.error('Failed to save token to local storage:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };
  
  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleRegisterRedirect}>Register</button>
    </div>
  );
};

export default LoginForm;
