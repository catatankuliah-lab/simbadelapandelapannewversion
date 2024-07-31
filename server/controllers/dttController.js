const DTT = require('../models/dttModel');
const KPM = require('../models/kpmModel');
const KPMMaster = require('../models/masterDataKpmModel');
const Alokasi = require('../models/alokasiModel');
const PetugasPenyalur = require('../models/petugasPenyalurModel');
const KantorCabang = require('../models/kantorCabangModel');
const User = require('../models/userModel');
const HakAkses = require('../models/hakAksesModel');
const Desa = require('../models/desaModel');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');
const Provinsi = require('../models/provinsiModel');

const addDTT = async (req, res) => {
    const {
        id_desa_kelurahan,
        id_alokasi,
        id_petugas_penyalur,
        nomor_dtt,
        total_kpm,
        tersalurkan_dtt,
        sisa_dtt,
        status_dtt,
        qr_dtt
    } = req.body;

    try {
        const newDTT = await DTT.create({
            id_desa_kelurahan,
            id_alokasi,
            id_petugas_penyalur,
            nomor_dtt,
            total_kpm,
            tersalurkan_dtt,
            sisa_dtt,
            status_dtt,
            qr_dtt
        });
        res.status(200).send(newDTT);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllDTT = async (req, res) => {
    try {
        const dtt = await DTT.findAll({
            include: [
                {
                    model: PetugasPenyalur,
                    as: 'petugas_penyalur',
                    include: {
                        model: User,
                        as: 'user',
                        include: {
                            model: HakAkses,
                            as: "hak_akses"
                        },
                    }
                },
                {
                    model: Alokasi,
                    as: 'alokasi',
                },
                {
                    model: Desa,
                    as: 'desa_kelurahan',
                    include: {
                        model: Kecamatan,
                        as: "kecamatan",
                        include: {
                            model: Kabupaten,
                            as: "kabupaten_kota",
                            include: {
                                model: Provinsi,
                                as: "provinsi",
                            },
                        }
                    }
                }
            ]
        });
        res.status(200).send(dtt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailDTT = async (req, res) => {
    const { id } = req.params;
    try {
        const dtt = await DTT.findByPk(id, {
            include: [
                {
                    model: Alokasi,
                    as: 'alokasi',
                },
                {
                    model: Desa,
                    as: 'desa_kelurahan',
                    include: [
                        {
                            model: Kecamatan,
                            as: "kecamatan",
                            include: {
                                model: Kabupaten,
                                as: "kabupaten_kota",
                                include: {
                                    model: Provinsi,
                                    as: "provinsi",
                                }
                            }
                        }
                    ]
                },
                {
                    model: PetugasPenyalur,
                    as: 'petugas_penyalur',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            include: {
                                model: HakAkses,
                                as: "hak_akses",
                            },
                        },
                        {
                            model: KantorCabang,
                            as: 'kantor_cabang',
                        }
                    ]
                }
            ]
        });

        if (!dtt) {
            return res.status(404).json({ message: 'DTT not found' });
        }

        res.status(200).json(dtt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailsDTT = async (req, res) => {
    const { id } = req.params;
    try {
        const dtt = await DTT.findByPk(id, {
            include: [
                {
                    model: Alokasi,
                    as: 'alokasi',
                },
                {
                    model: Desa,
                    as: 'desa_kelurahan',
                    include: [
                        {
                            model: Kecamatan,
                            as: "kecamatan",
                            include: {
                                model: Kabupaten,
                                as: "kabupaten_kota",
                                include: {
                                    model: Provinsi,
                                    as: "provinsi",
                                }
                            }
                        }
                    ]
                },
                {
                    model: PetugasPenyalur,
                    as: 'petugas_penyalur',
                    include: [
                        {
                            model: User,
                            as: 'user',
                            include: {
                                model: HakAkses,
                                as: "hak_akses",
                            },
                        },
                        {
                            model: KantorCabang,
                            as: 'kantor_cabang',
                        }
                    ]
                },
                {
                    model: KPM,
                    as: 'kpm',
                    include: [
                        {
                            model: KPMMaster,
                            as: 'master_data_kpm',
                            include: {
                                model: Desa,
                                as: 'desa_kelurahan',
                                include: {
                                    model: Kecamatan,
                                    as: 'kecamatan',
                                    include: {
                                        model: Kabupaten,
                                        as: 'kabupaten_kota',
                                        include: {
                                            model: Provinsi,
                                            as: 'provinsi',
                                        }
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        });

        if (!dtt) {
            return res.status(404).json({ message: 'DTT not found' });
        }

        res.status(200).json(dtt);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    addDTT,
    getAllDTT,
    getDetailDTT,
    getDetailsDTT
};
