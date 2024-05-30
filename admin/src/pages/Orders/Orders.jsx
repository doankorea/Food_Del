import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const statusHandler= async (event, orderId)=>{
    const response= await axios.post(url+"/api/order/status", {orderId, status: event.target.value})
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders.');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      {orders.map((order, index) => (
        <div className="order-item" key={index}>
          <img src={assets.parcel_icon} alt="Parcel Icon" />
          <div>
            <p className="order-item-food">
              {order.items.map((item, itemIndex) => (
                <span key={itemIndex}>
                  {item.name} x {item.quantity}
                  {itemIndex !== order.items.length - 1 && ', '}
                </span>
              ))}
            </p>
            <p className="order-item-name">{order.address.firstName+" "+ order.address.lastName}</p>
            <div className="order-item-address">
              <p>{order.address.street+","}</p>
              <p>{order.address.city+", "+ order.address.state+", "+ order.address.country+", "+order.address.zipCode+", "}</p>
            </div>
              <p className="order-item-phone">
              {order.address.phone}
              </p>
          </div>
          <p>Items: {order.items.length}</p>
          <p>${order.amount}</p>
          <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} name="" id="">
            <option value="Food Processing">Food Processing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Deliverd">Deliverd</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Order;
