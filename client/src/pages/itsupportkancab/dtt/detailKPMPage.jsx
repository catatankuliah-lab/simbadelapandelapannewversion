import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
const DetailKPMPage = ({ handlePageChange, selectedId }) => {
    const [masterDataKPM, setMasterDataKPM] = useState([]);
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [petugasPenyalurOption, setPetugasPenyalurOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState('');
    const [selectedPetugasPenyalur, setSelectedPetugasPenyalur] = useState('');
    const [formData, setFormData] = useState({
        titik_salur: '',
        tanggal_salur_dtt: ''
    });

    const fetchMasterDataKPM = async () => {
        console.log(selectedId);
        try {
            const response = await fetch(`http://localhost:5050/api/desa/details/${selectedId}`);
            const data = await response.json();
            setMasterDataKPM(data.master_data_kpm_by_desa_kelurahan);
            console.log(data.master_data_kpm_by_desa_kelurahan);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
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
        const fetchPetugasPenyalurOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/petugaspenyalur/all');
                setPetugasPenyalurOption(response.data);
            } catch (error) {
                console.error('Error fetching Petugas Penyalur options:', error);
            }
        };
        fetchPetugasPenyalurOptions();
    }, []);

    useEffect(() => {
        fetchMasterDataKPM();
    }, []);

    const handleAlokasiChange = (event) => {
        setSelectedAlokasi(event.target.value);
    };

    const handlePetugasPenyalurChange = (event) => {
        setSelectedPetugasPenyalur(event.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
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
                    Klik <button className="fw-bold btn btn-link p-0">disini</button> untuk kembali ke menu utama DTT.
                </div>
            </div>
            <div className="col-md-12 mt-3">
                <form id="form">
                    <div className="row">
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                            <select className="form-control" id="id_alokasi" name="id_alokasi" value={selectedAlokasi} onChange={handleAlokasiChange} required>
                                <option value="">Pilih Alokasi</option>
                                {alokasiOption.map((alokasi) => (
                                    <option key={alokasi.id_alokasi} value={alokasi.id_alokasi}>{alokasi.bulan_alokasi} {alokasi.tahun_alokasi}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_alokasi" className="form-label">Petugas Penyalur</label>
                            <select className="form-control" id="id_alokasi" name="id_alokasi" value={selectedPetugasPenyalur} onChange={handlePetugasPenyalurChange} required>
                                <option value="">Pilih Petugas Penyalur</option>
                                {petugasPenyalurOption.map((petugasPenyalur) => (
                                    <option key={petugasPenyalur.id_petugas_penyalur} value={petugasPenyalur.id_petugas_penyalur}>{petugasPenyalur.user.nama_user}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="titik_salur" className="form-label">Titik Penyaluran</label>
                            <input className="form-control text-uppercase" type="text" id="titik_salur" name='titik_salur' placeholder="Titik Salur DTT" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="tanggal_salur_dtt" className="form-label">Tanggal Penyaluran</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_salur_dtt" name='tanggal_salur_dtt' placeholder="Tanggal Salur DTT" onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="" className="form-label">&nbsp;</label>
                            <button className="btn btn-outline-primary w-100">
                                <i className="tf-icons bx bx-edit me-2"></i> BUAT DTT
                            </button>
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="" className="form-label">&nbsp;</label>
                            <button className="btn btn-outline-primary w-100">
                                <i className="tf-icons bx bx-printer me-2"></i> PRINT DTT
                            </button>
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
                                <th>Nama Lengkap KPM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {masterDataKPM.map((kpm, index) => (
                                <tr key={kpm.id_master_data_kpm}>
                                    <td style={{ width: "5px" }}>{index + 1}</td>
                                    <td>{kpm.nama_kpm}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

DetailKPMPage.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    selectedId: PropTypes.number.isRequired,
};

export default DetailKPMPage;
