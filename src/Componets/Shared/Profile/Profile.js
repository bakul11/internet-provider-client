import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useActiveUser from '../../../Hooks/useActiveUser';
import { BackendApi } from '../Api/BackendApi';
import './Profile.css'

const Profile = () => {
    const { register, handleSubmit, reset, formState: { errors }, formState } = useForm();
    const [user] = useActiveUser();
    const { isSubmitting } = formState;

    const onSubmit = data => {
        fetch(`${BackendApi}/auth/updateProfile/${user?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result?.success) {
                    toast.success(result?.message);
                    reset();
                } else {
                    if (result?.error) {
                        toast.error(result?.message)
                    }
                }
            })

        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, [9000])
        })
    }



    return (
        <div className='container mb-5'>
            <div className="profile-title bg-primary rounded p-2 mb-4">
                <h5 className='text-light fw-bold fs-4 text-center'>প্রোফাইল</h5>
            </div>
            <div className="profile">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="profile-left">
                            <div className="profile-photo text-center">
                                <img src={user?.profile} alt="avater" className='img-fluid rounded-pill mx-auto' style={{ height: '100px', width: '100px' }} />
                            </div>
                            <h5 className='text-center mt-3 mb-5 fw-bold fs-5 text-capitalize'>{user?.userName}</h5>
                            <hr />
                            <div className="profile-extra">
                                <h5 className='mb-4'>ইমেইল : <span className='float-end'>{user?.email}</span></h5>
                                <hr />
                                <h5 className='mb-4'>কোম্পানি : <span className='float-end'>{user?.company}</span></h5>
                                <hr />
                                <h5 className='mb-4'>মোবাইল নাম্বার : <span className='float-end'>0{user?.phone}</span></h5>
                                <hr />
                                <h5 className='mb-4'>ঠিকানা : <span className='float-end'>{user?.address}</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 offset-lg-1">
                        <div className="profile-right">
                            <h4 className='fw-bold'>প্রোফাইল আপডেট করুন</h4>
                            <div className="profile-form">
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
                                            <button disabled={isSubmitting} className='btn btn-primary'>
                                                আপডেট {isSubmitting && <span className="spinner-border spinner-border-sm text-light pe-2"></span>}
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;