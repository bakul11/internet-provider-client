import React, { useEffect, useState } from 'react';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';
import ReselerModal from './ReselerModal';
import ReselerTable from './ReselerTable';
import { FaArrowRight } from 'react-icons/fa'


const Reseler = () => {
    const [area, setArea] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [search, setSearch] = useState('');



    //load data 
    useEffect(() => {
        fetch(`${BackendApi}/reseler/getAllReseler`, {
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
                <h5 className='text-light fw-bold fs-4 text-center'>রিসেলার</h5>
                <h5 className='text-light fw-semibold fs-4 text-center rounded p-2' style={{background:'#e55719'}}>সকল রিসেলার কাস্টমার <FaArrowRight /></h5>
                <h5 className='text-light fw-bold fs-4 text-center'>  <ReselerModal /></h5>
            </div>
            <div className="reseler-main bg-primary rounded p-2 d-flex align-items-center justify-content-between">
                <div className="reseler-data">
                    <h5 className='text-light fw-bold fs-4 text-center'>ডাটা মোট : <span className='showMessage'>{area?.length}</span></h5>
                </div>
                <div className="reseler-search">
                    <input type="text" className='form-control fs-4' placeholder='সার্চ করুন' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {/* Import Masseages table  */}
            <ReselerTable area={area} loadding={loadding} search={search} />
        </section>
    );
};

export default Reseler;