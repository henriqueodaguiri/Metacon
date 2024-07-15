import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import Login from '../pages/Login/Login';
import RegisterPage from '../pages/Register/RegisterPage';

function MainRoutes() {
  return (
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<RegisterPage/>} />
    </Routes>
  );
}

export default MainRoutes;