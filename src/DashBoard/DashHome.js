import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowCircleRight } from 'react-icons/hi'
import './Dashboard.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import MainServices from './MainServices';


const DashHome = () => {
    const date = new Date().toDateString();
    const percentage = 48;

    return (
        <section>
            <div className='container'>
                <div className="bil-pay bg-primary rounded p-2">
                    <h5 className='text-light fw-bold fs-4 text-center'>আপনার মাসিক ফি ২৫০০ টাকা পরিশোধের শেষ সময় {date}</h5>
                    <div className="bill-main-btn text-center mt-3 mb-2">
                        <Link to='/payment' className='bill-btn text-light fs-5 bg-dark rounded text-center p-2'>পেমেন্ট করুন <span className='fs-5'><HiOutlineArrowCircleRight /></span></Link>
                    </div>
                </div>
                {/* Balance Section  */}
                <section className='main-balance-sec mt-5'>
                    <div className="row gy-5">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="main-balace-item pt-5">
                                <h3>সম্ভাব্য</h3>
                                <h3>$ 16,500</h3>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="main-balace-item pt-3">
                                <CircularProgressbar value={percentage} text={`${percentage}%`} className='circleRound' />
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div className="main-balace-item pt-5">
                                <h3>কালেকশন</h3>
                                <h3>$ 85,200</h3>
                            </div>
                        </div>
                    </div>
                    {/* Main Services section  */}
                    <MainServices />
                </section>
            </div>
        </section>
    );

};

export default DashHome;