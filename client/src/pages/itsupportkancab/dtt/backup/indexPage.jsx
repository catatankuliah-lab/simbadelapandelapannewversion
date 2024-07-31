import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import DetailDesaPage from './desKPMDetailPage';

const IndexDTTPage = () => {
    const [currentView, setCurrentView] = useState('index');
    const [detailId, setDetailId] = useState(null);
    const [DTT, setDTT] = useState([]);

    const handleAddMobilClick = () => {
        setCurrentView('add');
    };

    const handleEditDataClick = (id) => {
        setDetailId(id);
        setCurrentView('detail');
    };

    const handleBackClick = () => {
        setCurrentView('index');
    };

    const fetchDTT = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/dtt/all');
            const data = await response.json();
            console.log(data);
            setDTT(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDTT();
    }, []);

    return (
        <>
            {currentView === 'index' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Data DTT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAddMobilClick}>disini</button> untuk menambahkan data DTT.
                        </div>
                    </div>
                    <div className="col-md-12 mb-4 mb-md-0">
                        <div className="accordion mt-3" id="accordion_dtt">
                            {DTT.map(dtt => (
                                <div key={dtt.id_dtt} className="card accordion-item">
                                    <h2 className="accordion-header px-2" id={`heading${dtt.id_dtt}`}>
                                        <button type="button" className="accordion-button accordion-button-primary collapsed text-primary" data-bs-toggle="collapse" data-bs-target={`#accordion${dtt.id_dtt}`} aria-expanded="false" aria-controls={`accordion${dtt.id_dtt}`}>
                                            {dtt.nomor_dtt} | {dtt.desa_kelurahan.nama_desa_kelurahan} | {dtt.total_kpm} KPM
                                        </button>
                                    </h2>
                                    <div id={`accordion${dtt.id_dtt}`} className="accordion-collapse collapse" data-bs-parent="#accordion_dtt">
                                        <div className="accordion-body" style={{ marginTop: "-15px" }} >
                                            <div className="px-2">
                                                <hr />
                                                <div className="col-md-12 col-sm-12 mt-0 mt-md-3">
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {dtt.desa_kelurahan.kecamatan.kabupaten_kota.provinsi.nama_provinsi}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {dtt.desa_kelurahan.kecamatan.kabupaten_kota.nama_kabupaten_kota}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        KECAMATAN {dtt.desa_kelurahan.kecamatan.nama_kecamatan}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {dtt.desa_kelurahan.nama_desa_kelurahan}
                                                    </p>
                                                    <p style={{ marginBottom: "2px" }}>
                                                        {dtt.total_kpm} KPM
                                                    </p>
                                                    <p>
                                                        PETUGAS PENYALUR {dtt.petugas_penyalur.user.nama_user} KPM
                                                    </p>
                                                    <p className='' >
                                                        <button className="btn btn-link p-0" onClick={() => handleEditDataClick(dtt.id_dtt)}>
                                                            <i className="tf-icons bx bx-edit me-2"></i> DETAIL
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {currentView === 'add' && <AddPage currentView={currentView} setCurrentView={setCurrentView} handleBackClick={handleBackClick} refreshData={fetchDTT} />}
            {currentView === 'detail' && detailId && <DetailPage id={detailId} />}
            {/* {currentView === 'detaildesa' && detailIdDesa && <DetailDesaPage detailIdDesa={detailIdDesa} handleBackClick={handleBackClick} setCurrentView={setCurrentView} />} */}
        </>
    );
};

export default IndexDTTPage;
