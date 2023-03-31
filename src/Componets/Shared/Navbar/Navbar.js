import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import useActiveUser from '../../../Hooks/useActiveUser';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [user] = useActiveUser();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logout successfully done!');
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-main">
            <div class="container">
                {/* <a className="navbar-brand" href="#">Navbar</a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav d-flex align-items-center pe-5">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"><MdOutlineDarkMode /></a>
                        </li>
                        <li className="nav-item">
                            {/* <select name="" className="nav-link bg-none">
                                <option value="bangla">Bangla</option>
                                <option value="english">English</option>
                            </select> */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled fs-5 text-primary fw-semibold text-capitalize" href="#">{user?.userName}</a>
                        </li>
                        {
                            user?.email ?
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={user?.profile} alt="avater" className='img-fluid rounded-pill' style={{ height: '40px', width: '40px' }} />
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><NavLink className="dropdown-item fs-5" to="/profile"><AiOutlineUserAdd /> প্রোফাইল</NavLink></li>
                                        <hr />
                                        <li><h4 className="dropdown-item fs-5" style={{ cursor: 'pointer' }} onClick={handleLogout}><FiLogOut /> লগ আউট</h4></li>
                                    </ul>
                                </li>
                                : ''
                        }

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;