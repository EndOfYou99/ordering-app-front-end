import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const OrdersModal = ({ order, onClose }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = localStorage.getItem('jwt');
    
        const response = await fetch(`http://localhost:8000/orders/${order.orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.ok) {
          const orderData = await response.json();
          setMenuItems(orderData.menuItems);
        } else {
          console.error('Failed to fetch menu items');
          return null;
        }
      } catch (error) {
        console.error('An error occurred:', error);
        return null;
      }
    };

    fetchMenuItems();
  }, [order.orderId]);

  const deleteMenuItem = async (menuItemId) => {
    try {
      const token = localStorage.getItem('jwt');

      const response = await fetch(`http://localhost:8000/orders/${order.orderId}/menuItems/${menuItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remove the deleted menuItem from the menuItems list
        const updatedMenuItems = menuItems.filter((menuItem) => menuItem.id !== menuItemId);
        setMenuItems(updatedMenuItems);
        console.log('MenuItem deleted successfully');
      } else {
        console.error('Failed to delete menuItem');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose}>
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h3>Menu Items:</h3>
          {menuItems.length > 0 ? (
            <ul>
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <p>Item ID: {menuItem.id}</p>
                  <p>Name: {menuItem.name}</p>
                  <p>Description: {menuItem.description}</p>
                  <p>Preparing Time: {menuItem.preparingTime} minutes</p>
                  <p>Quantity: {menuItem.quantity}</p>
                  <p>Restaurant ID: {menuItem.restaurantId}</p>
                  <button onClick={() => deleteMenuItem(menuItem.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No menu items found.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default OrdersModal;
