const MasterDataKpm = require("../models/masterDataKpmModel");
const Desa = require("../models/desaModel");
const Kecamatan = require("../models/kecamatanModel");
const Kabupaten = require("../models/kabupatenModel");
const Provinsi = require("../models/provinsiModel");

const addMasterDataKpm = async (req, res) => {
    const {
        nama_kpm,
        status_master_data_kpm,
        id_desa_kelurahan,
    } = req.body;
    try {
        const newMasterDataKpm = await MasterDataKpm.create({
            nama_kpm,
            status_master_data_kpm,
            id_desa_kelurahan,
        });
        res.status(200).send(newMasterDataKpm);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

const getAllDataMasterKpm = async (req, res) => {
    try {
        const masterdatakpms = await MasterDataKpm.findAll({
            include: [
                {
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
                            },
                        },
                    },
                },
            ]
        });
        res.status(200).json(masterdatakpms);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

module.exports = {
    addMasterDataKpm,
    getAllDataMasterKpm,
};
