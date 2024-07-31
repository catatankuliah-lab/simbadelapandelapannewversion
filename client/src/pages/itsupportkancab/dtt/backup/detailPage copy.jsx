import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

const DetailPage = ({ handleBackClick, id }) => {
    const [DTT, setDTT] = useState(null);

    let nomor = 1;

    const fetchDTT = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/dtt/details/${id}`);
            const data = await response.json();
            console.log(data);
            setDTT(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchDTT();
    }, [fetchDTT]);

    if (!DTT) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6 fw-bold">Detail {DTT.nomor_dtt}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div>
                    Klik <button className="fw-bold btn btn-link p-0 fw-bold" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama DTT.
                </div>
            </div>
            <div className="col-md-12 mb-4 mb-md-0 mt-4">
                <div className="row">
                    <div className="col-md-4 col-sm-12 mb-3 d-none">
                        <label htmlFor="id_dtt" className="form-label">ID DTT</label>
                        <input className="form-control" type="text" id="id_dtt" name="id_dtt" value={DTT.id_dtt} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="nomor_dtt" className="form-label">Nomor DTT</label>
                        <input className="form-control" type="text" id="nomor_dtt" name="nomor_dtt" value={DTT.nomor_dtt} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="status_dtt" className="form-label">Status DTT</label>
                        <input className="form-control" type="text" id="status_dtt" name="status_dtt" value={DTT.status_dtt} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="total_kpm" className="form-label">Total KPM</label>
                        <input className="form-control" type="text" id="total_kpm" name="total_kpm" value={DTT.total_kpm} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="tersalurkan_dtt" className="form-label">Tersalurkan DTT</label>
                        <input className="form-control" type="text" id="tersalurkan_dtt" name="tersalurkan_dtt" value={DTT.tersalurkan_dtt} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="sisa_dtt" className="form-label">Sisa DTT</label>
                        <input className="form-control" type="text" id="sisa_dtt" name="sisa_dtt" value={DTT.sisa_dtt} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="nama_desa_kelurahan" className="form-label">Nama Desa/Kelurahan</label>
                        <input className="form-control" type="text" id="nama_desa_kelurahan" name="nama_desa_kelurahan" value={DTT.desa_kelurahan.nama_desa_kelurahan} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="nama_kecamatan" className="form-label">Nama Kecamatan</label>
                        <input className="form-control" type="text" id="nama_kecamatan" name="nama_kecamatan" value={DTT.desa_kelurahan.kecamatan.nama_kecamatan} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="nama_kabupaten_kota" className="form-label">Nama Kabupaten/Kota</label>
                        <input className="form-control" type="text" id="nama_kabupaten_kota" name="nama_kabupaten_kota" value={DTT.desa_kelurahan.kecamatan.kabupaten_kota.nama_kabupaten_kota} readOnly />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-4">
                        <label htmlFor="nama_provinsi" className="form-label">Nama Provinsi</label>
                        <input className="form-control" type="text" id="nama_provinsi" name="nama_provinsi" value={DTT.desa_kelurahan.kecamatan.kabupaten_kota.provinsi.nama_provinsi} readOnly />
                    </div>
                    <div className="col-md-6 col-sm-12 mb-3">
                        <button className='btn btn-primary w-100' >Print DTT</button>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <button className='btn btn-primary w-100' >Print Undangan</button>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mb-4 mb-md-0 mt-3">
                <div className='table-responsive text-nowrap'>
                    <table className="table" style={{ fontSize: "13px" }} >
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>QR CODE</th>
                                <th>Nama KPM</th>
                                <th>Status KPM</th>
                                <th>Desa/Kelurahan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DTT.kpm.map((kpm) => (
                                <tr key={kpm.id_kpm}>
                                    <td style={{ width: "5px" }} >{nomor++}</td>
                                    <td style={{ width: "50" }} ><QRCode value={DTT.qr_dtt} size={50} /></td>
                                    <td>{kpm.master_data_kpm.nama_kpm}</td>
                                    <td>{kpm.status_kpm}</td>
                                    <td>{kpm.master_data_kpm.desa_kelurahan.nama_desa_kelurahan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

DetailPage.propTypes = {
    handleBackClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default DetailPage;
