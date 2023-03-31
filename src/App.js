import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Componets/Shared/Profile/Profile';
import Area from './DashBoard/Area/Area';
import Dashboard from './DashBoard/Dashboard';
import DashHome from './DashBoard/DashHome';
import Messages from './DashBoard/Messages/Messages';
import Payment from './DashBoard/Payment/Payment';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Componets/Authentication/Login/Login';
import Register from './Componets/Authentication/Register/Register';
import ProtectedRoute from './Componets/ProtectedRoute/ProtectedRoute';
import Reseler from './DashBoard/Reseler/Reseler';
import Account from './DashBoard/Account/Account';
import Staff from './DashBoard/Staff/Staff';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Dashboard />}>
            <Route index element={<DashHome />}></Route>
            <Route path='/dashboard' element={<DashHome />}></Route>
            <Route path='/messages' element={<Messages />}></Route>
            <Route path='/area' element={<Area />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/reseler' element={<Reseler />}></Route>
            <Route path='/account' element={<Account />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/staff' element={<Staff />}></Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;