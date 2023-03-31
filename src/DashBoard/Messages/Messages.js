import React, { useState, useEffect } from 'react';
import './Messages.css'
import MessagesTable from './MessagesTable';

const Messages = () => {
    const [message, setMessage] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [search, setSearch] = useState('');



    //load data 
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(data => {
                setMessage(data);
                setLoadding(false);
            })
            .catch(err => {
                setLoadding(true);
            })

    }, [])



    return (
        <section className='container'>
            <div className="messages-title bg-primary rounded p-2 mb-5">
                <h5 className='text-light fw-bold fs-4 text-center'>রিসেলার এসএমএস  রিকোয়েস্ট </h5>
            </div>
            <div className="messages-main bg-primary rounded p-2 d-flex align-items-center justify-content-between">
                <div className="message-data">
                    <h5 className='text-light fw-bold fs-4 text-center'>ডাটা মোট : <span className='showMessage'>{message?.length}</span></h5>
                </div>
                <div className="message-search">
                    <input type="text" className='form-control' placeholder='সার্চ করুন' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {/* Import Masseages table  */}
            <MessagesTable message={message} loadding={loadding} search={search} />
        </section>
    );
};

export default Messages;