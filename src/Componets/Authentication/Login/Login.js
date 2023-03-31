import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsWifi } from 'react-icons/bs'
import { MdMarkEmailRead } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BackendApi } from '../../Shared/Api/BackendApi';
import './Login.css'





const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [mgs, setMgs] = useState('');

    const onSubmit = data => {
        fetch(`${BackendApi}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result?.success) {
                    toast.success(result?.message);
                    localStorage.setItem('token', result?.token)
                    reset();
                    navigate('/')
                }
                setMgs(result?.message2);
            })
    }

    return (
        <section className='login-section container'>
            <h3 className='fw-bold login-logo-main text-center mt-5 mb-5 fst-italic'> <span><BsWifi /></span> পাওয়ার ইন্টারনেট</h3>
            <div className="row">
                <div className="col-lg-7">
                    <div className="login-logo">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/005/877/431/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-woman-working-on-laptop-processing-files-and-images-online-and-using-cloud-technologies-illustration-with-isolated-people-scene-free-vector.jpg" alt="" />
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="row">
                        <div className="col-lg-11 mx-auto">
                            <div className="login-box2 container">
                                <h5 className='fw-bold fs-3 text-dark text-center mb-2 pt-3'>লগইন </h5>
                                <h5 className='text-danger fw-semibold text-center pb-2'>{mgs}</h5>
                                <div className="login-form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row gy-3">
                                            <div className="col-lg-12">
                                                <label htmlFor="ee" className='fs-5 fw-semibold'>ইমেইল</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" id="basic-addon1"><MdMarkEmailRead /></span>
                                                    <input {...register("email", { required: true })} id='ee' className='form-control fs-5' placeholder='আপনার ইমেইল' type='email' />
                                                    {errors.email && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <label htmlFor="mm" className='fs-5 fw-semibold'>পাসওয়ার্ড</label>
                                                <div class="input-group">
                                                    <span class="input-group-text" id="basic-addon1"><RiLockPasswordLine /></span>
                                                    <input {...register("password", { required: true })} id='mm' className='form-control fs-5' placeholder='আপনার পাসওয়ার্ড' type='password' />
                                                    {errors.password && <span className='text-danger'>This field is required</span>}
                                                </div>
                                            </div>
                                            <Link to='/forget-password' className='text-end fs-5 text-danger'>পাসওয়ার্ড ভুলে গেছেন?</Link>
                                            <div className="col-lg-12">
                                                <input type="submit" value='লগইন' className='w-100 bg-primary text-light border-0 border border-primary rounded p-1 fs-4' />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <h6 className='fs-5 mt-2 text-center mb-5'>আপনার কোন অ্যাকাউন্ট নেই. <Link to='/register' className='text-danger'>রেজিষ্টার</Link></h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;