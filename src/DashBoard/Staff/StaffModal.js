import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineUserAdd } from 'react-icons/ai'
import { TbSquareRoundedArrowRightFilled } from 'react-icons/tb'
import { toast } from 'react-toastify';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const StaffModal = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [dupEmail, setDupEmail] = useState('');

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    //Send Data in Server
    const onSubmit = data => {
        fetch(`${BackendApi}/staff/postStaff`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
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
                    setDupEmail('')
                    reset()
                } else {
                    if (result?.error) {
                        toast.error(result?.message);
                    }
                }
            })
    }



    return (
        <div>
            <button onClick={onOpenModal} className='bg-light border-0 rounded'><AiOutlineUserAdd className='text-primary fw-bold' /></button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className='fs-3 pb-2 text-center fw-semibold text-primary'>নতুন কর্মী অ্যাড করুন </h2>
                <h5 className='text-danger text-center fw-semibold'>{dupEmail}</h5>
                <div className="reseler-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row gy-2">
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="nn" className='fs-5 fw-bold'>নাম</label>
                                    <input {...register("userName", { required: true })} id='nn' className='form-control fs-5' placeholder='কর্মী নাম' type='text' />
                                    {errors.userName && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="mm" className='fs-5 fw-bold'>মোবাইল নাম্বার</label>
                                    <input {...register("phone", { required: true })} id='mm' className='form-control fs-5' placeholder='মোবাইল নাম্বার' type='number' />
                                    {errors.phone && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="msm" className='fs-5 fw-bold'>স্যালারি</label>
                                    <input {...register("salary", { required: true })} id='msm' className='form-control fs-5' placeholder='কর্মী স্যালারি' type='number' />
                                    {errors.salary && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="aa" className='fs-5 fw-bold'>স্ট্যাটাস</label>
                                    <input {...register("status", { required: true })} id='aa' className='form-control fs-5' placeholder='কর্মী স্ট্যাটাস' type='text' />
                                    {errors.status && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <button type="submit" className='btn btn-primary fw-semibold'>সেভ করুন <TbSquareRoundedArrowRightFilled className='fs-4' /> </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default StaffModal;