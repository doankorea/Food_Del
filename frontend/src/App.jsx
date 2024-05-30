import React, { useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './component/Footer/Footer'

import AppDownLoad from './component/AppDownLoad/AppDownLoad'
import Cart from './pages/Cart/Cart'

import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './component/LoginPopup/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
const App = () => {

  const [showLogin, setShowLogin]= useState(false)

  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}></LoginPopup>: <> </>}
      <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
        <AppDownLoad />
        
      </div>
      <Footer />

    </>
  )
}

export default App