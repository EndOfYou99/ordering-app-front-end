import React, { useState } from 'react';
import Modal from 'react-modal';

const CreateNewRestaurantModal = ({ isOpen, closeModal, createRestaurant }) => {
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    location: '',
    open: false,
    logo: '',
    creationDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prevRestaurant) => ({ ...prevRestaurant, [name]: value }));
  };

  const handleCreateRestaurant = () => {
    createRestaurant(newRestaurant);
    closeModal();
  };

  if (!isOpen) {
    return null; // Render nothing if the modal is not open
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <h3>Create New Restaurant:</h3>
        <label>
          Name:
          <input type="text" name="name" value={newRestaurant.name} onChange={handleInputChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={newRestaurant.location} onChange={handleInputChange} />
        </label>
        <label>
          Open:
          <input
            type="checkbox"
            name="open"
            checked={newRestaurant.open}
            onChange={(e) => setNewRestaurant((prevRestaurant) => ({ ...prevRestaurant, open: e.target.checked }))}
          />
        </label>
        <label>
          Logo:
          <input type="text" name="logo" value={newRestaurant.logo} onChange={handleInputChange} />
        </label>
        <label>
          Creation Date:
          <input type="date" name="creationDate" value={newRestaurant.creationDate} onChange={handleInputChange} />
        </label>
        <button onClick={handleCreateRestaurant}>Create</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default CreateNewRestaurantModal;
