import React, { useEffect, useState } from 'react';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';
import AreaModal from './AreaModal';
import AreaTable from './AreaTable';


const Area = () => {
    const [area, setArea] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [search, setSearch] = useState('');



    //load data 
    useEffect(() => {
        fetch(`${BackendApi}/area/getArea`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setArea(data);
                setLoadding(false);
            })
            .catch(err => {
                setLoadding(true);
            })

    }, [area])




    return (
        <section className='container'>
            <div className="bg-primary rounded p-2 mb-5 d-flex align-items-center flex-wrap justify-content-between">
                <h5 className='text-light fw-bold fs-4 text-center'>কাস্টমার এরিয়া</h5>
                <h5 className='text-light fw-bold fs-4 text-center'>  <AreaModal /></h5>

            </div>
            <div className="messages-main bg-primary rounded p-2 d-flex align-items-center justify-content-between">
                <div className="message-data">
                    <h5 className='text-light fw-bold fs-4 text-center'>ডাটা মোট : <span className='showMessage'>{area?.length}</span></h5>
                </div>
                <div className="message-search">
                    <input type="text" className='form-control' placeholder='সার্চ করুন' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {/* Import Masseages table  */}
            <AreaTable area={area} loadding={loadding} search={search} />
        </section>
    );
};

export default Area;