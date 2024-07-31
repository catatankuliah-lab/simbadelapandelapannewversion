import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AddPage = ({ handleBackClick, currentView, setCurrentView, refreshData }) => {
    const [provinsiOption, setProvinsiOption] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const [kabupatenOption, setKabupatenOption] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState('');
    const [kecamatanOption, setKecamatanOption] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState('');
    const [desaOption, setDesaOption] = useState([]);
    const [selectedDesa, setSelectedDesa] = useState('');
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState('');

    useEffect(() => {
        const fetchProvinsiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/provinsi/all');
                setProvinsiOption(response.data);
            } catch (error) {
                console.error('Error fetching Provinsi options:', error);
            }
        };
        fetchProvinsiOptions();

        const fetchAlokasiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/alokasi/all');
                setAlokasiOption(response.data);
            } catch (error) {
                console.error('Error fetching Alokasi options:', error);
            }
        };
        fetchAlokasiOptions();
    }, []);

    useEffect(() => {
        const fetchKabupatenOptions = async (provinsiId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/provinsi/details/${provinsiId}`);
                setKabupatenOption(response.data.kabupaten_by_provinsi);
            } catch (error) {
                console.error('Error fetching Kabupaten options:', error);
            }
        };

        if (selectedProvinsi) {
            fetchKabupatenOptions(selectedProvinsi);
        }
    }, [selectedProvinsi]);

    useEffect(() => {
        const fetchKecamatanOptions = async (kabupatenId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kabupaten/details/${kabupatenId}`);
                setKecamatanOption(response.data.kecamatan_by_kabupaten);
            } catch (error) {
                console.error('Error fetching Kecamatan options:', error);
            }
        };

        if (selectedKabupaten) {
            fetchKecamatanOptions(selectedKabupaten);
        }
    }, [selectedKabupaten]);

    useEffect(() => {
        const fetchDesaOptions = async (kecamatanId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kecamatan/details/${kecamatanId}`);
                setDesaOption(response.data.desa_kelurahan_by_kecamatan);
            } catch (error) {
                console.error('Error fetching Desa options:', error);
            }
        };

        if (selectedKecamatan) {
            fetchDesaOptions(selectedKecamatan);
        }
    }, [selectedKecamatan]);

    const handleProvinsiChange = (event) => {
        setSelectedProvinsi(event.target.value);
        setSelectedKabupaten('');
        setSelectedKecamatan('');
        setSelectedDesa('');
        setDesaOption([]);
    };

    const handleKabupatenChange = (event) => {
        setSelectedKabupaten(event.target.value);
        setSelectedKecamatan('');
        setSelectedDesa('');
        setDesaOption([]);
    };

    const handleKecamatanChange = (event) => {
        setSelectedKecamatan(event.target.value);
        setSelectedDesa('');
    };

    const handleDesaChange = (event) => {
        setSelectedDesa(event.target.value);
    };

    const handleAlokasiChange = (event) => {
        setSelectedAlokasi(event.target.value);
    };

    const handleActionClick = (id_desa_kelurahan) => {
        console.log("Action clicked for desa with ID:", id_desa_kelurahan);
        setCurrentView('detaildesa');
    };


    return (
        <>
            {currentView === 'add' && (
                <div className="row">
                    <div className="col-lg-12">
                        <div className="mb-3">
                            <div className="divider text-start">
                                <div className="divider-text">
                                    <span className="menu-header-text fs-6 fw-bold">Tambah Data DTT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="">
                            Klik <button className="fw-bold btn btn-link p-0" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama DTT.
                        </div>
                    </div>
                    <div className="col-md-12 mt-3">
                        <form id="form">
                            <div className="row">
                                <div className="col-md-6 col-sm-12 mb-3">
                                    <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                                    <select className="form-control" id="id_alokasi" name="id_alokasi" value={selectedAlokasi} onChange={handleAlokasiChange} required>
                                        <option value="">Pilih Alokasi</option>
                                        {alokasiOption.map((alokasi) => (
                                            <option key={alokasi.id_alokasi} value={alokasi.id_alokasi}>{alokasi.bulan_alokasi} {alokasi.tahun_alokasi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3">
                                    <label htmlFor="id_provinsi" className="form-label">Provinsi</label>
                                    <select className="form-control" id="id_provinsi" name="id_provinsi" value={selectedProvinsi} onChange={handleProvinsiChange} required>
                                        <option value="">Pilih Provinsi</option>
                                        {provinsiOption.map((provinsi) => (
                                            <option key={provinsi.id_provinsi} value={provinsi.id_provinsi}>{provinsi.nama_provinsi}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3">
                                    <label htmlFor="id_kabupaten_kota" className="form-label">Kabupaten/Kota</label>
                                    <select className="form-control" id="id_kabupaten_kota" name="id_kabupaten_kota" value={selectedKabupaten} onChange={handleKabupatenChange} required>
                                        <option value="">Pilih Kabupaten/Kota</option>
                                        {kabupatenOption.map((kabupaten) => (
                                            <option key={kabupaten.id_kabupaten_kota} value={kabupaten.id_kabupaten_kota}>{kabupaten.nama_kabupaten_kota}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 col-sm-12 mb-3">
                                    <label htmlFor="id_kecamatan" className="form-label">Kecamatan</label>
                                    <select className="form-control" id="id_kecamatan" name="id_kecamatan" value={selectedKecamatan} onChange={handleKecamatanChange} required>
                                        <option value="">Pilih Kecamatan</option>
                                        {kecamatanOption.map((kecamatan) => (
                                            <option key={kecamatan.id_kecamatan} value={kecamatan.id_kecamatan}>{kecamatan.nama_kecamatan}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 mt-3">
                        <h6>Daftar Desa/Kelurahan</h6>
                        <div className='table-responsive text-nowrap'>
                            <table className="table" style={{ fontSize: "13px" }}>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Desa/Kelurahan</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {desaOption.map((desa, index) => (
                                        <tr key={desa.id_desa_kelurahan}>
                                            <td style={{ width: "5px" }}>{index + 1}</td>
                                            <td>{desa.nama_desa_kelurahan}</td>
                                            <td style={{ width: "5px" }}>
                                                <button className="btn btn-link p-0" onClick={() => handleActionClick(desa.id_desa_kelurahan)}>
                                                    <i className="tf-icons bx bx-edit me-2"></i> DETAIL
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {/* {currentView === 'detaildesa' && <DetailDesaPage detailIdDesa={detailIdDesa} handleBackClick={handleBackClick} setCurrentView={setCurrentView} />} */}
        </>
    );
};

AddPage.propTypes = {
    currentView: PropTypes.string.isRequired,
    setCurrentView: PropTypes.func.isRequired,
    handleBackClick: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired,
};

export default AddPage;
