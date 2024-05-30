import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css'
import { toast } from 'react-toastify';

const List = ({url}) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("An error occurred while fetching data.");
    }
  };

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId})
    await fetchList()
    if (response.data.success) {
      toast(response.data.data);
    } else {
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchList()
 },[])
  

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => (
        <div className="list-table-format" key={index}>
          <img src={`${url}/images/${item.image}`} alt={item.name} />
          <p>{item.name}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p className='cursor' onClick={()=>removeFood(item._id)}>X</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default List;
