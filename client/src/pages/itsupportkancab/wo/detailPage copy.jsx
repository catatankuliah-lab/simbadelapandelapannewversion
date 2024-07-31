import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Select from 'react-select';

const DetailPage = ({ handleBackClick, id }) => {
    const [WO, setWO] = useState(null);
    const [alokasiOption, setAlokasiOption] = useState([]);
    const [selectedAlokasi, setSelectedAlokasi] = useState(null);
    const [gudangOption, setGudangOption] = useState([]);
    const [selectedGudang, setSelectedGudang] = useState(null);
    const [provinsiOption, setProvinsiOption] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState(null);
    const [kabupatenOption, setKabupatenOption] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState(null);
    const [kecamatanOption, setKecamatanOption] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [formData, setFormData] = useState({
        tanggal_wo: '',
        nomor_wo: '',
        id_wo: ''
    });

    let nomor = 1;

    const fetchWO = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5050/api/wo/details/${id}`);
            const data = await response.json();
            console.log(data);
            setWO(data);
            setSelectedAlokasi({ value: data.alokasi.id_alokasi, label: data.alokasi.bulan_alokasi + " " + data.alokasi.tahun_alokasi });
            setSelectedGudang({ value: data.gudang.id_gudang, label: data.gudang.nama_gudang });
            setFormData({
                id_wo: data.id_wo,
                nomor_wo: data.nomor_wo,
                tanggal_wo: data.tanggal_wo,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchWO();
    }, [fetchWO]);

    useEffect(() => {
        const fetchAlokasiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/alokasi/all');
                const options = response.data.map(alokasi => ({
                    value: alokasi.id_alokasi,
                    label: `${alokasi.bulan_alokasi} ${alokasi.tahun_alokasi}`
                }));
                setAlokasiOption(options);
            } catch (error) {
                console.error('Error fetching Alokasi options:', error);
            }
        };
        fetchAlokasiOptions();
    }, []);

    useEffect(() => {
        const fetchGudangOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/gudang/all');
                const options = response.data.map(gudang => ({
                    value: gudang.id_gudang,
                    label: `${gudang.nama_gudang}`
                }));
                setGudangOption(options);
            } catch (error) {
                console.error('Error fetching Gudang options:', error);
            }
        };
        fetchGudangOptions();
    }, []);

    useEffect(() => {
        const fetchProvinsiOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5050/api/provinsi/all');
                const options = response.data.map(provinsi => ({
                    value: provinsi.id_provinsi,
                    label: provinsi.nama_provinsi
                }));
                setProvinsiOption(options);
            } catch (error) {
                console.error('Error fetching Provinsi options:', error);
            }
        };
        fetchProvinsiOptions();
    }, []);

    useEffect(() => {
        const fetchKabupatenOptions = async (provinsiId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/provinsi/details/${provinsiId}`);
                const options = response.data.kabupaten_by_provinsi.map(kabupaten => ({
                    value: kabupaten.id_kabupaten_kota,
                    label: kabupaten.nama_kabupaten_kota
                }));
                setKabupatenOption(options);
            } catch (error) {
                console.error('Error fetching Kabupaten options:', error);
            }
        };

        if (selectedProvinsi) {
            fetchKabupatenOptions(selectedProvinsi.value);
        } else {
            setKabupatenOption([]);
        }
    }, [selectedProvinsi]);

    useEffect(() => {
        const fetchKecamatanOptions = async (kabupatenId) => {
            try {
                const response = await axios.get(`http://localhost:5050/api/kabupaten/details/${kabupatenId}`);
                const options = response.data.kecamatan_by_kabupaten.map(kecamatan => ({
                    value: kecamatan.id_kecamatan,
                    label: kecamatan.nama_kecamatan
                }));
                setKecamatanOption(options);
            } catch (error) {
                console.error('Error fetching Kecamatan options:', error);
            }
        };

        if (selectedKabupaten) {
            fetchKecamatanOptions(selectedKabupaten.value);
        } else {
            setKecamatanOption([]);
        }
    }, [selectedKabupaten]);

    const handleAlokasiChange = (selectedOption) => {
        setSelectedAlokasi(selectedOption);
    };

    const handleGudangChange = (selectedOption) => {
        setSelectedGudang(selectedOption);
    };

    const handleProvinsiChange = (selectedOption) => {
        setSelectedProvinsi(selectedOption);
        setSelectedKabupaten(null);
        setSelectedKecamatan(null);
        setKabupatenOption([]);
        setKecamatanOption([]);
    };

    const handleKabupatenChange = (selectedOption) => {
        setSelectedKabupaten(selectedOption);
        setSelectedKecamatan(null);
        setKecamatanOption([]);
    };

    const handleKecamatanChange = (selectedOption) => {
        setSelectedKecamatan(selectedOption);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...formData,
            id_admin_kancab: 1,
            qr_wo: formData.nomor_wo.replace(/[ ,./]/g, ''),
            id_alokasi: selectedAlokasi ? selectedAlokasi.value : null,
            id_gudang: selectedGudang ? selectedGudang.value : null
        };
        console.log(dataToSubmit);
        try {
            await axios.put(`http://localhost:5050/api/wo/update/${formData.id_wo}`, dataToSubmit);
            console.log('Data updated successfully');
            await fetchWO();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    if (!WO) {
        return <div>Loading...</div>;
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="mb-3">
                    <div className="divider text-start">
                        <div className="divider-text">
                            <span className="menu-header-text fs-6 fw-bold">Detail Working Order (WO)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                <div>
                    Klik <button className="fw-bold btn btn-link p-0 fw-bold" onClick={handleBackClick}>disini</button> untuk kembali ke menu utama Working Order.
                </div>
            </div>
            <div className="col-md-12 mb-4 mb-md-0 mt-4">
                <form id="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 mb-3 d-none">
                            <label htmlFor="id_wo" className="form-label">ID Working Order</label>
                            <input className="form-control" type="text" id="id_wo" name="id_wo" value={formData.id_wo} readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="tanggal_wo" className="form-label">Tanggal Working Order (WO)</label>
                            <input className="form-control text-uppercase" type="date" id="tanggal_wo" name='tanggal_wo' placeholder="Tanggal WO" onChange={handleChange} value={formData.tanggal_wo} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="nomor_wo" className="form-label">Nomor Working Order (WO)</label>
                            <input className="form-control text-uppercase" type="text" id="nomor_wo" name='nomor_wo' placeholder="Nomor Working Order" onChange={handleChange} value={formData.nomor_wo} required />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_alokasi" className="form-label">Alokasi</label>
                            <Select
                                id="id_alokasi"
                                name="id_alokasi"
                                value={selectedAlokasi}
                                onChange={handleAlokasiChange}
                                options={alokasiOption}
                                placeholder="Pilih Alokasi"
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="id_gudang" className="form-label">Gudang</label>
                            <Select
                                id="id_gudang"
                                name="id_gudang"
                                value={selectedGudang}
                                onChange={handleGudangChange}
                                options={gudangOption}
                                placeholder="Pilih Gudang"
                            />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="status_wo" className="form-label">Status Working Order</label>
                            <input className="form-control" type="text" id="status_wo" name="status_wo" value={WO.status_wo} readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="total_tonase" className="form-label">Total Tonase</label>
                            <input className="form-control" type="text" id="total_tonase" name="total_tonase" value={WO.total_tonase} readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="tonase_tersalurkan" className="form-label">Tonase Tersalurkan</label>
                            <input className="form-control" type="text" id="tonase_tersalurkan" name="tonase_tersalurkan" value={WO.item_wo.tonase_tersalurkan_wo} readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12 mb-3">
                            <label htmlFor="sisa_tonase" className="form-label">Sisa Tonase</label>
                            <input className="form-control" type="text" id="sisa_tonase" name="sisa_tonase" value={WO.tonase_sisa_wo} readOnly />
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <label htmlFor="ase" className="form-label">Perubahan</label>
                            <button type="submit" className="btn btn-primary w-100">Simpan</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="id_provinsi" className="form-label">Provinsi</label>
                        <Select
                            id="id_provinsi"
                            name="id_provinsi"
                            value={selectedProvinsi}
                            onChange={handleProvinsiChange}
                            options={provinsiOption}
                            isClearable
                            placeholder="Pilih Provinsi"
                        />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="id_kabupaten" className="form-label">Kabupaten</label>
                        <Select
                            id="id_kabupaten"
                            name="id_kabupaten"
                            value={selectedKabupaten}
                            onChange={handleKabupatenChange}
                            options={kabupatenOption}
                            isClearable
                            placeholder="Pilih Kabupaten/Kota"
                        />
                    </div>
                    <div className="col-md-4 col-sm-12 mb-3">
                        <label htmlFor="id_kecamatan" className="form-label">Kecamatan</label>
                        <Select
                            id="id_kecamatan"
                            name="id_kecamatan"
                            value={selectedKecamatan}
                            onChange={handleKecamatanChange}
                            options={kecamatanOption}
                            isClearable
                            placeholder="Pilih Kecamatan"
                        />
                    </div>
                </div>
            </div>
            <div className="col-md-12 mb-4 mb-md-0 mt-3">
                <div className='table-responsive text-nowrap"'>
                    <table className="table" style={{ fontSize: "13px" }} >
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>ID WO</th>
                                <th>Nomor WO</th>
                                <th>Desa/Kelurahan</th>
                                <th>Status WO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {WO.item_wo.map((itemWo) => (
                                <tr key={itemWo.id_wo}>
                                    <td>{nomor++}</td>
                                    <td>{itemWo.id_wo}</td>
                                    <td>{itemWo.nomor_wo}</td>
                                    <td>{itemWo.desa_kelurahan.nama_desa_kelurahan}</td>
                                    <td>{itemWo.status_wo}</td>
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
