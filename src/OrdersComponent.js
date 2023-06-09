import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import OrdersModal from './OrdersModal';

const OrdersComponent = ({ userInfo }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('jwt');

        if (!token) {
          return;
        }

        const userId = userInfo.userId; // Replace userInfo.id with the actual value

        const response = await fetch(`http://localhost:8000/orders/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const ordersData = await response.json();
          setOrders(ordersData);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleMakeOrderRedirect = () => {
    navigate('/makeOrder');
  };

  const handleOrdersRedirect = () => {
    navigate('/userConsole');
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalIsOpen(false);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Order deleted successfully
        // Update the orders list by filtering out the deleted order
        setOrders(orders.filter(order => order.orderId !== orderId));
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleOrdersRedirect}>Orders</button>
        <button onClick={handleMakeOrderRedirect}>Make an Order</button>
      </div>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              {/* Render order details */}
              <p>{order.orderId}</p>
              {/* Button to open the modal */}
              <button onClick={() => openModal(order)}>Open Modal</button>
              <button onClick={() => handleDeleteOrder(order.orderId)}>Delete Order</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}

      {/* Modal */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Order Details</h2>
        {selectedOrder && (
          <div>
            <p>Order ID: {selectedOrder.orderId}</p>
            {/* Render order details based on the selected order */}
            <OrdersModal order={selectedOrder} onClose={closeModal} />
          </div>
        )}
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default OrdersComponent;
