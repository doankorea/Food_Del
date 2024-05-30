import React, { useState } from 'react'
import './Home.css'
import Header from '../../component/Header/Header'
import FoodDisplay from '../../component/FoodDisplay/FoodDisplay'
import ExploreMenu from '../../component/ExploreMenu/ExploreMenu'
const Home = () => {

  const[category, setCategory]= useState("All")
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Home