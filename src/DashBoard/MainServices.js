import React from 'react';
import { BiUserPin, BiSignal4 } from 'react-icons/bi';
import { FaFacebookMessenger, FaUsers, FaPeopleCarry } from 'react-icons/fa';
import { MdLocationOn, MdDashboard } from 'react-icons/md';
import { BsCartCheck } from 'react-icons/bs';
import './Dashboard.css'

const dataServices = [
    {
        title: 'ড্যাশবোর্ড',
        digit: 'dashboard',
        logo: <MdDashboard />,
        background: 'color1'

    },
    {
        title: 'এরিয়া',
        digit: 'area',
        logo: <MdLocationOn />,
        background: 'color2'
    },
    {
        title: 'মাইক্রোটিক ',
        digit: 'microstick',
        logo: < BsCartCheck />,
        background: 'color3'
    },
    {
        title: 'রিপোর্ট',
        digit: 'report',
        logo: <BiSignal4 />,
        background: 'color4'
    },
    {
        title: 'রিসেলার',
        digit: 'reseler',
        logo: <BiUserPin />,
        background: 'color4'
    },
    {
        title: 'গ্রাহক',
        digit: 'customer',
        logo: <FaUsers />,
        background: 'color5'
    },
    {
        title: 'স্টাফ',
        digit: 'collig',
        logo: <FaPeopleCarry />,
        background: 'color3'
    },
    {
        title: 'মেসেজ',
        digit: 'messages',
        logo: <FaFacebookMessenger />,
        background: 'color2'
    }
]

const MainServices = () => {
    return (
        <section className='mt-5 mb-5'>
            <div className="row gy-5">
                {
                    dataServices?.map(data => {
                        const { title, digit, logo, background } = data;
                        return (
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                <div className={`services-items main-${background}`}>
                                    <div className="services-logo">
                                        <h4>{logo}</h4>
                                    </div>
                                    <div className="services-content">
                                        <h4 className='text-center text-light'>{title}</h4>
                                        <h3 className='text-light'>15,260</h3>
                                        <h4 className='text-light'>{digit}</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default MainServices;