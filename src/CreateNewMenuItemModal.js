import React, { useState } from 'react';
import Modal from 'react-modal';

const CreateNewMenuItemModal = ({ isOpen, closeModal, createMenuItem }) => {
  const [newMenuItem, setNewMenuItem] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prevMenuItem) => ({ ...prevMenuItem, [name]: value }));
  };

  const handleCreate = () => {
    createMenuItem(newMenuItem);
    setNewMenuItem({});
  };

  if (!isOpen) {
    return null; // Render nothing if the modal is not open
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <h3>Create New Menu Item</h3>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newMenuItem.name || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newMenuItem.description || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Preparing Time:
          <input
            type="text"
            name="preparingTime"
            value={newMenuItem.preparingTime || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={newMenuItem.quantity || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Logo:
          <input
            type="text"
            name="logo"
            value={newMenuItem.logo || ''}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleCreate}>Create</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default CreateNewMenuItemModal;