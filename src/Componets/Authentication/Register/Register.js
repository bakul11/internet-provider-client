import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsWifi } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackendApi } from '../../Shared/Api/BackendApi';
import './Register.css'






const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [dupEmail, setDupEmail] = useState('');
    const navigate = useNavigate();

    const onSubmit = data => {
        fetch(`${BackendApi}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result?.error?.includes('E11000 duplicate key error')) {
                    setDupEmail('already use this email')
                }
                if (result?.success) {
                    toast.success(result?.message);
                    reset();
                    setDupEmail('')
                    navigate('/')
                } else {
                    if (result?.error) {
                        toast.error(result?.message)
                    }
                }
            })
    }

    return (
        <section className='login-section m-0 p-0'>
            <div className="row">
                <div className="col-lg-5">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="login-box container">
                                <h3 className='fw-bold login-logo-main text-center mt-2 mb-2'> <span><BsWifi /></span> পাওয়ার ইন্টারনেট</h3>
                                <h5 className='fw-semibold fs-4 text-primary text-center'>রেজিষ্টার </h5>
                                <h5 className='text-danger text-center fw-semibold'>{dupEmail}</h5>
                                <div className="login-form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row gy-2">
                                            <div className="col-lg-12">
                                                <div className="profile-item">
                                                    <label htmlFor="nn" className='fs-5 fw-semibold'>নাম</label>
                                                    <input {...register("userName", { required: true })} id='nn' className='form-control fs-5' placeholder='আপনার নাম' type='text' />
                                                    {errors.userName && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="profile-item">
                                                    <label htmlFor="kk" className='fs-5 fw-semibold'>কোম্পানি</label>
                                                    <input {...register("company", { required: true })} id='kk' className='form-control fs-5' placeholder='কোম্পানির নাম' type='text' />
                                                    {errors.company && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="profile-item">
                                                    <label htmlFor="ee" className='fs-5 fw-semibold'>ইমেইল</label>
                                                    <input {...register("email", { required: true })} id='ee' className='form-control fs-5' placeholder='আপনার ইমেইল' type='email' />
                                                    {errors.email && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="profile-item">
                                                    <label htmlFor="ee" className='fs-5 fw-semibold'>নতুন পাসওয়ার্ড</label>
                                                    <input {...register("password", { required: true })} id='ee' className='form-control fs-5' placeholder='নতুন পাসওয়ার্ড দিন' type='password' />
                                                    {errors.password && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="profile-item">
                                                    <label htmlFor="mm" className='fs-5 fw-semibold'>মোবাইল নাম্বার</label>
                                                    <input {...register("phone", { required: true })} id='mm' className='form-control fs-5' placeholder='মোবাইল নাম্বার' type='number' />
                                                    {errors.phone && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="profile-item">
                                                    <label htmlFor="aa" className='fs-5 fw-semibold'>ঠিকানা</label>
                                                    <input {...register("address", { required: true })} id='aa' className='form-control fs-5' placeholder='আপনার ঠিকানা' type='text' />
                                                    {errors.address && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <input type="submit" value='রেজিষ্টার' className='bg-primary text-light border-0 border border-primary rounded p-1 fs-4' />
                                            </div>
                                        </div>

                                    </form>
                                    <h6 className='fs-5 mt-2 text-center mb-5'>ইতিমধ্যে একটি একাউন্ট আছে? <Link to='/' className='text-danger'>লগইন </Link></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div className="register-logo">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;