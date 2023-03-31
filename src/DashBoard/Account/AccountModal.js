import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiMessageSquareAdd } from 'react-icons/bi'
import { TbSquareRoundedArrowRightFilled } from 'react-icons/tb'
import { toast } from 'react-toastify';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const AccountModal = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [dupEmail, setDupEmail] = useState('');

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    //Send Data in Server
    const onSubmit = data => {
        fetch(`${BackendApi}/amount/postAccount`, {
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
            <button onClick={onOpenModal} className='bg-light border-0 rounded'><BiMessageSquareAdd className='text-primary fw-bold' /></button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className='fs-3 pb-2 text-center fw-semibold text-primary'>নতুন খরচ অ্যাড করুন </h2>
                <h5 className='text-danger text-center fw-semibold'>{dupEmail}</h5>
                <div className="reseler-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row gy-2">
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="nn" className='fs-5 fw-bold'>খরচের নাম</label>
                                    <input {...register("costName", { required: true })} id='nn' className='form-control fs-5' placeholder='খরচের নাম' type='text' />
                                    {errors.costName && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="ee" className='fs-5 fw-bold'>খরচের পরিমাণ</label>
                                    <input {...register("amount", { required: true })} id='ee' className='form-control fs-5' placeholder='খরচের পরিমাণ' type='number' />
                                    {errors.amount && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="ee" className='fs-5 fw-bold'>খরচের দাম</label>
                                    <input {...register("price", { required: true })} id='ee' className='form-control fs-5' placeholder='খরচের দাম' type='number' />
                                    {errors.price && <span className='text-danger'>This field is required</span>}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="profile-item">
                                    <label htmlFor="mm" className='fs-5 fw-bold'>খরচের তারিখ</label>
                                    <input {...register("date", { required: true })} id='mm' className='form-control fs-5' placeholder='খরচের তারিখ' type='date' />
                                    {errors.date && <span className='text-danger'>This field is required</span>}
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

export default AccountModal;