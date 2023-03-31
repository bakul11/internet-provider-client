import React from 'react';

const MessagesTable = ({ message, loadding, search }) => {
    return (
        <section className='mt-2'>
            {
                  message.length === 0 ? <>
                    <div className="loading-mes">
                        <h5 className='text-center fs-3 mt-5'>কোনো ডাটা পাওয়া যায়নি..</h5>
                    </div>
                </>
                    :
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr className='text-center'>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Website</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    message.filter(sData => sData.name.toLowerCase().includes(search.toLowerCase())).map((megs, index) => {
                                        const { name, email, phone, website } = megs;
                                        return (
                                            <tr className='text-center'>
                                                <td>{index + 1}</td>
                                                <td>{name}</td>
                                                <td>{email}</td>
                                                <td>{phone}</td>
                                                <td>{website}</td>
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

export default MessagesTable;