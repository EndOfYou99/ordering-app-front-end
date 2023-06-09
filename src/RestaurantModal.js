import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import MenuItemModal from './MenuItemModal';
import CreateNewMenuItemModal from './CreateNewMenuItemModal';

const RestaurantModal = ({ isOpen, closeModal, restaurant, updateRestaurant }) => {
    const [updatedRestaurant, setUpdatedRestaurant] = useState({});
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [menuItemModalIsOpen, setMenuItemModalIsOpen] = useState(false);
  const [createMenuItemModalIsOpen, setCreateMenuItemModalIsOpen] = useState(false);

    const [menuItems, setMenuItems] = useState([]);

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
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newMenuItem)
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
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(modifiedFields)
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

    useEffect(() => {
      if (restaurant) {
        const creationDate = new Date(restaurant.creationDate);
        const formattedDate = creationDate.toISOString().substring(0, 10);
    
        setUpdatedRestaurant({
          ...restaurant,
          creationDate: formattedDate
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
    const response = await fetch(`http://localhost:8000/menuItems/rest/${restaurantId}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
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

    const handleDeleteMenuItem = async (itemId) => {
  try {
    const token = localStorage.getItem('jwt');

    if (!token) {
      // Handle the case when the JWT token is not available
      return;
    }

    const menuItemId = itemId; // Assign the passed itemId to menuItemId

    const url = `http://localhost:8000/menuItems/${menuItemId}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      // Menu item deleted successfully
      const updatedMenuItems = menuItems.filter((item) => item.id !== menuItemId);
      setMenuItems(updatedMenuItems);
      setUpdatedRestaurant((prevRestaurant) => ({
        ...prevRestaurant,
        menuItems: updatedMenuItems
      }));
    } else {
      console.error('Failed to delete menu item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


    


    return (
      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div>
          <h3>Selected Restaurant Details:</h3>
          <br></br>
          <label>
            Name:<input type="text" name="name" value={updatedRestaurant?.name || ''} onChange={handleInputChange} />
          </label>
          <br></br>
          <label>
            Location:
            <input type="text" name="location" value={updatedRestaurant?.location || ''} onChange={handleInputChange} />
          </label>
          <br></br>
          <label>
            Open:
            <input
              type="checkbox"
              name="open"
              checked={updatedRestaurant?.open || false}
              onChange={(e) => setUpdatedRestaurant((prevRestaurant) => ({ ...prevRestaurant, open: e.target.checked }))}
            />
          </label>
          <br></br>
          <label>
            Logo:
            <input type="text" name="logo" value={updatedRestaurant?.logo || ''} onChange={handleInputChange} />
          </label>
          <br></br>
          <label>
  Creation date:
  <input type="date" name="creationDate" value={updatedRestaurant?.creationDate || ''} onChange={handleInputChange} />
</label>
<br></br><div style={{ display: 'flex', justifyContent: 'center' }}>
  <button onClick={openCreateMenuItemModal}>Create Menu Item</button>
</div>
          <br></br>
          {menuItems.length > 0 && (
          <label>
            Menu Items:
            <ul>
              {menuItems.map((item) => (
                <li key={item.id}>
                  
                  <p><img src={item.logo} alt="Menu item Logo" width="75" height="50"/></p>
                  {item.name}
                  <button onClick={() => openMenuItemModal(item)}>View</button>
                  <button onClick={() => handleDeleteMenuItem(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </label>
        )}
          <button onClick={handleUpdate}>Update</button>
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
            <CreateNewMenuItemModal
        isOpen={createMenuItemModalIsOpen}
        closeModal={closeCreateMenuItemModal}
        createMenuItem={handleCreateMenuItem}
      />
      </Modal>
    );
  };
  

export default RestaurantModal;
