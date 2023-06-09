import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantModal from './RestaurantModal';
import MakeAnOrderModal from './MakeAnOrderModal';

const MakeAnOrderComponent = ({userInfo, setUserInfo}) => {
    const navigate=useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [createRestaurantModalIsOpen, setCreateRestaurantModalIsOpen] = useState(false);
  
  
    const openCreateRestaurantModal = () => {
      setCreateRestaurantModalIsOpen(true);
    };
  
    const closeCreateRestaurantModal = () => {
      setCreateRestaurantModalIsOpen(false);
    };
  
    const createRestaurant = async (newRestaurant) => {
      try {
        const token = localStorage.getItem('jwt');
    
        if (!token) {
          // Handle the case when the JWT token is not available
          return;
        }
    
        const url = 'http://localhost:8000/restaurant';
    
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newRestaurant)
        });
    
        if (response.ok) {
          // Restaurant created successfully
          const createdRestaurant = await response.json();
          console.log('New restaurant created:', createdRestaurant);
        } else {
          console.error('Failed to create restaurant');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    useEffect(() => {
      fetchRestaurants();
    }, [createRestaurantModalIsOpen, selectedRestaurant, restaurants, currentPage, pageSize]);
  
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('jwt');
  
        if (!token) {
          // Handle the case when the JWT token is not available
          return;
        }
  
        const url = `http://localhost:8000/restaurant?page=${currentPage}&size=${pageSize}`;
  
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data.content);
        } else {
          console.error('Failed to fetch restaurants');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleViewRestaurant = async (name) => {
      try {
        const token = localStorage.getItem('jwt');
  
        if (!token) {
          // Handle the case when the JWT token is not available
          return;
        }
  
        const url = `http://localhost:8000/restaurant/name/${encodeURIComponent(name)}`;
  
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          setSelectedRestaurant(data);
        } else {
          console.error('Failed to fetch restaurant details');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    const handleDeleteRestaurant = async (id) => {
      try {
        const token = localStorage.getItem('jwt');
  
        if (!token) {
          // Handle the case when the JWT token is not available
          return;
        }
  
        const url = `http://localhost:8000/restaurant/${id}`;
  
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          // Restaurant deleted successfully, you can handle the response if needed
          fetchRestaurants(); // Refresh the list of restaurants
        } else {
          console.error('Failed to delete restaurant');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = (restaurant) => {
    console.log('clicked');
    setSelectedRestaurant(restaurant);
    setModalIsOpen(true);
  };
  
  const updateRestaurant = async (id, updatedRestaurant) => {
    try {
      const token = localStorage.getItem('jwt');
  
      if (!token) {
        // Handle the case when the JWT token is not available
        return;
      }
  
      const url = `http://localhost:8000/restaurant/${id}`;
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedRestaurant)
      });
  
      if (response.ok) {
        // Restaurant successfully updated
        // You can perform additional actions here, such as refetching the restaurants list
        console.log(`Restaurant with ID ${id} successfully updated`);
      } else {
        console.error(`Failed to update restaurant with ID ${id}`);
      }
    } catch (error) {
      console.error('An error occurred while updating the restaurant:', error);
    }
  };

    const handleMakeOrderRedirect = () => {
        navigate('/makeOrder');
      };

      const handleOrdersRedirect = () => {
        navigate('/userConsole');
      };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleOrdersRedirect}>Orders</button>
        <button onClick={handleMakeOrderRedirect}>Make an Order</button>
      </div>
      

      <div>
      <h2>Make an order</h2>
      {/* Display the list of restaurants */}
      <ul>
  {restaurants.map((restaurant) => (
    <li key={restaurant.id}>
      <p><img src={restaurant.logo} alt="Restaurant Logo" width="750" height="500"/></p>
      {restaurant.name}
      <button onClick={() => openModal(restaurant)}>View</button>
    </li>
  ))}
</ul>
      {/* Pagination controls */}
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
          Previous Page
        </button>
        <span>Page: {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
      </div>
      {/* Display selected restaurant details */}
      {/* Display selected restaurant details */}

      <MakeAnOrderModal
  isOpen={modalIsOpen}
  closeModal={() => setModalIsOpen(false)}
  restaurant={selectedRestaurant}
  updateRestaurant={updateRestaurant}
  userInfo={userInfo} setUserInfo={setUserInfo}
/>
    </div>
    </div>
  );
};

export default MakeAnOrderComponent;