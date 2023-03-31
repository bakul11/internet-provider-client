import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../Dashboard.css'
import { RiBarChartHorizontalLine } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { BiUserPin, BiSignal4 } from 'react-icons/bi';
import { FaFacebookMessenger, FaUsers, FaPeopleCarry } from 'react-icons/fa';
import { MdLocationOn, MdDashboard, MdAccountBalance } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';

const slideData = [
    {
        title: 'ড্যাশবোর্ড',
        path: 'dashboard',
        logo: <MdDashboard />,
        background: 'primary'
    },
    {
        title: 'এরিয়া',
        path: 'area',
        logo: <MdLocationOn />,
        background: 'primary'
    },
    {
        title: 'মাইক্রোটিক ',
        path: 'microstick',
        logo: < BsCartCheck />
    },
    {
        title: 'রিপোর্ট',
        path: 'report',
        logo: <BiSignal4 />
    },
    {
        title: 'রিসেলার',
        path: 'reseler',
        logo: <BiUserPin />
    },
    {
        title: 'গ্রাহক',
        path: 'customer',
        logo: <FaUsers />
    },
    {
        title: 'স্টাফ',
        path: 'staff',
        logo: <FaPeopleCarry />
    },
    {
        title: 'মেসেজ',
        path: 'messages',
        logo: <FaFacebookMessenger />
    },
    {
        title: 'একাউন্টস',
        path: 'account',
        logo: <MdAccountBalance />
    }
]



const SlideBar = () => {
    const [open, setOpen] = useState(true);

    const handleToggle = () => {
        setOpen(!open);
    }

    //Logout User
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <div className='slidebar' style={{ width: open ? '200px' : '100px' }}>
            <div className="logo pt-3 pb-2">
                <Link to='/' className='fw-bold text-light fs-5 ps-1'><RiBarChartHorizontalLine style={{ cursor: 'pointer' }} className='text-light fs-3' onClick={handleToggle} /> <span style={{ display: open ? '' : 'none' }}>পাওয়ার ইন্টারনেট</span> </Link>
                <h5 className='text-light text-center fs-5 pb-3' style={{ display: open ? '' : 'none' }}>এডমিন </h5>
                <hr className='bg-light mb-3' />
            </div>
            <div className="slide-main">
                {
                    slideData?.map((menu, index) => {
                        return (
                            <div className="menu" key={index}>
                                <NavLink to={`${menu?.path}`} className='text-light'>
                                    <span className='pe-2'>{menu?.logo}</span> <span style={{ display: open ? '' : 'none' }}>{menu?.title}</span>
                                </NavLink >

                            </div>
                        )
                    })
                }
                <h3 className='text-light fs-5 ps-3' style={{ cursor: 'pointer' }} onClick={handleLogout}><span><FiLogOut /></span> লগ আউট</h3>
            </div >
        </div >
    );
};

export default SlideBar;