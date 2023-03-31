import React, { useEffect, useRef, useState } from 'react';
import { BackendApi } from '../../Componets/Shared/Api/BackendApi';
import { AiFillPrinter } from 'react-icons/ai'
import AccountTable from './AccountTable';
import AccountModal from './AccountModal';
import { useReactToPrint } from 'react-to-print';


const Account = () => {
    const [area, setArea] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [search, setSearch] = useState('');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    //load data 
    useEffect(() => {
        fetch(`${BackendApi}/amount/getAllAccount`, {
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


    const total = area?.reduce((total, item) => total + item.price, 0);

    return (
        <section className='container' ref={componentRef}>
            <div className="bg-primary rounded p-2 mb-5 d-flex align-items-center flex-wrap justify-content-between">
                <h5 className='text-light fw-bold fs-4 text-center'>খরচ</h5>
                <div className="div d-flex align-items-center flex-wrap justify-content-space gap-2">
                    <h5 className='bg-light border-0 rounded pt-1 pb-1 ps-2 pe-2' style={{ cursor: 'pointer' }} onClick={handlePrint}><AiFillPrinter /></h5>
                    <h5 className='text-light fw-bold fs-4'>  <AccountModal /></h5>
                </div>
            </div>
            <div className="reseler-main bg-primary rounded p-2 d-flex align-items-center justify-content-between">
                <div className="reseler-data">
                    <h5 className='text-light fw-bold fs-4 text-center'>ডাটা মোট : <span className='showMessage'>{area?.length}</span></h5>
                </div>
                <div className="reseler-data">
                    <h5 className='text-light fw-bold fs-4 text-center'>মোট  খরচ {total} টাকা</h5>
                </div>
                <div className="reseler-search">
                    <input type="text" className='form-control fs-4' placeholder='সার্চ করুন' onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            {/* Import Masseages table  */}
            <AccountTable area={area} loadding={loadding} search={search} />
        </section>
    );
};

export default Account;