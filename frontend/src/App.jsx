import React from 'react'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import Register from './screens/Register';
import NotFound from './screens/NotFound';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Profile from './screens/ProfileScreen';
import Footer from './components/Footer';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" index={true} element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter> 
    </>
  )
}

export default App