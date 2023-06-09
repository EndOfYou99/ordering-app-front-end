import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import MenuItemModal from './MenuItemModal';
import CreateNewMenuItemModal from './CreateNewMenuItemModal';
import MakeAnOrderComponent from './MakeAnOrderComponent';

const MakeAnOrderModal = ({ isOpen, closeModal, restaurant, updateRestaurant, userInfo, setUserInfo }) => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState({});
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [menuItemModalIsOpen, setMenuItemModalIsOpen] = useState(false);
  const [createMenuItemModalIsOpen, setCreateMenuItemModalIsOpen] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState(null);

  const handleCreateOrder = async () => {
    console.log(userInfo);
    try {
      // Retrieve the JWT token from local storage
      const token = localStorage.getItem('jwt');

      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }
      const userId = userInfo.userId;

      // Send a POST request to create an order
      const response = await fetch(`http://localhost:8000/orders/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Order created successfully
        const createdOrder = await response.json();
        // Handle the created order as needed
        console.log('Order created:', createdOrder);
        // Store the returned order in the state
        setOrder(createdOrder);
      } else {
        console.error('Failed to create order');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCreateMenuItem = async (newMenuItem) => {
    try {
      const token = localStorage.getItem('jwt');

      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }

      const restaurantId = restaurant.id; // Get the restaurantId from the restaurant

      const url = `http://localhost:8000/menuItems/${restaurantId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMenuItem),
      });

      if (response.ok) {
        // Menu item created successfully
        const createdMenuItem = await response.json();
        // Handle the created menu item as needed
        console.log('Menu item created:', createdMenuItem);
      } else {
        console.error('Failed to create menu item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const openCreateMenuItemModal = () => {
    setCreateMenuItemModalIsOpen(true);
  };

  const closeCreateMenuItemModal = () => {
    setCreateMenuItemModalIsOpen(false);
  };

  const openMenuItemModal = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setMenuItemModalIsOpen(true);
  };

  const closeMenuItemModal = () => {
    setSelectedMenuItem(null);
    setMenuItemModalIsOpen(false);
  };

  const handleUpdateMenuItem = async (itemId, updatedItem) => {
    try {
      const token = localStorage.getItem('jwt');

      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }

      const url = `http://localhost:8000/menuItems/${itemId}`;

      // Filter out the fields that have not been modified
      const modifiedFields = Object.entries(updatedItem)
        .filter(([key, value]) => value !== undefined && value !== null)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(modifiedFields),
      });

      if (response.ok) {
        // Menu item updated successfully
        const updatedData = await response.json();
        // Handle the updated data as needed
        console.log('Menu item updated:', updatedData);
      } else {
        console.error('Failed to update menu item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    try {
      const token = localStorage.getItem('jwt');

      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }

      const url = `http://localhost:8000/menuItems/${menuItemId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Menu item deleted successfully
        const updatedMenuItems = menuItems.filter((item) => item.id !== menuItemId);
        setMenuItems(updatedMenuItems);
        setUpdatedRestaurant((prevRestaurant) => ({
          ...prevRestaurant,
          menuItems: updatedMenuItems,
        }));
      } else {
        console.error('Failed to delete menu item');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleAddToOrder = async (orderId, menuItemId) => {
    try {
      const token = localStorage.getItem('jwt');

      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }
      console.log("the order:"+order.orderId);
      let orderIds=order.orderId;
      console.log("the menu ietms:"+menuItemId);

      const url = `http://localhost:8000/orders/${orderIds}/${menuItemId}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Menu item added to order successfully
        console.log('Menu item added to order successfully');
      } else {
        console.error('Failed to add menu item to order');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    if (restaurant) {
      const creationDate = new Date(restaurant.creationDate);
      const formattedDate = creationDate.toISOString().substring(0, 10);

      setUpdatedRestaurant({
        ...restaurant,
        creationDate: formattedDate,
      });
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurant) {
      const creationDate = new Date(restaurant.creationDate);
      const formattedDate = creationDate.toISOString().substring(0, 10);

      fetchMenuItems(restaurant.id);
    }
  }, [menuItems, restaurant]);

  const fetchMenuItems = async (restaurantId) => {
    try {
      const token = localStorage.getItem('jwt');

      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }
      const response = await fetch(`http://localhost:8000/menuItems/rest/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else {
        console.error('Failed to fetch menu items');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update the corresponding property of the updatedRestaurant state object
    setUpdatedRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = () => {
    updateRestaurant(restaurant.id, updatedRestaurant);
  };

  if (!isOpen) {
    return null; // Render nothing if the modal is not open
  }

  if (restaurant === null) {
    return <div>Loading...</div>; // Display a loading indicator if the restaurant data is still being fetched
  }

  if (!restaurant) {
    return <div>Error: Restaurant not found.</div>; // Display an error message if the restaurant is null or undefined
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <div>
        <h3>Selected Restaurant Details:</h3>
        <div>
          <label>
            Name: <span>{updatedRestaurant?.name || ''}</span>
          </label>
        </div>
        <div>
          <label>
            Location: <span>{updatedRestaurant?.location || ''}</span>
          </label>
        </div>
        <div>
          <label>
            Open: <span>{updatedRestaurant?.open ? 'Open' : 'Closed'}</span>
          </label>
        </div>
        <div>
          <label>
            Logo: <span>{updatedRestaurant?.logo || ''}</span>
          </label>
        </div>
        <div>
          <label>
            Creation date: <span>{updatedRestaurant?.creationDate || ''}</span>
          </label>
        </div>
        <button onClick={handleCreateOrder}>Create Order</button>
        {menuItems.length > 0 && (
          <div>
            <label>Menu Items:</label>
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  
                  
                  <p><img src={item.logo} alt="Menu item Logo" width="75" height="50"/></p>
                  {item.name}
                  <button onClick={() => handleAddToOrder(order.id, item.id)}>Add to Order</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={closeModal}>Close</button>

      {selectedMenuItem && (
        <MenuItemModal
          isOpen={menuItemModalIsOpen}
          closeModal={closeMenuItemModal}
          menuItem={selectedMenuItem}
          updateMenuItem={handleUpdateMenuItem}
        />
      )}
      <CreateNewMenuItemModal isOpen={createMenuItemModalIsOpen} closeModal={closeCreateMenuItemModal} createMenuItem={handleCreateMenuItem} />
    </Modal>
  );
};

export default MakeAnOrderModal;
