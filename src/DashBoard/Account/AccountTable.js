import React from 'react';
import { HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';

const AccountTable = ({ area, loadding, search }) => {

    //Handle Remove Id
    const handleRemoveArea = (id) => {
        const confirmRemoveId = window.confirm('Do you want delete this item');

        if (confirmRemoveId) {
            fetch(`${BackendApi}/amount/removeAccount/${id}`, {
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
                                    <th>খরচের নাম</th>
                                    <th>পরিমাণ</th>
                                    <th>দাম</th>
                                    <th>তারিখ</th>
                                    <th>একশন</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    area.filter((sData, index) => sData.costName.toLowerCase().includes(search.toLowerCase())).map((megs, index) => {
                                        const { costName, price, _id, date, amount } = megs;
                                        return (
                                            <tr className='text-center' key={index}>
                                                <td>{index + 1}</td>
                                                <td className='fs-4'>{costName}</td>
                                                <td>{amount}</td>
                                                <td>{price}</td>
                                                <td className='fs-4'>{date}</td>
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

export default AccountTable;