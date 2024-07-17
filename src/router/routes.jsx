import React from 'react';
import {Routes, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import Login from '../pages/Login/Login';
import RegisterPage from '../pages/Register/RegisterPage';
import Dashboard from '../pages/Dashboard/Dashboard';
import Texto from '../pages/Texto/Texto';
import NovoTexto from '../pages/NovoTexto/NovoTexto';
import NovaTurma from '../pages/NovaTurma/NovaTurma';

function MainRoutes() {
  return (
    <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/texto' element={<Texto/>}/>
          <Route path='/novotexto' element={<NovoTexto/>}/>
          <Route path='/novaturma' element={<NovaTurma/>}/>
    </Routes>
  );
}

export default MainRoutes;