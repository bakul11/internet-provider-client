import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiMessageSquareAdd } from 'react-icons/bi'
import { toast } from 'react-toastify';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const AreaModal = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [areaDup, setAreaDup] = useState('');

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    //Send Data in Server
    const onSubmit = data => {
        fetch(`${BackendApi}/area/postArea`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result?.error?.includes('duplicate key error collection')) {
                    setAreaDup('একই এলাকার নাম অনুমোদিত নয়');
                }
                if (result?.success) {
                    toast.success(result?.message);
                    setAreaDup('');
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
            <button onClick={onOpenModal} className='bg-dark border-0 rounded'><BiMessageSquareAdd className='text-light' /></button>
            <Modal open={open} onClose={onCloseModal} center>
                <h2 className='fs-3 pb-2 text-center fw-semibold text-primary'>আপনার এরিয়ার নাম যোগ করুন </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row gy-3">
                        <div className="col-lg-12">
                            <label htmlFor="nn" className='fs-5 fw-bold'> প্রধান এরিয়া</label>
                            <input {...register("mainArea", { required: true })} id='nn' className='form-control fs-5' placeholder='আপনার প্রধান এরিয়া নাম' type='text' />
                            {errors.mainArea && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="nn" className='fs-5 fw-bold'> সার্ব এরিয়া</label>
                            <input {...register("subArea", { required: true })} id='nn' className='form-control fs-5' placeholder='আপনার সার্ব এরিয়া নাম' type='text' />
                            {errors.subArea && <span className='text-danger'>This field is required</span>}
                        </div>
                        <div className="col-lg-12">
                            <input type="submit" value='সেভ করুন' className='w-100 bg-primary text-light border-0 border border-primary rounded p-1 fs-4' />
                        </div>
                    </div>
                </form>
                <p className='text-center fw-semibold text-danger pt-2 fs-4'>{areaDup}</p>
            </Modal>
        </div>
    );
};

export default AreaModal;