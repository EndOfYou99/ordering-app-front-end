import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const MenuItemModal = ({ isOpen, closeModal, menuItem, updateMenuItem }) => {
  const [updatedMenuItem, setUpdatedMenuItem] = useState({});

  useEffect(() => {
    setUpdatedMenuItem(menuItem);
  }, [isOpen, menuItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMenuItem((prevMenuItem) => ({ ...prevMenuItem, [name]: value }));
  };

  const handleUpdate = () => {
    updateMenuItem(menuItem.id, updatedMenuItem);
  };

  if (!isOpen || !menuItem) {
    return null; // Render nothing if the modal is not open or if menuItem is null or undefined
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <h3>Menu Item Details:</h3>
        <br></br>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={updatedMenuItem.name || ''}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={updatedMenuItem.description || ''}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <label>
          Preparing Time:
          <input
            type="text"
            name="preparingTime"
            value={updatedMenuItem.preparingTime || ''}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={updatedMenuItem.quantity || ''}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <label>
          Logo:
          <input
            type="text"
            name="logo"
            value={updatedMenuItem.logo || ''}
            onChange={handleInputChange}
          />
        </label>
        <br></br>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default MenuItemModal;