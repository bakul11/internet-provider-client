import React from 'react';
import { Outlet } from 'react-router-dom';
import SlideBar from './SlideBar/SlideBar';
import './Dashboard.css'
import Navbar from '../Componets/Shared/Navbar/Navbar';


const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className="dashboard-left">
                <SlideBar />
            </div>
            <div className="dashboard-right">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;