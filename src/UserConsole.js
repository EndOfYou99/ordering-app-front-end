import React, { useState, useEffect } from 'react';

const UserConsole = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('jwt'); // Retrieve JWT token from local storage
      const response = await fetch('http://localhost:8000/user/', {
        headers: {
          Authorization: `Bearer ${token}` // Include JWT token in the request headers
        }
      });
      if (response.ok) {
        const data = await response.text();
        setResponse(data);
      } else {
        console.error('Failed to fetch user');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <h2>User Console</h2>
      <input type="text" value={response} readOnly />
    </div>
  );
};

export default UserConsole;