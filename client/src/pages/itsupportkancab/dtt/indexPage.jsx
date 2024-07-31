import React, { useState, useEffect } from 'react';
import AddPage from './addPage';
import DetailPage from './detailPage';
import DetailKPMPage from './detailKPMPage';

const IndexPage = () => {
    const [currentPage, setCurrentPage] = useState('index');
    const [selectedId, setSelectedId] = useState(null);
    const [DTT, setDTT] = useState([]);

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

    const handlePageChange = (page, id = null) => {
        setCurrentPage(page);
        if (id !== null) {
            setSelectedId(id);
        }
    };

    const handleAdd = () => {
        handlePageChange('add');
    };

    const handleDetail = (id) => {
        console.log(id);
        // setSelectedId();
        // setCurrentPage("add");
    };

    return (
        <div>
            {currentPage === 'index' && (
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
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleAdd}>disini</button> untuk menambahkan data DTT.
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
                                                        <button className="btn btn-link p-0" onClick={() => handleDetail(dtt.id_dtt)}>
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
            {currentPage === 'add' && <AddPage handlePageChange={handlePageChange} />}
            {currentPage === 'detail' && <DetailPage handlePageChange={handlePageChange} selectedId={selectedId} />}
            {currentPage === 'detailkpm' && <DetailKPMPage handlePageChange={handlePageChange} selectedId={selectedId} />}
        </div>
    );
};

export default IndexPage;
