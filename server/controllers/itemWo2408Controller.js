const ItemWo = require('../models/itemWo2408Model');
const Wo = require('../models/wo2408Model');
const Desa = require('../models/desa2048Model');
const Kecamatan = require('../models/kecamatanModel');
const Kabupaten = require('../models/kabupatenModel');

const addItemWo = async (req, res) => {
    const {
        id_wo,
        id_desa_kelurahan,
        tonase_desa_kelurahan,
    } = req.body;

    try {
        const newItemWO = await ItemWo.create({
            id_wo,
            id_desa_kelurahan,
            tonase_desa_kelurahan,
        });
        res.status(200).send(newItemWO);
    } catch (error) {
        console.error(req.body);
        res.status(500).send('Server Error');
    }
};

const getAllItemWo = async (req, res) => {
    try {
        const itemwo = await ItemWo.findAll({
            include: [
                {
                    model: Wo,
                    as: 'wo',
                },
                {
                    model: Desa,
                    as: 'desa_kelurahan',
                    include: {
                        model: Kecamatan,
                        as: 'kecamatan',
                        include: {
                            model: Kabupaten,
                            as: 'kabupaten_kota',
                        },
                    },
                }]
        });
        res.status(200).send(itemwo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    addItemWo,
    getAllItemWo,
};
