import React from 'react';
import { HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';

const StaffTable = ({ area, loadding, search }) => {

    //Handle Remove Id
    const handleRemoveArea = (id) => {
        const confirmRemoveId = window.confirm('Do you want delete this item');

        if (confirmRemoveId) {
            fetch(`${BackendApi}/staff/removeStaff/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.success) {
                        toast.success(data?.message);
                    } else {
                        if (data?.error) {
                            toast.error(data?.message);
                        }
                    }
                })
        }

    }


    return (
        <section className='mt-2'>
            {
                area.length === 0 ? <>
                    <div className="loading-mes">
                        <h5 className='text-center fs-3 mt-5'>কোনো ডাটা পাওয়া যায়নি..</h5>
                    </div>
                </>
                    :
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr className='text-center fs-4'>
                                    <th>আইডি</th>
                                    <th>নাম</th>
                                    <th>মোবাইল</th>
                                    <th>স্যালারি</th>
                                    <th>স্ট্যাটাস</th>
                                    <th>একশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    area.filter(sData => sData.userName.toLowerCase().includes(search.toLowerCase())).map((megs, index) => {
                                        const { status, _id, salary, userName, phone } = megs;
                                        return (
                                            <tr className='text-center'>
                                                <td>{index + 1}</td>
                                                <td className='fs-4'>{userName}</td>
                                                <td>0{phone}</td>
                                                <td>{salary}</td>
                                                <td className='fs-4'>{status}</td>
                                                <td><HiTrash onClick={() => handleRemoveArea(_id)} className='text-danger' style={{ cursor: 'pointer' }} /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </section>
    );
};

export default StaffTable;