import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [username, setUsername] = useState(userInfo?.username);
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(userInfo?.birthDate);
  const [country, setCountry] = useState(userInfo?.country);
  const [weight, setWeight] = useState(userInfo?.weight);

  useEffect(() => {
    setUsername(userInfo?.username);
    setBirthDate(userInfo?.birthDate);
    setCountry(userInfo?.country);
    setWeight(userInfo?.weight);
  }, [userInfo]);

  const handleUserSettings = () => {
    setIsModalOpen(true);
  };

  const handleSaveSettings = () => {
    // Handle saving user settings logic here
    // For this example, we'll just log the values
    console.log('Name:', name);
    console.log('Email:', email);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setUserInfo(null);
    navigate('/');
  };

  const handleUpdateInfo = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
  
    const updatedUser = {
      username,
      password,
      birthDate,
      country,
      weight,
    };
  
    const token = localStorage.getItem("jwt"); // Assuming you store the JWT token in localStorage
  
    fetch(`http://localhost:8000/user/${userInfo.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success, e.g., show a success message
          console.log("User info updated successfully");
          // Update the user info in the UI if needed
          setUserInfo({ ...userInfo, ...updatedUser });
        } else {
          // Handle error, e.g., show an error message
          console.error("Failed to update user info");
        }
      })
      .catch((error) => {
        console.error("Failed to update user info", error);
      });
  };
  
  
  
  

  return (
    <nav>
      {userInfo && (
        <div className="navbar-left">
          <button onClick={handleUserSettings}>User Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>User Settings</h2>
              {/* User settings form */}
              <form onSubmit={handleUpdateInfo}>
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
        <button type="submit">Update info</button>
      </form>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

