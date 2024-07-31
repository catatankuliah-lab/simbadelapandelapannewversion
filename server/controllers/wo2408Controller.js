const Gudang = require('../models/gudangModel');
const AdminKancab = require('../models/adminKancabModel');
const WO2408 = require('../models/wo2408Model');
const KantorCabang = require('../models/kantorCabangModel');
const User = require('../models/userModel');
const HakAkses = require('../models/hakAksesModel');
const Alokasi = require('../models/alokasiModel');
const ItemWo = require('../models/itemWoModel');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');
const Desa = require('../models/desaModel');
const Provinsi = require('../models/provinsiModel');

const addWo = async (req, res) => {
    const {
        id_gudang,
        id_admin_kancab,
        id_alokasi,
        id_provinsi,
        nomor_wo,
        tanggal_wo,
        total_tonase,
        status_wo,
        qr_wo
    } = req.body;

    try {
        const newWo = await WO2408.create({
            id_gudang,
            id_admin_kancab,
            id_alokasi,
            id_provinsi,
            nomor_wo,
            tanggal_wo,
            total_tonase,
            status_wo,
            qr_wo
        });
        res.status(200).send(newWo);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const updateWO = async (req, res) => {
    const { id } = req.params;
    const {
        id_gudang,
        nomor_wo,
        tanggal_wo,
        qr_wo
    } = req.body;

    try {
        const [updated] = await WO2408.update({
            id_gudang,
            nomor_wo,
            tanggal_wo,
            qr_wo
        }, {
            where: { id_wo: id }
        });

        if (updated) {
            const updatedWo = await WO2408.findByPk(id, {
                include: [
                    {
                        model: Gudang,
                        as: 'gudang',
                        include: {
                            model: KantorCabang,
                            as: "kantor_cabang",
                        },
                    },
                    {
                        model: AdminKancab,
                        as: 'admin_kancab',
                        include: {
                            model: User,
                            as: 'user',
                            include: {
                                model: HakAkses,
                                as: "hak_akses",
                            },
                        },
                    },
                    {
                        model: Alokasi,
                        as: 'alokasi',
                    }]
            });
            return res.status(200).json(updatedWo);
        }
        res.status(404).json({ message: 'WO not found' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getAllWo = async (req, res) => {
    try {
        const wo = await WO2408.findAll({
            include: [
                {
                    model: Gudang,
                    as: 'gudang',
                    include: {
                        model: KantorCabang,
                        as: "kantor_cabang",
                    },
                },
                {
                    model: AdminKancab,
                    as: 'admin_kancab',
                    include: {
                        model: User,
                        as: 'user',
                        include: {
                            model: HakAkses,
                            as: "hak_akses",
                        },
                    },
                },
                {
                    model: Alokasi,
                    as: 'alokasi',
                }]
        });
        res.status(200).send(wo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

const getDetailsWO = async (req, res) => {
    const { id } = req.params;
    try {
        const wo = await WO2408.findByPk(id, {
            include: [
                {
                    model: Alokasi,
                    as: 'alokasi',
                },
                {
                    model: Gudang,
                    as: 'gudang',
                },
                {
                    model: ItemWo,
                    as: 'item_wo',
                    include: [
                        {
                            model: Desa,
                            as: "desa_kelurahan",
                            include: {
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
                        }
                    ]
                },
            ]
        });
        if (!wo) {
            return res.status(404).json({ message: 'WO not found' });
        }
        res.status(200).json(wo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addWo,
    updateWO,
    getAllWo,
    getDetailsWO
};
